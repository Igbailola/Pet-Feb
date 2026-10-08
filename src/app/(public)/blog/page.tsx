import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/public-data";
import { BlogCatalog } from "@/components/public/BlogCatalog";

export const metadata: Metadata = {
  title: "Journal & Solar Insights | Petfeb Solar",
  description:
    "Expert articles, sizing guides, installation case studies, and renewable energy news across Nigeria from Petfeb engineers.",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const posts = await getPublishedBlogPosts();

  return (
    <div className="py-12 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
          Petfeb Journal
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight mt-2 mb-4">
          Renewable Energy Guides & Updates
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Practical advice on solar system sizing, maintenance best practices, energy efficiency tips, and company field updates.
        </p>
      </div>

      {/* ── Interactive Journal Catalog with Working Category Pill Buttons ── */}
      <BlogCatalog posts={posts} initialCategory={category} />
    </div>
  );
}
