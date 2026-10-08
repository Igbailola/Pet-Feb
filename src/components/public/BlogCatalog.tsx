"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
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

  return (
    <div className="space-y-8">
      {/* ── Category Pill Buttons ──────────────────────────────── */}
      {categories.length > 0 && (
        <div
          role="toolbar"
          aria-label="Filter articles by category"
          className="flex flex-wrap items-center gap-2.5 border-b border-gray-200 pb-5"
        >
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
              selectedCategory === null
                ? "bg-[#7BB042] text-white shadow-sm ring-1 ring-[#7BB042]"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
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
                className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
                  isSelected
                    ? "bg-[#7BB042] text-white shadow-sm ring-1 ring-[#7BB042]"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-pressed={isSelected}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* ── Articles Grid ─────────────────────────────────────── */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
          <h2 className="font-heading font-bold text-lg text-gray-900">
            No Articles Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            {selectedCategory
              ? `No articles found under the "${selectedCategory}" category.`
              : "Our editorial desk is preparing new technical insights. Please check back soon."}
          </p>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => handleSelectCategory(null)}
              className="mt-2 text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              Reset category filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const coverUrl =
              resolveMediaUrl(post.cover_image) || "/api/websitepic/blog";
            const formattedDate = post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-NG", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : null;

            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div>
                  <div className="h-52 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {post.category && (
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(post.category)}
                          className="font-semibold text-[#3F6B1A] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 cursor-pointer transition"
                        >
                          {post.category}
                        </button>
                      )}
                      {formattedDate && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                      )}
                    </div>

                    <h2 className="font-heading font-bold text-xl text-gray-900 leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[#3F6B1A] transition"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {post.body}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F6B1A] hover:text-[#2d4e13] transition"
                  >
                    Read full article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
