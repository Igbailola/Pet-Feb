"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
  /** Target number to count up to */
  target: number;
  /** Text to show after the number (e.g. "+", "k +") */
  suffix?: string;
  /** Text to show before the number (e.g. "+") */
  prefix?: string;
  /** Duration of the count animation in milliseconds */
  duration?: number;
  /** Additional className on the span */
  className?: string;
  /** Format function for the displayed number */
  formatFn?: (n: number) => string;
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
  formatFn,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let frame = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, prefersReducedMotion]);

  // Reduced motion: always show the final value
  const value = prefersReducedMotion ? target : displayValue;
  const formatted = formatFn ? formatFn(value) : value.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
