import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Zap, ShieldAlert, Check } from "lucide-react";

export function AboutFeaturedStory() {
  return (
    <section
      aria-label="Featured Impact Story"
      className="bg-white py-14 lg:py-20 border-t border-gray-100"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px]">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
            <span>Featured Impact Story</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
            Light Up Umueri: Powering Community Healthcare & Daily Lives
          </h2>
          <p className="mt-3 text-[#555555] text-sm sm:text-base leading-relaxed">
            A real-world case study in replacing unreliable grid dependency and generator fuel costs with a robust, community-scale hybrid solar microgrid.
          </p>
        </div>

        {/* Editorial Feature Container */}
        <div className="bg-[#FAFBF9] rounded-[24px] border border-gray-200/90 overflow-hidden shadow-[0px_4px_24px_rgba(45,45,45,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Column: Authentic Project Image & Badges */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-neutral-900 overflow-hidden">
              <Image
                src="/api/websitepic/community"
                alt="Pet-Feb solar installation for Light Up Umueri community project"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badges Over Image */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B82E]" />
                  Anambra State, Nigeria
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#7BB042] text-white shadow-xs">
                  <Zap className="w-3.5 h-3.5" />
                  12kWp Hybrid Microgrid
                </span>
              </div>

              {/* Bottom Project Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#F5B82E]">
                  Commissioned Project • 2024
                </p>
                <p className="text-sm font-heading font-medium text-white/95 mt-0.5">
                  Primary Healthcare Clinic & Communal Center Array
                </p>
              </div>
            </div>

            {/* Right Column: Editorial Narrative (Challenge, Solution, Outcome) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              {/* Challenge & Solution Grid */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-rose-700 font-heading font-bold text-sm tracking-wide uppercase mb-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    The Umueri community experienced severe national grid instability, frequently lasting weeks without electrical power. The primary healthcare outpost struggled to refrigerate essential vaccines and emergency medical supplies, while communal lighting and water boreholes depended entirely on expensive, toxic petrol generators.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#3F6B1A] font-heading font-bold text-sm tracking-wide uppercase mb-1.5">
                    <Zap className="w-4 h-4 text-[#7BB042]" />
                    <span>The Pet-Feb Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    Pet-Feb engineers performed a comprehensive load profile audit and installed a centralized hybrid solar microgrid featuring 24 high-efficiency 500W monocrystalline panels (12kWp), a 15kVA low-frequency inverter, and a 30kWh lithium iron phosphate (LiFePO4) storage bank, complete with surge arrestors and copper earth rods.
                  </p>
                </div>

                {/* Verified Results & Outcomes */}
                <div className="bg-white rounded-[16px] p-4 sm:p-5 border border-[#D2E8B5]/80">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-gray-950 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                    <span>Verified Real-World Results</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>24/7 continuous power</strong> for critical clinic cold chain vaccine refrigeration.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>14,000+ litres</strong> of generator fuel eliminated annually.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>80%+ reduction</strong> in community electricity expenditures.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>Local technician training</strong> conducted for ongoing maintenance and safety.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button linking to real project details */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/80">
                <span className="text-xs text-[#666666]">
                  Verified case data from Pet-Feb engineering records.
                </span>
                <Link
                  href="/projects/light-up-umueri"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7BB042] hover:bg-[#6CA035] text-white font-heading font-semibold text-xs sm:text-sm shadow-xs transition-all duration-200"
                >
                  <span>Explore Full Project Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
