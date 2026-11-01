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
    slug: "light-up-umueri",
    image: "/figma-assets/project-china.png",
    tags: ["Community", "Solar Street Lighting"],
    description:
      "Comprehensive municipal solar street lighting and community energy project delivering 24/7 illumination, enhanced safety, and clean public infrastructure across Nigeria.",
  },
  {
    id: "china",
    title: "Building Global Capacity",
    location: "China",
    slug: "building-global-capacity",
    image: "/figma-assets/about-event-china.png",
    tags: ["Completed", "Training"],
    description:
      "At Pet-Feb, we understand that the future of energy cannot be built in isolation. In March, our team embarked on a landmark visit to China — a journey that opened new doors for innovation, learning, and global collaboration.",
  },
  {
    id: "project-title",
    title: "Project Title",
    location: "Project Location",
    slug: "commercial-industrial-hubs",
    image: "/figma-assets/vision-img-3.png",
    tags: ["Commercial", "Industrial"],
    description:
      "High-capacity hybrid solar systems powering manufacturing facilities, corporate headquarters, and commercial operations across major Nigerian economic centers.",
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
                      {/* Photo with tags overlay */}
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
                        {/* Overlay tags */}
                        {proj.tags && (
                          <div className="absolute top-4 left-4 flex gap-2 z-10">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-900"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Description & Action */}
                      <div className="md:col-span-7 space-y-4">
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                          {proj.description}
                        </p>
                        <div>
                          <Link
                            href={`/projects`}
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
