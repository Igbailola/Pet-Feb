import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, ArrowRight, Share2, SunMedium } from "lucide-react";
import { getBlogPostBySlug, getPublishedBlogPosts, resolveMediaUrl } from "@/lib/public-data";

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
    title: `${post.title} | Petfeb Journal`,
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
    ? new Date(post.published_at).toLocaleDateString("en-NG", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Other published articles for the related section
  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="py-8 sm:py-16 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
      {/* ── Breadcrumb & Return Link ───────────────────────────── */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F6B1A] hover:text-[#2d4e13] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Journal Articles
        </Link>
      </div>

      {/* ── Article Header ────────────────────────────────────── */}
      <header className="space-y-4 text-left">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {post.category && (
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="font-semibold text-[#3F6B1A] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 transition"
              title={`View more articles in ${post.category}`}
            >
              {post.category}
            </Link>
          )}
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5 text-gray-600">
              <Calendar className="w-4 h-4 text-[#7BB042]" />
              {formattedDate}
            </span>
          )}
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-2.5 pt-2 text-xs text-gray-500 border-t border-gray-100">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-bold">
            <SunMedium className="w-4 h-4 text-[#7BB042]" />
          </div>
          <span>Published by Pet-Feb Solar Engineering Desk</span>
        </div>
      </header>

      {/* ── Cover Image ───────────────────────────────────────── */}
      {coverUrl && (
        <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm max-h-[460px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Article Body ──────────────────────────────────────── */}
      <div className="prose prose-emerald max-w-none text-gray-800 text-base sm:text-lg leading-relaxed space-y-6 pt-2">
        {post.body.split("\n\n").map((paragraph, index) => (
          <p key={index} className="leading-relaxed whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── Related Articles Section ──────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-gray-200 space-y-6">
          <h2 className="font-heading font-bold text-2xl text-gray-900">
            More from the Petfeb Journal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => {
              const relCover =
                resolveMediaUrl(related.cover_image) || "/api/websitepic/blog";
              return (
                <div
                  key={related.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={relCover}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-base text-gray-900 leading-snug">
                      <Link href={`/blog/${related.slug}`} className="hover:text-[#3F6B1A] transition">
                        {related.title}
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline"
                    >
                      Read article <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
