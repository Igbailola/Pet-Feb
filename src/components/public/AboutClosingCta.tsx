import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, PhoneCall, Sparkles } from "lucide-react";

export function AboutClosingCta() {
  return (
    <section
      aria-label="Call to Action"
      className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px] py-14 lg:py-20"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B150A] via-[#0E1B0D] to-[#162714] text-white border border-[#7BB042]/30 shadow-[0px_12px_40px_rgba(0,0,0,0.25)] p-8 sm:p-12 lg:p-16">
        {/* Subtle Ambient Background Accents */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#7BB042]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#F5B82E]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7BB042]/20 text-[#A2E060] border border-[#7BB042]/40 text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Your Clean Energy Journey</span>
          </div>

          {/* Suggested Headline */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Let’s Build Your Energy Future.
          </h2>

          {/* Supporting Copy based on existing services */}
          <p className="mt-5 text-[#E0E0E0] text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-2xl">
            Whether powering your home, reducing commercial operating costs, or electrifying a community, Pet-Feb delivers certified Tier-1 solar systems, flexible Buy Small financing, and lifetime maintenance across Nigeria.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full font-heading font-bold text-sm sm:text-base bg-[#7BB042] text-white hover:bg-[#6CA035] shadow-[0px_4px_16px_rgba(123,176,66,0.35)] active:scale-[0.98] transition-all duration-200"
            >
              <span>Get a Solar Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-heading font-bold text-sm sm:text-base bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 active:scale-[0.98] transition-all duration-200"
            >
              <span>Explore Our Projects</span>
            </Link>
          </div>

          {/* Trust Value Pillars */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#7BB042] shrink-0" />
              <span>Certified Tier-1 Equipment</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
              <Zap className="w-4 h-4 text-[#F5B82E] shrink-0" />
              <span>Buy Small Financing Available</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
              <PhoneCall className="w-4 h-4 text-[#7BB042] shrink-0" />
              <span>Nationwide Installation & Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
