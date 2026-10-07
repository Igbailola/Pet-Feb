import { requireStaff } from "@/lib/session";
import { forbidden } from "next/navigation";
import type { AdminSection } from "@/lib/rbac";

/**
 * Call at the top of any admin section page. Requires
 * the signed-in staff member to hold the given section.
 * Renders the forbidden.tsx boundary if not.
 */
export async function requireSection(section: AdminSection) {
  const user = await requireStaff();
  if (!user.sections.includes(section)) {
    forbidden();
  }
  return user;
}
