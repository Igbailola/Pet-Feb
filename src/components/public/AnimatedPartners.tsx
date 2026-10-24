"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren } from "@/components/motion/StaggerChildren";

const PARTNERS = [
  {
    src: "/figma-assets/partner-felicity.png",
    alt: "Felicity Solar",
    height: "h-8 sm:h-9",
  },
  {
    src: "/figma-assets/partner-growatt.png",
    alt: "Growatt Portable",
    height: "h-12 sm:h-14",
  },
  {
    src: "/figma-assets/partner-mopower.png",
    alt: "MoPower",
    height: "h-10 sm:h-12",
  },
  {
    src: "/figma-assets/partner-beebeejump.png",
    alt: "Beebeejump Solar",
    height: "h-12 sm:h-14",
  },
  {
    src: "/figma-assets/partner-amaron.png",
    alt: "Amaron Quanta",
    height: "h-12 sm:h-14",
  },
];

export function AnimatedPartners() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-4">
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 text-center tracking-tight">
            Our Current Solar Partners
          </h2>
        </ScrollReveal>

        <StaggerChildren
          staggerDelay={0.06}
          direction="none"
          scale={0.55}
          duration={0.45}
          className="flex flex-wrap items-center justify-around gap-8 sm:gap-12 py-4"
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner.alt}
              className={`${partner.height} flex items-center justify-center transition-all duration-500`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.src}
                alt={partner.alt}
                className="max-h-full w-auto object-contain"
              />
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
