"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";

interface ShopCatalogProps {
  products: Product[];
  initialCategory?: string;
}

const CATEGORIES = [
  "All Product",
  "Solar Panels",
  "Inverters",
  "Charge Controllers",
  "Batteries",
  "FLOOD lights",
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "sample-micro-inverter",
    name: "Micro Inverter",
    slug: "micro-inverter",
    category: "Inverters",
    description: "Tier-1 micro inverter for rooftop solar configurations.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [{ id: "1", url: "/api/websitepic/commercial", is_main: true, product_id: "sample-1", sort_order: 1, alt_text: "Micro Inverter" }],
  },
  {
    id: "sample-lithium-battery",
    name: "Lithium Battery",
    slug: "lithium-battery",
    category: "Batteries",
    description: "High-density LiFePO4 rack battery with smart BMS.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [{ id: "2", url: "/api/websitepic/battery", is_main: true, product_id: "sample-2", sort_order: 1, alt_text: "Lithium Battery" }],
  },
  {
    id: "sample-g12v-battery",
    name: "G12V 200AH Battery",
    slug: "g12v-200ah-battery",
    category: "Batteries",
    description: "Long-cycle deep discharge gel battery storage.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [{ id: "3", url: "/api/websitepic/panels", is_main: true, product_id: "sample-3", sort_order: 1, alt_text: "G12V 200AH Battery" }],
  },
  {
    id: "sample-street-light-panel",
    name: "Street Light Panel",
    slug: "street-light-panel",
    category: "Solar Panels",
    description: "All-in-one solar lighting and monocrystalline PV module.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [{ id: "4", url: "/api/websitepic/commercial", is_main: true, product_id: "sample-4", sort_order: 1, alt_text: "Street Light Panel" }],
  },
  {
    id: "sample-flh-battery",
    name: "FLH48100UG2-5-Battery",
    slug: "flh48100ug2-5-battery",
    category: "Batteries",
    description: "48V 100Ah modular lithium energy storage system.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [{ id: "5", url: "/api/websitepic/battery", is_main: true, product_id: "sample-5", sort_order: 1, alt_text: "FLH48100UG2-5-Battery" }],
  },
  {
    id: "sample-ivps-inverter",
    name: "IVPS10048.356-Inverter",
    slug: "ivps10048-356-inverter",
    category: "Inverters",
    description: "High-frequency pure sine wave hybrid inverter.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [{ id: "6", url: "/api/websitepic/panels", is_main: true, product_id: "sample-6", sort_order: 1, alt_text: "IVPS10048.356-Inverter" }],
  },
];

export function ShopCatalog({ products, initialCategory }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All Product"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Merge real products with Figma sample catalog if empty
  const catalogList = products && products.length > 0 ? products : SAMPLE_PRODUCTS;

  // Filter products based on selected category and search query
  const filteredProducts = catalogList.filter((p) => {
    const matchesCategory =
      selectedCategory === "All Product"
        ? true
        : (p.category || "").toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === "Solar Panels" && (p.category || "").toLowerCase().includes("panel")) ||
          (selectedCategory === "Inverters" && (p.category || "").toLowerCase().includes("inverter")) ||
          (selectedCategory === "Charge Controllers" &&
            ((p.category || "").toLowerCase().includes("charge") ||
              (p.category || "").toLowerCase().includes("controller"))) ||
          (selectedCategory === "Batteries" && (p.category || "").toLowerCase().includes("batter")) ||
          (selectedCategory === "FLOOD lights" && (p.category || "").toLowerCase().includes("light"));

    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      : true;

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
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

  return (
    <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-[45px] space-y-8 shadow-2xl">
      {/* ── Section Title & Subtitle matching Figma node 6140:4834 ─ */}
      <div className="space-y-3 max-w-[774px]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <h2 className="font-heading font-medium text-[28px] sm:text-[32px] text-white tracking-tight">
            Products
          </h2>
        </div>
        <p className="text-sm sm:text-base lg:text-[20px] text-[#EBEBEB] leading-relaxed font-normal">
          Discover a wide range of high-quality solar panels, inverters, and batteries designed to power homes, businesses, and communities across Nigeria. Every product is tested for performance, durability, and efficiency giving you reliable clean energy you can trust.
        </p>
      </div>

      {/* ── Search Bar matching Figma node 6142:5650 ─────────── */}
      <div className="w-full max-w-[742px]">
        <div className="bg-[#EBEBEB] p-3 rounded-[12px] w-full shadow-xs">
          <div className="bg-white border border-[#C0C0C0] h-[48px] rounded-[8px] px-4 flex items-center justify-between w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Product"
              className="w-full bg-transparent text-sm text-[#333333] placeholder:text-[#A1A1A1] placeholder:italic focus:outline-none pr-3"
            />
            <Search className="w-5 h-5 text-[#767676] shrink-0 pointer-events-none" />
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

      {/* ── Products Grid matching Figma node 6140:4856 & 6142:5704 ──────── */}
      {paginatedProducts.length === 0 ? (
        <div className="bg-white/5 p-12 rounded-[24px] border border-white/10 text-center space-y-3">
          <h3 className="font-heading font-bold text-lg text-white">
            No Published Products Found
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
            {searchQuery
              ? `No results matching "${searchQuery}". Try a different keyword.`
              : "Our catalog is being updated with verified solar inventory. Please check back shortly."}
          </p>
          {(selectedCategory !== "All Product" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All Product");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="mt-2 text-xs font-bold text-[#7BB042] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[30px]">
            {paginatedProducts.map((product, idx) => {
              const mainImg =
                product.product_images?.find((img) => img.is_main) ||
                product.product_images?.[0];
              const imgUrl = (mainImg ? resolveMediaUrl(mainImg.url) : null) || "/api/websitepic/panels";

              // Subtle alternation matching Figma: indices 2 and 5 on pure white, others on #F2F7EC
              const isWhiteCard = idx % 3 === 2;

              return (
                <div
                  key={product.id}
                  className={`${
                    isWhiteCard ? "bg-white" : "bg-[#F2F7EC]"
                  } text-gray-900 rounded-[24px] p-5 sm:p-[18px] pb-6 pt-4 flex flex-col justify-between space-y-4 shadow-[0px_2px_22px_0px_rgba(45,45,45,0.1)] hover:shadow-xl transition-all duration-300 group`}
                >
                  {/* Image Container with light grey well matching Figma node 6140:4859 */}
                  <div className="h-[280px] sm:h-[340px] lg:h-[400px] rounded-[24px] bg-[#EBEBEB] p-6 flex items-center justify-center overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content matching Figma Frame 15 & 23 */}
                  <div className="flex-1 flex flex-col justify-between space-y-4 pt-1">
                    <div>
                      <h3 className="font-heading font-medium text-[20px] sm:text-[24px] text-black group-hover:text-[#3F6B1A] transition-colors line-clamp-2">
                        <Link href={`/shop/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                    </div>

                    {/* Price & Minimum Order matching Figma Frame 26 */}
                    <div className="space-y-0.5">
                      <div className="font-bold text-[20px] text-[#333333]">
                        {formatNaira(product.price)}
                      </div>
                      <div className="text-[16px] sm:text-[18px] text-[#5C5C5C] font-medium">
                        Min, Order : 1unit
                      </div>
                    </div>

                    {/* Buy Button matching Figma node 6140:4870 */}
                    <div className="pt-2">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="w-full py-4 px-4 rounded-[12px] text-[16px] font-heading font-bold bg-[#7BB042] text-[#F2F7EC] hover:bg-[#6AA035] transition-all flex items-center justify-center text-center shadow-xs cursor-pointer"
                      >
                        Buy For {formatNaira(product.price)}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Pagination Bar matching Figma node 6142:5797 ────────── */}
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
        </div>
      )}
    </div>
  );
}
