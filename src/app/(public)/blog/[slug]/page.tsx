import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  resolveMediaUrl,
} from "@/lib/public-data";
import { BlogPostInteraction } from "@/components/public/BlogPostInteraction";
import { RecentBlogPostsSection } from "@/components/public/RecentBlogPostsSection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Petfeb Solar",
    };
  }

  const ogImage = resolveMediaUrl(post.cover_image);

  return {
    title: `${post.title} | Petfeb Blog`,
    description: post.body.slice(0, 160).trim(),
    openGraph: ogImage
      ? {
          title: post.title,
          description: post.body.slice(0, 160).trim(),
          images: [{ url: ogImage }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverUrl =
    resolveMediaUrl(post.cover_image) || "/api/websitepic/blog";
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Recently Published";

  // Related articles
  const allPosts = await getPublishedBlogPosts();
  const topStories = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  // Split body into readable paragraphs
  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <div className="pb-0">
      {/* ── 1. Top Header: "Welcome to petfeb Blog post." ──────────────── */}
      <div className="max-w-[1440px] mx-auto px-[45px] pt-[80px] pb-[58px]">
        <div className="flex items-center gap-0">
          {/* Yellow dot */}
          <span className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0 mt-[46px] mr-[16px]" />
          <h1 className="font-heading font-medium text-[48px] sm:text-[64px] text-black leading-[1.0] tracking-tight">
            Welcome to petfeb Blog post
            <span className="text-[#7BB042]">.</span>
          </h1>
        </div>
      </div>

      {/* ── 2. Main 2-Column Layout ────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-[45px]">
        <div className="flex flex-col lg:flex-row gap-[47px]">
          {/* ─── Left Column: Article (832px) ─────────────────────── */}
          <div className="w-full lg:w-[832px] shrink-0">
            {/* Posted Date Row */}
            <div className="flex items-center gap-[6px] mb-0">
              <span className="font-heading font-medium text-[20px] text-black">
                Posted:
              </span>
              <span className="font-heading font-normal text-[20px] text-[#767676]">
                {formattedDate}
              </span>
            </div>

            {/* Hero Cover Image Card (832×748) */}
            <div className="relative w-full h-[500px] sm:h-[640px] lg:h-[748px] rounded-[24px] overflow-hidden bg-[#333] mt-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay elements for dynamic posts where text is not baked into the Figma asset */}
              {!coverUrl.includes("blog-ph-expansion") && (
                <>
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-[32px] sm:p-[45px] flex flex-col gap-[16px]">
                    {/* Category pill */}
                    <span className="bg-[#7BB042] text-[#F2F7EC] font-heading font-bold text-[14px] px-[16px] py-[6px] rounded-[8px] self-start">
                      {post.category || "News"}
                    </span>
                    {/* Title */}
                    <h2 className="font-heading font-bold text-[24px] sm:text-[32px] text-white leading-[1.2] max-w-[700px]">
                      {post.title}
                    </h2>
                    {/* Excerpt */}
                    <p className="text-white/80 font-sans text-[14px] sm:text-[16px] leading-[1.6] max-w-[600px] line-clamp-3">
                      {post.body.slice(0, 200)}...
                    </p>

                    {/* Carousel nav arrows + dots */}
                    <div className="flex items-center justify-between pt-[8px]">
                      <div className="flex items-center gap-[8px]">
                        <button
                          type="button"
                          className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition"
                          aria-label="Next"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      {/* Carousel dots */}
                      <div className="flex items-center gap-[6px]">
                        <span className="w-[24px] h-[4px] rounded-full bg-white" />
                        <span className="w-[8px] h-[4px] rounded-full bg-white/40" />
                        <span className="w-[8px] h-[4px] rounded-full bg-white/40" />
                        <span className="w-[8px] h-[4px] rounded-full bg-white/40" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Article Body Text */}
            <div className="mt-[45px] space-y-6">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.8] px-[26px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* ─── Right Column: Sidebar (471px) ─────────────────────── */}
          <aside className="w-full lg:w-[471px] shrink-0 lg:sticky lg:top-[120px] self-start">
            {/* "Top Stories" heading */}
            <h3 className="font-heading font-bold text-[28px] text-black mb-[32px] mt-[50px]">
              Top Stories
            </h3>

            {/* Top Story Cards */}
            <div className="flex flex-col">
              {topStories.map((story, idx) => {
                const storyCover =
                  resolveMediaUrl(story.cover_image) || "/api/websitepic/blog";

                return (
                  <div
                    key={story.id}
                    className={`flex gap-[24px] py-[26px] ${
                      idx < topStories.length - 1
                        ? "border-b border-[#D6E7C4]"
                        : ""
                    }`}
                  >
                    {/* Story Text */}
                    <div className="flex-1 flex flex-col gap-[16px]">
                      <div className="flex flex-col gap-0">
                        <span className="text-[#577D2F] font-sans font-medium text-[14px] py-[10px]">
                          {story.category || "Renewable Energy"}
                        </span>
                        <h4 className="font-heading font-medium text-[20px] text-black leading-[1.3] tracking-[-0.1px]">
                          <Link
                            href={`/blog/${story.slug}`}
                            className="hover:text-[#7BB042] transition"
                          >
                            {story.title}
                          </Link>
                        </h4>
                      </div>
                      <p className="font-sans font-normal text-[14px] text-[#767676] leading-[1.6] line-clamp-3">
                        {story.body.slice(0, 160)}...
                      </p>
                    </div>

                    {/* Story Thumbnail (161×160) */}
                    <div className="w-[161px] h-[160px] rounded-[12px] overflow-hidden bg-[#333] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={storyCover}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Interaction Section (Author, Like/Dislike, Comments, Newsletter) ── */}
            <div className="mt-[32px]">
              <BlogPostInteraction
                postTitle={post.title}
                postSlug={post.slug}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* ── 3. "Our Recent Blog Post" Section (black container) ──────── */}
      <div className="max-w-[1440px] mx-auto px-[32px] mt-[24px]">
        <RecentBlogPostsSection posts={allPosts} currentSlug={post.slug} />
      </div>

      {/* ── 4. Training CTA Section (yellow container) ──────────────── */}
      <div className="max-w-[1440px] mx-auto px-[32px] mt-[24px] mb-[24px]">
        <div className="bg-[#F5B82E] rounded-[32px] overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Technician Photo */}
          <div className="lg:w-[586px] relative min-h-[280px] lg:min-h-[426px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma-assets/mission-img-2.png"
              alt="Petfeb hands-on solar training"
              className="absolute inset-0 w-full h-full object-cover rounded-l-[22px]"
            />
            {/* Location tag */}
            <div className="absolute bottom-[15px] left-[15px] bg-white/95 backdrop-blur-sm border border-[#D9D9D9] rounded-full px-[12px] py-[6px] flex items-center gap-[7px] shadow-sm">
              <span className="w-[7px] h-[7px] rounded-full bg-[#7BB042]" />
              <span className="font-heading font-bold text-[11px] text-[#333]">
                Lekki Phase 1, 2024
              </span>
            </div>
          </div>

          {/* Right Column: Training Content */}
          <div className="flex-1 flex flex-col gap-[28px] justify-center p-[40px] sm:p-[56px] lg:p-[65px]">
            <div className="flex flex-col gap-[26px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[#7BB042]" strokeWidth={3} />
                </div>
                <h2 className="font-heading font-medium text-[28px] text-black tracking-[-0.14px] leading-[1.3]">
                  Join Our Next Training Today
                </h2>
              </div>
              <p className="font-sans font-normal text-[16px] text-black leading-[1.6] max-w-[720px]">
                Petfeb Solar Training is designed to equip individuals with
                hands-on knowledge in solar installation, maintenance, and
                system design. Weather you&apos;re starting out or upgrading
                your skills, our training prepares you to work confidently in
                the fast-growing solar industry
              </p>
            </div>

            <Link
              href="/training"
              className="inline-flex items-center justify-center w-[165px] px-[16px] py-[16px] rounded-[12px] bg-black border-2 border-[#7BB042] text-[#7BB042] font-heading font-bold text-[18px] hover:bg-gray-900 transition"
            >
              Join Training
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
