"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

export interface StoryMilestone {
  period: string;
  title: string;
  paragraphs: string[];
}

interface MilestoneCardDeckProps {
  milestones: StoryMilestone[];
  closing: string;
}

export function MilestoneCardDeck({ milestones, closing }: MilestoneCardDeckProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Total cards: 6 milestone cards + 1 closing commitment card = 7 cards
  const totalCards = milestones.length + 1;
  const totalTransitions = milestones.length + 0.4;

  // Detect mobile viewport (< 768px) and reduced-motion preference
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMedia = () => {
      setIsMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    updateMedia();

    mobileQuery.addEventListener("change", updateMedia);
    motionQuery.addEventListener("change", updateMedia);

    return () => {
      mobileQuery.removeEventListener("change", updateMedia);
      motionQuery.removeEventListener("change", updateMedia);
    };
  }, []);

  // Scroll listener calibrated strictly to the deck's own scroll track & physical unpin point
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!trackRef.current) {
            ticking = false;
            return;
          }

          const rect = trackRef.current.getBoundingClientRect();
          const pinTop = 124;
          const trackHeight = trackRef.current.offsetHeight;
          const stickyHeight = stickyRef.current ? stickyRef.current.offsetHeight : 380;

          const maxScroll = Math.max(1, trackHeight - stickyHeight);
          const scrolledPast = pinTop - rect.top;

          const ratio = Math.max(0, Math.min(1, scrolledPast / maxScroll));
          const currentProgress = ratio * totalTransitions;

          setProgress(currentProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile, reducedMotion, totalTransitions]);

  const scrollToCard = (targetIdx: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const absoluteTrackTop = window.scrollY + rect.top;
    const pinTop = 124;
    const trackHeight = trackRef.current.offsetHeight;
    const stickyHeight = stickyRef.current ? stickyRef.current.offsetHeight : 380;
    const maxScroll = Math.max(1, trackHeight - stickyHeight);

    const targetRatio = Math.min(1, Math.max(0, targetIdx / totalTransitions));
    const targetScrollY = absoluteTrackTop - pinTop + targetRatio * maxScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Compute transform & style for each card at the given progress
  const getCardStyle = (idx: number) => {
    // 1. Card has not entered yet (waiting below viewport)
    if (progress <= idx - 1) {
      return {
        transform: "translateY(105%) scale(0.98)",
        opacity: 0,
        pointerEvents: "none" as const,
        zIndex: 10 + idx,
      };
    }

    // 2. Card currently entering or active at rest
    if (progress <= idx) {
      if (idx === 0) {
        return {
          transform: "translateY(0px) scale(1)",
          opacity: 1,
          zIndex: 10,
        };
      }
      const t = progress - (idx - 1); // 0 -> 1
      const translateY = (1 - t) * 100;
      return {
        transform: `translateY(${translateY.toFixed(2)}%) scale(1)`,
        opacity: 1,
        zIndex: 10 + idx,
      };
    }

    // 3. Final Card (idx = milestones.length) after settling
    if (idx === milestones.length) {
      return {
        transform: "translateY(0%) scale(1)",
        opacity: 1,
        zIndex: 10 + idx,
      };
    }

    // 4. Milestone card is beneath newer foreground cards (Stepped roof visual stacking)
    const depth = progress - idx;
    const tier = Math.min(depth, 2.5);
    const offset = -tier * 14;
    const scale = 1 - tier * 0.02;

    let opacity = 1;
    if (depth > 2.2) {
      opacity = Math.max(0, 1 - (depth - 2.2) * 1.4);
    }

    if (progress > milestones.length) {
      const settleProgress = (progress - milestones.length) / 0.4;
      const finalFade = Math.max(0, 1 - settleProgress);
      opacity = Math.min(opacity, finalFade);
    }

    return {
      transform: `translateY(${offset.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      opacity: Number(opacity.toFixed(2)),
      pointerEvents: opacity === 0 ? ("none" as const) : undefined,
      zIndex: 10 + idx,
    };
  };

  const activeCardIndex = Math.min(
    totalCards - 1,
    Math.max(0, Math.round(progress))
  );

  // ── Fallback for Mobile (< 768px) and Reduced-Motion: Standard readable vertical list ──
  if (isMobile || reducedMotion) {
    return (
      <div className="space-y-5 pt-2">
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className="bg-black text-white rounded-[24px] p-6 sm:p-7 border border-white/10 shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#7BB042]/20 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#7BB042]" strokeWidth={2.5} />
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                <span className="text-[#7BB042]">{milestone.period}</span> —{" "}
                {milestone.title}
              </h3>
            </div>
            <div className="space-y-2.5 text-gray-300 text-xs sm:text-sm leading-relaxed pl-9">
              {milestone.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Closing statement card */}
        <div className="bg-black text-white rounded-[24px] p-6 sm:p-7 border border-[#7BB042]/40 shadow-md font-heading font-medium text-sm sm:text-base leading-relaxed">
          <div className="flex items-start gap-3">
            <span
              className="w-3 h-3 rounded-full bg-[#F5B82E] shrink-0 mt-1.5"
              aria-hidden="true"
            />
            <p>{closing}</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Desktop Scroll-Driven Stacking Card Deck (>= 768px) matching scroll-card-and-our-mission-petfeb.mp4 ──
  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{
        height: "calc(100vh + 340vh)",
      }}
    >
      {/* Pinned visual display area: aligns with sticky CEO card at top-[124px] */}
      <div ref={stickyRef} className="sticky top-[124px] w-full pt-8 pb-4 space-y-5">
        {/* Top Interactive Timeline Bar */}
        <div className="flex items-center justify-between gap-3 bg-black/90 text-white px-4 py-2.5 rounded-full border border-black/10 shadow-sm">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {milestones.map((m, idx) => {
              const isCurrent = activeCardIndex === idx;
              const isPassed = activeCardIndex > idx;
              return (
                <button
                  key={m.period}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-heading font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? "bg-[#7BB042] text-white shadow-2xs"
                      : isPassed
                      ? "bg-white/15 text-[#D6E7C4] hover:bg-white/25"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {m.period}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => scrollToCard(milestones.length)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-heading font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCardIndex === milestones.length
                  ? "bg-[#F5B82E] text-black shadow-2xs"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Our Pledge
            </button>
          </div>

          <span className="text-[11px] font-heading font-semibold text-gray-300 shrink-0 pl-2">
            {String(activeCardIndex + 1).padStart(2, "0")} /{" "}
            {String(totalCards).padStart(2, "0")}
          </span>
        </div>

        {/* Fixed-height shared card deck frame */}
        <div className="relative w-full h-[300px] lg:h-[290px] mt-4">
          {milestones.map((milestone, idx) => {
            const style = getCardStyle(idx);

            return (
              <div
                key={idx}
                className="absolute inset-0 w-full h-full bg-black rounded-[24px] p-6 sm:p-8 border border-white/12 shadow-[0_-6px_20px_rgba(0,0,0,0.28),0_12px_28px_rgba(0,0,0,0.35)] flex flex-col justify-between overflow-hidden"
                style={{
                  ...style,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#7BB042] shrink-0" />
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                        <span className="text-[#7BB042]">{milestone.period}</span>{" "}
                        — {milestone.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-heading font-semibold text-gray-400 bg-white/10 px-2.5 py-0.5 rounded-full">
                      Milestone {idx + 1} of {milestones.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-gray-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed pl-6">
                    {milestone.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Subtle bottom progress bar inside each card */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-[#7BB042] transition-all duration-200"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(15, ((idx + 1) / totalCards) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Final 7th Card: Commitment & Closing Statement */}
          {(() => {
            const closingIdx = milestones.length;
            const style = getCardStyle(closingIdx);

            return (
              <div
                className="absolute inset-0 w-full h-full bg-black rounded-[24px] p-6 sm:p-8 border-2 border-[#7BB042] shadow-[0_-6px_20px_rgba(0,0,0,0.28),0_12px_28px_rgba(0,0,0,0.4)] flex flex-col justify-center overflow-hidden"
                style={{
                  ...style,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7BB042]/20 border border-[#7BB042]/40 text-[#7BB042] text-xs font-heading font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#F5B82E]" />
                    <span>Our Continuing Commitment</span>
                  </div>
                  <p className="text-white font-heading font-semibold text-base sm:text-lg lg:text-xl leading-relaxed">
                    {closing}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
