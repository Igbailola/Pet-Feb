"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Search, ShoppingBag, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";
import { ProductCardButton } from "@/components/public/ProductCardButton";

interface ShopCatalogProps {
  products: Product[];
  initialCategory?: string;
}

export function ShopCatalog({ products, initialCategory }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories from actual product data
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

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
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#D9D9D9] bg-white text-sm text-gray-900 placeholder:text-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition shadow-2xs"
        />
      </div>

      {/* ── Lola Inspired Category Pill Buttons ───────────────── */}
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
            className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:ring-offset-2 ${
              selectedCategory === null
                ? "bg-[#7BB042] text-white shadow-xs"
                : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-[#F2F7EC] hover:text-[#3F6B1A] hover:border-[#7BB042]/50"
            }`}
            aria-pressed={selectedCategory === null}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>All Products ({products.length})</span>
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
                className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:ring-offset-2 ${
                  isSelected
                    ? "bg-[#7BB042] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-[#F2F7EC] hover:text-[#3F6B1A] hover:border-[#7BB042]/50"
                }`}
                aria-pressed={isSelected}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-white/25 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Result Count + Active Filters ───────────────────────── */}
      <div className="flex items-center justify-between text-xs text-[#5C5C5C] pt-1">
        <span className="font-medium">
          Showing {filteredProducts.length} solar product{filteredProducts.length !== 1 ? "s" : ""}
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
            Clear all filters
          </button>
        )}
      </div>

      {/* ── Products Grid with Lola Visual Hierarchy ───────────── */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-[20px] border border-[#D9D9D9] text-center space-y-3">
          <Zap className="w-10 h-10 text-gray-300 mx-auto" />
          <h2 className="font-heading font-bold text-lg text-gray-900">
            No Published Products Found
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-sm mx-auto">
            {selectedCategory
              ? `No solar systems found under the "${selectedCategory}" category.`
              : searchQuery
              ? `No results matching "${searchQuery}". Try a different keyword.`
              : "Our catalog is being updated with verified solar inventory. Please check back shortly."}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const mainImg =
              product.product_images?.find((img) => img.is_main) ||
              product.product_images?.[0];
            const imgUrl = (mainImg ? resolveMediaUrl(mainImg.url) : null) || "/api/websitepic/panels";

            return (
              <div
                key={product.id}
                className="bg-white rounded-[24px] border border-[#EBEBEB] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)] hover:shadow-md transition group"
              >
                {/* Image Container with light gray well */}
                <div className="h-56 sm:h-64 rounded-[16px] bg-[#F5F5F5] p-6 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg text-gray-950 group-hover:text-[#3F6B1A] transition-colors">
                      <Link href={`/shop/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    {product.description && (
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Minimum Order */}
                  <div className="pt-2 space-y-1">
                    <div className="font-heading font-extrabold text-xl text-gray-950">
                      {formatNaira(product.price)}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      Min, Order : 1unit
                    </div>
                  </div>

                  {/* Buy Button with Green-to-White Sliding Hover Animation */}
                  <div className="pt-2">
                    <ProductCardButton
                      href={`/shop/${product.slug}`}
                      className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-xs min-h-[48px]"
                      ariaLabel={`Buy ${product.name} for ${formatNaira(product.price)}`}
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0" />
                      <span>Buy For {formatNaira(product.price)}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </ProductCardButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
