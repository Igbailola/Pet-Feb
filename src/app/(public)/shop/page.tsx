import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getPublishedProducts } from "@/lib/public-data";
import { ShopCatalog } from "@/components/public/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop Solar Systems & Kits | Petfeb Solar",
  description:
    "Explore certified solar kits, inverters, and battery backup systems for Nigerian homes and businesses. Real pricing in Naira with genuine warranties.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const products = await getPublishedProducts();

  return (
    <div className="py-12 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
          Direct Equipment Catalogue
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight mt-2 mb-4">
          Solar Energy Systems & Kits
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Engineered solar packages designed for longevity and high performance. Each kit includes matched inverters, battery storage, and solar panels.
        </p>
      </div>

      {/* ── Interactive Catalog with Working Category Pill Buttons ── */}
      <ShopCatalog products={products} initialCategory={category} />

      {/* ── Assurance Bar ─────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-emerald-950">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#7BB042] shrink-0" />
          <span>
            Every system includes a manufacturer warranty and option for professional installation by Petfeb engineers.
          </span>
        </div>
        <Link
          href="/installation"
          className="font-semibold text-[#3F6B1A] hover:underline shrink-0"
        >
          Learn about installation services →
        </Link>
      </div>
    </div>
  );
}
