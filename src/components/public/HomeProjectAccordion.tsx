"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ParallaxLayer } from "@/components/motion";

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  slug: string;
  image?: string;
  tags?: string[];
  description?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "street-lighting",
    title: "How Pet-Feb Is Transforming Communities Through Solar Street Lighting",
    location: "Nigeria",
    slug: "solar-street-lighting",
    image:
      "https://framerusercontent.com/images/Pe6chdzlkxNa92G279oCEMkkpc.png?width=3906&height=1656",
    tags: ["Ongoing", "Solar Street Lighting"],
    description:
      "These projects form part of our broader rural electrification campaign — an effort designed to bring dependable illumination to communities long overlooked by traditional grid infrastructure. By replacing diesel-powered or poorly maintained electric street lights with clean, solar-powered alternatives, we help reduce carbon emissions while ensuring continuous lighting throughout the year.",
  },
  {
    id: "china",
    title: "Building Global Capacity: Pet-Feb’s China Partnership & Staff Training Program",
    location: "China",
    slug: "building-global-capacity",
    image: "/figma-assets/about-event-china.png",
    tags: ["Training", "Global Capacity"],
    description:
      "At Pet-Feb, we understand that the future of energy cannot be built in isolation. In March, our team embarked on a landmark visit to China — a journey that opened new doors for innovation, learning, and global collaboration with leading renewable-energy manufacturers.",
  },
  {
    id: "clean-energy-landscape",
    title: "Pet-Feb’s Journey Across Nigeria’s Clean Energy Landscape",
    location: "Nigeria",
    slug: "clean-energy-landscape",
    image:
      "https://framerusercontent.com/images/T17xko4xI33fpTlQYYKXJeZJwk.png?width=3906&height=1656",
    tags: ["Ongoing", "Industrial & Off-Grid"],
    description:
      "From the 15kVA / 50kWh backup inverter system at the Nigerian Gas Infrastructure Company (NGIC) gas plant in Onne, Rivers State and the NNPC Sub Flow Station solar hybrid system in Edo State to off-grid solutions for households and SMEs across Nigeria.",
  },
];

export function HomeProjectAccordion() {
  // Default to China expanded as depicted in Figma frame 6139:3076
  const [expandedId, setExpandedId] = useState<string>("china");
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="space-y-4">
      {DEFAULT_PROJECTS.map((proj) => {
        const isExpanded = expandedId === proj.id;
        return (
          <div
            key={proj.id}
            className="bg-[#D6E7C4] text-gray-900 rounded-[20px] overflow-hidden transition-all duration-300"
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => toggle(proj.id)}
              className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#cde0ba] transition"
              aria-expanded={isExpanded}
            >
              <span className="font-heading font-bold text-base sm:text-lg text-gray-950">
                {proj.title}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {proj.location}
                </span>
                <div className="w-6 h-6 flex items-center justify-center text-gray-700">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-800" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-800" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Content matching Figma frame 6139:3083 */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-6 pt-1">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Photo */}
                      <div className="md:col-span-5 relative rounded-[16px] overflow-hidden h-[240px] sm:h-[280px]">
                        <ParallaxLayer
                          travel={14}
                          className="absolute -inset-x-0 -top-4 -bottom-4"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={proj.image || "/figma-assets/about-event-china.png"}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </ParallaxLayer>
                      </div>

                      {/* Description & Action */}
                      <div className="md:col-span-7 space-y-4">
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                          {proj.description}
                        </p>
                        <div>
                          <Link
                            href={`/projects/${proj.slug}`}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-[12px] text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition"
                          >
                            More Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
