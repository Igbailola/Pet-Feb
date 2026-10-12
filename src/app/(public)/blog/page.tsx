import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/public-data";
import { BlogCatalog } from "@/components/public/BlogCatalog";

export const metadata: Metadata = {
  title: "Journal & Field Notes | Petfeb Solar",
  description:
    "Solar engineering insights, project case studies from across Nigeria, and technical guides to grid independence from Petfeb engineers.",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const posts = await getPublishedBlogPosts();

  return (
    <div className="space-y-0">
      {/* ── Page Header Band ───────────────────────────────────── */}
      <section className="bg-[#F4F9EC] border-b border-[#D2E8B5] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Blog & Field Notes</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#3F6B1A] bg-[#E8F3DA] px-2.5 py-1 rounded">
            Engineering Publications & Field Telemetry
          </span>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
              Petfeb Solar Journal & Field Notes
            </h1>
            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed max-w-2xl">
              Solar engineering insights, project case studies from across Nigeria, and technical guides to grid independence. Built for commercial facilities and homeowners demanding certified reliability.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ───────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-12">
        {/* Interactive Journal Catalog */}
        <BlogCatalog posts={posts} initialCategory={category} />

        {/* ── CTA Band ──────────────────────────────────────────── */}
        <div className="bg-[#1F3A0B] text-white rounded-[16px] p-8 sm:p-10 text-center space-y-5">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#F5B82E] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Practical Solar Advisory
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white max-w-2xl mx-auto">
            Ready to transition your facility or home to dependable solar?
          </h2>
          <p className="text-xs sm:text-sm text-white/75 max-w-xl mx-auto leading-relaxed">
            Explore verified Tier-1 hardware packages or calculate your weekly Buy Small installment plan with zero collateral.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6A9E36] transition shadow-sm inline-flex items-center justify-center gap-2"
            >
              Explore Shop Hardware
            </Link>
            <Link
              href="/buy-small"
              className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-[10px] text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition border border-white/20 inline-flex items-center justify-center gap-2"
            >
              Calculate Buy Small Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
