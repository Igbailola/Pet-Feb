import React from "react";
import { ClipboardCheck, Compass, Wrench, ShieldCheck } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WORK_STEPS: Step[] = [
  {
    number: "01",
    title: "Consultation & Energy Audit",
    description:
      "We evaluate your current power consumption, assess historic outage patterns, and inspect roof or ground site orientation to determine your exact energy needs.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "System Planning & Design",
    description:
      "Our electrical engineers configure Tier-1 monocrystalline arrays, pure sine wave hybrid inverters, and high-cycle LiFePO4 batteries sized precisely for your load.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Installation & Commissioning",
    description:
      "Certified Pet-Feb technicians complete precision mounting, industrial surge suppression, earthing protection, and seamless sub-10ms changeover testing.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Support & Maintenance",
    description:
      "We provide scheduled preventative maintenance, system health checks, and responsive local support to ensure decades of dependable, clean electricity.",
    icon: ShieldCheck,
  },
];

export function AboutHowWeWork() {
  return (
    <section
      aria-label="How We Work Process"
      className="bg-white py-14 lg:py-20 border-t border-gray-100"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px]">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
            <span>Our Service Journey</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
            How We Work
          </h2>
          <p className="mt-3 text-[#555555] text-sm sm:text-base leading-relaxed">
            A clear, four-stage engineering sequence engineered to deliver reliable solar power without guesswork or disruption.
          </p>
        </div>

        {/* Steps: Connected Horizontal Layout on Desktop, Stacked on Mobile */}
        <div className="relative">
          {/* Subtle Desktop Connector Line */}
          <div
            className="hidden lg:block absolute top-[38px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-[#D2E8B5] via-[#7BB042] to-[#D2E8B5] z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
            {WORK_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group bg-white rounded-[20px] p-6 border border-gray-200/90 shadow-[0px_4px_16px_rgba(45,45,45,0.04)] hover:shadow-[0px_8px_24px_rgba(123,176,66,0.12)] hover:border-[#7BB042]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Step Number Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-[#7BB042] text-white font-mono font-bold text-sm flex items-center justify-center ring-4 ring-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                        {step.number}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#7BB042]" />
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-gray-950 leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-[11px] font-semibold text-[#3F6B1A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042] mr-1.5" />
                    <span>Stage {step.number} Verified Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
