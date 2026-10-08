import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { requireSection } from "@/lib/require-section";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatNaira } from "@/lib/public-types";

export const dynamic = "force-dynamic";

type DetailRow = {
  id: string;
  user_id: string;
  id_document_path: string;
  submitted_at: string;
  decision: string;
  reviewer_id?: string | null;
  decided_at?: string | null;
  rejection_reason?: string | null;
  id_type?: string | null;
  id_number?: string | null;
  employment_status?: string | null;
  monthly_income?: string | null;
  address?: string | null;
  state?: string | null;
  system_name?: string | null;
  down_payment?: number | null;
  monthly_repayment?: number | null;
  profiles?: {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    verification_status: string;
    created_at?: string | null;
  } | {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    verification_status: string;
    created_at?: string | null;
  }[];
  reviewer?: { full_name: string | null } | { full_name: string | null }[];
};

const FULL_SELECT = `
  id,
  user_id,
  id_document_path,
  submitted_at,
  decision,
  reviewer_id,
  decided_at,
  rejection_reason,
  id_type,
  id_number,
  employment_status,
  monthly_income,
  address,
  state,
  system_name,
  down_payment,
  monthly_repayment,
  profiles:user_id (
    id,
    full_name,
    email,
    phone,
    verification_status,
    created_at
  ),
  reviewer:reviewer_id (
    full_name
  )
`;

const SAFE_SELECT = `
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
  ),
  reviewer:reviewer_id (
    full_name
  )
`;

async function VerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("verifications");
  const { id } = await params;
  // Service-role client: this is an admin-only page (gated by requireSection),
  // and it guarantees the profiles/reviewer joins are never filtered by RLS.
  const supabase = createAdminClient();

  // Try the full select first; fall back to the base columns if the detail
  // columns have not been added to the database yet (pre-migration).
  const full = await supabase
    .from("verification_submissions")
    .select(FULL_SELECT)
    .eq("id", id)
    .maybeSingle();
  const data = full.data ?? (
    await supabase
      .from("verification_submissions")
      .select(SAFE_SELECT)
      .eq("id", id)
      .maybeSingle()
  ).data;

  if (!data) notFound();

  const row = data as DetailRow;
  const profile = Array.isArray(row.profiles) ? row.profiles[0] ?? null : (row.profiles ?? null);
  const reviewer = Array.isArray(row.reviewer) ? row.reviewer[0] ?? null : (row.reviewer ?? null);
  const refCode = `PET-BSV-2026-${row.id.slice(0, 6).toUpperCase()}`;
  const docInfo = row.id_document_path.split("/").pop() || row.id_document_path;

  const submittedDate = new Date(row.submitted_at).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const decidedDate = row.decided_at
    ? new Date(row.decided_at).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const statusBadge =
    row.decision === "approved"
      ? "bg-emerald-100 text-[#3F6B1A] border-emerald-300"
      : row.decision === "rejected"
      ? "bg-rose-100 text-rose-800 border-rose-300"
      : "bg-amber-100 text-amber-800 border-amber-300";

  const statusLabel =
    row.decision === "approved" ? "Verified" : row.decision === "rejected" ? "Rejected" : "Pending Review";

  const detailField = (label: string, value: ReactNode) => (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#F3F4F6] last:border-0">
      <span className="text-xs font-semibold text-[#767676] shrink-0">{label}</span>
      <span className="text-sm font-medium text-[#111] text-right">{value || <span className="text-[#9CA3AF]">—</span>}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <nav className="text-xs text-[#767676] mb-1">
            <Link href="/admin/verifications" className="hover:text-[#3F6B1A] transition">
              Customer Verifications
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#333] font-medium">{refCode}</span>
          </nav>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-[#111]">
            {profile?.full_name || "Applicant (Unassigned Name)"}
          </h1>
          <p className="text-xs text-[#767676] mt-0.5">Submitted {submittedDate}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${statusBadge}`}>
            {statusLabel}
          </span>
          {profile?.verification_status && (
            <span className="text-[10px] font-semibold text-[#767676] bg-[#F3F4F6] px-2.5 py-1 rounded-full">
              Profile Status: {profile.verification_status}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicant */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] mb-3">
            Applicant Details
          </h2>
          {detailField("Full Name", profile?.full_name)}
          {detailField("Email Address", profile?.email)}
          {detailField("Phone Number", profile?.phone)}
          {detailField("Profile Status", profile?.verification_status)}
          {detailField("Profile Created", profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-NG") : null)}
        </div>

        {/* Application */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] mb-3">
            Financing Application
          </h2>
          {detailField("Selected System", row.system_name)}
          {detailField("Initial Down Payment", row.down_payment != null ? formatNaira(row.down_payment) : null)}
          {detailField("Monthly Repayment", row.monthly_repayment != null ? `${formatNaira(row.monthly_repayment)} / mo` : null)}
          {detailField("Installation Address", row.address)}
          {detailField("State", row.state)}
          {detailField("Employment / Income Source", row.employment_status)}
          {detailField("Estimated Monthly Income", row.monthly_income)}
        </div>

        {/* KYC + Decision */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] mb-3">
            KYC Verification
          </h2>
          {detailField("ID Document Type", row.id_type)}
          {detailField("ID / NIN Number", row.id_number)}
          {detailField("Document Reference", <code className="text-[11px] px-2 py-0.5 rounded bg-[#F8F9FA] border border-[#E5E7EB] whitespace-normal break-all">{docInfo}</code>)}
        </div>
      </div>

      {/* Decision history */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] mb-3">
          Verification Decision
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
            <span className="text-[#767676] block">Application Reference</span>
            <span className="font-mono font-bold text-sm text-[#333] mt-1 block">{refCode}</span>
          </div>
          <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
            <span className="text-[#767676] block">Reviewed By</span>
            <span className="font-semibold text-[#333] mt-1 block">
              {row.decision === "pending" ? "Awaiting review" : reviewer?.full_name || "Unknown reviewer"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
            <span className="text-[#767676] block">Decided At</span>
            <span className="font-semibold text-[#333] mt-1 block">
              {decidedDate || "Pending"}
            </span>
          </div>
        </div>
        {row.decision === "rejected" && row.rejection_reason && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
            <strong className="font-semibold">Rejection Reason: </strong>
            <span>{row.rejection_reason}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerificationDetailPage;