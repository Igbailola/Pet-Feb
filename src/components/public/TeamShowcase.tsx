"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

interface TeamShowcaseProps {
  members: TeamMember[];
  title?: string;
  eyebrow?: string;
  autoPlayInterval?: number;
}

export function TeamShowcase({
  members,
  title = "Rest Of The Team",
  eyebrow = "Management & Operations Team",
  autoPlayInterval = 4000,
}: TeamShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = members.length;

  // Detect and track prefers-reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mql.addEventListener("change", handleMediaChange);
    return () => mql.removeEventListener("change", handleMediaChange);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // Automatic progression timer (4 seconds per member)
  // Re-initializes whenever activeIndex changes, ensuring manually selected members receive full viewing time
  useEffect(() => {
    if (isPaused || prefersReducedMotion || total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, total, autoPlayInterval, activeIndex]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (!members || members.length === 0) {
    return null;
  }

  const activeMember = members[activeIndex] || members[0];

  return (
    <section
      aria-label={title}
      className="bg-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 border-t border-gray-100"
    >
      {/* Component Styles for Hardware-Accelerated Progress & Transitions */}
      <style>{`
        @keyframes showcaseProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes showcaseFadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-showcase-progress {
          transform-origin: left;
          animation: showcaseProgress ${autoPlayInterval}ms linear forwards;
        }
        .animate-showcase-fade {
          animation: showcaseFadeIn 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-showcase-progress,
          .animate-showcase-fade {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8 lg:mb-10">
          <div>
            {eyebrow && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="mt-2 text-[#555555] text-xs sm:text-sm lg:text-base max-w-xl">
              Experienced renewable energy leaders directing operations, technical engineering surveys, and nationwide logistics.
            </p>
          </div>

          {/* Navigation Controls & Index Counter */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100/90 border border-gray-200 text-xs font-mono select-none">
              <strong className="text-gray-900 font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </strong>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500 font-medium">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous team member"
                className="w-9 h-9 rounded-full border-2 border-gray-300 bg-white text-gray-900 shadow-2xs hover:bg-[#7BB042] hover:border-[#7BB042] hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] focus-visible:ring-offset-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next team member"
                className="w-9 h-9 rounded-full border-2 border-gray-300 bg-white text-gray-900 shadow-2xs hover:bg-[#7BB042] hover:border-[#7BB042] hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] focus-visible:ring-offset-2 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Featured Showcase Area with Focus Auto-Pause */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
          className="bg-[#FAFBF9] rounded-[24px] border border-gray-200/90 p-5 sm:p-7 lg:p-8 shadow-[0px_4px_24px_rgba(45,45,45,0.05)] relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Featured Details & Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 min-h-[160px] sm:min-h-[180px]">
              <div
                key={activeIndex}
                className="space-y-3 animate-showcase-fade"
                role="tabpanel"
                id={`team-panel-${activeIndex}`}
                aria-labelledby={`team-tab-${activeIndex}`}
              >
                <div>
                  <span className="text-[#3F6B1A] font-semibold text-xs tracking-wider uppercase block mb-1">
                    Featured Leader
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950 tracking-tight leading-tight">
                    {activeMember.name}
                  </h3>
                  <p className="text-[#7BB042] font-semibold text-sm sm:text-base mt-1">
                    {activeMember.role}
                  </p>
                </div>

                {activeMember.bio ? (
                  <div className="pt-2 border-t border-gray-200/70">
                    <p className="text-[#555555] text-sm sm:text-[15px] leading-relaxed max-w-xl">
                      {activeMember.bio}
                    </p>
                  </div>
                ) : null}

                {/* Trust metadata pill */}
                <div className="pt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#3F6B1A] border border-[#D2E8B5] shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" />
                    Pet-Feb Management Team
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Portrait */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] h-[260px] sm:h-[300px] lg:h-[340px] rounded-[20px] overflow-hidden bg-neutral-900 border border-gray-200/90 shadow-[0px_6px_24px_rgba(45,45,45,0.08)]">
                {members.map((member, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={member.name}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "opacity-100 scale-100 z-10 pointer-events-auto"
                          : "opacity-0 scale-[1.04] z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        priority={idx === 0}
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Dock / Thumbnail Selector Strip */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-gray-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Select Team Member
              </span>
              <span className="text-[11px] text-gray-400 hidden sm:inline">
                Click a profile, use arrows, or hover to pause auto-play
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Team member profiles"
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
            >
              {members.map((member, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={member.name}
                    type="button"
                    role="tab"
                    id={`team-tab-${idx}`}
                    aria-selected={isActive}
                    aria-controls={`team-panel-${idx}`}
                    onClick={() => handleSelect(idx)}
                    className={`group relative flex items-center gap-2.5 p-2 sm:p-2.5 lg:p-3 rounded-[16px] transition-all duration-300 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] overflow-hidden ${
                      isActive
                        ? "bg-white border-[#7BB042] shadow-[0px_4px_16px_rgba(123,176,66,0.18)] ring-1.5 ring-[#7BB042]/25"
                        : "bg-white/70 hover:bg-white border-gray-200/90 hover:border-gray-300 shadow-2xs"
                    }`}
                  >
                    <div
                      className={`relative w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden shrink-0 border-[1.5px] transition-all duration-300 ${
                        isActive
                          ? "border-[#7BB042] ring-2 ring-[#7BB042]/30 scale-105"
                          : "border-gray-200 opacity-75 group-hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={`Thumbnail of ${member.name}`}
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`font-heading font-bold text-xs sm:text-[13px] block truncate transition-colors ${
                          isActive ? "text-gray-950" : "text-gray-700 group-hover:text-gray-950"
                        }`}
                      >
                        {member.name}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#767676] block truncate mt-0.5">
                        {member.role}
                      </span>
                    </div>

                    {/* Active Auto-Progression Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7BB042]/20">
                        <div
                          key={`progress-${activeIndex}-${isPaused}`}
                          className={`h-full bg-[#7BB042] ${
                            !isPaused && !prefersReducedMotion
                              ? "animate-showcase-progress"
                              : ""
                          }`}
                          style={{
                            width:
                              prefersReducedMotion || isPaused
                                ? "100%"
                                : undefined,
                            animationDuration: `${autoPlayInterval}ms`,
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
