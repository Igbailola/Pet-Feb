"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PageHeader, StatusBadge, DeleteButton, EmptyState, Pagination, SortSelect } from "./ui";
import { deleteProduct, toggleProductStock } from "@/app/actions/products";
import { useToast } from "./toast";
import { Plus, Search, Filter, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  status: string;
  in_stock?: boolean;
  created_at?: string;
  updated_at?: string;
  product_images?: { id: string; url: string; is_main: boolean }[];
};

type SortOption = "updated_desc" | "updated_asc" | "name_asc" | "name_desc";

export function ProductsList({
  products,
  accessories: _accessories,
}: {
  products: Product[];
  accessories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("updated_desc");
  const [page, setPage] = useState(1);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const pageSize = 10;

  // Filter products
  const filtered = products.filter((p) => {
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSlug = p.slug.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchSlug) return false;
    }

    // Status filter
    if (statusFilter === "published" && p.status !== "published") return false;
    if (statusFilter === "draft" && p.status !== "draft") return false;
    if (statusFilter === "in_stock" && p.in_stock === false) return false;
    if (statusFilter === "out_of_stock" && p.in_stock !== false) return false;

    return true;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    if (sortBy === "name_desc") return b.name.localeCompare(a.name);
    const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
    const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
    if (sortBy === "updated_asc") return dateA - dateB;
    return dateB - dateA;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);

  const handleStockToggle = (product: Product) => {
    const nextStock = product.in_stock === false;
    setTogglingId(product.id);
    startTransition(async () => {
      try {
        const res = await toggleProductStock(product.id, nextStock);
        if (res.error) {
          showToast(res.error, "error");
        } else {
          showToast(`Marked "${product.name}" as ${nextStock ? "in stock" : "out of stock"}`, "success");
          router.refresh();
        }
      } catch (err: unknown) {
        showToast(err instanceof Error ? err.message : "Failed to toggle stock", "error");
      } finally {
        setTogglingId(null);
      }
    });
  };

  return (
    <div>
      <PageHeader
        title="Products"
        description={`${products.length} product${products.length !== 1 ? "s" : ""} in total`}
        breadcrumbs={[{ label: "Products" }]}
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 bg-[#7BB042] text-black font-semibold rounded-xl px-4 py-2.5 min-h-[44px] text-xs sm:text-sm hover:bg-[#6A9E36] transition shadow-xs"
          >
            <Plus size={16} /> New product
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-4 mb-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767676]" />
            <input
              type="text"
              placeholder="Search by name, category, or slug…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-xs sm:text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
            />
          </div>

          {/* Controls: Status filter & Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
              <Filter size={14} className="text-[#767676]" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-[#F8F8F8] border border-gray-300 rounded-xl px-3 py-2 min-h-[40px] text-xs font-semibold text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
              >
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="in_stock">In stock</option>
                <option value="out_of_stock">Out of stock</option>
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
                { label: "Name (A to Z)", value: "name_asc" },
                { label: "Name (Z to A)", value: "name_desc" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Table or Empty state */}
      {sorted.length === 0 ? (
        <EmptyState
          message={
            search || statusFilter !== "all"
              ? "No products match your current filters."
              : "No products added yet."
          }
          action={
            !search && statusFilter === "all" ? (
              <Link href="/admin/products/new" className="text-sm font-semibold text-[#3F6B1A] hover:underline">
                Create your first product →
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA] text-[#6B7280] font-bold uppercase tracking-wider">
                  <th className="text-left px-5 py-3.5">Product</th>
                  <th className="text-left px-5 py-3.5">Category</th>
                  <th className="text-right px-5 py-3.5">Price</th>
                  <th className="text-center px-5 py-3.5">Publish status</th>
                  <th className="text-center px-5 py-3.5">Stock status</th>
                  <th className="text-right px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginated.map((p) => {
                  const mainImg = p.product_images?.find((i) => i.is_main);
                  const isOut = p.in_stock === false;
                  const isToggling = togglingId === p.id;

                  return (
                    <tr key={p.id} className="hover:bg-[#F9FCF5] transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {mainImg ? (
                            <img
                              src={mainImg.url}
                              alt={p.name}
                              className="w-10 h-10 rounded-xl object-cover bg-[#F8F9FA] flex-shrink-0 border border-[#E5E7EB]"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] flex items-center justify-center text-[#9CA3AF] text-[10px] font-bold flex-shrink-0">
                              No img
                            </div>
                          )}
                          <div className="min-w-0">
                            <Link
                              href={`/admin/products/${p.id}`}
                              className="font-bold text-black hover:text-[#3F6B1A] transition block truncate max-w-xs"
                            >
                              {p.name}
                            </Link>
                            <span className="text-[11px] text-[#9CA3AF] truncate block">{p.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#4B5563] font-medium whitespace-nowrap">{p.category}</td>
                      <td className="px-5 py-4 text-right font-bold text-black whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {formatPrice(p.price)}
                      </td>
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleStockToggle(p)}
                          disabled={isToggling}
                          title={isOut ? "Click to mark In stock" : "Click to mark Out of stock"}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border transition ${
                            isOut
                              ? "bg-[#FCE8E6] text-[#B3261E] border-[#F8B4B4] hover:bg-[#fad8d5]"
                              : "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E] hover:bg-[#d9edc3]"
                          }`}
                        >
                          {isToggling ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : isOut ? (
                            <XCircle size={12} />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}
                          {isOut ? "Out of stock" : "In stock"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/admin/products/${p.id}`} className="text-xs font-bold text-[#3F6B1A] hover:underline">
                            Edit
                          </Link>
                          <DeleteButton
                            itemName={p.name}
                            onDelete={async () => {
                              await deleteProduct(p.id);
                              router.refresh();
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards View */}
          <div className="lg:hidden divide-y divide-[#F3F4F6]">
            {paginated.map((p) => {
              const mainImg = p.product_images?.find((i) => i.is_main);
              const isOut = p.in_stock === false;
              const isToggling = togglingId === p.id;

              return (
                <div key={p.id} className="p-4 space-y-3 hover:bg-[#F9FCF5] transition">
                  <div className="flex items-center gap-3">
                    {mainImg ? (
                      <img
                        src={mainImg.url}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-[#F8F9FA] flex-shrink-0 border border-[#E5E7EB]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#F4F4F5] flex items-center justify-center text-[#9CA3AF] text-xs font-bold flex-shrink-0">
                        No img
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-sm font-bold text-black hover:text-[#3F6B1A] transition block truncate"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-[#6B7280]">{p.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-black text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {formatPrice(p.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={p.status} />
                      <button
                        onClick={() => handleStockToggle(p)}
                        disabled={isToggling}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border transition ${
                          isOut
                            ? "bg-[#FCE8E6] text-[#B3261E] border-[#F8B4B4]"
                            : "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]"
                        }`}
                      >
                        {isOut ? "Out of stock" : "In stock"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#F3F4F6]">
                    <Link href={`/admin/products/${p.id}`} className="text-xs font-bold text-[#3F6B1A] hover:underline">
                      Edit
                    </Link>
                    <DeleteButton
                      itemName={p.name}
                      onDelete={async () => {
                        await deleteProduct(p.id);
                        router.refresh();
                      }}
                    />
                  </div>
                </div>
              );
            })}
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
