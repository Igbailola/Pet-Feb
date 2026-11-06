"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";
import { ProductCardButton } from "@/components/public/ProductCardButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren } from "@/components/motion/StaggerChildren";

interface HomeProductSectionProps {
  products: Product[];
}

const CATEGORIES = [
  "All Product",
  "Solar Panels",
  "Inverters",
  "Charge Controllers",
  "Batteries",
  "Flood Lights",
];

export function HomeProductSection({ products }: HomeProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Product");

  // Filter products by selected category if applicable
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "All Product") return true;
    const cat = (p.category || "").toLowerCase();
    const target = selectedCategory.toLowerCase();
    if (target.includes("panel")) return cat.includes("panel");
    if (target.includes("inverter")) return cat.includes("inverter");
    if (target.includes("charge") || target.includes("controller")) return cat.includes("controller") || cat.includes("charge");
    if (target.includes("batter")) return cat.includes("batter");
    if (target.includes("light") || target.includes("flood")) return cat.includes("light") || cat.includes("flood");
    return cat.includes(target);
  });

  // Display top 3 products as depicted in Figma frame 6139:2983
  const displayProducts = filteredProducts.slice(0, 3);

  return (
    <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
      {/* Header and Filter Row matching Figma frame 6139:2959 */}
      <ScrollReveal className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Products
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              Discover a wide range of high-quality solar panels, inverters, and batteries designed to power homes, businesses, and communities across Nigeria. Every product is tested for performance, durability, and efficiency giving you reliable clean energy you can trust.
            </p>
          </div>

          {/* Link to Shop right side */}
          <div className="shrink-0 lg:pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-white hover:text-[#7BB042] transition"
            >
              <span>Go to Pet-Feb Product - Shop</span>
              <ChevronRight className="w-4 h-4 text-[#F5B82E]" />
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs on a single row */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:flex lg:flex-nowrap lg:items-center lg:gap-2.5 lg:overflow-x-auto pb-1 w-full">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`w-full lg:w-auto h-full min-h-[46px] lg:min-h-0 flex items-center justify-center text-center leading-tight px-2 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-normal lg:whitespace-nowrap lg:shrink-0 transition-all cursor-pointer ${
                  active
                    ? "bg-[#7BB042] text-white font-bold shadow-xs"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* 3 Product Cards Grid matching Figma frame 6139:2983 */}
      {displayProducts.length > 0 ? (
        <StaggerChildren
          key={selectedCategory}
          staggerDelay={0.09}
          distance={56}
          scale={0.95}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayProducts.map((product) => {
            const mainImg =
              product.product_images?.find((img) => img.is_main) ||
              product.product_images?.[0];
            const imgUrl = (mainImg ? resolveMediaUrl(mainImg.url) : null) || "/api/websitepic/panels";

            return (
              <div
                key={product.id}
                className="bg-white text-gray-900 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover-lift group h-full"
              >
                {/* Image Container with light green-tinted well */}
                <Link
                  href={`/shop/${product.slug}`}
                  className="h-56 sm:h-64 rounded-[16px] bg-[#F2F7EC] overflow-hidden relative block"
                  aria-label={`View ${product.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950 group-hover:text-[#3F6B1A] transition-colors">
                      <Link href={`/shop/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  {/* Price & Minimum Order */}
                  <div className="space-y-0.5">
                    <div className="font-heading font-bold text-xl text-gray-950">
                      {formatNaira(product.price)}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Min, Order : 1unit
                    </div>
                  </div>

                  {/* View Details CTA */}
                  <div className="pt-2">
                    <ProductCardButton
                      href={`/shop/${product.slug}`}
                      className="w-full py-3.5 px-4 rounded-[12px] text-sm font-bold shadow-xs"
                      ariaLabel={`View details for ${product.name}`}
                    >
                      View Details
                    </ProductCardButton>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerChildren>
      ) : (
        <div className="bg-white/5 rounded-[24px] border border-white/10 p-12 text-center space-y-3">
          <p className="text-sm font-medium text-gray-300">
            No published products found in this category.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7BB042] hover:underline"
          >
            <span>Browse Full Solar Shop</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
