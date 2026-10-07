import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { AdminSection } from "@/lib/rbac";

export type SessionUser = {
  id: string;
  email: string;
  fullName: string | null;
  isStaff: boolean;
  sections: AdminSection[];
};

/**
 * Server-side: get the signed-in staff user and their admin sections.
 * Returns null if not authenticated.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_staff")
    .eq("id", user.id)
    .single();

  if (!profile?.is_staff) return null;

  const { data: sectionRows } = await supabase.rpc("my_sections");
  const sections = (sectionRows as AdminSection[]) ?? [];

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile.full_name,
    isStaff: true,
    sections,
  };
}

/**
 * Require the user to be an authenticated staff member. Redirects to login if not.
 */
export async function requireStaff(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/staff/login");
  return user;
}
