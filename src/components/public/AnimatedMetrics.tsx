"use client";

import { Sun, Home as HomeIcon, Zap, Recycle } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { CountUp } from "@/components/motion/CountUp";

const METRICS = [
  {
    icon: Sun,
    iconSize: "w-5 h-5",
    target: 7,
    suffix: "+",
    label: "Years of Solar Experience",
  },
  {
    icon: HomeIcon,
    iconSize: "w-4 h-4",
    target: 3,
    suffix: "k +",
    label: "Homes & Businesses Powered",
  },
  {
    icon: Zap,
    iconSize: "w-4 h-4",
    target: 1156,
    suffix: "",
    label: "Panels Installed Nationwide",
  },
  {
    icon: Recycle,
    iconSize: "w-4 h-4",
    target: 4573,
    suffix: "",
    label: "Recycled Materials",
  },
] as const;

export function AnimatedMetrics() {
  return (
    <ScrollReveal direction="none" clip="up" duration={0.65}>
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-black rounded-[32px] px-[45px] py-[25px] overflow-hidden">
          <div className="space-y-4">
            <ScrollReveal>
              <h2 className="font-heading font-medium text-[28px] sm:text-[32px] text-[#FEF8EA] text-center tracking-[-0.16px] leading-[1.3]">
                Some interesting Fact About Us
              </h2>
            </ScrollReveal>

            <StaggerChildren
              staggerDelay={0.08}
              direction="up"
              distance={48}
              scale={0.8}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 py-4 justify-items-center"
            >
              {METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="space-y-2 flex flex-col items-center w-full max-w-[200px]"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#70A03C] text-white flex items-center justify-center">
                        <Icon className={metric.iconSize} />
                      </div>
                      <CountUp
                        target={metric.target}
                        suffix={metric.suffix}
                        className="font-heading font-medium text-[24px] sm:text-[28px] lg:text-[32px] text-white tracking-[-0.16px]"
                        duration={1100}
                      />
                    </div>
                    <p className="text-[11px] sm:text-sm text-[#FEF8EA]/70 font-normal text-center leading-tight">
                      {metric.label}
                    </p>
                  </div>
                );
              })}

              {/* 5. +6k Trainees — special avatar composition */}
              <div className="space-y-2 flex flex-col items-center w-full max-w-[200px] col-span-2 sm:col-span-1">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-700 border-2 border-black text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                    A
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-600 border-2 border-black text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                    B
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-600 border-2 border-black text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                    C
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-600 border-2 border-black text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                    D
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5B82E] border-2 border-black text-black flex items-center justify-center text-[10px] sm:text-xs font-extrabold">
                    <CountUp target={6} prefix="+" suffix="k" duration={1200} />
                  </div>
                </div>
                <p className="text-[11px] sm:text-sm text-[#FEF8EA]/70 font-normal text-center leading-tight">
                  People Trained in Renewable Energy
                </p>
              </div>
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}
