import { createClient } from "@supabase/supabase-js";

export const ADMIN_SECTIONS = [
  "cms",
  "blog",
  "products",
  "verifications",
  "testimonials",
  "other_updates",
] as const;

export type AdminSection = (typeof ADMIN_SECTIONS)[number];

export const SECTION_LABELS: Record<AdminSection, string> = {
  cms: "CMS and site content",
  blog: "Blog",
  products: "Products",
  verifications: "Client verifications",
  testimonials: "Testimonials",
  other_updates: "Other updates",
};

export class ForbiddenError extends Error {
  constructor(section: AdminSection) {
    super(`Forbidden: missing section "${section}"`);
    this.name = "ForbiddenError";
  }
}

/**
 * Server-side: sections held by the user behind this access token.
 * Uses the caller's own JWT so database RLS applies; never the service-role key.
 * Returns [] for anonymous or non-staff users.
 */
export async function getMySections(accessToken: string | null | undefined): Promise<AdminSection[]> {
  if (!accessToken) return [];
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );
  const { data, error } = await supabase.rpc("my_sections");
  if (error || !data) return [];
  return data as AdminSection[];
}

/** Use at the top of every admin route handler / server action. Throws ForbiddenError. */
export async function requireSection(
  accessToken: string | null | undefined,
  section: AdminSection,
): Promise<void> {
  const sections = await getMySections(accessToken);
  if (!sections.includes(section)) throw new ForbiddenError(section);
}
