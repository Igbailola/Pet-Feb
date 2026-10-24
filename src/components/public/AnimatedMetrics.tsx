"use client";

import { Sun, Home as HomeIcon, Zap, Recycle } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { CountUp } from "@/components/motion/CountUp";

const METRICS = [
  {
    icon: Sun,
    iconSize: "w-5 h-5",
    target: 5,
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
    <section className="w-full bg-[#F4F8F1] border-y border-[#E2ECD8] py-8 sm:py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <ScrollReveal>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 text-center tracking-tight">
            Some interesting Fact About Us
          </h2>
        </ScrollReveal>

        <StaggerChildren
          staggerDelay={0.08}
          direction="up"
          distance={48}
          scale={0.8}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center text-center"
        >
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="space-y-2 flex flex-col items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#7BB042] text-white flex items-center justify-center shadow-xs">
                    <Icon className={metric.iconSize} />
                  </div>
                  <CountUp
                    target={metric.target}
                    suffix={metric.suffix}
                    className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950"
                    duration={1100}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {metric.label}
                </p>
              </div>
            );
          })}

          {/* 5. +6k Trainees — special avatar composition */}
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
              <div className="w-8 h-8 rounded-full bg-[#F5B82E] border-2 border-white text-black flex items-center justify-center text-xs font-extrabold shadow-xs">
                <CountUp target={6} prefix="+" suffix="k" duration={1200} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 font-medium">
              People Trained in Renewable Energy
            </p>
          </div>
        </StaggerChildren>
      </div>
    </section>
    </ScrollReveal>
  );
}
