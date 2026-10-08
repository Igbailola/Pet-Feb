"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { z } from "zod";
import { logActivity } from "@/lib/activity-log";

const ALL_ADMIN_SECTIONS = [
  "cms",
  "blog",
  "products",
  "verifications",
  "testimonials",
  "other_updates",
] as const;

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/**
 * Ensures that an authenticated staff user has is_staff = true
 * and holds all essential admin permissions.
 */
async function ensureAdminPermissions(userId: string, email: string, fullName?: string) {
  try {
    const adminClient = createAdminClient();

    // 1. Ensure profile has is_staff = true
    await adminClient.from("profiles").upsert(
      {
        id: userId,
        email: email.toLowerCase(),
        full_name: fullName || email.split("@")[0],
        is_staff: true,
      },
      { onConflict: "id" }
    );

    // 2. Grant all admin sections
    for (const section of ALL_ADMIN_SECTIONS) {
      await adminClient.from("staff_sections").upsert(
        {
          user_id: userId,
          section,
        },
        { onConflict: "user_id,section" }
      );
    }
  } catch (err) {
    console.error("Error ensuring admin permissions:", err);
  }
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: (formData.get("email") as string)?.trim().toLowerCase(),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;
  const supabase = await createClient();

  // Try initial sign in with retry for transient fetch failed / network blip
  let signInRes = await supabase.auth.signInWithPassword({ email, password });
  if (signInRes.error && /fetch failed|network|timeout/i.test(signInRes.error.message)) {
    // Wait briefly and retry once
    await new Promise((r) => setTimeout(r, 600));
    signInRes = await supabase.auth.signInWithPassword({ email, password });
  }

  // If credentials failed, check if user does not exist yet to auto-provision admin
  if (signInRes.error && /invalid login credentials/i.test(signInRes.error.message)) {
    try {
      const adminClient = createAdminClient();
      const { data: usersData } = await adminClient.auth.admin.listUsers();
      const userExists = usersData?.users?.some(
        (u) => u.email?.toLowerCase() === email
      );

      if (!userExists) {
        // Auto-provision this new admin account
        const { data: newUser, error: createError } =
          await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              full_name: email.split("@")[0],
            },
          });

        if (!createError && newUser?.user) {
          await ensureAdminPermissions(newUser.user.id, email);

          // Retry sign in now that account is provisioned
          const retryRes = await supabase.auth.signInWithPassword({ email, password });
          if (!retryRes.error) {
            signInRes = retryRes;
          }
        }
      }
    } catch (provisionErr) {
      console.error("Auto-provision error:", provisionErr);
    }
  }

  if (signInRes.error) {
    const error = signInRes.error;
    if (error.status === 400 || /invalid login credentials/i.test(error.message)) {
      return {
        error:
          "Invalid email or password. If you are creating a new admin account, switch to the 'Create Admin Account' tab below.",
      };
    }
    if (error.status === 429 || /rate limit|too many/i.test(error.message)) {
      return { error: "Too many sign-in attempts. Please wait a minute and try again." };
    }
    if (/email not confirmed/i.test(error.message)) {
      return { error: "This email is not confirmed. Check your inbox for the confirmation link." };
    }
    if (/fetch failed/i.test(error.message)) {
      return {
        error:
          "Network connection issue reaching authentication service. Please check your internet connection and try again.",
      };
    }
    return { error: `Sign-in failed: ${error.message}` };
  }

  // Ensure logged in staff has is_staff = true and staff_sections
  if (signInRes.data?.user) {
    await ensureAdminPermissions(signInRes.data.user.id, email);
  }

  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
}

/**
 * Register / setup a new administrator account with their own email and password
 */
export async function registerAdminAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = registerSchema.safeParse({
    fullName: (formData.get("fullName") as string)?.trim(),
    email: (formData.get("email") as string)?.trim().toLowerCase(),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { fullName, email, password } = parsed.data;

  try {
    const adminClient = createAdminClient();

    // Check if user already exists
    const { data: usersData } = await adminClient.auth.admin.listUsers();
    const existing = usersData?.users?.find(
      (u) => u.email?.toLowerCase() === email
    );

    let userId: string;

    if (existing) {
      // Update password for existing user
      userId = existing.id;
      const { error: updateErr } = await adminClient.auth.admin.updateUserById(
        userId,
        {
          password,
          user_metadata: { full_name: fullName },
        }
      );
      if (updateErr) {
        return { error: `Failed to update credentials: ${updateErr.message}` };
      }
    } else {
      // Create new user
      const { data: newUser, error: createErr } =
        await adminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { full_name: fullName },
        });

      if (createErr || !newUser?.user) {
        return { error: `Failed to create admin user: ${createErr?.message}` };
      }
      userId = newUser.user.id;
    }

    // Grant staff status and all sections
    await ensureAdminPermissions(userId, email, fullName);

    // Sign in the user
    const supabase = await createClient();
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInErr) {
      return {
        error: `Account created, but sign-in failed: ${signInErr.message}. Please switch to Sign In.`,
      };
    }

    const next = formData.get("next");
    redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
  } catch (err: unknown) {
    console.error("Register admin error:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to register admin account.",
    };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/staff/login?logged_out=true");
}

export async function changePasswordAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
