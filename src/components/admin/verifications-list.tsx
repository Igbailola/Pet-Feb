"use client";

import { useState, useTransition } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  UserCheck,
  ExternalLink,
  Trash2,
  Loader2,
} from "lucide-react";
import { reviewVerificationAction, deleteVerificationAction } from "@/app/actions/verifications";
import { useToast } from "./toast";

export type VerificationSubmissionItem = {
  id: string;
  user_id: string;
  id_document_path: string;
  submitted_at: string;
  decision: "pending" | "approved" | "rejected";
  reviewer_id?: string | null;
  decided_at?: string | null;
  rejection_reason?: string | null;
  profiles?: {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    verification_status: string;
    created_at?: string;
  } | null;
};

interface VerificationsListProps {
  initialSubmissions: VerificationSubmissionItem[];
}

export function VerificationsList({ initialSubmissions }: VerificationsListProps) {
  const { showToast } = useToast();
  const [submissions, setSubmissions] = useState<VerificationSubmissionItem[]>(initialSubmissions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [rejectingItem, setRejectingItem] = useState<VerificationSubmissionItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [deletingItem, setDeletingItem] = useState<VerificationSubmissionItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleApprove = (item: VerificationSubmissionItem) => {
    startTransition(async () => {
      const res = await reviewVerificationAction({
        submissionId: item.id,
        decision: "approved",
      });

      if (res.error) {
        showToast(res.error, "error");
        return;
      }

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === item.id
            ? {
                ...s,
                decision: "approved",
                decided_at: new Date().toISOString(),
                profiles: s.profiles
                  ? { ...s.profiles, verification_status: "verified" }
                  : null,
              }
            : s
        )
      );
      showToast(
        `Verified applicant ${item.profiles?.full_name || item.profiles?.email || "successfully"}!`,
        "success"
      );
    });
  };

  const handleReject = () => {
    if (!rejectingItem) return;
    if (!rejectionReason.trim()) {
      showToast("Please provide a rejection reason.", "error");
      return;
    }

    startTransition(async () => {
      const res = await reviewVerificationAction({
        submissionId: rejectingItem.id,
        decision: "rejected",
        rejectionReason: rejectionReason.trim(),
      });

      if (res.error) {
        showToast(res.error, "error");
        return;
      }

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === rejectingItem.id
            ? {
                ...s,
                decision: "rejected",
                decided_at: new Date().toISOString(),
                rejection_reason: rejectionReason.trim(),
                profiles: s.profiles
                  ? { ...s.profiles, verification_status: "rejected" }
                  : null,
              }
            : s
        )
      );

      showToast("Verification submission rejected.", "info");
      setRejectingItem(null);
      setRejectionReason("");
    });
  };

  const handleDelete = () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    startTransition(async () => {
      try {
        const res = await deleteVerificationAction(deletingItem.id);
        if (res.error) {
          showToast(res.error, "error");
        } else {
          setSubmissions((prev) => prev.filter((s) => s.id !== deletingItem.id));
          const applicantName =
            deletingItem.profiles?.full_name || deletingItem.profiles?.email || "applicant";
          showToast(`Deleted verification record for ${applicantName}`, "success");
          setDeletingItem(null);
        }
      } catch (err: unknown) {
        showToast(err instanceof Error ? err.message : "Failed to delete verification", "error");
      } finally {
        setIsDeleting(false);
      }
    });
  };

  // Filtered submissions
  const filtered = submissions.filter((item) => {
    if (statusFilter !== "all" && item.decision !== statusFilter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const name = item.profiles?.full_name?.toLowerCase() || "";
      const email = item.profiles?.email?.toLowerCase() || "";
      const phone = item.profiles?.phone?.toLowerCase() || "";
      const doc = item.id_document_path.toLowerCase();
      if (!name.includes(q) && !email.includes(q) && !phone.includes(q) && !doc.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const totalCount = submissions.length;
  const pendingCount = submissions.filter((s) => s.decision === "pending").length;
  const approvedCount = submissions.filter((s) => s.decision === "approved").length;
  const rejectedCount = submissions.filter((s) => s.decision === "rejected").length;

  return (
    <div className="space-y-6">
      {/* ── Stat Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#5C5C5C] uppercase tracking-wider">
            <span>Total Submissions</span>
            <FileText size={18} className="text-[#3F6B1A]" />
          </div>
          <div className="text-2xl font-bold text-[#111] mt-2">{totalCount}</div>
          <p className="text-[11px] text-[#767676] mt-1">Buy Small applicants</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <span>Pending Review</span>
            <Clock size={18} className="text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-2">{pendingCount}</div>
          <p className="text-[11px] text-amber-700 mt-1">Requires officer decision</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#3F6B1A] uppercase tracking-wider">
            <span>Verified Customers</span>
            <ShieldCheck size={18} className="text-[#7BB042]" />
          </div>
          <div className="text-2xl font-bold text-emerald-950 mt-2">{approvedCount}</div>
          <p className="text-[11px] text-[#3F6B1A] mt-1">Eligible for financing</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-800 uppercase tracking-wider">
            <span>Rejected</span>
            <XCircle size={18} className="text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-950 mt-2">{rejectedCount}</div>
          <p className="text-[11px] text-rose-700 mt-1">Declined or invalid docs</p>
        </div>
      </div>

      {/* ── Filters & Search ──────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-semibold uppercase tracking-wider transition shrink-0 cursor-pointer flex items-center ${
                statusFilter === tab
                  ? "bg-[#3F6B1A] text-white shadow-xs"
                  : "bg-[#F3F4F6] text-[#5C5C5C] hover:bg-[#E5E7EB]"
              }`}
            >
              {tab === "all" ? "All Submissions" : tab}
              <span className="ml-1.5 opacity-70">
                (
                {tab === "all"
                  ? totalCount
                  : tab === "pending"
                  ? pendingCount
                  : tab === "approved"
                  ? approvedCount
                  : rejectedCount}
                )
              </span>
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search applicant name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] text-xs rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
          />
        </div>
      </div>

      {/* ── Submissions Table / Cards ─────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center shadow-xs">
          <UserCheck size={36} className="mx-auto text-[#9CA3AF] mb-3" />
          <h4 className="text-sm font-bold text-[#111]">No verification records found</h4>
          <p className="text-xs text-[#5C5C5C] mt-1 max-w-sm mx-auto">
            {search
              ? "No applicant matched your search query. Try clearing the search or changing filters."
              : "No customer verification submissions logged in this view yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const profile = item.profiles;
            const docInfo = item.id_document_path.split("/").pop() || item.id_document_path;
            const submittedDate = new Date(item.submitted_at).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-xs hover:border-[#D1D5DB] transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Customer Info */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-sm font-bold text-[#111] truncate">
                        {profile?.full_name || "Applicant (Unassigned Name)"}
                      </h4>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                          item.decision === "approved"
                            ? "bg-emerald-100 text-[#3F6B1A] border-emerald-300"
                            : item.decision === "rejected"
                            ? "bg-rose-100 text-rose-800 border-rose-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        {item.decision === "approved" ? (
                          <CheckCircle2 size={12} />
                        ) : item.decision === "rejected" ? (
                          <XCircle size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        <span>
                          {item.decision === "approved"
                            ? "Verified"
                            : item.decision === "rejected"
                            ? "Rejected"
                            : "Pending Review"}
                        </span>
                      </span>

                      {/* Profile verification status indicator if different */}
                      {profile?.verification_status && (
                        <span className="text-[10px] font-semibold text-[#767676] bg-[#F3F4F6] px-2 py-0.5 rounded">
                          Profile Status: {profile.verification_status}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5C5C5C]">
                      <div className="flex items-center gap-1.5">
                        <Mail size={13} className="text-[#9CA3AF]" />
                        <span>{profile?.email || "No email on record"}</span>
                      </div>
                      {profile?.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={13} className="text-[#9CA3AF]" />
                          <a
                            href={`tel:${profile.phone}`}
                            className="hover:text-[#3F6B1A] hover:underline"
                          >
                            {profile.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#9CA3AF]" />
                        <span>Submitted {submittedDate}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[11px] font-semibold text-[#767676]">Document Reference:</span>
                      <code className="px-2 py-0.5 rounded bg-[#F8F9FA] text-[#333] border border-[#E5E7EB] text-[11px]">
                        {docInfo}
                      </code>
                    </div>

                    {item.rejection_reason && (
                      <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                        <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-600" />
                        <div>
                          <strong className="font-semibold">Rejection Reason:</strong>{" "}
                          <span>{item.rejection_reason}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 lg:border-l lg:border-[#F2F2F2] lg:pl-4 shrink-0">
                    {item.decision !== "approved" && (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleApprove(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-xs cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 size={14} />
                        <span>Approve & Verify</span>
                      </button>
                    )}

                    {item.decision !== "rejected" && (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          setRejectingItem(item);
                          setRejectionReason("");
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 transition cursor-pointer disabled:opacity-50"
                      >
                        <XCircle size={14} />
                        <span>Reject</span>
                      </button>
                    )}

                    {profile?.phone && (
                      <a
                        href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-[#F3F4F6] text-[#333] hover:bg-[#E5E7EB] transition"
                        title="Chat on WhatsApp"
                      >
                        <ExternalLink size={13} />
                        <span>Contact</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Reject Modal ──────────────────────────────────────── */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-base text-[#111]">
                  Reject Verification Submission
                </h3>
                <p className="text-xs text-[#5C5C5C] mt-0.5">
                  Applicant:{" "}
                  <strong className="text-[#333]">
                    {rejectingItem.profiles?.full_name || rejectingItem.profiles?.email}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="w-11 h-11 flex items-center justify-center text-[#9CA3AF] hover:text-[#333] hover:bg-[#F4F4F5] rounded-xl text-lg font-bold transition cursor-pointer"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#333] mb-1.5">
                Rejection Reason (Required)
              </label>
              <textarea
                rows={3}
                required
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="State clearly why verification failed (e.g. Identity card is blurred or invalid NIN number provided)..."
                className="w-full text-xs p-3 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-rose-400"
              />

              {/* Presets */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  "Identity document photo was unreadable or blurry.",
                  "Name on document does not match account applicant name.",
                  "Invalid or expired government identity number.",
                  "Additional supporting utility verification required.",
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRejectionReason(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#5C5C5C] transition cursor-pointer"
                  >
                    + {preset.slice(0, 32)}...
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F2F2F2]">
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold text-[#5C5C5C] hover:bg-[#F3F4F6] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending || !rejectionReason.trim()}
                onClick={handleReject}
                className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isPending ? "Rejecting..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
