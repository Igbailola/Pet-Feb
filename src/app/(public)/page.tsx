import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowRight,
  Check,
  Star,
  ChevronDown,
} from "lucide-react";
import {
  getPublishedProducts,
} from "@/lib/public-data";
import { HomeProductSection } from "@/components/public/HomeProductSection";
import { HomeProjectAccordion } from "@/components/public/HomeProjectAccordion";
import { HomeContactForm } from "@/components/public/HomeContactForm";
import { AnimatedPartners } from "@/components/public/AnimatedPartners";
import { AnimatedMetrics } from "@/components/public/AnimatedMetrics";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { ScrollScale, ParallaxLayer } from "@/components/motion/ScrollScale";
import { SceneHandoff } from "@/components/motion/SceneHandoff";

export const metadata: Metadata = {
  title: "Pet-Feb Solar | Building Your Visions, Creating Reality",
  description:
    "Powering homes, businesses, and communities across Nigeria with clean solar energy solutions, Tier-1 products, certified installations, and flexible Buy Small financing.",
};

export default async function HomePage() {
  const products = await getPublishedProducts();

  return (
    <div className="pb-16 overflow-x-clip">
      {/* ── Scene 1. Hero Section (Enhanced Cinematic Video Hero) — UNCHANGED ─── */}
      <section className="w-full relative">
        <div className="relative overflow-hidden bg-gray-950 text-white min-h-[620px] sm:min-h-[700px] lg:min-h-[780px] xl:min-h-[820px] flex items-center justify-center text-center">
          {/* Hero Background Video (looping cinematic reel) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/figma-assets/hero-bg.png"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Refined Gradient Overlay for Contrast & Cinematography */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />

          {/* Centered Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 sm:pt-20 pb-24 sm:pb-28 space-y-6 sm:space-y-8 flex flex-col items-center">
            {/* 1. Subtle Eyebrow Label */}
            <div className="hero-fade-up hero-delay-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-xs text-white/90 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042] shrink-0" />
              <span>POWERING A BRIGHTER FUTURE</span>
            </div>

            {/* 2. Refined Commanding Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[68px] tracking-tight leading-[1.08] uppercase text-white drop-shadow-md">
              <span className="block hero-fade-up hero-delay-2">
                BUILDING YOUR VISIONS,
              </span>
              <span className="block hero-fade-up hero-delay-3">
                CREATING REALITY
              </span>
            </h1>

            {/* 3. Subtitle */}
            <p className="hero-fade-up hero-delay-4 text-xs sm:text-sm md:text-base font-semibold text-gray-200 tracking-wider uppercase max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              POWERING HOMES, BUSINESSES, AND COMMUNITIES ACROSS NIGERIA WITH CLEAN SOLAR ENERGY SOLUTIONS.
            </p>

            {/* 4. Refined CTA Buttons */}
            <div className="hero-fade-up hero-delay-5 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] active:bg-[#5C8C2E] transition-all duration-200 shadow-md min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                <span>Explore Products</span>
                <ShoppingCart className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-[#F4F8F1] text-[#3F6B1A] hover:bg-white active:bg-gray-100 transition-all duration-200 shadow-sm min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                <span>View Projects</span>
              </Link>
            </div>
          </div>

          {/* 5. Minimal Scroll Cue */}
          <div className="hero-fade-up hero-delay-7 absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors z-10 pointer-events-auto select-none">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase font-heading text-gray-300">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="w-4 h-4 text-[#7BB042] hero-scroll-cue-bounce" />
          </div>
        </div>
      </section>

      {/* ── Scene 2. Solar Partners — staggered logo reveals ──────────────── */}
      <div className="pt-8 sm:pt-12">
        <AnimatedPartners />
      </div>

      {/* ── Scene 3. Impact Metrics — count-up + stagger ──────────────────── */}
      <div className="pt-8 sm:pt-12">
        <AnimatedMetrics />
      </div>

      {/* ── Scene 4. Vision & Mission — parallax photos, staggered reveals ── */}
      <div className="pt-8 sm:pt-12">
        <section>
          <SceneHandoff>
          {/* Our Vision */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left: Overlapping Photos */}
              <div className="lg:col-span-6 relative h-[340px] sm:h-[420px]">
                <ParallaxLayer travel={18} className="absolute left-0 top-0 w-56 sm:w-72 h-56 sm:h-72">
                  <ScrollReveal direction="left" distance={80} className="w-full h-full">
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <ScrollReveal direction="none" clip="right" duration={0.7} delay={0.1} className="w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/figma-assets/vision-img-1.png"
                          alt="Solar wind clean energy landscape"
                          className="w-full h-full object-cover"
                        />
                      </ScrollReveal>
                    </div>
                  </ScrollReveal>
                </ParallaxLayer>
                <ParallaxLayer travel={28} className="absolute right-4 sm:right-12 bottom-0 w-64 sm:w-80 h-64 sm:h-80 z-10">
                  <ScrollReveal direction="up" distance={110} delay={0.12} scale={0.9} className="w-full h-full">
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                      <ScrollReveal direction="none" clip="down" duration={0.7} delay={0.22} className="w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/figma-assets/vision-img-3.png"
                          alt="African solar technician installing solar panels"
                          className="w-full h-full object-cover"
                        />
                      </ScrollReveal>
                    </div>
                  </ScrollReveal>
                </ParallaxLayer>
              </div>

              {/* Right: Vision Text */}
              <div className="lg:col-span-6 space-y-6">
                <ScrollReveal direction="right" distance={48}>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#7BB042] shrink-0" aria-hidden="true" />
                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
                      Our Vision
                    </h2>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.08}>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                    At Pet-Feb, our vision is to lead Nigeria&apos;s transition into clean, renewable energy by delivering reliable and innovative solar solutions. We aim to create a sustainable future where homes, businesses, and communities thrive through affordable power.
                  </p>
                </ScrollReveal>

                {/* Checklist */}
                <StaggerChildren list staggerDelay={0.07} direction="right" distance={48} className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Become Nigeria&apos;s most trusted provider of solar energy solutions.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Drive widespread adoption of renewable energy across Africa.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Build sustainable communities powered by clean energy.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Inspire innovation in eco-friendly technologies.
                    </span>
                  </div>
                </StaggerChildren>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-[#F4F8F1] py-10 sm:py-12 border-y border-[#E2ECD8]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Left: Mission Text */}
                <div className="lg:col-span-6 space-y-6">
                  <ScrollReveal direction="left" distance={48}>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#7BB042] shrink-0" aria-hidden="true" />
                      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
                        Our Mission
                      </h2>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.08}>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                      Our mission is to provide affordable, efficient, and sustainable solar power solutions that meet the energy needs of Nigerians today while safeguarding the environment for tomorrow.
                    </p>
                  </ScrollReveal>

                  {/* Checklist */}
                  <StaggerChildren list staggerDelay={0.07} direction="left" distance={48} className="space-y-3.5 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Deliver world-class solar products and installations across Nigeria
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Train and empower individuals with solar energy knowledge and skills.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Promote recycling and eco-friendly practices in the solar industry.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Provide customer-focused services with integrity and professionalism.
                      </span>
                    </div>
                  </StaggerChildren>
                </div>

                {/* Right: Overlapping Photos */}
                <div className="lg:col-span-6 relative h-[340px] sm:h-[420px]">
                  <ParallaxLayer travel={18} className="absolute right-0 top-0 w-56 sm:w-72 h-56 sm:h-72">
                    <ScrollReveal direction="right" distance={80} className="w-full h-full">
                      <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <ScrollReveal direction="none" clip="left" duration={0.7} delay={0.1} className="w-full h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/figma-assets/mission-img-1.png"
                            alt="Engineers and architects on solar site"
                            className="w-full h-full object-cover"
                          />
                        </ScrollReveal>
                      </div>
                    </ScrollReveal>
                  </ParallaxLayer>
                  <ParallaxLayer travel={28} className="absolute left-4 sm:left-12 bottom-0 w-64 sm:w-80 h-64 sm:h-80 z-10">
                    <ScrollReveal direction="up" distance={110} delay={0.12} scale={0.9} className="w-full h-full">
                      <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                        <ScrollReveal direction="none" clip="up" duration={0.7} delay={0.22} className="w-full h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/figma-assets/mission-img-2.png"
                            alt="Technical crew installing solar panels on rooftop"
                            className="w-full h-full object-cover"
                          />
                        </ScrollReveal>
                      </div>
                    </ScrollReveal>
                  </ParallaxLayer>
                </div>
              </div>
            </div>
          </div>
          </SceneHandoff>
        </section>
      </div>

      {/* ── Scene 5. Product Showcase — staggered card reveals ────────────── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <HomeProductSection products={products} />
        </section>
      </div>

      {/* ── Scene 6. Training CTA — clip reveal ──────────────────────────── */}
      <div className="pt-8 sm:pt-12">
        <ScrollScale from={0.8} rise={60} className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="rounded-[24px] overflow-hidden shadow-lg border border-gray-200 grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Left Half: Photo */}
            <ScrollReveal direction="none" clip="right" duration={0.65} className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/mission-img-2.png"
                alt="Petfeb hands-on solar training lab"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </ScrollReveal>

            {/* Right Half: Apple Green Container */}
            <ScrollReveal direction="right" distance={60} delay={0.08} duration={0.6} className="lg:col-span-7 bg-[#7BB042] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-4">
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                Join Our Next Training Today
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 uppercase tracking-wider">
                Comprehensive Solar PV Installation, Inverter Sizing &amp; Battery Storage
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-xl">
                Empowering individuals and technicians with practical solar energy knowledge and skills. Learn hands-on rooftop mounting, electrical wiring, inverter programming, and lithium battery management at our training hubs.
              </p>
              <div className="pt-2">
                <Link
                  href="/training"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-[#3F6B1A] hover:bg-gray-100 transition shadow-sm"
                >
                  <span>Join Training</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ScrollScale>
      </div>

      {/* ── Scene 7. Project Gallery — staggered accordion reveals ────────── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <ScrollReveal className="max-w-2xl space-y-3">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
                Project
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                From residential rooftops to large-scale commercial installations, Pet-Feb has delivered solar solutions that light up communities and drive sustainable growth. Explore some of our latest projects and see how we&apos;re building a cleaner, brighter future across Nigeria.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" distance={40} delay={0.1} className="shrink-0">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#7BB042] hover:text-[#6EA138] transition"
              >
                <span>See More Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Project Accordion Component */}
          <ScrollReveal scale={0.93} distance={72} delay={0.06} duration={0.6}>
            <HomeProjectAccordion />
          </ScrollReveal>
        </section>
      </div>

      {/* ── Scene 8a. Blog Posts — staggered card reveals ─────────────────── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <ScrollReveal className="max-w-2xl space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
              Blog Post
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Stay updated with the latest in solar technology, sustainability trends, and renewable energy solutions. Our blog shares expert tips, project highlights, and inspiring stories to help you make the switch to clean, reliable power.
            </p>
          </ScrollReveal>

          {/* 3 Blog Cards Grid */}
          <StaggerChildren staggerDelay={0.09} distance={80} scale={0.94} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-[24px] border border-[#EBEBEB] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)] hover:shadow-md transition">
              <div className="h-52 rounded-[16px] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/blog-1.png"
                  alt="Solar field"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#F2F7EC] px-3 py-1 rounded-full inline-block">
                  Training
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950 leading-snug">
                  <Link href="/blog" className="hover:text-[#3F6B1A] transition">
                    Lighting Up Communities Pet-Feb&apos;s Renewable Energy Projects Transforming Lives
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  Discover how Pet-Feb&apos;s solar projects are delivering affordable, reliable clean energy to Nigerian homes and businesses.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-gray-700">
                    PF
                  </div>
                  <span className="font-medium text-gray-900">Pet-Feb</span>
                </div>
                <span>August 23, 2025</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[24px] border border-[#EBEBEB] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)] hover:shadow-md transition">
              <div className="h-52 rounded-[16px] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/blog-2.png"
                  alt="Solar panels ground mounted"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#F2F7EC] px-3 py-1 rounded-full inline-block">
                  Project
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950 leading-snug">
                  <Link href="/blog" className="hover:text-[#3F6B1A] transition">
                    Pet-Feb Expands to Port Harcourt Bringing Solar Innovation Closer to Southern Nigeria
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  Pet-Feb opens a new regional office in Port Harcourt, reinforcing its commitment to clean energy access, innovation, and customer support.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-gray-700">
                    PF
                  </div>
                  <span className="font-medium text-gray-900">Pet-Feb</span>
                </div>
                <span>August 23, 2025</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[24px] border border-[#EBEBEB] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)] hover:shadow-md transition">
              <div className="h-52 rounded-[16px] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/blog-1.png"
                  alt="Solar field"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#F2F7EC] px-3 py-1 rounded-full inline-block">
                  News
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950 leading-snug">
                  <Link href="/blog" className="hover:text-[#3F6B1A] transition">
                    Empowering Tomorrow&apos;s Engineers How Pet-Feb is Building Nigeria&apos;s Solar Workforce
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  Pet-Feb is shaping the future of Nigeria&apos;s renewable energy sector by training young engineers and technicians in solar technology, innovation, and sustainability.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-gray-700">
                    PF
                  </div>
                  <span className="font-medium text-gray-900">Pet-Feb</span>
                </div>
                <span>August 23, 2025</span>
              </div>
            </div>
          </StaggerChildren>
        </section>
      </div>

      {/* ── Scene 8b. Client Testimonials — staggered card reveals ────────── */}
      <div className="pt-8 sm:pt-12">
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <ScrollReveal className="max-w-2xl space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
              Client Says
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our work speaks through the voices of our clients. From homeowners to businesses, see how Pet-Feb&apos;s solar solutions are transforming lives, cutting costs, and delivering dependable energy every day.
            </p>
          </ScrollReveal>

          {/* 3 Real Testimonial Cards */}
          <StaggerChildren staggerDelay={0.09} direction="none" scale={0.84} duration={0.5} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Card 1: Mr Phillip */}
            <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-6 sm:p-8 space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)]">
              <div className="w-16 h-16 rounded-full bg-[#F2F7EC] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-2xl text-[#7BB042]">
                MP
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950">
                  Mr Phillip (inverter project customer)
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Pet-Feb Client
                </p>
                <div className="flex items-center gap-1 text-[#7BB042] pt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-black" />
                  ))}
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                &quot;I don&apos;t have to think about light ever again! I&apos;m so happy the installation is finished. God bless you.&quot;
              </p>
              {/* WhatsApp feedback proof screenshot */}
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/proof-phillip.png"
                  alt="Client feedback proof from Mr Phillip"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="text-right text-xs text-gray-400 font-medium">
                23 - 09 - 2025
              </div>
            </div>

            {/* Card 2: Miss Diamond */}
            <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-6 sm:p-8 space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)]">
              <div className="w-16 h-16 rounded-full bg-[#F2F7EC] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-2xl text-[#7BB042]">
                MD
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950">
                  Miss Diamond (solar generator customer)
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Pet-Feb Client
                </p>
                <div className="flex items-center gap-1 text-[#7BB042] pt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-black" />
                  ))}
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                &quot;Yes, I am enjoying the system, very well. And thanks for the service, too. I have to commend you guys. I really hate poor customer service, and that&apos;s what made me leave the first vendor I contacted.&quot;
              </p>
              {/* WhatsApp feedback proof screenshot */}
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/proof-diamond.png"
                  alt="Client feedback proof from Miss Diamond"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="text-right text-xs text-gray-400 font-medium">
                23 - 09 - 2025
              </div>
            </div>

            {/* Card 3: MD Avoshe */}
            <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-6 sm:p-8 space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)]">
              <div className="w-16 h-16 rounded-full bg-[#F2F7EC] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-2xl text-[#7BB042]">
                MP
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950">
                  MD Avoshe (Estate security streetlights project)
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Pet-Feb Client
                </p>
                <div className="flex items-center gap-1 text-[#7BB042] pt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-black" />
                  ))}
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                &quot;Good Evening Boss. Security Light successfully installed and it is working. Thank You Pet-Feb. May your company continue to record more wins. Amen.&quot;
              </p>
              {/* WhatsApp feedback proof screenshot */}
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/proof-avoshe.png"
                  alt="Client feedback proof from MD Avoshe"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="text-right text-xs text-gray-400 font-medium">
                23 - 09 - 2025
              </div>
            </div>
          </StaggerChildren>
        </section>
      </div>

      {/* ── Scene 9. Contact Information ──────────────────────────────────── */}
      <div className="pt-8 sm:pt-12">
        <section className="bg-[#F4F8F1] py-10 sm:py-12 border-t border-[#E2ECD8]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
            <ScrollReveal className="max-w-3xl space-y-3">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
                Stay in touch with Us Contact Information
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Chat with us to get free consultation service, make enquiries stay up to date with our latest project and products
              </p>
            </ScrollReveal>

            <ScrollReveal scale={0.94} distance={64} delay={0.06}>
              <HomeContactForm />
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
