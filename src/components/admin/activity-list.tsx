"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, EmptyState, Pagination } from "./ui";
import type { ActivityLogEntry } from "@/lib/activity-log";
import type { AdminSection } from "@/lib/rbac";
import { SECTION_LABELS } from "@/lib/rbac";
import { Filter, Search, Clock, User, Trash2 } from "lucide-react";
import { deleteActivityLog, clearAllActivityLogs } from "@/app/actions/activity";
import { useToast } from "./toast";
import { Select } from "@/components/ui/select";

export function ActivityList({
  logs,
  userSections,
}: {
  logs: ActivityLogEntry[];
  userSections: AdminSection[];
}) {
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
  const pageSize = 15;

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

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to clear all activity logs? This action cannot be undone.")) {
      const res = await clearAllActivityLogs();
      if (res.success) {
        setItemLogs([]);
        showToast("All activity logs cleared", "success");
        router.refresh();
      } else {
        showToast(res.error || "Failed to clear logs", "error");
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

  const formatTimestamp = (ts: string) => {
    try {
      const date = new Date(ts);
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return ts;
    }
  };

  const actionColor = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("delete")) return "bg-[#FCE8E6] text-[#B3261E]";
    if (act.includes("publish") || act.includes("create")) return "bg-[#E8F3DA] text-[#2F5212]";
    if (act.includes("stock")) return "bg-[#FEF3C7] text-[#92400E]";
    return "bg-[#F2F2F2] text-[#5C5C5C]";
  };

  return (
    <div>
      <PageHeader
        title="Activity Log"
        description="Chronological record of modifications across administrative sections"
        breadcrumbs={[{ label: "Activity log" }]}
      />

      {/* Filters bar */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search by item name or author */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" />
            <input
              type="text"
              placeholder="Filter by item name, action, or author…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 min-h-[44px] rounded-lg border border-[#D9D9D9] text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Section Filter */}
            <Select
              icon={<Filter size={14} />}
              value={sectionFilter}
              onChange={(e) => {
                setSectionFilter(e.target.value);
                setPage(1);
              }}
              className="bg-[#F8F8F8] border border-[#D9D9D9] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
            >
              <option value="all">All sections</option>
              {userSections.map((s) => (
                <option key={s} value={s}>
                  {SECTION_LABELS[s]}
                </option>
              ))}
            </Select>

            {/* Action Filter */}
            <Select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="bg-[#F8F8F8] border border-[#D9D9D9] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
            >
              <option value="all">All actions</option>
              <option value="create">Created</option>
              <option value="update">Updated</option>
              <option value="delete">Deleted</option>
              <option value="publish">Published</option>
              <option value="unpublish">Unpublished</option>
              <option value="stock">Stock status</option>
            </Select>

            {itemLogs.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#B3261E] hover:bg-[#FCE8E6] transition cursor-pointer"
              >
                <Trash2 size={13} /> Clear all logs
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Log Entries Table */}
      {filtered.length === 0 ? (
        <EmptyState
          message={
            search || sectionFilter !== "all" || actionFilter !== "all"
              ? "No activity logs match the selected filters."
              : "No activity records found yet."
          }
        />
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA] text-[#6B7280] font-bold uppercase tracking-wider">
                  <th className="px-5 py-3.5">Timestamp</th>
                  <th className="px-5 py-3.5">Staff member</th>
                  <th className="px-5 py-3.5">Section</th>
                  <th className="px-5 py-3.5">Action</th>
                  <th className="px-5 py-3.5">Item modified</th>
                  <th className="px-5 py-3.5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginated.map((log) => {
                  const author = log.profiles?.full_name ?? log.profiles?.email ?? "Staff member";
                  const initial = author.charAt(0).toUpperCase();

                  return (
                    <tr key={log.id} className="hover:bg-[#F9FCF5] transition">
                      <td className="px-5 py-4 text-[#6B7280] whitespace-nowrap text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-[#9CA3AF]" />
                          {formatTimestamp(log.created_at)}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold text-black whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#E8F3DA] text-[#2F5212] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                            {initial}
                          </div>
                          <span className="truncate max-w-[150px]">{author}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-[10px] font-bold bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {log.section}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${actionColor(log.action)}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-black font-semibold max-w-sm truncate">
                        &ldquo;{log.entity_name}&rdquo;
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
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

          {/* Mobile Stacked Cards View */}
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
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex-shrink-0 ${actionColor(
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
                      <span className="font-semibold text-black">{author}</span>
                      <span className="text-[#D1D5DB]">·</span>
                      <span className="uppercase text-[10px] font-bold">{log.section}</span>
                    </div>
                    <span>{formatTimestamp(log.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
}
