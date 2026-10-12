import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Phone } from "lucide-react";
import { getPublishedProducts } from "@/lib/public-data";
import { ShopCatalog } from "@/components/public/ShopCatalog";

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
    <div className="space-y-0">
      {/* ── Page Header Band (green-50) ────────────────────────── */}
      <section className="bg-[#F4F9EC] border-b border-[#D2E8B5] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shop solar products</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
              Shop solar products
            </h1>
            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed max-w-2xl">
              Engineered for Nigerian grid instability and extreme heat. Each kit includes matched inverters, battery storage, and solar panels with genuine warranties.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ───────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-10">
        {/* Interactive Catalog with Working Category Pill Buttons */}
        <ShopCatalog products={products} initialCategory={category} />

        {/* ── Help Band ─────────────────────────────────────────── */}
        <div className="bg-[#1F3A0B] text-white rounded-[16px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#7BB042] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-heading font-bold text-base block">
                Not sure what capacity fits your load?
              </span>
              <span className="text-xs text-white/75 block">
                Calculate your peak kilowatt demand and recommended battery bank size with our engineering desk.
              </span>
            </div>
          </div>
          <a
            href="https://wa.me/2348135854054"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6A9E36] transition shadow-sm shrink-0"
          >
            <Phone className="w-4 h-4" />
            +234 800 PETFEB SOLAR
          </a>
        </div>
      </section>
    </div>
  );
}
