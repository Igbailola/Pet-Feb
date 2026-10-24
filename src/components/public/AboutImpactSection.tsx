"use client";

import React from "react";
import { Sun, Building2, Zap, GraduationCap } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";

interface ImpactStat {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const VERIFIED_IMPACT_METRICS: ImpactStat[] = [
  {
    target: 5,
    suffix: "+",
    label: "Years of Solar Experience",
    detail: "Continuous engineering leadership and renewable installations since 2019",
    icon: Sun,
  },
  {
    target: 3000,
    prefix: "",
    suffix: "+",
    label: "Homes & Businesses Powered",
    detail: "Supplying dependable clean electricity across Lagos, Abuja, and nationwide",
    icon: Building2,
  },
  {
    target: 1156,
    prefix: "",
    suffix: "",
    label: "Solar Panels Installed",
    detail: "High-efficiency Tier-1 monocrystalline photovoltaic modules deployed",
    icon: Zap,
  },
  {
    target: 6000,
    prefix: "+",
    suffix: "",
    label: "People Trained in Solar Tech",
    detail: "Local engineers, technicians, and youth equipped with solar skills",
    icon: GraduationCap,
  },
];

export function AboutImpactSection() {
  return (
    <section
      aria-label="Pet-Feb Verified Impact"
      className="w-full bg-[#F8FAF6] border-y border-[#E2ECD8] py-12 lg:py-16"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px]">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3F6B1A] border border-[#D2E8B5] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
            <span>Verified Impact</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
            Real-World Impact Backed by Verified Data
          </h2>
          <p className="mt-3 text-[#555555] text-sm sm:text-base leading-relaxed">
            Our numbers reflect tangible progress in powering Nigerian communities, businesses, and clean-energy professionals.
          </p>
        </div>

        {/* 4-Column Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {VERIFIED_IMPACT_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="bg-white rounded-[20px] p-6 border border-gray-200/90 shadow-[0px_4px_16px_rgba(45,45,45,0.04)] hover:shadow-[0px_8px_24px_rgba(123,176,66,0.12)] hover:border-[#7BB042]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#7BB042]" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <CountUp
                      target={metric.target}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      duration={1200}
                      className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-base text-gray-900 mt-2">
                    {metric.label}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#666666] leading-relaxed mt-3 pt-3 border-t border-gray-100">
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
