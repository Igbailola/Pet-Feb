"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/public-types";
import { resolveMediaUrl } from "@/lib/public-types";

interface BlogCatalogProps {
  posts: BlogPost[];
  initialCategory?: string;
}

export function BlogCatalog({ posts, initialCategory }: BlogCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );

  // Extract unique non-null categories
  const categories = Array.from(
    new Set(
      posts
        .map((p) => p.category)
        .filter((c): c is string => Boolean(c))
    )
  );

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? posts.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : posts;

  const handleSelectCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat) {
        url.searchParams.set("category", cat);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Featured post = first post
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-10">
      {/* ── Category Pill Buttons ──────────────────────────────── */}
      {categories.length > 0 && (
        <div
          role="toolbar"
          aria-label="Filter articles by category"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              selectedCategory === null
                ? "bg-[#333333] text-white"
                : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50 hover:border-gray-400"
            }`}
            aria-pressed={selectedCategory === null}
          >
            All Articles ({posts.length})
          </button>

          {categories.map((cat) => {
            const count = posts.filter(
              (p) =>
                p.category &&
                p.category.toLowerCase() === cat.toLowerCase()
            ).length;
            const isSelected =
              selectedCategory?.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  handleSelectCategory(isSelected ? null : cat)
                }
                className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  isSelected
                    ? "bg-[#333333] text-white"
                    : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50 hover:border-gray-400"
                }`}
                aria-pressed={isSelected}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* ── Empty State ────────────────────────────────────────── */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white p-12 rounded-[16px] border border-[#D9D9D9] text-center space-y-3">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
          <h2 className="font-heading font-bold text-lg text-gray-900">
            No Articles Found
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-sm mx-auto">
            {selectedCategory
              ? `No articles found under the "${selectedCategory}" category.`
              : "Our editorial desk is preparing new technical insights. Please check back soon."}
          </p>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => handleSelectCategory(null)}
              className="mt-2 text-xs font-bold text-[#3F6B1A] hover:underline cursor-pointer"
            >
              Reset category filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {/* ── Featured Post (First Post) ──────────────────────── */}
          {featuredPost && (() => {
            const coverUrl =
              resolveMediaUrl(featuredPost.cover_image) || "/api/websitepic/blog";
            const formattedDate = featuredPost.published_at
              ? new Date(featuredPost.published_at).toLocaleDateString("en-NG", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : null;
            const readTime = Math.max(3, Math.round((featuredPost.body?.length || 500) / 800));

            return (
              <article className="bg-white rounded-[16px] border border-[#D9D9D9] overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="h-64 lg:h-auto bg-gray-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Location badge */}
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white/95 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                      Featured Dispatch
                    </span>
                  </div>

                  {/* Featured Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-center space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {featuredPost.category && (
                        <span className="text-[10px] font-bold uppercase text-[#3F6B1A] bg-[#E8F3DA] px-2 py-0.5 rounded">
                          {featuredPost.category}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-[#5C5C5C] bg-[#F2F2F2] px-2 py-0.5 rounded">
                        Field Dispatch
                      </span>
                    </div>

                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-950 leading-snug">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[#3F6B1A] transition">
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-[#5C5C5C] line-clamp-3 leading-relaxed">
                      {featuredPost.body}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[#767676]">
                      {formattedDate && <span>{formattedDate}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime} min read
                      </span>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6A9E36] transition shadow-xs w-fit"
                    >
                      Read Full Engineering Article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* ── Section Label ───────────────────────────────────── */}
          {remainingPosts.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C5C5C]">
                Field Telemetry & Technical Dispatches
              </span>
              <h2 className="font-heading font-bold text-2xl text-gray-950">
                Latest Engineering Reports
              </h2>
              <p className="text-xs text-[#767676]">
                All telemetry metrics, wiring schematics, and payback projections are audited against Nigerian climatic constraints.
              </p>
            </div>
          )}

          {/* ── Remaining Articles Grid ─────────────────────────── */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => {
                const coverUrl =
                  resolveMediaUrl(post.cover_image) || "/api/websitepic/blog";
                const formattedDate = post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-NG", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : null;
                const readTime = Math.max(3, Math.round((post.body?.length || 500) / 800));

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-[16px] border border-[#D9D9D9] overflow-hidden flex flex-col justify-between hover:border-[#7BB042] transition-colors group"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="h-48 bg-gray-100 overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-5 space-y-3">
                        {/* Category & Tags */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {post.category && (
                            <button
                              type="button"
                              onClick={() => handleSelectCategory(post.category)}
                              className="text-[10px] font-bold text-[#3F6B1A] bg-[#E8F3DA] px-2 py-0.5 rounded cursor-pointer hover:bg-[#D2E8B5] transition"
                            >
                              {post.category}
                            </button>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-heading font-bold text-base text-gray-950 leading-snug line-clamp-2 group-hover:text-[#3F6B1A] transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-[#5C5C5C] line-clamp-3 leading-relaxed">
                          {post.body}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-[11px] text-[#767676] pt-2 border-t border-gray-100">
                          {formattedDate && <span>{formattedDate}</span>}
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
