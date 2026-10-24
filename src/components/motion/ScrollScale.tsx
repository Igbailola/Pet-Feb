"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useIsMobile } from "./useIsMobile";

interface ScrollScaleProps {
  children: React.ReactNode;
  /** Compact starting scale; reaches 1 once the element is well inside the viewport */
  from?: number;
  /** Compact starting inset radius in px for a clip that opens to 0 (0 = no clip) */
  clipInset?: number;
  /** Vertical rise in px while expanding */
  rise?: number;
  className?: string;
}

/**
 * Scroll-linked compact → expanded transform. Progress is tied directly to the
 * scrollbar, so scrolling back up compacts it again. Completes when the
 * element's top reaches ~35% from the top of the viewport.
 */
export function ScrollScale({
  children,
  from = 0.84,
  clipInset = 0,
  rise = 40,
  className = "",
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 35%"],
  });

  const startScale = isMobile ? 1 - (1 - from) * 0.6 : from;
  const scale = useTransform(scrollYProgress, [0, 1], [startScale, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? rise * 0.6 : rise, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.2, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [`inset(${clipInset}% ${clipInset}% ${clipInset}% ${clipInset}% round 32px)`, "inset(0% 0% 0% 0% round 0px)"],
  );

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity, ...(clipInset > 0 ? { clipPath } : {}) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  /** Total vertical travel in px across the element's pass through the viewport */
  travel?: number;
  /** Optional scale change across the pass (e.g. 1.08 → 1) */
  scaleFrom?: number;
  className?: string;
}

/** Scroll-linked vertical drift (and optional scale settle) for imagery layers. */
export function ParallaxLayer({
  children,
  travel = 24,
  scaleFrom = 1,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const t = isMobile ? Math.round(travel * 0.4) : travel;
  const y = useTransform(scrollYProgress, [0, 1], [t, -t]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [scaleFrom, 1]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, scale, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}
