"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, Search, ChevronRight } from "lucide-react";

interface BlogPostItem {
  id: string | number;
  title: string;
  slug: string;
  cover_image: string | null;
  category: string | null;
  published_at: string | null;
  body: string;
}

interface RecentBlogPostsSectionProps {
  posts: BlogPostItem[];
  currentSlug?: string;
}

export function RecentBlogPostsSection({
  posts,
  currentSlug,
}: RecentBlogPostsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter out the current post and apply search
  const filteredPosts = useMemo(() => {
    const pool = currentSlug
      ? posts.filter((p) => p.slug !== currentSlug)
      : posts;

    if (!searchQuery.trim()) return pool.slice(0, 3);

    const q = searchQuery.toLowerCase();
    return pool
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
      .slice(0, 3);
  }, [posts, currentSlug, searchQuery]);

  return (
    <section className="bg-black rounded-[32px] p-[45px] w-full">
      {/* Header + Search Area */}
      <div className="flex items-start justify-between gap-8 mb-[28px]">
        <div className="flex flex-col gap-[24px] max-w-[742px] w-full">
          {/* Title row */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[20px] h-[20px] rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <h2 className="font-heading font-medium text-[32px] text-white leading-normal">
                Our Recent Blog Post
              </h2>
            </div>
            <p className="text-[#EBEBEB] text-[20px] leading-[1.6] font-sans font-normal">
              Discover a wide range of high-quality solar panels, inverters, and
              batteries designed to power homes, businesses, and communities
              across Nigeria. Every product is tested for performance,
              durability, and efficiency giving you reliable clean energy you can
              trust.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-[#EBEBEB] rounded-[12px] p-[12px]">
            <div className="bg-white border border-[#C0C0C0]/20 rounded-[8px] h-[48px] flex items-center px-[16px] gap-[10px]">
              <input
                type="text"
                placeholder="Search Blog Post"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-black placeholder-[#C0C0C0] focus:outline-none font-sans"
              />
              <Search className="w-[24px] h-[24px] text-[#C0C0C0] shrink-0" />
            </div>
          </div>
        </div>

        {/* Right chevron */}
        <div className="hidden lg:flex items-center justify-end flex-1 pt-[126px]">
          <ChevronRight className="w-[24px] h-[24px] text-white" />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
        {filteredPosts.map((post) => {
          const coverUrl = post.cover_image || "/api/websitepic/blog";
          const formattedDate = post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recently Published";

          return (
            <div
              key={post.id}
              className="bg-white rounded-[24px] p-[16px] flex flex-col gap-[26px] shadow-[0px_2px_11px_rgba(45,45,45,0.1)]"
            >
              {/* Card Image */}
              <div className="w-full h-[260px] rounded-[20px] overflow-hidden bg-[#333] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col gap-[16px]">
                {/* Category + Title */}
                <div className="flex flex-col gap-[26px]">
                  <span className="bg-[#F2F7EC] text-[#577D2F] font-sans font-medium text-[16px] px-[24px] py-[10px] rounded-[24px] self-start">
                    {post.category || "News"}
                  </span>
                  <h3 className="font-heading font-medium text-[28px] text-black leading-[1.3] tracking-[-0.14px]">
                    {post.title}
                  </h3>
                </div>

                {/* Excerpt + Read More */}
                <div className="flex flex-col gap-[16px]">
                  <p className="font-sans font-normal text-[16px] text-[#767676] leading-[1.6] line-clamp-3">
                    {post.body.slice(0, 160)}
                    {post.body.length > 160 ? "..." : ""}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="bg-[#7BB042] text-[#F2F7EC] font-heading font-bold text-[18px] rounded-[12px] p-[16px] text-center self-start hover:bg-[#6a9938] transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              {/* Author + Date Footer */}
              <div className="border-t border-dashed border-[#C0C0C0] pt-[20px] pb-[10px] flex items-center justify-between">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#7BB042] overflow-hidden shrink-0 flex items-center justify-center text-white font-heading font-bold text-[11px]">
                    PF
                  </div>
                  <span className="font-heading font-medium text-[18px] text-black tracking-[-0.09px]">
                    Pet-Feb
                  </span>
                </div>
                <span className="font-sans font-normal text-[14px] text-[#767676] tracking-[-0.07px]">
                  {formattedDate}
                </span>
              </div>
            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-[#EBEBEB] text-[18px] font-sans">
              No blog posts found matching &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
