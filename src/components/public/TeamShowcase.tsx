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
      className="bg-white pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12"
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
        {/* Section Header (Compact Spacing & Sizing) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5 mb-4 sm:mb-5 lg:mb-6">
          <div>
            {eyebrow && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#F4F9EC] text-[#3F6B1A] border border-[#D2E8B5] mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-black tracking-tight leading-tight">
              {title}
            </h2>
          </div>

          {/* Navigation Controls & Index Counter (Compact Scaled Profile) */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100/90 border border-gray-200 text-[10px] sm:text-[11px] font-mono select-none">
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
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 bg-white text-gray-900 shadow-2xs hover:bg-[#7BB042] hover:border-[#7BB042] hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] focus-visible:ring-offset-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next team member"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 bg-white text-gray-900 shadow-2xs hover:bg-[#7BB042] hover:border-[#7BB042] hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] focus-visible:ring-offset-2 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Featured Showcase Area with Focus Auto-Pause */}
        <div
          ref={containerRef}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
          className="bg-[#FAFBF9] rounded-[20px] sm:rounded-[24px] border border-gray-200/90 p-4 sm:p-5 lg:p-6 shadow-[0px_4px_20px_rgba(45,45,45,0.04)] relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">

            {/* Left Column: Featured Details & Narrative (Compact Scaled Typography) */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 min-h-[130px] sm:min-h-[140px] lg:min-h-[150px]">
              <div
                key={activeIndex}
                className="space-y-2 sm:space-y-2.5 animate-showcase-fade"
                role="tabpanel"
                id={`team-panel-${activeIndex}`}
                aria-labelledby={`team-tab-${activeIndex}`}
              >
                <div>
                  <span className="text-[#3F6B1A] font-semibold text-[10px] sm:text-[11px] tracking-wider uppercase block mb-0.5">
                    Featured Leader
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-gray-950 tracking-tight leading-snug">
                    {activeMember.name}
                  </h3>
                  <p className="text-[#7BB042] font-semibold text-xs sm:text-[13px] lg:text-sm mt-0.5">
                    {activeMember.role}
                  </p>
                </div>

                {activeMember.bio ? (
                  <div className="pt-1.5 border-t border-gray-200/70">
                    <p className="text-[#555555] text-xs sm:text-[13px] lg:text-sm leading-relaxed max-w-lg">
                      {activeMember.bio}
                    </p>
                  </div>
                ) : null}

                {/* Trust metadata pill */}
                <div className="pt-0.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white text-[#3F6B1A] border border-[#D2E8B5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" />
                    Pet-Feb Executive Committee
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Portrait (Target: Mobile ~210x190, Tablet ~250x230, Desktop ~280x260) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[190px] sm:max-w-[230px] lg:max-w-[260px] h-[210px] sm:h-[250px] lg:h-[280px] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-neutral-900 border border-gray-200/90 shadow-[0px_4px_18px_rgba(45,45,45,0.06)]">
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
                        priority
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 190px, (max-width: 1024px) 230px, 260px"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Dock / Thumbnail Selector Strip (Compact Vertical Profile) */}
          <div className="mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 border-t border-gray-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-2 sm:mb-2.5">
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Select Team Member
              </span>
              <span className="text-[10px] text-gray-400 hidden sm:inline">
                Click, use arrows, or watch auto-progression
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Team member profiles"
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5"
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
                    className={`group relative flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 lg:p-2.5 rounded-[12px] sm:rounded-[14px] transition-all duration-300 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] overflow-hidden ${
                      isActive
                        ? "bg-white border-[#7BB042] shadow-[0px_3px_12px_rgba(123,176,66,0.16)] ring-1.5 ring-[#7BB042]/25"
                        : "bg-white/70 hover:bg-white border-gray-200/90 hover:border-gray-300 shadow-2xs"
                    }`}
                  >
                    <div
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden shrink-0 border-[1.5px] transition-all duration-300 ${
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
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`font-heading font-bold text-[11px] sm:text-xs block truncate transition-colors ${
                          isActive ? "text-gray-950" : "text-gray-700 group-hover:text-gray-950"
                        }`}
                      >
                        {member.name}
                      </span>
                      <span className="text-[9.5px] sm:text-[10px] text-[#767676] block truncate mt-0.5">
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
