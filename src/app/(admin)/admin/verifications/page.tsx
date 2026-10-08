import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { VerificationsList, VerificationSubmissionItem } from "@/components/admin/verifications-list";

export const dynamic = "force-dynamic";

export default async function VerificationsPage() {
  await requireSection("verifications");
  const supabase = await createClient();

  const { data } = await supabase
    .from("verification_submissions")
    .select(`
      id,
      user_id,
      id_document_path,
      submitted_at,
      decision,
      reviewer_id,
      decided_at,
      rejection_reason,
      profiles:user_id (
        id,
        full_name,
        email,
        phone,
        verification_status,
        created_at
      )
    `)
    .order("submitted_at", { ascending: false });

  // Format profiles relationship cleanly if returned as array or single object
  const formattedSubmissions: VerificationSubmissionItem[] = ((data ?? []) as Array<Record<string, unknown>>).map((sub) => {
    const rawProfile = sub.profiles;
    const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile;

    return {
      id: String(sub.id),
      user_id: String(sub.user_id),
      id_document_path: String(sub.id_document_path || ""),
      submitted_at: String(sub.submitted_at || new Date().toISOString()),
      decision: (sub.decision as "pending" | "approved" | "rejected") || "pending",
      reviewer_id: sub.reviewer_id ? String(sub.reviewer_id) : null,
      decided_at: sub.decided_at ? String(sub.decided_at) : null,
      rejection_reason: sub.rejection_reason ? String(sub.rejection_reason) : null,
      profiles: profile
        ? {
            id: String(profile.id),
            full_name: profile.full_name ? String(profile.full_name) : null,
            email: String(profile.email || ""),
            phone: profile.phone ? String(profile.phone) : null,
            verification_status: String(profile.verification_status || "pending"),
            created_at: profile.created_at ? String(profile.created_at) : undefined,
          }
        : null,
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Verifications"
        description="Review customer identity documentation, approve Buy Small financing eligibility, and manage applicant status."
        breadcrumbs={[{ label: "Customer verifications" }]}
      />
      <VerificationsList initialSubmissions={formattedSubmissions} />
    </div>
  );
}
