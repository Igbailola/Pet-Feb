import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowRight,
  Sun,
  Home as HomeIcon,
  Zap,
  Recycle,
  Check,
  Star,
  Users,
} from "lucide-react";
import {
  getPublishedProducts,
} from "@/lib/public-data";
import { HomeProductSection } from "@/components/public/HomeProductSection";
import { HomeProjectAccordion } from "@/components/public/HomeProjectAccordion";
import { HomeContactForm } from "@/components/public/HomeContactForm";

export const metadata: Metadata = {
  title: "Pet-Feb Solar | Building Your Visions, Creating Reality",
  description:
    "Powering homes, businesses, and communities across Nigeria with clean solar energy solutions, Tier-1 products, certified installations, and flexible Buy Small financing.",
};

export default async function HomePage() {
  const products = await getPublishedProducts();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-x-hidden">
      {/* ── 1. Hero Section (Figma Frame 4144:1473 "Hero Img") ─────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pt-4 sm:pt-8">
        <div className="relative rounded-[24px] overflow-hidden bg-gray-950 text-white min-h-[560px] sm:min-h-[680px] lg:min-h-[740px] flex items-center justify-center text-center border border-gray-800 shadow-2xl">
          {/* Hero Background Image (Modern Villa with Rooftop Solar & Field Tracker) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma-assets/hero-bg.png"
            alt="Petfeb Solar Villa"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-black/45 backdrop-brightness-85" />

          {/* Centered Hero Content matching Figma Frame 4144:1473 */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-20 space-y-6 sm:space-y-8">
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] uppercase text-white drop-shadow-md">
              BUILDING YOUR VISIONS,
              <br />
              CREATING REALITY
            </h1>

            <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-200 tracking-wider uppercase max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              POWERING HOMES, BUSINESSES, AND COMMUNITIES ACROSS NIGERIA WITH CLEAN SOLAR ENERGY SOLUTIONS.
            </p>

            {/* Centered CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition-all shadow-md min-h-[50px]"
              >
                <span>Explore Products</span>
                <ShoppingCart className="w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-[#F4F8F1] text-[#3F6B1A] hover:bg-white transition-all shadow-sm min-h-[50px]"
              >
                <span>View Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Our Current Solar Partners (Figma Frame 4144:1485) ───────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="space-y-6">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-950 text-center tracking-tight">
            Our Current Solar Partners
          </h2>

          <div className="bg-white/80 rounded-2xl border border-gray-100 p-6 sm:p-8 flex flex-wrap items-center justify-around gap-8 sm:gap-12 shadow-2xs">
            {/* Felicity Solar */}
            <div className="h-8 sm:h-9 flex items-center justify-center grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/partner-felicity.png"
                alt="Felicity Solar"
                className="max-h-full w-auto object-contain"
              />
            </div>
            {/* Growatt Portable */}
            <div className="h-12 sm:h-14 flex items-center justify-center grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/partner-growatt.png"
                alt="Growatt Portable"
                className="max-h-full w-auto object-contain"
              />
            </div>
            {/* MoPower */}
            <div className="h-10 sm:h-12 flex items-center justify-center grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/partner-mopower.png"
                alt="MoPower"
                className="max-h-full w-auto object-contain"
              />
            </div>
            {/* BeeBeeJump */}
            <div className="h-12 sm:h-14 flex items-center justify-center grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/partner-beebeejump.png"
                alt="Beebeejump Solar"
                className="max-h-full w-auto object-contain"
              />
            </div>
            {/* Amaron Quanta */}
            <div className="h-12 sm:h-14 flex items-center justify-center grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/partner-amaron.png"
                alt="Amaron Quanta"
                className="max-h-full w-auto object-contain"
              />
            </div>
          </div>

          <div className="border-b border-[#E5E7EB] pt-4" />
        </div>
      </section>

      {/* ── 3. Some interesting Fact About Us (Figma Frame 4144:1495) ───── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#F4F8F1] rounded-[24px] p-8 sm:p-12 border border-[#E2ECD8] space-y-8">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-950 text-center tracking-tight">
            Some interesting Fact About Us
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center text-center">
            {/* 1. 5+ Years */}
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#7BB042] text-white flex items-center justify-center shadow-xs">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                  5+
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Years of Solar Experience
              </p>
            </div>

            {/* 2. 3k + Homes */}
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#7BB042] text-white flex items-center justify-center shadow-xs">
                  <HomeIcon className="w-4 h-4" />
                </div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                  3k +
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Homes &amp; Businesses Powered
              </p>
            </div>

            {/* 3. 1156 Panels */}
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#7BB042] text-white flex items-center justify-center shadow-xs">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                  1156
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Panels Installed Nationwide
              </p>
            </div>

            {/* 4. 4573 Recycled */}
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#7BB042] text-white flex items-center justify-center shadow-xs">
                  <Recycle className="w-4 h-4" />
                </div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                  4573
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Recycled Materials
              </p>
            </div>

            {/* 5. +6k Trainees */}
            <div className="col-span-2 md:col-span-1 space-y-2 flex flex-col items-center">
              <div className="flex items-center -space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 border-2 border-white text-white flex items-center justify-center text-[10px] font-bold">
                  A
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-600 border-2 border-white text-white flex items-center justify-center text-[10px] font-bold">
                  B
                </div>
                <div className="w-7 h-7 rounded-full bg-sky-600 border-2 border-white text-white flex items-center justify-center text-[10px] font-bold">
                  C
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center text-[10px] font-bold">
                  D
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F5B82E] border-2 border-white text-black flex items-center justify-center text-[10px] font-extrabold shadow-xs">
                  +6k
                </div>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                People Trained in Renewable Energy
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-[#E5E7EB] pt-8" />
      </section>

      {/* ── 4. Vision & Mission (Figma Frame 4144:1573) ─────────────────── */}
      <section className="space-y-16">
        {/* Our Vision */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Overlapping Photos */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[480px]">
              <div className="absolute left-0 top-0 w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/vision-img-1.png"
                  alt="Solar wind clean energy landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute right-4 sm:right-12 bottom-0 w-72 sm:w-96 h-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma-assets/vision-img-3.png"
                  alt="African solar technician installing solar panels"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Vision Text */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-950">
                Our Vision
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                At Pet-Feb, our vision is to lead Nigeria’s transition into clean, renewable energy by delivering reliable and innovative solar solutions. We aim to create a sustainable future where homes, businesses, and communities thrive through affordable power.
              </p>

              {/* Checklist */}
              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    Become Nigeria’s most trusted provider of solar energy solutions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    Drive widespread adoption of renewable energy across Africa.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    Build sustainable communities powered by clean energy.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    Inspire innovation in eco-friendly technologies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-[#F4F8F1] py-14 sm:py-20 border-y border-[#E2ECD8]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left: Mission Text */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-950">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                  Our mission is to provide affordable, efficient, and sustainable solar power solutions that meet the energy needs of Nigerians today while safeguarding the environment for tomorrow.
                </p>

                {/* Checklist */}
                <ul className="space-y-3.5 pt-2">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Deliver world-class solar products and installations across Nigeria
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Train and empower individuals with solar energy knowledge and skills.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Promote recycling and eco-friendly practices in the solar industry.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white text-[#3F6B1A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Provide customer-focused services with integrity and professionalism.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right: Overlapping Photos */}
              <div className="lg:col-span-6 relative h-[380px] sm:h-[480px]">
                <div className="absolute right-0 top-0 w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma-assets/mission-img-1.png"
                    alt="Engineers and architects on solar site"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute left-4 sm:left-12 bottom-0 w-72 sm:w-96 h-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma-assets/mission-img-2.png"
                    alt="Technical crew installing solar panels on rooftop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Product Section (Figma Frame 4144:1616) ─────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <HomeProductSection products={products} />
      </section>

      {/* ── 6. Join Our Next Training Today (Figma Frame 4144:1685) ─────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="rounded-[24px] overflow-hidden shadow-lg border border-gray-200 grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          {/* Left Half: Photo */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma-assets/mission-img-2.png"
              alt="Petfeb hands-on solar training lab"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Half: Apple Green Container */}
          <div className="lg:col-span-7 bg-[#7BB042] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-4">
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
          </div>
        </div>
      </section>

      {/* ── 7. Project Section (Figma Frame 4144:1686) ─────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
              Project
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From residential rooftops to large-scale commercial installations, Pet-Feb has delivered solar solutions that light up communities and drive sustainable growth. Explore some of our latest projects and see how we’re building a cleaner, brighter future across Nigeria.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7BB042] hover:text-[#6EA138] transition"
            >
              <span>See More Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project Accordion Component */}
        <HomeProjectAccordion />
      </section>

      {/* ── 8. Blog Post Section (Figma Frame 4144:1743) ────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
            Blog Post
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Stay updated with the latest in solar technology, sustainability trends, and renewable energy solutions. Our blog shares expert tips, project highlights, and inspiring stories to help you make the switch to clean, reliable power.
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#F2F7EC] px-3 py-1 rounded-full inline-block">
                Training
              </span>
              <h3 className="font-heading font-bold text-lg text-gray-950 leading-snug">
                <Link href="/blog" className="hover:text-[#3F6B1A] transition">
                  Lighting Up Communities Pet-Feb’s Renewable Energy Projects Transforming Lives
                </Link>
              </h3>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                Discover how Pet-Feb’s solar projects are delivering affordable, reliable clean energy to Nigerian homes and businesses.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#F2F7EC] px-3 py-1 rounded-full inline-block">
                Project
              </span>
              <h3 className="font-heading font-bold text-lg text-gray-950 leading-snug">
                <Link href="/blog" className="hover:text-[#3F6B1A] transition">
                  Pet-Feb Expands to Port Harcourt Bringing Solar Innovation Closer to Southern Nigeria
                </Link>
              </h3>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                Pet-Feb opens a new regional office in Port Harcourt, reinforcing its commitment to clean energy access, innovation, and customer support.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#F2F7EC] px-3 py-1 rounded-full inline-block">
                News
              </span>
              <h3 className="font-heading font-bold text-lg text-gray-950 leading-snug">
                <Link href="/blog" className="hover:text-[#3F6B1A] transition">
                  Empowering Tomorrow’s Engineers How Pet-Feb is Building Nigeria’s Solar Workforce
                </Link>
              </h3>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                Pet-Feb is shaping the future of Nigeria’s renewable energy sector by training young engineers and technicians in solar technology, innovation, and sustainability.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
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
        </div>
      </section>

      {/* ── 9. Client Says / Testimonials (Figma Frame 4144:1805) ───────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
            Client Says
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Our work speaks through the voices of our clients. From homeowners to businesses, see how Pet-Feb’s solar solutions are transforming lives, cutting costs, and delivering dependable energy every day.
          </p>
        </div>

        {/* 3 Real Testimonial Cards matching Figma frame 4144:1809 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Card 1: Mr Phillip */}
          <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-6 sm:p-8 space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)]">
            <div className="w-16 h-16 rounded-full bg-[#F2F7EC] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-2xl text-[#7BB042]">
              MP
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-gray-950">
                Mr Phillip (inverter project customer)
              </h3>
              <p className="text-xs text-gray-500">
                Pet-Feb Client
              </p>
              <div className="flex items-center gap-1 text-[#7BB042] pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-black" />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
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
            <div className="text-right text-[11px] text-gray-400 font-medium">
              23 - 09 - 2025
            </div>
          </div>

          {/* Card 2: Miss Diamond */}
          <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-6 sm:p-8 space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)]">
            <div className="w-16 h-16 rounded-full bg-[#F2F7EC] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-2xl text-[#7BB042]">
              MD
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-gray-950">
                Miss Diamond (solar generator customer)
              </h3>
              <p className="text-xs text-gray-500">
                Pet-Feb Client
              </p>
              <div className="flex items-center gap-1 text-[#7BB042] pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-black" />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
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
            <div className="text-right text-[11px] text-gray-400 font-medium">
              23 - 09 - 2025
            </div>
          </div>

          {/* Card 3: MD Avoshe */}
          <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-6 sm:p-8 space-y-5 shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)]">
            <div className="w-16 h-16 rounded-full bg-[#F2F7EC] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-2xl text-[#7BB042]">
              MP
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-gray-950">
                MD Avoshe (Estate security streetlights project)
              </h3>
              <p className="text-xs text-gray-500">
                Pet-Feb Client
              </p>
              <div className="flex items-center gap-1 text-[#7BB042] pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-black" />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
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
            <div className="text-right text-[11px] text-gray-400 font-medium">
              23 - 09 - 2025
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Contact Information (Figma Frame 4144:1876) ─────────────── */}
      <section className="bg-[#F4F8F1] py-14 sm:py-20 border-t border-[#E2ECD8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
              Stay in touch with Us Contact Information
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Chat with us to get free consultation service, make enquiries stay up to date with our latest project and products
            </p>
          </div>

          <HomeContactForm />
        </div>
      </section>
    </div>
  );
}
