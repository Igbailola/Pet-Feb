"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { ProductCardButton } from "@/components/public/ProductCardButton";

interface HomeProductSectionProps {
  products: Product[];
}

const CATEGORIES = [
  "All Product",
  "Solar kits",
  "Solar Panels",
  "Inverters",
  "Charge Controllers",
  "Batteries",
  "FLOOD lights",
];

export function HomeProductSection({ products }: HomeProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Product");

  // Filter products by selected category if applicable
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "All Product") return true;
    const cat = (p.category || "").toLowerCase();
    const target = selectedCategory.toLowerCase();
    if (target.includes("kit")) return cat.includes("kit");
    if (target.includes("panel")) return cat.includes("panel");
    if (target.includes("inverter")) return cat.includes("inverter");
    if (target.includes("charge") || target.includes("controller")) return cat.includes("controller") || cat.includes("charge");
    if (target.includes("batter")) return cat.includes("batter");
    if (target.includes("light") || target.includes("flood")) return cat.includes("light") || cat.includes("flood");
    return cat.includes(target);
  });

  // Display top 3 products as depicted in Figma frame 4144:1639
  const displayProducts = filteredProducts.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Header and Filter Row matching Figma frame 4144:1617 */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <ScrollReveal className="max-w-2xl space-y-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
            Product
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Discover a wide range of high-quality solar panels, inverters, and batteries designed to power homes, businesses, and communities across Nigeria. Every product is tested for performance, durability, and efficiency giving you reliable clean energy you can trust.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-2 flex flex-wrap gap-1.5 p-1.5 bg-[#EBEBEB] rounded-xl w-fit">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "bg-white text-gray-950 shadow-xs font-bold"
                      : "text-gray-700 hover:text-gray-950 hover:bg-white/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Link to Shop right side */}
        <div className="shrink-0">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7BB042] hover:text-[#6EA138] transition"
          >
            <span>Go to Pet-Feb Product - Shop</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3 Product Cards Grid matching Figma frame 4144:1639 */}
      {displayProducts.length > 0 ? (
        <StaggerChildren key={selectedCategory} staggerDelay={0.09} distance={80} scale={0.94} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayProducts.map((product) => {
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

                  {/* Buy Button matching Figma with Green-to-White Sliding Hover Animation */}
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
        </StaggerChildren>
      ) : (
        <div className="bg-white rounded-[24px] border border-[#EBEBEB] p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-gray-800">
            No published products found in this category.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7BB042] hover:underline"
          >
            <span>Browse Full Solar Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
