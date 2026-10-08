"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader, StatusBadge, DeleteButton, EmptyState, Pagination, SortSelect } from "./ui";
import { deleteTestimonial } from "@/app/actions/testimonials";
import { Plus, Search, Filter } from "lucide-react";

type Testimonial = {
  id: string;
  author_name: string;
  author_role: string | null;
  message: string;
  photo_url: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
};

type SortOption = "updated_desc" | "updated_asc" | "name_asc" | "name_desc";

export function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "hidden">("all");
  const [sortBy, setSortBy] = useState<SortOption>("updated_desc");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = testimonials.filter((t) => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = t.author_name.toLowerCase().includes(q);
      const matchRole = (t.author_role ?? "").toLowerCase().includes(q);
      const matchMsg = t.message.toLowerCase().includes(q);
      if (!matchName && !matchRole && !matchMsg) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name_asc") return a.author_name.localeCompare(b.author_name);
    if (sortBy === "name_desc") return b.author_name.localeCompare(a.author_name);
    const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
    const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
    if (sortBy === "updated_asc") return dateA - dateB;
    return dateB - dateA;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description={`${testimonials.length} client review${testimonials.length !== 1 ? "s" : ""} on record`}
        breadcrumbs={[{ label: "Testimonials" }]}
        action={
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center justify-center gap-2 bg-[#7BB042] text-black font-semibold rounded-xl px-4 py-2.5 min-h-[44px] text-xs sm:text-sm hover:bg-[#6A9E36] transition shadow-xs"
          >
            <Plus size={16} /> New testimonial
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-4 mb-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767676]" />
            <input
              type="text"
              placeholder="Search by client name, role, or message…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-xs sm:text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
              <Filter size={14} className="text-[#767676]" />
              <div className="flex gap-1.5">
                {(["all", "published", "hidden"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setFilter(f);
                      setPage(1);
                    }}
                    className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-semibold transition cursor-pointer flex items-center ${
                      filter === f
                        ? "bg-[#E8F3DA] text-[#2F5212] border border-[#C3E49E]"
                        : "bg-[#F8F8F8] text-[#5C5C5C] border border-[#D9D9D9] hover:bg-[#EBEBEB]"
                    }`}
                  >
                    {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <SortSelect<SortOption>
              value={sortBy}
              onChange={(v) => {
                setSortBy(v);
                setPage(1);
              }}
              options={[
                { label: "Newest first", value: "updated_desc" },
                { label: "Oldest first", value: "updated_asc" },
                { label: "Name (A to Z)", value: "name_asc" },
                { label: "Name (Z to A)", value: "name_desc" },
              ]}
            />
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          message={
            search || filter !== "all"
              ? "No testimonials match the current filter."
              : "No testimonials recorded yet."
          }
          action={
            !search && filter === "all" ? (
              <Link href="/admin/testimonials/new" className="text-sm font-medium text-[#3F6B1A] hover:underline">
                Add the first testimonial →
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginated.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#7BB042] transition shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {t.photo_url ? (
                        <img
                          src={t.photo_url}
                          alt={t.author_name}
                          className="w-10 h-10 rounded-full object-cover bg-[#F8F9FA] flex-shrink-0 border border-[#E5E7EB]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#E8F3DA] flex items-center justify-center text-[#2F5212] font-bold text-sm flex-shrink-0">
                          {t.author_name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-black truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {t.author_name}
                        </p>
                        {t.author_role && <p className="text-xs text-[#6B7280] truncate">{t.author_role}</p>}
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>
                  <p className="text-xs sm:text-sm text-[#333] mb-4 line-clamp-3 italic leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                  <Link
                    href={`/admin/testimonials/${t.id}`}
                    className="text-xs font-bold text-[#3F6B1A] hover:underline"
                  >
                    Edit testimonial
                  </Link>
                  <DeleteButton
                    itemName={`Testimonial from ${t.author_name}`}
                    onDelete={async () => {
                      await deleteTestimonial(t.id);
                      router.refresh();
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sorted.length}
              pageSize={pageSize}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
