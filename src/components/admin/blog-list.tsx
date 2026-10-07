"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader, StatusBadge, DeleteButton, EmptyState, Pagination, SortSelect } from "./ui";
import { deleteBlogPost } from "@/app/actions/blog";
import { Plus, Search, Filter } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
};

type SortOption = "updated_desc" | "updated_asc" | "title_asc" | "title_desc";

export function BlogList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("updated_desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = posts.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCat = (p.category ?? "").toLowerCase().includes(q);
      const matchSlug = p.slug.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchSlug) return false;
    }

    if (statusFilter === "published" && p.status !== "published") return false;
    if (statusFilter === "draft" && p.status !== "draft") return false;

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "title_asc") return a.title.localeCompare(b.title);
    if (sortBy === "title_desc") return b.title.localeCompare(a.title);
    const dateA = new Date(a.updated_at || a.created_at).getTime();
    const dateB = new Date(b.updated_at || b.created_at).getTime();
    if (sortBy === "updated_asc") return dateA - dateB;
    return dateB - dateA;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <PageHeader
        title="Blog Articles"
        description={`${posts.length} post${posts.length !== 1 ? "s" : ""} published & in draft`}
        breadcrumbs={[{ label: "Blog" }]}
        action={
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-[#7BB042] text-black font-semibold rounded-lg px-4 py-2.5 text-xs sm:text-sm hover:bg-[#6A9E36] transition shadow-sm"
          >
            <Plus size={16} /> New post
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-4 mb-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" />
            <input
              type="text"
              placeholder="Search by title, category, or slug…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#D9D9D9] text-xs sm:text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
              <Filter size={14} className="text-[#767676]" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-[#F8F8F8] border border-[#D9D9D9] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
              >
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
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
                { label: "Title (A to Z)", value: "title_asc" },
                { label: "Title (Z to A)", value: "title_desc" },
              ]}
            />
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          message={
            search || statusFilter !== "all"
              ? "No blog posts match your current search criteria."
              : "No blog posts published yet."
          }
          action={
            !search && statusFilter === "all" ? (
              <Link href="/admin/blog/new" className="text-sm font-medium text-[#3F6B1A] hover:underline">
                Write your first post →
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="bg-white rounded-xl border border-[#D9D9D9] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#D9D9D9] bg-[#F8F8F8]">
                  <th className="text-left px-4 py-3 font-semibold text-[#5C5C5C]">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#5C5C5C]">Category</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#5C5C5C]">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#5C5C5C]">Published date</th>
                  <th className="text-right px-4 py-3 font-semibold text-[#5C5C5C]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F9FCF5] transition">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/blog/${p.id}`}
                        className="font-medium text-black hover:text-[#3F6B1A] transition block truncate max-w-xs sm:max-w-md"
                      >
                        {p.title}
                      </Link>
                      <span className="text-[11px] text-[#767676] block truncate">{p.slug}</span>
                    </td>
                    <td className="px-4 py-3 text-[#5C5C5C] whitespace-nowrap">{p.category ?? "General"}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-[#5C5C5C] whitespace-nowrap text-xs">
                      {p.published_at ? new Date(p.published_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/blog/${p.id}`} className="text-xs font-semibold text-[#3F6B1A] hover:underline">
                          Edit
                        </Link>
                        <DeleteButton
                          itemName={p.title}
                          onDelete={async () => {
                            await deleteBlogPost(p.id);
                            router.refresh();
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sorted.length}
            pageSize={pageSize}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
}
