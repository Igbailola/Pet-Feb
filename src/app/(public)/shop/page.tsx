import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/public-data";
import { ShopCatalog } from "@/components/public/ShopCatalog";
import { HomeBuySmallBanner } from "@/components/public/HomeBuySmallBanner";
import { ScrollReveal, ScrollScale } from "@/components/motion";

export const metadata: Metadata = {
  title: "Shop Solar Products | Petfeb Solar",
  description:
    "Explore certified solar kits, inverters, lithium batteries, and backup systems engineered for Nigerian conditions. Real pricing in Naira with genuine warranties.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const products = await getPublishedProducts();

  return (
    <div className="bg-white pb-20 overflow-x-clip font-sans">
      {/* ── Page Header & Hero Band matching Figma Frame 6140:4670 ────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 pt-10 sm:pt-16 lg:pt-[80px]">
        {/* Header Text Row: Yellow Dot + "Welcome to petfeb solar shop." + Cart Graphic */}
        <ScrollReveal direction="up" duration={0.7} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 sm:pb-12">
          {/* Left: Yellow dot + Two-part Heading */}
          <div className="flex items-start gap-4">
            <span
              className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0 mt-2 sm:mt-3"
              aria-hidden="true"
            />
            <h1
              className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] uppercase tracking-[2px] sm:tracking-[3px] leading-[1.1] text-shadow-[0px_4px_20px_rgba(0,0,0,0.05)]"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <span className="text-black block">Welcome to</span>
              <span className="text-[#70A03C] block">Petfeb solar shop.</span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Hero Image matching Figma node 6140:4678 (Hero Img) */}
        <ScrollScale from={0.95} rise={28}>
          <div className="relative rounded-[31px] overflow-hidden h-[360px] sm:h-[540px] lg:h-[867px] w-full shadow-lg mb-12 sm:mb-16 bg-[#EBEBEB]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bannerimages/shop-page-banner.jpg"
            alt="Petfeb Solar Installation - Clean Solar Energy Solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          </div>
        </ScrollScale>
      </section>

      {/* ── Main Catalog Content (Black Container) matching Figma node 6140:4831 ──────── */}
      <section className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 space-y-14 sm:space-y-16">
        {/* Interactive Catalog with Search, Category Tabs, Products Grid & Pagination */}
        <ShopCatalog products={products} initialCategory={category} />

        {/* ── Buy Small Scheme Promo Band matching Figma node 6147:5827 ─── */}
        <div>
          <HomeBuySmallBanner />
        </div>
      </section>
    </div>
  );
}
