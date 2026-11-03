import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  Star,
  ChevronRight,
} from "lucide-react";
import {
  getPublishedProducts,
} from "@/lib/public-data";
import { HomeProductSection } from "@/components/public/HomeProductSection";
import { HomeProjectAccordion } from "@/components/public/HomeProjectAccordion";
import { HomeContactForm } from "@/components/public/HomeContactForm";
import { AnimatedPartners } from "@/components/public/AnimatedPartners";
import { AnimatedMetrics } from "@/components/public/AnimatedMetrics";
import { HomeBuySmallBanner } from "@/components/public/HomeBuySmallBanner";
import {
  ParallaxLayer,
  ScrollReveal,
  ScrollScale,
  StaggerChildren,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Pet-Feb Solar | Building Your Visions, Creating Reality",
  description:
    "Powering homes, businesses, and communities across Nigeria with clean solar energy solutions, Tier-1 products, certified installations, and flexible Buy Small financing.",
};

export default async function HomePage() {
  const products = await getPublishedProducts();

  return (
    <div className="pb-16 overflow-x-clip bg-white">
      {/* ── Scene 1. Hero Section — Matching Figma node 6139:2797 ────── */}
      <section className="w-full relative">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 pt-[80px]">
          {/* Hero Text Row: headline left, description right */}
          <ScrollReveal className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 mb-[58px]">
            {/* Left: Yellow dot + Large Headline */}
            <div className="flex items-start gap-4">
              <span
                className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0 mt-2 sm:mt-3"
                aria-hidden="true"
              />
              <h1
                data-type="display"
                className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[48px] text-[#333] tracking-[1.44px] uppercase leading-tight max-w-[670px]"
                style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
              >
                Building your visions, Creating reality.
              </h1>
            </div>

            {/* Right: Description */}
            <p
              className="font-heading font-normal text-[18px] sm:text-[20px] lg:text-[24px] text-[#333] text-left lg:text-right tracking-[0.72px] uppercase max-w-[498px] leading-normal"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              Powering homes, businesses, and communities across Nigeria with clean solar energy solutions.
            </p>
          </ScrollReveal>

          {/* Hero Video with overlay buttons (matching Figma Frame 6139:2805 "Hero Img" container) */}
          <ScrollScale from={0.94} rise={32}>
            <div className="relative rounded-[31px] overflow-hidden h-[400px] sm:h-[600px] lg:h-[867px] w-full bg-black shadow-lg">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/hero-poster.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/hero-video.mov" type="video/quicktime" />
                <source src="/videos/HERO%20VIDEO.MOV" type="video/quicktime" />
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/35 pointer-events-none" />

              {/* CTA Buttons — positioned over the hero video */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[60px] sm:top-[110px] flex gap-4 z-10 w-full justify-center px-4">
                <Link
                  href="/shop"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-[18px] rounded-[16px] text-base sm:text-lg font-bold font-heading bg-[#7BB042] text-[#F2F7EC] hover:bg-[#6AA035] transition-all shadow-md shrink-0"
                >
                  <span>Explore Products</span>
                  <ShoppingCart className="w-[17px] h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2.5 px-[26px] py-[18px] rounded-[16px] text-base sm:text-lg font-bold font-heading bg-[#F2F7EC] text-[#7BB042] border-2 border-[#D6E7C4] hover:bg-white transition-all shrink-0"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>
          </ScrollScale>
        </div>
      </section>

      {/* ── Scene 2. Solar Partners ──────────────────────────────────────── */}
      <div className="pt-8 sm:pt-12">
        <AnimatedPartners />
      </div>

      {/* ── Scene 3. Impact Metrics — Black rounded card ─────────────────── */}
      <div className="pt-8 sm:pt-12">
        <AnimatedMetrics />
      </div>

      {/* ── Scene 4. Buy Small Scheme Banner — Yellow background matching Figma ──── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
          <ScrollScale from={0.93} rise={40}>
            <HomeBuySmallBanner />
          </ScrollScale>
        </section>
      </div>

      {/* ── Scene 5. Product Showcase — Black container ──────────────────── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
          <ScrollScale from={0.94} rise={36}>
            <HomeProductSection products={products} />
          </ScrollScale>
        </section>
      </div>

      {/* ── Scene 6. Training CTA — Split Photo Left, Yellow Right matching Figma 6139:3029 ── */}
      <div className="pt-8 sm:pt-12">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
          <ScrollScale from={0.93} rise={40}>
            <div className="rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[426px] shadow-sm">
              {/* Left Column: Technician Photography with Parallax */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[426px] overflow-hidden">
                <ParallaxLayer
                  travel={18}
                  scaleFrom={1.06}
                  className="absolute -inset-x-0 -top-5 -bottom-5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma-assets/mission-img-2.png"
                    alt="Petfeb hands-on solar training lab"
                    className="w-full h-full object-cover"
                  />
                </ParallaxLayer>
                {/* Location badge */}
                <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
                  Lekki Phase 1, 2024
                </div>
              </div>

              {/* Right Column: Yellow container matching Figma 6139:3035 */}
              <div className="lg:col-span-7 bg-[#F5B82E] p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-5">
                <ScrollReveal direction="left" distance={36} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" />
                    <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-black tracking-tight">
                      Join Our Next Training Today
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-black/90 leading-relaxed font-normal max-w-xl">
                    Petfeb Solar Training is designed to equip individuals with hands-on knowledge in solar installation,
                    maintenance, and system design. Weather you&apos;re starting out or upgrading your skills, our training
                    prepares you to work confidently in the fast-growing solar industry
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" distance={24} delay={0.1} className="pt-2">
                  <Link
                    href="/training"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-[12px] text-base sm:text-lg font-bold font-heading bg-black text-white hover:bg-gray-900 transition shadow-sm"
                  >
                    Join Training
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </ScrollScale>
        </div>
      </div>

      {/* ── Scene 7. Project Gallery — Black Container matching Figma 6139:3045 ── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
              <ScrollReveal className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="max-w-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                      Project
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                    From residential rooftops to large-scale commercial installations, Pet-Feb has delivered
                    solar solutions that light up communities and drive sustainable growth. Explore some of
                    our latest projects and see how we&apos;re building a cleaner, brighter future across Nigeria.
                  </p>
                </div>
                <div className="shrink-0 pt-2">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-white hover:text-[#7BB042] transition"
                  >
                    <span>See More Projects</span>
                    <ChevronRight className="w-4 h-4 text-[#F5B82E]" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Project Accordion Component */}
              <HomeProjectAccordion />
            </div>
          </ScrollScale>
        </section>
      </div>

      {/* ── Scene 8. Client Testimonials — Yellow Container with 3 Black Cards matching Figma 6139:3104 ── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
          <ScrollScale from={0.93} rise={40}>
            <div className="bg-[#F5B82E] rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
              <ScrollReveal className="max-w-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Client Says
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-black/85 leading-relaxed font-normal">
                  Our work speaks through the voices of our clients. From homeowners to businesses, see how Pet-Feb&apos;s solar solutions are transforming lives, cutting costs, and delivering dependable energy every day.
                </p>
              </ScrollReveal>

              {/* 3 Real Testimonial Cards on Black Background with Staggered Reveal (matching reference video 00:07) */}
              <StaggerChildren
                staggerDelay={0.11}
                distance={64}
                scale={0.92}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              >
                {/* Card 1: Mr Phillip */}
                <div className="bg-black text-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-lg hover-lift h-full">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#333] flex items-center justify-center font-heading font-bold text-xl text-white">
                      MP
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                        Mr Phillip (inverter project customer)
                      </h3>
                      <p className="text-xs text-gray-400">
                        Pet-Feb Client
                      </p>
                      <div className="flex items-center gap-1 pt-1 text-[#F5B82E]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed font-normal">
                      &quot;I don&apos;t have to think about light ever again! I&apos;m so happy the installation is finished. God bless you.&quot;
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 font-medium pt-2">
                    23 - 09 - 2025
                  </div>
                </div>

                {/* Card 2: Miss Diamond */}
                <div className="bg-black text-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-lg hover-lift h-full">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#333] flex items-center justify-center font-heading font-bold text-xl text-white">
                      MD
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                        Miss Diamond (solar generator customer)
                      </h3>
                      <p className="text-xs text-gray-400">
                        Pet-Feb Client
                      </p>
                      <div className="flex items-center gap-1 pt-1 text-[#F5B82E]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed font-normal">
                      &quot;Yes, I am enjoying the system, very well. And thanks for the service, too. I have to commend you guys. I really hate poor customer service, and that&apos;s what made me leave the first vendor I contacted.&quot;
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 font-medium pt-2">
                    23 - 09 - 2025
                  </div>
                </div>

                {/* Card 3: MD Avoshe */}
                <div className="bg-black text-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-lg hover-lift h-full">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#333] flex items-center justify-center font-heading font-bold text-xl text-white">
                      MP
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                        MD Avoshe (Estate security streetlights project)
                      </h3>
                      <p className="text-xs text-gray-400">
                        Pet-Feb Client
                      </p>
                      <div className="flex items-center gap-1 pt-1 text-[#F5B82E]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed font-normal">
                      &quot;Good Evening Boss. Security Light successfully installed and it is working. Thank You Pet-Feb. May your company continue to record more wins. Amen.&quot;
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 font-medium pt-2">
                    23 - 09 - 2025
                  </div>
                </div>
              </StaggerChildren>
            </div>
          </ScrollScale>
        </section>
      </div>

      {/* ── Scene 9. Contact Information — Black Container matching Figma 6139:3176 ── */}
      <div id="contact" className="pt-8 sm:pt-12 scroll-mt-28 sm:scroll-mt-32">
        <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                    Stay in touch with Us Contact Information
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  Chat with us to get free consultation service, make enquiries stay up to date with our latest project and products
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <HomeContactForm />
              </ScrollReveal>
            </div>
          </ScrollScale>
        </section>
      </div>
    </div>
  );
}
