"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface FloatingImageProps {
  children: React.ReactNode;
  /** Vertical float travel distance in pixels (default: 8px) */
  distance?: number;
  /** Full cycle duration in seconds (default: 2.6s) */
  duration?: number;
  className?: string;
}

/**
 * FloatingBounce applies a subtle, continuous vertical floating motion to an image.
 * - Gentle vertical floating motion: moves slightly up and down (-distance to +distance/2).
 * - Smooth ease-in-out curve with a 2-3s loop cycle.
 * - Activates only while in viewport using useInView, stops when scrolled past.
 * - Respects prefers-reduced-motion.
 */
export function FloatingBounce({
  children,
  distance = 8,
  duration = 2.6,
  className = "",
}: FloatingImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        isInView
          ? {
              y: [-distance, distance * 0.4, -distance],
            }
          : { y: 0 }
      }
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
