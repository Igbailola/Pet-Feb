"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Check, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";
import { ProductCardButton } from "@/components/public/ProductCardButton";

interface ShopCatalogProps {
  products: Product[];
  initialCategory?: string;
}

const CATEGORIES = [
  "All Product",
  "Solar kits",
  "Inverters",
  "Batteries",
  "Solar Panels",
  "Charge controllers",
  "Flood lights",
];

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

function getProductCapacity(p: Product): string | null {
  if (p.specs?.["Capacity"]) return p.specs["Capacity"];
  if (p.specs?.["capacity"]) return p.specs["capacity"];
  if (p.specs?.["inverter"]) {
    const match = p.specs["inverter"].match(/(\d+(?:\.\d+)?\s*(?:kVA|kW))/i);
    if (match) return match[1];
  }
  const nameMatch = p.name.match(/(\d+(?:\.\d+)?\s*(?:kVA|kW|kWh|Ah|W))/i);
  if (nameMatch) return nameMatch[1];
  return null;
}

export function ShopCatalog({ products, initialCategory }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All Product"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const catalogList = products && products.length > 0 ? products : [];

  // Filter products based on selected category and search query
  const filteredProducts = catalogList.filter((p) => {
    const catLower = (p.category || "").toLowerCase();
    const selLower = selectedCategory.toLowerCase();

    let matchesCategory = false;
    if (selectedCategory === "All Product") {
      matchesCategory = true;
    } else if (selLower.includes("kit")) {
      matchesCategory = catLower.includes("kit");
    } else if (selLower.includes("inverter")) {
      matchesCategory = catLower.includes("inverter");
    } else if (selLower.includes("batter")) {
      matchesCategory = catLower.includes("batter");
    } else if (selLower.includes("panel")) {
      matchesCategory = catLower.includes("panel");
    } else if (selLower.includes("controller") || selLower.includes("charge")) {
      matchesCategory = catLower.includes("controller") || catLower.includes("charge");
    } else if (selLower.includes("light") || selLower.includes("flood")) {
      matchesCategory = catLower.includes("light") || catLower.includes("flood");
    } else {
      matchesCategory = catLower.includes(selLower);
    }

    const matchesSearch = searchQuery.trim()
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (p.category || "").toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ?? false)
      : true;

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0; // featured maintains default order
  });

  const totalPages = Math.ceil(sortedProducts.length / pageSize) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat !== "All Product") {
        url.searchParams.set("category", cat);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All Product");
    setSearchQuery("");
    setSortBy("featured");
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const isFiltering = selectedCategory !== "All Product" || searchQuery.trim().length > 0 || sortBy !== "featured";

  return (
    <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-[45px] space-y-8 shadow-2xl">
      {/* ── Section Title & Subtitle matching Figma node 6140:4834 ─ */}
      <div className="space-y-3 max-w-[774px]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <h2 className="font-heading font-medium text-[28px] sm:text-[32px] text-white tracking-tight">
            Solar Products &amp; Kits
          </h2>
        </div>
        <p className="text-sm sm:text-base lg:text-[20px] text-[#EBEBEB] leading-relaxed font-normal">
          Discover a wide range of verified solar kits, hybrid inverters, lithium batteries, and certified accessories designed to power homes, businesses, and clinics across Nigeria. Real pricing in Naira with warranty support you can trust.
        </p>
      </div>

      {/* ── Search Bar & Sorting Controls ─────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:max-w-[480px]">
          <div className="bg-[#EBEBEB] p-2.5 rounded-[12px] w-full shadow-xs">
            <div className="bg-white border border-[#C0C0C0] h-[44px] rounded-[8px] px-3.5 flex items-center justify-between w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by system name, capacity, or component..."
                className="w-full bg-transparent text-sm text-[#333333] placeholder:text-[#A1A1A1] focus:outline-none pr-2 font-sans"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <Search className="w-4 h-4 text-[#767676] shrink-0 pointer-events-none" />
              )}
            </div>
          </div>
        </div>

        {/* Sort & Quick Filter Stats */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-[10px] px-3 py-2 text-xs text-gray-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Showing <strong className="text-white">{sortedProducts.length}</strong> items</span>
          </div>

          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-[10px] px-3 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              aria-label="Sort products by"
              className="bg-transparent text-gray-200 focus:outline-none cursor-pointer font-sans"
            >
              <option value="featured" className="bg-gray-900 text-white">Sort: Featured</option>
              <option value="price-asc" className="bg-gray-900 text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-gray-900 text-white">Price: High to Low</option>
              <option value="name-asc" className="bg-gray-900 text-white">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Category Pill Buttons matching Figma node 6142:5636 ─ */}
      <div className="w-full">
        <div className="bg-[#D6E7C4] p-3 rounded-[12px] w-full overflow-x-auto shadow-xs">
          <div
            role="toolbar"
            aria-label="Filter products by category"
            className="flex items-center min-w-max rounded-[8px] overflow-hidden"
          >
            {CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategory === cat;
              const isFirst = idx === 0;
              const isLast = idx === CATEGORIES.length - 1;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-4 sm:px-6 py-3 min-h-[44px] text-xs sm:text-[14px] transition cursor-pointer flex items-center justify-center border-y border-r border-[#EBEBEB] ${
                    isFirst ? "rounded-l-[8px] border-l" : ""
                  } ${isLast ? "rounded-r-[8px]" : ""} ${
                    isSelected
                      ? "bg-[#7BB042] text-white font-bold border-[#7BB042] shadow-xs"
                      : "bg-white text-[#767676] hover:text-black font-medium"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active filter summary tag if filtering */}
      {isFiltering && (
        <div className="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
          <span>Active filter:</span>
          {selectedCategory !== "All Product" && (
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-white flex items-center gap-1.5">
              Category: {selectedCategory}
            </span>
          )}
          {searchQuery && (
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-white flex items-center gap-1.5">
              Keyword: &ldquo;{searchQuery}&rdquo;
            </span>
          )}
          {sortBy !== "featured" && (
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-white flex items-center gap-1.5">
              Sorting: {sortBy}
            </span>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[#7BB042] hover:underline ml-2 cursor-pointer font-semibold"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* ── Products Grid matching Figma node 6140:4856 & 6142:5704 ──────── */}
      {paginatedProducts.length === 0 ? (
        <div className="bg-white/5 p-12 sm:p-16 rounded-[24px] border border-white/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-white">
            No Solar Products Found
          </h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            {searchQuery
              ? `No solar products matched "${searchQuery}" in category "${selectedCategory}".`
              : `There are currently no products available in category "${selectedCategory}".`}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#7BB042] text-white text-sm font-heading font-semibold hover:bg-[#689836] transition cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[30px] items-stretch">
            {paginatedProducts.map((product, idx) => {
              const mainImg =
                product.product_images?.find((img) => img.is_main) ||
                product.product_images?.[0];
              const imgUrl = (mainImg ? resolveMediaUrl(mainImg.url) : null) || "/api/websitepic/panels";
              const capacity = getProductCapacity(product);

              // Subtle alternation matching Figma: indices 2 and 5 on pure white, others on #F2F7EC
              const isWhiteCard = idx % 3 === 2;

              return (
                <div
                  key={product.id}
                  className={`${
                    isWhiteCard ? "bg-white" : "bg-[#F2F7EC]"
                  } text-gray-900 rounded-[24px] p-5 sm:p-[18px] pb-6 pt-4 flex flex-col justify-between shadow-[0px_2px_22px_0px_rgba(45,45,45,0.1)] hover:shadow-xl hover-lift group h-full transition-all`}
                >
                  <div className="flex flex-col space-y-4">
                    {/* Top Row: Category / Capacity Pill + Verified Stock Badge */}
                    <div className="flex items-center justify-between gap-2 text-xs pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-heading font-semibold uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full bg-black/5 text-gray-700">
                          {product.category}
                        </span>
                        {capacity && (
                          <span className="font-heading font-bold text-[11px] px-2.5 py-0.5 rounded-full bg-[#7BB042]/15 text-[#3F6B1A]">
                            {capacity}
                          </span>
                        )}
                      </div>

                      {/* Stock badge */}
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                          product.in_stock
                            ? "bg-[#E8F3DA] text-[#3F6B1A]"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {product.in_stock ? "In Stock" : "Pre-order"}
                      </span>
                    </div>

                    {/* Image Container */}
                    <Link
                      href={`/shop/${product.slug}`}
                      className="h-[240px] sm:h-[280px] lg:h-[320px] rounded-[20px] bg-[#EBEBEB] overflow-hidden relative block"
                      aria-label={`View ${product.name}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Title & Description */}
                    <div className="space-y-1.5 pt-1">
                      <h3 className="font-heading font-bold text-[18px] sm:text-[20px] text-black group-hover:text-[#3F6B1A] transition-colors line-clamp-1">
                        <Link href={`/shop/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {product.description && (
                        <p className="font-sans text-[13px] text-gray-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Verified Price & View Details Action */}
                  <div className="space-y-3 pt-4 border-t border-black/5 mt-4">
                    <div className="flex items-baseline justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
                          Verified Price
                        </span>
                        <div className="font-heading font-bold text-[20px] sm:text-[22px] text-[#111827]">
                          {formatNaira(product.price)}
                        </div>
                      </div>
                      <span className="text-[12px] text-gray-500 font-medium">
                        Min. Order: 1 unit
                      </span>
                    </div>

                    {/* Informative "View Details" CTA matching Phase 2 specifications */}
                    <ProductCardButton
                      href={`/shop/${product.slug}`}
                      className="w-full py-3.5 px-4 rounded-[12px] text-[15px] font-heading font-bold shadow-xs"
                      ariaLabel={`View details for ${product.name}`}
                    >
                      View Details
                    </ProductCardButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Pagination Bar matching Figma node 6142:5797 ────────── */}
          {totalPages > 1 && (
            <div className="w-full">
              <div className="bg-[#EBEBEB] p-3 rounded-[12px] w-full shadow-xs">
                <div className="bg-white rounded-[8px] p-2 flex items-center justify-between sm:justify-end gap-1.5 w-full">
                  {/* Previous Button */}
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="h-[36px] px-3.5 rounded-[6px] text-[14px] font-medium text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2]" />
                    <span>Previous</span>
                  </button>

                  {/* Page Number Pills */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                      const isActive = currentPage === pg;
                      return (
                        <button
                          key={pg}
                          type="button"
                          onClick={() => setCurrentPage(pg)}
                          className={`w-9 h-9 rounded-[8px] flex items-center justify-center text-[14px] transition cursor-pointer ${
                            isActive
                              ? "bg-white border border-[#7BB042] text-[#7BB042] font-medium shadow-xs"
                              : "bg-[#F5F5F5] text-[#7D827D] hover:bg-gray-200 font-normal"
                          }`}
                        >
                          {pg}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="h-[36px] px-3.5 rounded-[6px] text-[14px] font-medium text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
