import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Wrench,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Quote,
  Calendar,
  Globe2,
  SunMedium,
  Users,
} from "lucide-react";
import {
  getSiteContent,
  getPublishedProducts,
  getPublishedTestimonials,
  getPublishedBlogPosts,
  getHeroModalProduct,
  formatNaira,
  resolveMediaUrl,
} from "@/lib/public-data";
import { HeroModal } from "@/components/public/HeroModal";

export const metadata: Metadata = {
  title: "Petfeb Solar | Reliable Clean Energy & Financing in Nigeria",
  description:
    "Building your visions, creating reality. Precision-engineered solar power systems, certified installations, and flexible Buy Small financing across Nigeria.",
};

export default async function HomePage() {
  const heroHeadline = await getSiteContent(
    "home.hero.headline",
    "Power your world with solar"
  );
  const heroSubheadline = await getSiteContent(
    "home.hero.subheadline",
    "Building your visions, creating reality. Precision-engineered solar solutions and accessible Buy Small financing designed for Nigerian homes and businesses."
  );

  const [products, testimonials, blogPosts, heroProduct] = await Promise.all([
    getPublishedProducts(),
    getPublishedTestimonials(),
    getPublishedBlogPosts(),
    getHeroModalProduct(),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ── 1. Hero Section ────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-emerald-50/70 via-white to-[#F8F9FA] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-gray-200/80 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/90 text-[#3F6B1A] border border-emerald-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/api/logo" alt="Logo" className="w-5 h-5 object-contain" />
                <span>Pet-Feb International Company Limited</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-950 tracking-tight leading-[1.12]">
                {heroHeadline}
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {heroSubheadline}
              </p>

              {/* Hero CTAs & Featured Product Modal */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
                >
                  Explore Solar Kits
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* The Hero Modal */}
                <HeroModal product={heroProduct} />
              </div>

              <div className="pt-2 text-xs tracking-wider text-gray-500 uppercase font-semibold">
                Corporate Motto: <span className="text-[#3F6B1A]">Building Your Visions, Creating Reality</span>
              </div>
            </div>

            {/* Right Visual Image from websitepics */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/hero"
                  alt="Pet-Feb Solar Engineering Field Installation"
                  className="w-full h-[400px] sm:h-[480px] object-cover rounded-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-lg text-xs">
                  <div className="flex items-center gap-2 text-[#3F6B1A] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
                    <span>Engineered Clean Energy Systems</span>
                  </div>
                  <p className="text-gray-600 text-[11px] mt-1">
                    Precision rooftop installations, commercial hybrid storage, and genuine manufacturer warranties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Facts & Milestones Bar (From Design Inspiration) ─ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="p-3">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A] block">
                10+
              </span>
              <span className="text-xs sm:text-sm text-gray-600 mt-1 block font-medium">
                Years of Solar Experience
              </span>
            </div>
            <div className="p-3">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A] block">
                3,000+
              </span>
              <span className="text-xs sm:text-sm text-gray-600 mt-1 block font-medium">
                Homes & Businesses Powered
              </span>
            </div>
            <div className="p-3">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A] block">
                3 Hubs
              </span>
              <span className="text-xs sm:text-sm text-gray-600 mt-1 block font-medium">
                Port Harcourt, Lagos & Abuja
              </span>
            </div>
            <div className="p-3">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A] block">
                500+
              </span>
              <span className="text-xs sm:text-sm text-gray-600 mt-1 block font-medium">
                Technicians Trained
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Operational Highlights ─────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Engineered for Nigeria
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Components, surge protections, and battery setups designed to withstand grid voltage swings and tropical climate realities.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Certified Workmanship
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Clean conduit cabling, dedicated earth bonding, lightning arrestors, and load balancing by experienced solar engineers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Buy Small Financing
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Structured installment repayment plans to help households and businesses transition without upfront capital strain.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Genuine Warranties
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Manufacturer warranty backing with responsive local after-sales maintenance from our regional service centers.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Featured Solar Systems ──────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
              Solar Kits Catalogue
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
              Popular Solar Energy Systems
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3F6B1A] hover:text-[#2d4e13] transition"
          >
            Browse all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">No published solar systems currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => {
              const mainImg =
                product.product_images?.find((i) => i.is_main) || product.product_images?.[0];
              const imgUrl = resolveMediaUrl(mainImg?.url);

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col hover:border-emerald-300 transition-colors"
                >
                  <div className="h-52 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100">
                    {imgUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imgUrl}
                        alt={mainImg?.alt_text || product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <Zap className="w-10 h-10 mx-auto mb-1 text-[#7BB042]/50" />
                        <span className="text-xs text-gray-500">Solar System</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={`/shop?category=${encodeURIComponent(product.category)}`}
                          className="text-[11px] font-semibold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full transition"
                          title={`Filter shop by ${product.category}`}
                        >
                          {product.category}
                        </Link>
                        {product.in_stock ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                            <CheckCircle2 className="w-3 h-3" />
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700">
                            <AlertCircle className="w-3 h-3" />
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-lg text-gray-900">
                        <Link href={`/shop/${product.slug}`} className="hover:text-[#3F6B1A] transition">
                          {product.name}
                        </Link>
                      </h3>

                      {product.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-gray-500 block">Price</span>
                        <span className="font-heading font-bold text-lg text-gray-950">
                          {formatNaira(product.price)}
                        </span>
                      </div>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-emerald-50 hover:text-[#3F6B1A] transition"
                      >
                        Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 5. Project Spotlight: Light Up Umueri & Global Standards ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
              Real-World Impact
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
              From Rural Electrification to Global Standards
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
              Whether lighting up remote communities through our flagship &ldquo;Light Up Umueri&rdquo; initiative or deploying commercial solar arrays in Victoria Island and Port Harcourt, Pet-Feb delivers international solar craftsmanship with deep local understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between">
              <div className="h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/community"
                  alt="Light Up Umueri Community Solar Electrification"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#F5B82E]">
                    <SunMedium className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Flagship Initiative</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    <Link href="/projects/light-up-umueri" className="hover:text-emerald-300 transition">
                      &ldquo;Light Up Umueri&rdquo; Initiative
                    </Link>
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    Transforming community healthcare, public lighting, and residential centers through dependable off-grid solar power in Anambra State.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/projects/light-up-umueri"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white transition"
                  >
                    View Project Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between">
              <div className="h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/commercial"
                  alt="Commercial Solar Installation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#7BB042]">
                    <Globe2 className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Engineering Transfer</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    <Link href="/projects/building-global-capacity" className="hover:text-emerald-300 transition">
                      Global Technical Transfer
                    </Link>
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    Engineers trained directly in tier-1 manufacturing hubs on advanced hybrid inverters and lithium storage protocols.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/projects/building-global-capacity"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white transition"
                  >
                    View Engineering Program <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between">
              <div className="h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/training"
                  alt="Solar Vocational Training"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#7BB042]">
                    <Users className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Human Capital</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    <Link href="/training" className="hover:text-emerald-300 transition">
                      Local Vocational Empowerment
                    </Link>
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    Training local youths and electrical apprentices in certified solar installation, earthing, and maintenance.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/training"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white transition"
                  >
                    Explore Training Academy <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Testimonials ────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Verified Feedback
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
            What Our Customers Say
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">Customer testimonials will be featured here shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-[#7BB042]" />
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {t.photo_url ? (
                      <img
                        src={resolveMediaUrl(t.photo_url) ?? undefined}
                        alt={t.author_name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#7BB042]/30 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#E8F3DA] text-[#2F5212] font-bold text-xs flex items-center justify-center border border-[#C3E49E] shrink-0">
                        {t.author_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-gray-900">
                        {t.author_name}
                      </h4>
                      {t.author_role && (
                        <p className="text-xs text-gray-500">{t.author_role}</p>
                      )}
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 7. Latest Journal / Updates ────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
              Solar Insights & Updates
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
              From Our Field Journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3F6B1A] hover:text-[#2d4e13] transition"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {blogPosts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.slice(0, 2).map((post) => {
              const coverUrl = resolveMediaUrl(post.cover_image);
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
                  className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col hover:border-emerald-300 transition-colors"
                >
                  {coverUrl && (
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {post.category && (
                          <Link
                            href={`/blog?category=${encodeURIComponent(post.category)}`}
                            className="font-semibold text-[#3F6B1A] bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full transition"
                            title={`Filter blog by ${post.category}`}
                          >
                            {post.category}
                          </Link>
                        )}
                        {formattedDate && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-gray-900 leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:text-[#3F6B1A] transition">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {post.body}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F6B1A] hover:underline"
                      >
                        Read article
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 8. Call To Action Banner ──────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Building Your Visions, Creating Reality Through Reliable Solar
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Contact our engineering team today in Port Harcourt, Lagos, or Abuja for a professional consultation or explore our certified solar kits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
            >
              Get in Touch
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
