"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle2, AlertCircle, ArrowRight, Search } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";

interface ShopCatalogProps {
  products: Product[];
  initialCategory?: string;
}

export function ShopCatalog({ products, initialCategory }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products based on selected category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleSelectCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    // Update browser URL without full reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat) {
        url.searchParams.set("category", cat);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Search Bar ─────────────────────────────────────────── */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search inverters, lithium batteries, panels, or solar kits..."
          className="w-full pl-12 pr-4 py-3 rounded-[10px] border border-[#8A8A8A] bg-white text-sm text-gray-900 placeholder:text-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
        />
      </div>

      {/* ── Category Pill Buttons ──────────────────────────────── */}
      {categories.length > 0 && (
        <div
          role="toolbar"
          aria-label="Filter products by category"
          className="flex flex-wrap items-center gap-2"
        >
          {/* "All" Category Pill Button */}
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              selectedCategory === null
                ? "bg-[#333333] text-white"
                : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50 hover:border-gray-400"
            }`}
            aria-pressed={selectedCategory === null}
          >
            <Zap className="w-3.5 h-3.5" />
            All Hardware ({products.length})
          </button>

          {/* Individual Category Pill Buttons */}
          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.category.toLowerCase() === cat.toLowerCase()
            ).length;
            const isSelected =
              selectedCategory?.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  handleSelectCategory(isSelected ? null : cat)
                }
                className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  isSelected
                    ? "bg-[#333333] text-white"
                    : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50 hover:border-gray-400"
                }`}
                aria-pressed={isSelected}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* ── Result Count + Active Filters ─────────────────────── */}
      <div className="flex items-center justify-between text-xs text-[#5C5C5C]">
        <span className="font-medium">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </span>
        {(selectedCategory || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              handleSelectCategory(null);
              setSearchQuery("");
            }}
            className="text-xs font-bold text-[#3F6B1A] hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Products Grid ─────────────────────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-[16px] border border-[#D9D9D9] text-center space-y-3">
          <Zap className="w-10 h-10 text-gray-300 mx-auto" />
          <h2 className="font-heading font-bold text-lg text-gray-900">
            No Products Found
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-sm mx-auto">
            {selectedCategory
              ? `No solar kits found under the "${selectedCategory}" category.`
              : searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : "Our catalogue is being updated with new solar stock. Please check back shortly."}
          </p>
          {(selectedCategory || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                handleSelectCategory(null);
                setSearchQuery("");
              }}
              className="mt-2 text-xs font-bold text-[#3F6B1A] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const mainImg =
              product.product_images?.find((i) => i.is_main) ||
              product.product_images?.[0];
            const imgUrl = resolveMediaUrl(mainImg?.url);
            const fallbackImg =
              product.category.toLowerCase().includes("panel") ||
              product.name.toLowerCase().includes("panel")
                ? "/api/websitepic/panels"
                : "/api/websitepic/battery";
            const displayImg = imgUrl || fallbackImg;

            // Extract up to 4 specs for the spec strip
            const specEntries = product.specs
              ? Object.entries(product.specs).slice(0, 4)
              : [];

            return (
              <article
                key={product.id}
                className="bg-white rounded-[16px] border border-[#D9D9D9] overflow-hidden flex flex-col justify-between hover:border-[#7BB042] transition-colors group"
              >
                {/* Product Image */}
                <div className="h-56 bg-[#F8F8F8] flex items-center justify-center p-6 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={displayImg}
                    alt={mainImg?.alt_text || product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Availability Badge */}
                  <div className="absolute top-3 right-3">
                    {product.in_stock ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2F2F2] text-[#5C5C5C] border border-[#D9D9D9]">
                        <AlertCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#E8F3DA] px-2 py-0.5 rounded">
                      {product.category}
                    </span>

                    <h2 className="font-heading font-bold text-base text-gray-950 leading-snug line-clamp-2 group-hover:text-[#3F6B1A] transition-colors">
                      <Link href={`/shop/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h2>

                    {/* Spec Strip — tabular row of key numbers */}
                    {specEntries.length > 0 && (
                      <div className="flex flex-wrap border border-[#D9D9D9] rounded-[10px] divide-x divide-[#D9D9D9] overflow-hidden text-[11px]">
                        {specEntries.map(([key, val]) => (
                          <div
                            key={key}
                            className="flex-1 min-w-0 px-2.5 py-2 text-center"
                          >
                            <span className="block text-[#767676] capitalize truncate text-[9px]">
                              {key}
                            </span>
                            <span className="block font-bold text-gray-950 truncate">
                              {String(val)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-[#D9D9D9] space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-heading font-extrabold text-xl text-gray-950">
                        {formatNaira(product.price)}
                      </span>
                      <span className="text-[10px] text-[#5C5C5C]">Cash Price</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-[10px] text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6A9E36] transition shadow-xs"
                      >
                        View specs
                      </Link>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-[10px] text-xs font-bold bg-white text-gray-900 border border-[#D9D9D9] hover:bg-gray-50 transition"
                      >
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── Disclaimer ─────────────────────────────────────────── */}
      <p className="text-center text-[11px] text-[#767676] italic">
        *All spec claims, backup hours, and installment calculations are demo placeholders, pending Petfeb approval.
      </p>
    </div>
  );
}
