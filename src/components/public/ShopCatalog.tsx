"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
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

  // Extract unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

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
      {/* ── Category Pill Buttons ──────────────────────────────── */}
      {categories.length > 0 && (
        <div
          role="toolbar"
          aria-label="Filter products by category"
          className="flex flex-wrap items-center gap-2.5 border-b border-gray-200 pb-5"
        >
          {/* "All" Category Pill Button */}
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
              selectedCategory === null
                ? "bg-[#7BB042] text-white shadow-sm ring-1 ring-[#7BB042]"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            }`}
            aria-pressed={selectedCategory === null}
          >
            All Solar Kits ({products.length})
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
                className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
                  isSelected
                    ? "bg-[#7BB042] text-white shadow-sm ring-1 ring-[#7BB042]"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-pressed={isSelected}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* ── Products Grid ─────────────────────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
          <Zap className="w-10 h-10 text-gray-300 mx-auto" />
          <h2 className="font-heading font-bold text-lg text-gray-900">
            No Products Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            {selectedCategory
              ? `No solar kits found under the "${selectedCategory}" category.`
              : "Our catalogue is being updated with new solar stock. Please check back shortly."}
          </p>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => handleSelectCategory(null)}
              className="mt-2 text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              Reset category filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

            return (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                {/* Product Image Frame */}
                <div className="h-60 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={displayImg}
                    alt={mainImg?.alt_text || product.name}
                    className="max-h-full max-w-full object-contain"
                  />

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    {product.in_stock ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>

                    <h2 className="font-heading font-bold text-xl text-gray-900 leading-snug">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="hover:text-[#3F6B1A] transition"
                      >
                        {product.name}
                      </Link>
                    </h2>

                    {product.description && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {/* Key Specs Pills */}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                        {Object.entries(product.specs)
                          .slice(0, 3)
                          .map(([key, val]) => (
                            <span
                              key={key}
                              className="px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                            >
                              <strong className="capitalize">{key}:</strong> {String(val)}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-gray-500 block">System Price</span>
                      <span className="font-heading font-bold text-xl text-gray-950">
                        {formatNaira(product.price)}
                      </span>
                    </div>

                    <Link
                      href={`/shop/${product.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
