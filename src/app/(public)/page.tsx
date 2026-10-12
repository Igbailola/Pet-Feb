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
  Calendar,
  Globe2,
  Users,
  Search,
  Sun,
  Wallet,
  Phone,
  HardHat,
  Clock,
  Truck,
  GraduationCap,
  Sparkles,
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
import { TestimonialCarousel } from "@/components/public/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Petfeb Solar | Reliable Clean Energy & Financing in Nigeria",
  description:
    "Building your visions, creating reality. Precision-engineered solar power systems, certified installations, and flexible Buy Small financing across Nigeria.",
};

const WORKFLOW_STEPS = [
  {
    step: "01",
    name: "Discover",
    icon: Search,
    desc: "Browse certified solar kits or request an expert load survey.",
  },
  {
    step: "02",
    name: "Choose",
    icon: Sun,
    desc: "Select the system capacity matching your daily energy demand.",
  },
  {
    step: "03",
    name: "Pay or Buy Small",
    icon: Wallet,
    desc: "Pay outright or start with 30% down-payment spread across months.",
  },
  {
    step: "04",
    name: "Install",
    icon: Wrench,
    desc: "Certified Petfeb technicians mount, wire, and commission on-site.",
  },
  {
    step: "05",
    name: "Support",
    icon: Phone,
    desc: "Enjoy manufacturer warranties and dedicated local maintenance.",
  },
];

export default async function HomePage() {
  const heroHeadline = await getSiteContent(
    "home.hero.headline",
    "Reliable solar power for homes, businesses and communities."
  );
  const heroSubheadline = await getSiteContent(
    "home.hero.subheadline",
    "Eliminate blackouts and soaring fuel costs with precision-engineered solar packages, certified installation teams, and accessible Buy Small financing across Nigeria."
  );

  const [products, testimonials, blogPosts, heroProduct] = await Promise.all([
    getPublishedProducts(),
    getPublishedTestimonials(),
    getPublishedBlogPosts(),
    getHeroModalProduct(),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ── 1. Hero Section (Stitch Frame home.jpg) ───────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pt-6 sm:pt-10">
        <div className="relative rounded-[24px] overflow-hidden bg-gray-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center border border-gray-800 shadow-xl">
          {/* Background Image with Dark Overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/websitepic/hero"
            alt="Petfeb Rooftop Solar Engineering Installation"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30 sm:to-transparent" />

          {/* Decorative Sun-Arc Motif top right */}
          <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#7BB042]/20 pointer-events-none opacity-40">
            <div className="w-full h-full rounded-full border-2 border-dashed border-[#F5B82E]/30" />
          </div>

          {/* Hero Content Left */}
          <div className="relative z-10 max-w-3xl p-6 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-[#B4D88A] border border-white/20 backdrop-blur-md shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042] animate-pulse" />
              <span>Solar Energy Company • Nigeria</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12] text-white">
              {heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl font-normal">
              {heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/shop"
                className="w-auto shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition-all shadow-md hover:shadow-lg min-h-[52px]"
              >
                <span>Explore products</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <Link
                href="/projects"
                className="w-auto shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-white/15 text-white hover:bg-white/25 transition-all border border-white/30 backdrop-blur-md min-h-[52px]"
              >
                <span>View projects</span>
              </Link>
              {heroProduct && (
                <div className="pt-1 sm:pt-0 shrink-0">
                  <HeroModal product={heroProduct} />
                </div>
              )}
            </div>

            {/* Floating Energy Spec Card */}
            <div className="pt-4">
              <div className="inline-block bg-white/95 backdrop-blur-md text-gray-900 rounded-[16px] p-4 border border-gray-200/80 shadow-lg max-w-md">
                <div className="flex items-center justify-between gap-3 text-xs font-bold text-gray-950 pb-2 border-b border-gray-100">
                  <span className="text-[#3F6B1A]">Featured 5 kVA Hybrid Kit</span>
                  <span className="text-[11px] font-normal text-gray-500">From ₦35,000/mo Buy Small</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 text-center text-xs">
                  <div className="border-r border-gray-100 pr-1">
                    <span className="font-heading font-extrabold text-sm text-gray-950 block">5 kVA</span>
                    <span className="text-[10px] text-gray-500">Pure Sine</span>
                  </div>
                  <div className="border-r border-gray-100 pr-1">
                    <span className="font-heading font-extrabold text-sm text-gray-950 block">8 - 12h</span>
                    <span className="text-[10px] text-gray-500">Typical Backup</span>
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-sm text-gray-950 block">10 kWh</span>
                    <span className="text-[10px] text-gray-500">Lithium Bank</span>
                  </div>
                </div>
                {/* 10-Segment Power Meter */}
                <div className="pt-1.5 space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                    <span>Power Readiness</span>
                    <span className="text-[#3F6B1A] font-bold">100% Commissioned</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 h-1.5 rounded bg-gray-100">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          i < 8 ? "bg-[#7BB042]" : "bg-emerald-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trust Stat Strip (4 Stat Cards in a row) ──────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-white rounded-[16px] border border-[#D9D9D9] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="p-3 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#3F6B1A] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5 text-[#7BB042]" />
              </div>
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 block">
                10+ Years
              </span>
              <span className="text-xs sm:text-sm text-[#5C5C5C] block font-medium">
                Service & Engineering
              </span>
            </div>

            <div className="p-3 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#3F6B1A] flex items-center justify-center mx-auto">
                <GraduationCap className="w-5 h-5 text-[#7BB042]" />
              </div>
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 block">
                6,000+
              </span>
              <span className="text-xs sm:text-sm text-[#5C5C5C] block font-medium">
                People Trained Nationwide
              </span>
            </div>

            <div className="p-3 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#3F6B1A] flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5 text-[#7BB042]" />
              </div>
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 block">
                3,000+
              </span>
              <span className="text-xs sm:text-sm text-[#5C5C5C] block font-medium">
                Homes & Businesses Powered
              </span>
            </div>

            <div className="p-3 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#3F6B1A] flex items-center justify-center mx-auto">
                <Truck className="w-5 h-5 text-[#7BB042]" />
              </div>
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 block">
                Nationwide
              </span>
              <span className="text-xs sm:text-sm text-[#5C5C5C] block font-medium">
                Field Engineering Dispatch
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400">
              * All statistics are demo placeholders, pending Petfeb approval.
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. How Petfeb Works (Green-50 Band #F4F9EC) ────────── */}
      <section className="bg-[#F4F9EC] py-14 sm:py-20 border-y border-emerald-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              5-Step Turnkey Process
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              From First Question to First Light
            </h2>
            <p className="text-sm text-[#5C5C5C] leading-relaxed">
              We make the solar transition predictable, transparent, and durable for every Nigerian household and facility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {WORKFLOW_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white p-6 rounded-[16px] border border-[#D9D9D9] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#7BB042] transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-xl text-[#3F6B1A]">
                        {s.step}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-[#7BB042]" />
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-base text-gray-950">
                      {s.name}
                    </h3>
                    <p className="text-xs text-[#5C5C5C] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Products Built for Nigerian Conditions ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              Tested Solar Hardware
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              Solar Products Built for Nigerian Conditions
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3F6B1A] hover:underline"
          >
            Shop all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[16px] border border-[#D9D9D9]">
            <p className="text-gray-500 text-sm">No published solar systems currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => {
              const mainImg =
                product.product_images?.find((i) => i.is_main) || product.product_images?.[0];
              const imgUrl = resolveMediaUrl(mainImg?.url);

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-[16px] border border-[#D9D9D9] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#7BB042] transition-colors group"
                >
                  <div className="h-52 bg-[#F4F9EC]/50 flex items-center justify-center p-4 border-b border-gray-100 relative">
                    {imgUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imgUrl}
                        alt={mainImg?.alt_text || product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Zap className="w-12 h-12 text-[#7BB042]/50" />
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      {product.in_stock ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3F6B1A] bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-[#7BB042]" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-base text-gray-950 group-hover:text-[#3F6B1A] transition">
                        <Link href={`/shop/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {product.description && (
                        <p className="text-xs text-[#5C5C5C] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Price and Action */}
                    <div className="pt-3 border-t border-gray-100 space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-gray-400 block">Retail Price</span>
                          <span className="font-heading font-extrabold text-lg text-gray-950">
                            {formatNaira(product.price)}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-[#3F6B1A] bg-emerald-50 px-2 py-1 rounded">
                          Buy Small Eligible
                        </span>
                      </div>

                      <Link
                        href={`/shop/${product.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition shadow-xs text-center min-h-[44px]"
                      >
                        View Details & Specs
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 5. Buy Small Promo Band (with 30% Equity Feature) ──── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#F4F9EC] rounded-[24px] border border-emerald-200 p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              Flexible Solar Installments
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-950">
              Start with 30 Percent. Pay the Rest Weekly or Monthly.
            </h2>
            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed">
              No need to deplete your capital reserves. Power your property immediately upon initial equity payment and spread the remaining balance without extortionate interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-5 rounded-[16px] border border-[#D9D9D9] space-y-2">
              <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">30%</span>
              <h3 className="font-heading font-bold text-sm text-gray-950">Initial Down Payment</h3>
              <p className="text-xs text-[#5C5C5C]">
                Get hardware staged and dispatched to your property upon deposit confirmation.
              </p>
            </div>
            <div className="bg-white p-5 rounded-[16px] border border-[#D9D9D9] space-y-2">
              <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">48 Hours</span>
              <h3 className="font-heading font-bold text-sm text-gray-950">Rapid Technical Verification</h3>
              <p className="text-xs text-[#5C5C5C]">
                Digital NIN and residential review completed by our desk in Port Harcourt, Lagos & Abuja.
              </p>
            </div>
            <div className="bg-white p-5 rounded-[16px] border border-[#D9D9D9] space-y-2">
              <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">6 - 12 Mo</span>
              <h3 className="font-heading font-bold text-sm text-gray-950">Flexible Repayment Tenor</h3>
              <p className="text-xs text-[#5C5C5C]">
                Predictable installments tailored to business cashflow or payroll cycles.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/buy-small"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold bg-[#1F3A0B] text-white hover:bg-black transition shadow-sm min-h-[50px]"
            >
              See how Buy Small works
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/buy-small#portal-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 transition min-h-[50px]"
            >
              Apply now for financing
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Installation CTA (Certified Engineering Teams) ──── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[24px] border border-[#D9D9D9] p-8 sm:p-12 shadow-xs">
          <div className="lg:col-span-6 relative rounded-[16px] overflow-hidden h-72 sm:h-96 border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/websitepic/installer"
              alt="Petfeb Certified Solar Engineers Installing Panels"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B82E]">
                Certified Field Protocol
              </span>
              <p className="text-xs sm:text-sm font-medium mt-0.5">
                Earthing Protection • Neat Surface Conduits • Zero-Flicker Commissioning
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                Engineering Standard
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
                Installed by Certified Teams
              </h2>
              <p className="text-sm text-[#5C5C5C] leading-relaxed">
                Solar systems fail when installed with undersized cables, poor earthing, or faulty DC changeovers. Petfeb field engineers guarantee complete safety and peak generation efficiency.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-800">
              <div className="flex items-start gap-2.5">
                <HardHat className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Thorough on-site load audit and roof azimuth structural check.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Wrench className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Heavy-duty DC breakers, surge suppressors, and deep earthing rods.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Comprehensive installation warranty and scheduled quarterly service.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/installation"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition shadow-xs min-h-[50px]"
              >
                Request installation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Projects Across Nigeria and Beyond ──────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              Proven Track Record
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              Projects Across Nigeria and Beyond
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3F6B1A] hover:underline"
          >
            See all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[16px] border border-[#D9D9D9] bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#7BB042] transition">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/websitepic/community"
                alt="Solar Street Lighting and Community Mini-Grid"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                Rivers State, Nigeria
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#3F6B1A] tracking-wider block">
                  Community Mini-Grid
                </span>
                <h3 className="font-heading font-bold text-base text-gray-950">
                  <Link href="/projects/light-up-umueri" className="hover:text-[#3F6B1A] transition">
                    Solar Street Lighting & Community Power
                  </Link>
                </h3>
                <p className="text-xs text-[#5C5C5C] leading-relaxed">
                  24/7 illumination and uninterrupted medical refrigeration across residential estates and rural healthcare outposts.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-950">50 kWp Mini-Grid</span>
                <Link
                  href="/projects/light-up-umueri"
                  className="text-xs font-bold text-[#3F6B1A] hover:underline flex items-center gap-1"
                >
                  Read study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-[#D9D9D9] bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#7BB042] transition">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/websitepic/commercial"
                alt="Commercial Hybrid Solar Storage Installation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                Lagos & Abuja Hubs
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#3F6B1A] tracking-wider block">
                  Commercial & Industrial
                </span>
                <h3 className="font-heading font-bold text-base text-gray-950">
                  <Link href="/projects/nigeria-clean-energy-landscape" className="hover:text-[#3F6B1A] transition">
                    Clean Energy Landscape Across Commercial Sectors
                  </Link>
                </h3>
                <p className="text-xs text-[#5C5C5C] leading-relaxed">
                  Multi-kilowatt commercial solar retrofits eliminating heavy diesel generator overheads for corporate headquarters.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-950">30 kVA Commercial Array</span>
                <Link
                  href="/projects/nigeria-clean-energy-landscape"
                  className="text-xs font-bold text-[#3F6B1A] hover:underline flex items-center gap-1"
                >
                  Read study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-[#D9D9D9] bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#7BB042] transition">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/websitepic/training"
                alt="Petfeb China Partnership & Engineering Exchange"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                International Exchange
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#3F6B1A] tracking-wider block">
                  Capacity Building
                </span>
                <h3 className="font-heading font-bold text-base text-gray-950">
                  <Link href="/projects/building-global-capacity" className="hover:text-[#3F6B1A] transition">
                    China Partnership & Staff Technical Transfer
                  </Link>
                </h3>
                <p className="text-xs text-[#5C5C5C] leading-relaxed">
                  Engineering knowledge exchange on tier-1 micro inverters, BMS firmware calibration, and automated changeover circuits.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-950">Direct Manufacturer Tier-1</span>
                <Link
                  href="/projects/building-global-capacity"
                  className="text-xs font-bold text-[#3F6B1A] hover:underline flex items-center gap-1"
                >
                  Read study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Training Band (Deep Green #1F3A0B) ──────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-[24px] p-8 sm:p-12 relative overflow-hidden border border-emerald-950">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B4D88A]">
              Petfeb Solar Training
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
              Learn Solar Installation, Maintenance and System Design
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Equipping electricians, university graduates, and aspiring technicians with hands-on rooftop practicals, lithium battery sizing, and electrical safety standards.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-xs font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Next Cohort: Nov 2026
              </span>
              <span className="text-xs font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Port Harcourt & Lagos Hubs
              </span>
              <span className="text-xs font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Hands-on Rooftop Lab
              </span>
            </div>

            <div className="pt-3">
              <Link
                href="/training"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition shadow-xs min-h-[50px]"
              >
                Join training
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Testimonials (Green-50 Band) ───────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            Verified Customer Voice
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
            What Nigerian Home & Business Owners Say
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[16px] border border-[#D9D9D9]">
            <p className="text-gray-500 text-sm">Customer testimonials will be featured here shortly.</p>
          </div>
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}
      </section>

      {/* ── 10. Latest Articles from Field Journal ────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              Technical Knowledge & Guides
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              Latest from the Petfeb Journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3F6B1A] hover:underline"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {blogPosts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[16px] border border-[#D9D9D9]">
            <p className="text-gray-500 text-sm">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => {
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
                  className="bg-white rounded-[16px] border border-[#D9D9D9] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#7BB042] transition group"
                >
                  {coverUrl && (
                    <div className="h-44 bg-gray-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {post.category && (
                          <span className="font-bold text-[#3F6B1A] bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                            {post.category}
                          </span>
                        )}
                        {formattedDate && <span>{formattedDate}</span>}
                      </div>
                      <h3 className="font-heading font-bold text-base text-gray-950 group-hover:text-[#3F6B1A] transition line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#5C5C5C] line-clamp-2 leading-relaxed">
                        {post.body}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#3F6B1A] hover:underline"
                      >
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 11. Final CTA Band (Isolated Amber Region per Rule) ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#F5B82E] text-black rounded-[24px] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-md">
          {/* Decorative motif */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-4 border-black/10 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-2 relative z-10">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-black">
              Not Sure What Size System You Need?
            </h2>
            <p className="text-sm sm:text-base text-black/85 leading-relaxed font-medium">
              Talk directly to Petfeb engineers in Port Harcourt, Lagos, or Abuja. We will calculate your daily kilowatt-hour load and recommend the exact setup.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#1F3A0B] text-white hover:bg-black transition shadow-sm min-h-[50px] inline-flex items-center justify-center"
            >
              Talk to Petfeb Engineers
            </Link>
            <a
              href="https://wa.me/2348135854054"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-white text-gray-950 hover:bg-gray-100 transition shadow-sm min-h-[50px] inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#3F6B1A]" />
              WhatsApp Engineering Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
