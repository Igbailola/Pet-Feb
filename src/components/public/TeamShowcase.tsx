"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  shortRole?: string;
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
  eyebrow = "Management Team",
  autoPlayInterval = 4500,
}: TeamShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const total = members.length;

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleSelect = useCallback(
    (idx: number) => {
      if (idx === activeIndex) return;
      setDirection(idx > activeIndex ? 1 : -1);
      setActiveIndex(idx);
    },
    [activeIndex]
  );

  // Automatic progression timer (pauses on hover/focus or reduced motion)
  useEffect(() => {
    if (isPaused || prefersReducedMotion || total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setDirection(1);
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
    <section aria-label={title} className="w-full">
      <style>{`
        @keyframes teamDockProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-team-dock-progress {
          transform-origin: left;
          animation: teamDockProgress ${autoPlayInterval}ms linear forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-team-dock-progress {
            animation: none !important;
            transform: scaleX(1) !important;
          }
        }
      `}</style>

      {/* Main Stage Container matching petfeb-team-animation-reference.mp4 */}
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
        className="relative rounded-[32px] overflow-hidden border border-gray-200/90 shadow-[0px_8px_32px_rgba(0,0,0,0.06)] bg-gradient-to-br from-[#F4F8F2] via-[#F8FAF7] to-[#E9F2E4]"
      >
        {/* Subtle Architectural Circular Halo on Right (matching reference video backdrop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full border border-[#7BB042]/15 bg-gradient-to-br from-[#7BB042]/10 via-white/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-12 w-[360px] h-[360px] rounded-full border border-[#7BB042]/10"
        />

        {/* Left & Right Flanking Stage Arrows (matching reference video 00:00-00:08) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous team member"
          className="hidden md:flex absolute left-4 lg:left-7 top-[42%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/85 hover:bg-[#7BB042] text-gray-800 hover:text-white border border-gray-200/90 hover:border-[#7BB042] shadow-sm items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next team member"
          className="hidden md:flex absolute right-4 lg:right-7 top-[42%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/85 hover:bg-[#7BB042] text-gray-800 hover:text-white border border-gray-200/90 hover:border-[#7BB042] shadow-sm items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Upper Stage: Left Narrative + Right Portrait */}
        <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-24 pt-8 sm:pt-12 pb-8 lg:pb-10">
          {/* Top Breadcrumb / Eyebrow Row matching reference video */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
              <Users className="w-4 h-4 text-[#7BB042]" />
              <span className="text-gray-400">/</span>
              <span className="font-heading font-semibold text-gray-800">
                {eyebrow}
              </span>
            </div>

            {/* Mobile Arrow Controls + Slide Counter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-semibold text-gray-500 px-2.5 py-1 rounded-full bg-white/80 border border-gray-200">
                <strong className="text-gray-900">
                  {String(activeIndex + 1).padStart(2, "0")}
                </strong>{" "}
                / {String(total).padStart(2, "0")}
              </span>
              <div className="flex md:hidden items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous team member"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-[#7BB042] hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next team member"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-[#7BB042] hover:text-white transition"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[340px] sm:min-h-[380px]">
            {/* Left Column: Animated Name, Role, Accent Divider & Bio */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`info-${activeIndex}`}
                  custom={direction}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, x: direction * 36 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction * -28 }
                  }
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  role="tabpanel"
                  id={`team-panel-${activeIndex}`}
                  aria-labelledby={`team-tab-${activeIndex}`}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[46px] text-gray-950 tracking-tight leading-[1.12]">
                      {activeMember.name}
                    </h3>
                    <p className="font-heading font-medium text-base sm:text-xl text-[#3F6B1A]">
                      {activeMember.role}
                    </p>
                  </div>

                  {/* Reference Video Divider Line with Accent Segment */}
                  <div className="relative h-px w-full max-w-xl bg-gray-300/80">
                    <motion.span
                      initial={prefersReducedMotion ? false : { width: 0 }}
                      animate={{ width: 56 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                      className="absolute left-0 -top-[1px] h-[3px] bg-[#7BB042] rounded-full"
                    />
                  </div>

                  {activeMember.bio && (
                    <p className="font-sans text-sm sm:text-base text-gray-700 leading-[1.8] max-w-xl">
                      {activeMember.bio}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Animated Large Cutout/Portrait */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] h-[300px] sm:h-[360px] lg:h-[400px] rounded-[24px] overflow-hidden bg-neutral-900 shadow-[0px_14px_34px_rgba(31,58,11,0.14)] border-2 border-white">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={`portrait-${activeIndex}`}
                    custom={direction}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, x: direction * 44, scale: 1.05 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: direction * -36, scale: 0.98 }
                    }
                    transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeMember.image}
                      alt={activeMember.name}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 350px"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Translucent Avatar Dock Strip matching petfeb-team-animation-reference.mp4 */}
        <div className="relative z-20 bg-gradient-to-t from-gray-200/90 via-gray-100/80 to-white/60 backdrop-blur-md border-t border-gray-200/90 px-4 sm:px-10 lg:px-16 py-5 sm:py-6">
          <div
            role="tablist"
            aria-label="Team member profiles"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
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
                  className="group relative flex flex-col items-center text-center px-2 pt-1 pb-3 rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] cursor-pointer"
                >
                  {/* Circular Avatar */}
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden transition-all duration-500 ${
                      isActive
                        ? "ring-3 ring-[#7BB042] ring-offset-2 ring-offset-[#F2F6EF] scale-110 shadow-[0px_8px_20px_rgba(123,176,66,0.32)]"
                        : "opacity-70 grayscale-[25%] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 border border-gray-300"
                    }`}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>

                  {/* Centered Name & Short Role Below Circle */}
                  <span
                    className={`font-heading font-bold text-xs sm:text-sm mt-3 transition-colors line-clamp-1 ${
                      isActive
                        ? "text-gray-950"
                        : "text-gray-700 group-hover:text-gray-950"
                    }`}
                  >
                    {member.name}
                  </span>
                  <span
                    className={`text-[11px] sm:text-xs mt-0.5 line-clamp-1 transition-colors ${
                      isActive ? "text-[#3F6B1A] font-medium" : "text-gray-500"
                    }`}
                  >
                    {member.shortRole || member.role}
                  </span>

                  {/* Active Bottom Indicator & Auto-Progress Bar */}
                  <div className="w-12 h-[3px] rounded-full bg-gray-300/70 mt-2.5 overflow-hidden">
                    {isActive && (
                      <div
                        key={`dock-bar-${activeIndex}-${isPaused}`}
                        className={`h-full bg-[#7BB042] rounded-full ${
                          !isPaused && !prefersReducedMotion
                            ? "animate-team-dock-progress"
                            : "w-full"
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
