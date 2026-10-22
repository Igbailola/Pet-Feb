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
  // 6 card-to-card transitions + 0.4 settle phase for cleanly dissolving prior roof tiers
  const totalTransitions = 6.4;

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
          // Header on desktop has min-h-[102px]; deck pins at top-[124px] alongside CEO card
          const pinTop = 124;
          const trackHeight = trackRef.current.offsetHeight;
          const stickyHeight = stickyRef.current ? stickyRef.current.offsetHeight : 380;

          // In CSS, sticky unpins when rect.bottom <= pinTop + stickyHeight.
          // Since rect.bottom = rect.top + trackHeight:
          // Pinned scroll travel is exactly: trackHeight - stickyHeight.
          const maxScroll = Math.max(1, trackHeight - stickyHeight);

          // Distance scrolled past pinTop
          const scrolledPast = pinTop - rect.top;

          // Normalized progress 0 -> totalTransitions (0.0 to 6.4)
          // Progress 6.4 (Card 7 settled and roof tiers dissolved) arrives exactly at the unpin point
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
    handleScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile, reducedMotion, totalTransitions]);

  // Compute transform & style for each card at the given progress
  const getCardStyle = (idx: number) => {
    // 1. Card has not entered yet (waiting below viewport)
    if (progress <= idx - 1) {
      return {
        transform: "translateY(100%)",
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

    // 3. Final Card (idx = 6) after settling (progress > 6.0)
    // Retains full size, full typography, and active prominence (scale 1)
    if (idx === 6) {
      return {
        transform: "translateY(0.0%) scale(1)",
        opacity: 1,
        zIndex: 16,
      };
    }

    // 4. Milestone card is beneath newer foreground cards (Shop-roof visual stacking)
    const depth = progress - idx; // depth > 0

    // Shallow stepped roof overhang: tier 1 = -12px (scale 0.985), tier 2 = -24px (scale 0.970)
    // Capped at 2 shallow tiers so older cards never consume active card space
    const tier = Math.min(depth, 2);
    const offset = -tier * 12;
    const scale = 1 - tier * 0.015;

    // Visibility:
    // a. Cards deeper than 2 tiers tuck under tier 2 and fade out cleanly
    let opacity = 1;
    if (depth > 2) {
      opacity = Math.max(0, 1 - (depth - 2) * 1.5);
    }

    // b. Stable Roof During Final Card Entrance:
    // While final card (idx = 6) is visibly entering (progress from 5.0 to 6.0),
    // Cards 4 and 5 stay 100% visible and stable in their roof positions.
    // ONLY after final card has completely reached rest (progress > 6.0),
    // older roof layers smoothly transition out (progress 6.0 to 6.4) so Card 6 stands alone.
    // Reverses naturally and smoothly when scrolling backward.
    if (progress > 6.0) {
      const settleProgress = (progress - 6.0) / 0.4;
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

  // ── Fallback for Mobile (< 768px) and Reduced-Motion: Standard readable vertical list ──
  if (isMobile || reducedMotion) {
    return (
      <div className="space-y-6 pt-2">
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className="bg-[#141414] rounded-[24px] p-6 sm:p-7 border border-white/[0.08] shadow-[0px_4px_20px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#7BB042]/15 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#7BB042]" strokeWidth={2.5} />
              </div>
              <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-white">
                <span className="text-[#7BB042]">{milestone.period}</span> — {milestone.title}
              </h3>
            </div>
            <div className="space-y-3 text-[#cccccc] text-[15px] sm:text-[16px] leading-[1.7] pl-9">
              {milestone.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Closing statement card */}
        <div className="bg-[#141414] rounded-[24px] p-6 sm:p-7 border border-white/[0.08] shadow-[0px_4px_20px_rgba(0,0,0,0.35)] text-white font-heading font-medium text-[17px] sm:text-[19px] leading-[1.6]">
          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042] shrink-0 mt-2" aria-hidden="true" />
            <p>{closing}</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Desktop Scroll-Driven Stacking Card Deck (>= 768px) ──
  return (
    // Outer scroll track: 75vh per transition (6 * 75vh = 450vh) + 30vh settle phase + 100vh base = 580vh
    // Provides a slower, controlled reading cadence for each milestone
    <div
      ref={trackRef}
      className="relative w-full"
      style={{
        height: "calc(100vh + 480vh)",
      }}
    >
      {/* Pinned visual display area: aligns with sticky CEO card at top-[124px] */}
      <div ref={stickyRef} className="sticky top-[124px] w-full pt-[32px] pb-6">
        {/*
          Fixed-height shared card deck frame:
          Guarantees every milestone card and the closing card have identical height (320px).
          Prevents content size variations from breaking dimensions or allowing previous cards to peek out.
        */}
        <div className="relative w-full h-[330px] lg:h-[320px]">
          {/* Milestone Cards (2019 through 2025) */}
          {milestones.map((milestone, idx) => {
            const style = getCardStyle(idx);

            return (
              <div
                key={idx}
                /*
                  Equal height: absolute inset-0 w-full h-full guarantees 100% identical dimensions across all cards.
                  Solid #141414 background and clean border-white/[0.08] without gradient strokes.
                  Subtle, consistent upward and downward shadows create authentic layer depth between stepped cards.
                */
                className="absolute inset-0 w-full h-full bg-[#141414] rounded-[24px] p-6 sm:p-7 border border-white/[0.08] shadow-[0_-4px_16px_rgba(0,0,0,0.35),0_10px_25px_rgba(0,0,0,0.45)] flex flex-col justify-start overflow-hidden"
                style={{
                  ...style,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#7BB042]/15 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-white">
                    <span className="text-[#7BB042]">{milestone.period}</span> — {milestone.title}
                  </h3>
                </div>
                <div className="space-y-2.5 sm:space-y-3 text-[#cccccc] text-[14px] sm:text-[15px] xl:text-[16px] leading-[1.65] pl-9">
                  {milestone.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Final 7th Card: Commitment & Closing Statement (idx = 6) */}
          {(() => {
            const closingIdx = milestones.length;
            const style = getCardStyle(closingIdx);

            return (
              <div
                /*
                  Identical height & dimensions: absolute inset-0 w-full h-full matches previous cards exactly.
                  Solid #141414 background (gradient removed) with consistent border-white/[0.08] and identical subtle shadows.
                  Closing pledge vertically centered with generous padding and no size difference when entering.
                */
                className="absolute inset-0 w-full h-full bg-[#141414] rounded-[24px] p-6 sm:p-7 border border-white/[0.08] shadow-[0_-4px_16px_rgba(0,0,0,0.35),0_10px_25px_rgba(0,0,0,0.45)] flex flex-col justify-center overflow-hidden"
                style={{
                  ...style,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042] shrink-0 mt-2.5" aria-hidden="true" />
                  <p className="text-white font-heading font-medium text-[17px] sm:text-[19px] leading-[1.6]">
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
