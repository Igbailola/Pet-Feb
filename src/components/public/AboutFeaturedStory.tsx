import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Zap, ShieldAlert, Check } from "lucide-react";

export function AboutFeaturedStory() {
  return (
    <section
      aria-label="Featured Impact Story"
      className="bg-white py-14 lg:py-20 border-t border-gray-100"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
            <span>Featured Impact Story</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
            “Light Up Umueri” — A Journey to Power Up Lives Through Renewable Energy
          </h2>
          <p className="mt-3 text-[#555555] text-sm sm:text-base leading-relaxed">
            In June 2023, Pet-Feb embarked on an inspiring journey to the serene community of Umueri, Anambra State, to bring clean, affordable, and sustainable energy to underserved regions.
          </p>
        </div>

        {/* Editorial Feature Container */}
        <div className="bg-[#FAFBF9] rounded-[24px] border border-gray-200/90 overflow-hidden shadow-[0px_4px_24px_rgba(45,45,45,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Column: Authentic Project Image & Badges */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-neutral-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/CWkdJA2gAFDbAqRSfKsMSs3EJU.png?width=3906&height=1656"
                alt="Pet-Feb solar installation for Light Up Umueri community project"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badges Over Image */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B82E]" />
                  Umueri, Anambra State
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#7BB042] text-white shadow-xs">
                  <Zap className="w-3.5 h-3.5" />
                  500 Home Kits & 1,500 Lamps
                </span>
              </div>

              {/* Bottom Project Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#F5B82E]">
                  Collaboration Project • June 2023
                </p>
                <p className="text-sm font-heading font-medium text-white/95 mt-0.5">
                  Community Rural Electrification & Capacity Building
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
                    <span>Project Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    Sparked by the initiative of a passionate local ambassador who believed in our vision, this partnership grew into a transformative rural electrification program titled “Light Up Umueri.” Our team worked closely with local leaders, youth groups, and women’s associations to identify community needs and deliver solutions tailored to their realities.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#3F6B1A] font-heading font-bold text-sm tracking-wide uppercase mb-1.5">
                    <Zap className="w-4 h-4 text-[#7BB042]" />
                    <span>Training & Community Ownership</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    Beyond technology deployment, Pet-Feb engineers conducted on-site demonstrations showing residents—with particular attention to elderly residents and caregivers—how to safely operate, maintain, and troubleshoot their solar systems, fostering long-term ownership and sustainability.
                  </p>
                </div>

                {/* Verified Results & Outcomes */}
                <div className="bg-white rounded-[16px] p-4 sm:p-5 border border-[#D2E8B5]/80">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-gray-950 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                    <span>Key Highlights & Impact</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>1,500 solar reading lamps</strong> distributed to students to extend study hours.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>500 solar home kits</strong> provided to low-income households for consistent power.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>Memorable milestone:</strong> powered the home of an elderly woman aged nearly 120.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-[13px] text-[#444444]">
                      <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span><strong>On-site user training</strong> for residents to ensure system longevity and self-reliance.</span>
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
