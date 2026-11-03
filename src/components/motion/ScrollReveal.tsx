"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, useIsMobile } from "./useIsMobile";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Direction the element slides in from */
  direction?: Direction;
  /** Pixel distance of the slide (reduced automatically on mobile) */
  distance?: number;
  /** Seconds before this element begins animating */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Starting scale (1 = no scale) */
  scale?: number;
  /** Clip-path reveal: the element is uncovered starting from this edge */
  clip?: Direction;
  /** Override trigger: fraction of element visible (0–1). Defaults to early margin trigger. */
  threshold?: number;
  /** Only animate the first time the element enters the viewport */
  once?: boolean;
  /** Additional className on the wrapper div */
  className?: string;
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/** inset() that fully hides the element except for the given edge side */
const getClipHidden = (from: Direction) => {
  switch (from) {
    case "up":
      return "inset(100% 0% 0% 0%)"; // revealed bottom → top
    case "down":
      return "inset(0% 0% 100% 0%)"; // revealed top → bottom
    case "left":
      return "inset(0% 0% 0% 100%)"; // revealed right → left
    case "right":
      return "inset(0% 100% 0% 0%)"; // revealed left → right
    default:
      return "inset(0% 0% 0% 0%)";
  }
};

export function ScrollReveal({
  children,
  direction = "up",
  distance = 56,
  delay = 0,
  duration = 0.55,
  scale = 1,
  clip,
  threshold,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    ...(threshold !== undefined ? { amount: threshold } : REVEAL_VIEWPORT),
  });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // Horizontal travel is cut hard on mobile to avoid overflow; vertical is eased.
  const d = isMobile ? distance * 0.6 : distance;
  const offset = getOffset(direction, d);
  if (isMobile) offset.x = Math.max(-24, Math.min(24, offset.x));

  const hidden = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
    scale,
    ...(clip ? { clipPath: getClipHidden(clip) } : {}),
  };
  const shown = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    ...(clip ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
  };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={
        isInView
          ? { ...shown, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } }
          : hidden
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
