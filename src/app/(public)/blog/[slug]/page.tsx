import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Copy,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Check,
  BookOpen,
  MapPin,
  ExternalLink,
} from "lucide-react";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  resolveMediaUrl,
  formatNaira,
} from "@/lib/public-data";

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
    title: `${post.title} | Petfeb Journal & Field Dispatches`,
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
    : "Recently Published";

  // Calculate read time roughly
  const wordCount = post.body.split(/\s+/).length;
  const readTimeMin = Math.max(3, Math.ceil(wordCount / 180));

  // Related articles
  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Split body into readable sections/paragraphs
  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <article className="py-8 sm:py-14 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── 1. Breadcrumb ─────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
          </li>
          <li>&gt;</li>
          <li>
            <Link href="/blog" className="hover:text-gray-900 transition">
              Journal &amp; Guides
            </Link>
          </li>
          <li>&gt;</li>
          <li className="text-gray-900 font-semibold truncate max-w-[280px]">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* ── 2. Article Header ─────────────────────────────────── */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full font-semibold bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/30">
            {post.category || "Engineering Guides"}
          </span>
          <span className="inline-flex items-center gap-1 text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{readTimeMin} min read · NEMSA Verified Standards (demo placeholder)</span>
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Comprehensive field observations and engineering benchmarks from Petfeb certified installation desks across Nigeria.
        </p>

        {/* Author Metadata Bar */}
        <div className="pt-4 border-t border-[#D9D9D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-sm flex items-center justify-center">
              PS
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-gray-900 block">
                Petfeb Engineering Desk
              </span>
              <span className="text-xs text-gray-500">
                {formattedDate} · Field Verification Team
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9D9D9] text-gray-700 hover:bg-gray-50 transition"
              title="Copy article link"
            >
              <Copy className="w-3.5 h-3.5 text-gray-500" />
              <span>Copy link</span>
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9D9D9] text-gray-700 hover:bg-gray-50 transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Share via WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── 3. Cover Hero Photo Panel ─────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D9D9D9] bg-gray-900 shadow-md">
        <div className="h-80 sm:h-[460px] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-sm border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Verified Clean Installation · Nigeria</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#7BB042] text-black">
              VERIFIED DISPATCH
            </span>
          </div>
        </div>

        <div className="p-3 bg-[#F8F9FA] text-[11px] text-gray-500 border-t border-[#D9D9D9] text-center">
          Pure sine wave hybrid systems installed with minimum lateral clearance and ducted exhaust baffles at client facilities (demo placeholders, pending Petfeb approval).
        </div>
      </div>

      {/* ── 4. Main Article Two-Column Layout (Desktop 8/4) ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Article Narrative Body */}
        <div className="lg:col-span-8 space-y-8">
          {/* Executive Key Takeaways Box (Stitch Frame) */}
          <div className="bg-[#F4F9EC] rounded-2xl border border-[#7BB042]/40 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#3F6B1A]" />
              <h3 className="font-heading font-bold text-base text-gray-900">
                Executive Engineering Summary (Key Takeaways)
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>
                  Standard inverter derating curves trigger at 40°C ambient, shedding 2.5% to 4% rated kVA capacity per degree Celsius.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>
                  Dual-MPPT trackers operating near Vmax voltage windows generate 18% higher internal core thermal dissipation than balanced mid-range arrays.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>
                  Forced horizontal spacing of ≥300mm between inverter chassis prevents boundary-layer thermal interference between heatsinks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>
                  Incorporating Buy Small remote telemetry modules enables automated thermal alerts before internal protection trip thresholds are reached.
                </span>
              </li>
            </ul>
          </div>

          {/* Render article body */}
          <div className="space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Pull Quote with Green-700 Left Rule per stitch frame */}
          <blockquote className="border-l-4 border-[#3F6B1A] pl-5 py-2 my-8 italic text-base sm:text-lg text-gray-900 bg-[#F8F9FA] rounded-r-xl">
            &ldquo;When inverter enclosures cross 50°C internal junction temperature, internal IGBT gate drivers forcibly throttle duty cycles to avert silicon breakdown. In unventilated utility closets, this can reduce a 5kVA system to 3.2kVA during peak 1:00 PM irradiance.&rdquo;
            <footer className="text-xs text-gray-500 not-italic mt-2">
              — Petfeb Technical Laboratory Field Memo #18 (demo placeholder, pending Petfeb approval)
            </footer>
          </blockquote>

          {/* Author Card at Bottom */}
          <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#D9D9D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-base flex items-center justify-center">
                PS
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-gray-900 block">
                  Petfeb Technical Systems Engineering Desk
                </span>
                <span className="text-xs text-gray-500">
                  NEMSA Certified Field Inspectors &middot; COREN Registered Engineers
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/training"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs"
              >
                Book Training Session
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          {/* Table of Contents Box */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-900">
              <span>TABLE OF CONTENTS</span>
              <span className="text-gray-400 font-normal">35% Read</span>
            </div>

            {/* Reading progress segments */}
            <div className="grid grid-cols-10 gap-1 h-1.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${i < 4 ? "bg-[#7BB042]" : "bg-gray-200"}`}
                />
              ))}
            </div>

            <ol className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <li className="font-semibold text-gray-900 hover:text-[#3F6B1A] cursor-pointer">
                1. Physics of Thermal Derating in Nigeria
              </li>
              <li className="hover:text-gray-900 cursor-pointer">
                2. Clearance &amp; Heatsink Protocols
              </li>
              <li className="hover:text-gray-900 cursor-pointer">
                3. Sizing Compensations for Commercial Facilities
              </li>
              <li className="hover:text-gray-900 cursor-pointer">
                4. Field Validation &amp; Regulatory Signoff
              </li>
            </ol>
          </div>

          {/* Buy Small Promo Box */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-5 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A] block">
              BUY SMALL SCHEME
            </span>
            <h4 className="font-heading font-bold text-sm text-gray-900">
              Upgrade your hardware with Buy Small
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero collateral required. Spread inverter and lithium battery costs in convenient weekly installments from ₦24,000/week (demo placeholder).
            </p>
            <Link
              href="/buy-small"
              className="w-full inline-flex items-center justify-center py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs text-center min-h-[44px]"
            >
              Calculate Buy Small Plan
            </Link>
          </div>

          {/* Newsletter / Dispatch Subscribe Box */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 space-y-3 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
              FIELD NOTES NEWSLETTER
            </span>
            <h4 className="font-heading font-bold text-sm text-gray-900">
              Get Nigerian solar field notes monthly
            </h4>
            <p className="text-xs text-gray-500">
              No marketing fluff — only verified telemetry and installation schematics.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="name@company.com.ng"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className="w-full py-2 rounded-lg text-xs font-semibold bg-black text-white hover:bg-gray-800 transition"
              >
                Subscribe to Field Dispatches
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center">
              Unsubscribe anytime. 1,840+ Nigerian engineers enrolled (demo placeholder).
            </p>
          </div>
        </aside>
      </div>

      {/* ── 5. Related Engineering Dispatches ──────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-[#D9D9D9]">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                CONTINUED LEARNING
              </span>
              <h2 className="font-heading font-bold text-2xl text-gray-900">
                Related Engineering Dispatches &amp; Field Case Studies
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              <span>Explore full Journal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => {
              const relCover =
                resolveMediaUrl(rel.cover_image) || "/api/websitepic/blog";

              return (
                <article
                  key={rel.id}
                  className="bg-white rounded-2xl border border-[#D9D9D9] overflow-hidden flex flex-col justify-between hover:border-black transition-colors shadow-2xs"
                >
                  <div className="h-44 bg-gray-900 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={relCover}
                      alt={rel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#7BB042] text-black">
                      {rel.category || "Field Project"}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <h3 className="font-heading font-bold text-base text-gray-900 leading-snug">
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="hover:text-[#3F6B1A] transition"
                      >
                        {rel.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {rel.body}
                    </p>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#3F6B1A] font-semibold">
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Read Dispatch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 6. Bottom CTA Band (Deep Green #1F3A0B per stitch frame) ── */}
      <section className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 lg:p-14 text-center space-y-6 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
            STANDARDIZED NIGERIAN ENERGY INFRASTRUCTURE
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
            Ready to transition your facility or home to dependable solar?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Speak with our certified systems engineers for a comprehensive energy assessment or browse our NEMSA-compliant hardware inventory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm min-h-[48px]"
          >
            <span>Explore Shop Hardware</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/buy-small"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
          >
            <span>Calculate Buy Small Plan</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
