"use client";

import { useState } from "react";
import { PageHeader, EmptyState, Pagination } from "./ui";
import type { ActivityLogEntry } from "@/lib/activity-log";
import type { AdminSection } from "@/lib/rbac";
import { SECTION_LABELS } from "@/lib/rbac";
import { Filter, Search, Clock, User } from "lucide-react";

export function ActivityList({
  logs,
  userSections,
}: {
  logs: ActivityLogEntry[];
  userSections: AdminSection[];
}) {
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filtered = logs.filter((log) => {
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
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#D9D9D9] text-xs sm:text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Section Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
              <Filter size={14} className="text-[#767676]" />
              <select
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
              </select>
            </div>

            {/* Action Filter */}
            <select
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
            </select>
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
        <div className="bg-white rounded-xl border border-[#D9D9D9] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#D9D9D9] bg-[#F8F8F8] text-[#5C5C5C] text-xs font-semibold">
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Staff member</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Item modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {paginated.map((log) => {
                  const author = log.profiles?.full_name ?? log.profiles?.email ?? "Staff member";
                  return (
                    <tr key={log.id} className="hover:bg-[#F9FCF5] transition">
                      <td className="px-4 py-3 text-[#767676] whitespace-nowrap text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-[#A0A0A0]" />
                          {formatTimestamp(log.created_at)}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-black whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <User size={13} className="text-[#767676]" />
                          <span className="truncate max-w-[150px]">{author}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[11px] font-semibold bg-[#F2F2F2] text-[#333] px-2 py-0.5 rounded uppercase tracking-wider">
                          {log.section}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${actionColor(log.action)}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#333] font-medium max-w-xs truncate">
                        &ldquo;{log.entity_name}&rdquo;
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
