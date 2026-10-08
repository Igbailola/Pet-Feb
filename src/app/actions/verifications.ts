"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-log";

export type BuySmallApplicationInput = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  state?: string;
  idType: string;
  idNumber: string;
  employmentStatus?: string;
  monthlyIncome?: string;
  systemName?: string;
  downPayment?: number;
  monthlyRepayment?: number;
};

export type VerificationActionResult = {
  success?: boolean;
  error?: string;
  refCode?: string;
  submissionId?: string;
  status?: string;
};

/**
 * Public action: Creates / connects user profile and creates a verification_submission
 * for Buy Small financing applicants.
 */
export async function submitBuySmallVerificationAction(
  input: BuySmallApplicationInput
): Promise<VerificationActionResult> {
  const fullName = input.fullName?.trim();
  const email = input.email?.trim().toLowerCase();
  const phone = input.phone?.trim();
  const idType = input.idType?.trim() || "National ID (NIN)";
  const idNumber = input.idNumber?.trim();

  if (!fullName || !email || !idNumber) {
    return { error: "Please provide your full name, email, and ID/NIN number." };
  }

  try {
    const adminClient = createAdminClient();

    // 1. Check if profile already exists for this email
    const { data: existingProfile } = await adminClient
      .from("profiles")
      .select("id, email")
      .eq("email", email)
      .maybeSingle();

    let userId = existingProfile?.id;

    if (!userId) {
      // 2. Check if auth user exists, or create one
      const { data: usersData } = await adminClient.auth.admin.listUsers();
      const existingAuthUser = usersData?.users?.find(
        (u) => u.email?.toLowerCase() === email
      );

      if (existingAuthUser) {
        userId = existingAuthUser.id;
      } else {
        const tempPassword = `Petfeb${Math.random().toString(36).slice(-8)}!9`;
        const { data: newUser, error: createError } =
          await adminClient.auth.admin.createUser({
            email,
            password: tempPassword,
            email_confirm: true,
            user_metadata: {
              full_name: fullName,
              phone,
            },
          });

        if (createError) {
          console.error("Auth createUser error:", createError);
          return { error: `Failed to create applicant record: ${createError.message}` };
        }
        userId = newUser.user.id;
      }

      // Upsert profile
      const { error: profileError } = await adminClient.from("profiles").upsert(
        {
          id: userId,
          email,
          full_name: fullName,
          phone,
          is_staff: false,
          verification_status: "pending",
        },
        { onConflict: "id" }
      );

      if (profileError) {
        console.error("Profile upsert error:", profileError);
      }
    } else {
      // Update existing profile with phone and full_name if missing
      await adminClient
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone || undefined,
        })
        .eq("id", userId);
    }

    const docPath = `verification/${userId}/${idType.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${idNumber}`;

    // 3. Insert verification submission
    const baseSubmission = {
      user_id: userId,
      id_document_path: docPath,
      decision: "pending",
    };
    const submissionPayload = {
      ...baseSubmission,
      id_type: idType,
      id_number: idNumber,
      employment_status: input.employmentStatus?.trim() || null,
      monthly_income: input.monthlyIncome?.trim() || null,
      address: input.address?.trim() || null,
      state: input.state?.trim() || null,
      system_name: input.systemName?.trim() || null,
      down_payment: typeof input.downPayment === "number" && Number.isFinite(input.downPayment)
        ? input.downPayment
        : null,
      monthly_repayment:
        typeof input.monthlyRepayment === "number" && Number.isFinite(input.monthlyRepayment)
          ? input.monthlyRepayment
          : null,
    };

    let { data: submission, error: subError } = await adminClient
      .from("verification_submissions")
      .insert(submissionPayload)
      .select("id")
      .single();

    // If the detail columns are not yet in the database (migration pending),
    // retry with the base payload so the submission still goes through.
    if (subError && subError.message?.includes("does not exist")) {
      const retry = await adminClient
        .from("verification_submissions")
        .insert(baseSubmission)
        .select("id")
        .single();
      submission = retry.data;
      subError = retry.error;
    }

    if (subError) {
      console.error("Verification insert error:", subError);
      return { error: `Submission failed: ${subError.message}` };
    }

    if (!submission) {
      return { error: "Submission failed: no id returned" };
    }

    const refCode = `PET-BSV-2026-${submission.id.slice(0, 6).toUpperCase()}`;

    revalidatePath("/admin/verifications");
    revalidatePath("/admin");
    revalidatePath("/buy-small");

    return {
      success: true,
      submissionId: submission.id,
      refCode,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected submission error";
    return { error: message };
  }
}

/**
 * Admin action: Approve or reject customer verification submission.
 */
export async function reviewVerificationAction({
  submissionId,
  decision,
  rejectionReason,
}: {
  submissionId: string;
  decision: "approved" | "rejected";
  rejectionReason?: string;
}): Promise<VerificationActionResult> {
  const staff = await requireStaff();
  if (!staff.sections.includes("verifications")) {
    throw new Error("Forbidden: missing section verifications");
  }

  if (decision === "rejected" && !rejectionReason?.trim()) {
    return { error: "A rejection reason is required when rejecting verification." };
  }

  const supabase = await createClient();

  const updateData = {
    decision,
    reviewer_id: staff.id,
    decided_at: new Date().toISOString(),
    rejection_reason: decision === "rejected" ? rejectionReason?.trim() : null,
  };

  const { error } = await supabase
    .from("verification_submissions")
    .update(updateData)
    .eq("id", submissionId);

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    userId: staff.id,
    section: "verifications",
    action: decision === "approved" ? "approved customer verification" : "rejected customer verification",
    entityType: "verification",
    entityId: submissionId,
    entityName: `Decision: ${decision.toUpperCase()}`,
  });

  revalidatePath("/admin/verifications");
  revalidatePath("/admin");
  revalidatePath("/buy-small");

  return { success: true };
}

/**
 * Admin action: Delete customer verification submission.
 */
export async function deleteVerificationAction(
  submissionId: string
): Promise<VerificationActionResult> {
  const staff = await requireStaff();
  if (!staff.sections.includes("verifications")) {
    throw new Error("Forbidden: missing section verifications");
  }

  const adminClient = createAdminClient();

  // Fetch applicant name for audit logging
  const { data: sub } = await adminClient
    .from("verification_submissions")
    .select("id, id_document_path, profiles(full_name, email)")
    .eq("id", submissionId)
    .maybeSingle();

  const applicant = (Array.isArray(sub?.profiles) ? sub?.profiles[0] : sub?.profiles) as {
    full_name?: string | null;
    email?: string | null;
  } | null;

  const applicantName = applicant?.full_name || applicant?.email || "Verification record";

  const { error } = await adminClient
    .from("verification_submissions")
    .delete()
    .eq("id", submissionId);

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    userId: staff.id,
    section: "verifications",
    action: "deleted customer verification",
    entityType: "verification",
    entityId: submissionId,
    entityName: `Applicant: ${applicantName}`,
  });

  revalidatePath("/admin/verifications");
  revalidatePath("/admin");
  revalidatePath("/buy-small");

  return { success: true };
}

/**
 * Public action: Check verification status by email or application code.
 */
export async function lookupVerificationStatusAction(
  query: string
): Promise<{
  found: boolean;
  status?: string;
  fullName?: string;
  email?: string;
  submittedAt?: string;
  rejectionReason?: string | null;
  message?: string;
}> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return { found: false, message: "Please provide a query." };

  try {
    const adminClient = createAdminClient();

    // Try finding by profile email
    const { data: profile } = await adminClient
      .from("profiles")
      .select("id, full_name, email, verification_status")
      .or(`email.ilike.%${cleanQuery}%,phone.ilike.%${cleanQuery}%`)
      .limit(1)
      .maybeSingle();

    if (profile) {
      const { data: latestSub } = await adminClient
        .from("verification_submissions")
        .select("id, submitted_at, decision, rejection_reason")
        .eq("user_id", profile.id)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return {
        found: true,
        status: profile.verification_status,
        fullName: profile.full_name ?? undefined,
        email: profile.email,
        submittedAt: latestSub?.submitted_at,
        rejectionReason: latestSub?.rejection_reason,
        message:
          profile.verification_status === "verified"
            ? "Your identity verification is approved and active for Buy Small financing!"
            : profile.verification_status === "pending"
            ? "Your verification is currently pending review by Petfeb verification desk."
            : profile.verification_status === "rejected"
            ? `Your verification was rejected: ${latestSub?.rejection_reason || "Invalid documentation"}`
            : "No verification submission found for this account.",
      };
    }

    const formatSubmission = (sub: {
      id: string;
      submitted_at: string;
      decision: string;
      rejection_reason?: string | null;
      profiles?: { full_name?: string; email?: string; verification_status?: string } | { full_name?: string; email?: string; verification_status?: string }[] | null;
    }) => {
      const subProfile = Array.isArray(sub.profiles) ? sub.profiles[0] : sub.profiles;
      return {
        found: true,
        status: sub.decision === "approved" ? "verified" : sub.decision,
        fullName: subProfile?.full_name,
        email: subProfile?.email,
        submittedAt: sub.submitted_at,
        rejectionReason: sub.rejection_reason,
        message:
          sub.decision === "approved"
            ? "Your identity verification is approved!"
            : sub.decision === "pending"
            ? "Your verification is currently under review."
            : `Your verification was rejected: ${sub.rejection_reason || "Invalid documentation"}`,
      };
    };

    // Try finding by application reference (PET-BSV-2026-XXXXXX -> id prefix)
    const refMatch = /^pet-bsv-2026-([0-9a-f]{6,8})$/i.exec(cleanQuery);
    if (refMatch) {
      const prefix = refMatch[1].toLowerCase();
      const { data: refSub } = await adminClient
        .from("verification_submissions")
        .select("id, submitted_at, decision, rejection_reason, profiles(full_name, email, verification_status)")
        .gte("id", `${prefix.padEnd(8, "0")}-0000-0000-0000-000000000000`)
        .lt("id", `${prefix.padEnd(8, "f")}-ffff-ffff-ffff-ffffffffffff`)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (refSub) {
        return formatSubmission(refSub);
      }
    }

    // Try finding by submission ID or document path
    const { data: sub } = await adminClient
      .from("verification_submissions")
      .select("id, submitted_at, decision, rejection_reason, profiles(full_name, email, verification_status)")
      .or(`id.eq.${cleanQuery},id_document_path.ilike.%${cleanQuery}%`)
      .limit(1)
      .maybeSingle();

    if (sub) {
      return formatSubmission(sub);
    }

    return {
      found: false,
      message: "No application or verification record found for the provided information.",
    };
  } catch (err: unknown) {
    console.error("Lookup error:", err);
    return {
      found: false,
      message: "Unable to check verification status right now. Please try again later.",
    };
  }
}
