import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  resolveMediaUrl,
} from "@/lib/public-data";
import { BlogPostInteraction } from "@/components/public/BlogPostInteraction";
import { RecentBlogPostsSection } from "@/components/public/RecentBlogPostsSection";
import { ProjectHeroSlider } from "@/components/public/ProjectHeroSlider";

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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px]">
        <div className="flex flex-col lg:flex-row gap-[47px]">
          {/* ─── Left Column: Article (832px) ─────────────────────── */}
          <div className="w-full lg:w-[832px] shrink-0 space-y-6">
            {/* Posted Date Row */}
            <div className="flex items-center gap-[6px]">
              <span className="font-heading font-medium text-lg sm:text-[20px] text-black">
                Posted:
              </span>
              <span className="font-heading font-normal text-lg sm:text-[20px] text-[#767676]">
                {formattedDate}
              </span>
            </div>

            {/* Hero Cover Image Carousel */}
            <ProjectHeroSlider
              images={
                post.hero_images && post.hero_images.length > 0
                  ? post.hero_images
                  : [coverUrl]
              }
              title={post.title}
              className="relative w-full h-[320px] sm:h-[500px] lg:h-[620px] rounded-[24px] overflow-hidden bg-gray-900 border border-gray-200 shadow-md group select-none"
            />

            {/* Article Heading */}
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-950 pt-2 leading-snug">
              {post.title}
            </h2>

            {/* Article Body Text */}
            <div className="space-y-5 pt-2">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.8]"
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
