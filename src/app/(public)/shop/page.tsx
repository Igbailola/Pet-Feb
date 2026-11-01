import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/public-data";
import { ShopCatalog } from "@/components/public/ShopCatalog";
import { HomeBuySmallBanner } from "@/components/public/HomeBuySmallBanner";

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
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-10 sm:pt-16 lg:pt-[80px]">
        {/* Header Text Row: Yellow Dot + "Welcome to petfeb solar shop." + Cart Graphic */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 sm:pb-12">
          {/* Left: Yellow dot + Heading with green period matching node 6142:5569 */}
          <div className="flex items-center gap-4">
            <span
              className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0"
              aria-hidden="true"
            />
            <h1
              className="font-heading font-bold text-[28px] sm:text-[38px] lg:text-[48px] text-[#333333] tracking-[1.44px] uppercase leading-tight"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              Welcome to petfeb solar shop
              <span className="text-[#7BB042]">.</span>
            </h1>
          </div>

          {/* Right: Stylized Shopping Cart Icon Graphic matching Figma node 6142:5572 */}
          <div className="hidden md:flex items-center pl-6 shrink-0" aria-hidden="true">
            <div className="relative w-[150px] h-[105px]">
              {/* Cart wireframe basket */}
              <svg
                viewBox="0 0 151 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-auto text-black"
              >
                <path
                  d="M1 1h22l20 54h88l16-44H38"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Petfeb Logo nested in the cart */}
              <div className="absolute left-[65px] top-[27px] w-[32px] h-[32px] rounded-[6px] border-[0.5px] border-[#D6E7C4] bg-white p-1 shadow-xs flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/logo"
                  alt="Petfeb Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* Cart wheels */}
              <div className="absolute left-[33px] bottom-[2px] w-[14px] h-[14px] rounded-full bg-black border-2 border-white" />
              <div className="absolute left-[109px] bottom-[2px] w-[14px] h-[14px] rounded-full bg-black border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Hero Image matching Figma node 6140:4678 (Hero Img) */}
        <div className="relative rounded-[31px] overflow-hidden h-[360px] sm:h-[540px] lg:h-[867px] w-full shadow-lg mb-12 sm:mb-16 bg-[#EBEBEB]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bannerimages/shop-page-banner.jpg"
            alt="Petfeb Solar Installation - Clean Solar Energy Solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </div>
      </section>

      {/* ── Main Catalog Content (Black Container) matching Figma node 6140:4831 ──────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] space-y-14 sm:space-y-16">
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
