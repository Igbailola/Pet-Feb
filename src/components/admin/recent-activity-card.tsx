"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ActivityLogEntry } from "@/lib/activity-log";
import type { AdminSection } from "@/lib/rbac";
import { SECTION_LABELS } from "@/lib/rbac";
import {
  Clock,
  User,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  Trash2,
} from "lucide-react";
import { deleteActivityLog } from "@/app/actions/activity";
import { useToast } from "./toast";
import { Select } from "@/components/ui/select";

interface RecentActivityCardProps {
  logs: ActivityLogEntry[];
  userSections: AdminSection[];
}

export function RecentActivityCard({ logs, userSections }: RecentActivityCardProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [itemLogs, setItemLogs] = useState<ActivityLogEntry[]>(logs);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setItemLogs(logs);
  }, [logs]);

  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete activity log entry for "${name}"?`)) {
      setDeletingId(id);
      const res = await deleteActivityLog(id);
      setDeletingId(null);
      if (res.success) {
        setItemLogs((prev) => prev.filter((l) => l.id !== id));
        showToast("Activity log entry deleted", "success");
        router.refresh();
      } else {
        showToast(res.error || "Failed to delete log entry", "error");
      }
    }
  };

  const filtered = itemLogs.filter((log) => {
    if (sectionFilter !== "all" && log.section !== sectionFilter) return false;
    if (actionFilter !== "all" && !log.action.toLowerCase().includes(actionFilter.toLowerCase())) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = log.entity_name.toLowerCase().includes(q);
      const matchAuthor = (log.profiles?.full_name ?? log.profiles?.email ?? "").toLowerCase().includes(q);
      const matchAction = log.action.toLowerCase().includes(q);
      if (!matchName && !matchAuthor && !matchAction) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatRelativeTime = (ts: string) => {
    try {
      const now = Date.now();
      const past = new Date(ts).getTime();
      const diffMs = now - past;
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return "Just now";
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return ts;
    }
  };

  const getActionColor = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("delete")) return "bg-[#FCE8E6] text-[#B3261E] border-[#F8B4B4]";
    if (act.includes("publish") || act.includes("create")) return "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]";
    if (act.includes("stock")) return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
    return "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
      {/* Table Header matching the design */}
      <div className="p-5 sm:p-6 border-b border-[#F3F4F6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2
              className="text-base sm:text-lg font-bold text-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Recent activity
            </h2>
            <span className="text-xs font-bold bg-[#F3F4F6] text-[#4B5563] px-2.5 py-0.5 rounded-full">
              {filtered.length} entries
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time log of staff operations across catalogue, content and verifications
          </p>
        </div>

        {/* Filter Toolbar with increased padding */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Section filter */}
          <div className="flex items-center gap-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#333]">
            <Filter size={14} className="text-[#6B7280]" />
            <Select
              value={sectionFilter}
              onChange={(e) => {
                setSectionFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent pl-0 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All sections</option>
              {userSections.map((s) => (
                <option key={s} value={s}>
                  {SECTION_LABELS[s]}
                </option>
              ))}
            </Select>
          </div>

          {/* Action filter */}
          <Select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#333] focus:outline-none cursor-pointer"
          >
            <option value="all">All actions</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="delete">Deleted</option>
            <option value="publish">Published</option>
            <option value="unpublish">Unpublished</option>
            <option value="stock">Stock status</option>
          </Select>

          <Link
            href="/admin/activity"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6B1A] hover:bg-[#E8F3DA] px-4 py-2.5 rounded-xl border border-[#C3E49E] transition"
          >
            Full Log <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Table Content */}
      {filtered.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <p className="text-xs text-[#6B7280]">
            No recent activity recorded matching the selected filter.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA] text-[#6B7280] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3.5">When</th>
                  <th className="px-6 py-3.5">Staff member</th>
                  <th className="px-6 py-3.5">Section</th>
                  <th className="px-6 py-3.5">Action</th>
                  <th className="px-6 py-3.5">Item</th>
                  <th className="px-6 py-3.5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginated.map((log) => {
                  const author = log.profiles?.full_name ?? log.profiles?.email ?? "Staff member";
                  const initial = author.charAt(0).toUpperCase();

                  return (
                    <tr key={log.id} className="hover:bg-[#F9FCF5] transition">
                      <td className="px-6 py-4 whitespace-nowrap text-[#6B7280]">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-[#9CA3AF]" />
                          <span>{formatRelativeTime(log.created_at)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#E8F3DA] text-[#2F5212] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                            {initial}
                          </div>
                          <span className="font-semibold text-black truncate max-w-[140px]">
                            {author}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded-md">
                          {log.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getActionColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-black max-w-xs truncate">
                        &ldquo;{log.entity_name}&rdquo;
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(log.id, log.entity_name)}
                          disabled={deletingId === log.id}
                          title="Delete activity log entry"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B3261E] hover:bg-[#FCE8E6] px-2.5 py-1 rounded-lg transition disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>{deletingId === log.id ? "…" : "Delete"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Stacked Cards View */}
          <div className="lg:hidden divide-y divide-[#F3F4F6]">
            {paginated.map((log) => {
              const author = log.profiles?.full_name ?? log.profiles?.email ?? "Staff member";
              return (
                <div key={log.id} className="p-4 space-y-2 hover:bg-[#F9FCF5] transition">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-black truncate flex-1">
                      &ldquo;{log.entity_name}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getActionColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(log.id, log.entity_name)}
                        disabled={deletingId === log.id}
                        title="Delete log"
                        className="text-[#B3261E] hover:bg-[#FCE8E6] p-1 rounded-md transition cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <User size={12} />
                      <span className="font-medium text-black">{author}</span>
                      <span className="text-[#D1D5DB]">·</span>
                      <span className="uppercase text-[10px] font-bold">{log.section}</span>
                    </div>
                    <span>{formatRelativeTime(log.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-[#F3F4F6] bg-[#FAFAFA] flex items-center justify-between text-xs">
              <span className="text-[#6B7280]">
                Showing {Math.min(filtered.length, (currentPage - 1) * pageSize + 1)} to{" "}
                {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} entries
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white font-semibold text-[#333] hover:bg-[#F4F4F5] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={13} /> Prev
                </button>
                <span className="font-bold text-black">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white font-semibold text-[#333] hover:bg-[#F4F4F5] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
