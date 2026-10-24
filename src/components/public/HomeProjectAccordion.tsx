"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
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
    id: "umueri",
    title: "Light Up Umueri",
    location: "Nigeria",
    slug: "light-up-umueri",
    image: "/api/websitepic/community",
    tags: ["Community Power", "Solar Street Lighting"],
    description:
      "Comprehensive municipal solar street lighting and community energy project delivering 24/7 illumination, enhanced safety, and clean public infrastructure across Umueri community.",
  },
  {
    id: "china",
    title: "Building Global Capacity",
    location: "China",
    slug: "building-global-capacity",
    image: "/figma-assets/project-china.png",
    tags: ["Completed", "Training"],
    description:
      "At Pet-Feb, we understand that the future of energy cannot be built in isolation. In March, our team embarked on a landmark visit to China a journey that opened new doors for innovation, learning, and global collaboration.",
  },
  {
    id: "commercial",
    title: "Commercial & Industrial Hubs",
    location: "Lagos & Abuja",
    slug: "nigeria-clean-energy-landscape",
    image: "/api/websitepic/commercial",
    tags: ["Commercial", "Industrial"],
    description:
      "High-capacity hybrid solar systems powering manufacturing facilities, corporate headquarters, and commercial operations across major Nigerian economic centers.",
  },
];

export function HomeProjectAccordion() {
  // Default to China expanded as depicted in Figma frame 4144:1451
  const [expandedId, setExpandedId] = useState<string>("china");

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
            className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#EBEBEB] overflow-hidden shadow-[0px_2px_18px_0px_rgba(45,45,45,0.06)] transition-all duration-300"
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => toggle(proj.id)}
              className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50/60 transition"
              aria-expanded={isExpanded}
            >
              <span className="font-heading font-bold text-lg sm:text-xl text-gray-950">
                {proj.title}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium text-gray-600">
                  {proj.location}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#7BB042]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Content matching Figma frame 4144:1722 */}
            {isExpanded && (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden min-h-[260px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-8 text-white border border-gray-200">
                  {/* Background Image with Subtle Parallax Depth */}
                  <ParallaxLayer travel={16} className="absolute -inset-x-0 -top-4 -bottom-4 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proj.image || "/figma-assets/project-china.png"}
                      alt={proj.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </ParallaxLayer>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-0" />

                  {/* Overlay Content */}
                  <div className="relative z-10 max-w-2xl space-y-4">
                    {/* Tags */}
                    {proj.tags && (
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-900 backdrop-blur-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                      {proj.description}
                    </p>

                    {/* Action Button */}
                    <div className="pt-1">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition shadow-xs"
                      >
                        <span>More Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
