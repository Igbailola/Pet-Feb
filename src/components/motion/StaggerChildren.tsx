"use client";

import { Children, useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { REVEAL_VIEWPORT, useIsMobile } from "./useIsMobile";

interface StaggerChildrenProps {
  children: React.ReactNode;
  /** Delay between each child's entrance (seconds) */
  staggerDelay?: number;
  /** Direction children slide in from */
  direction?: "up" | "left" | "right" | "none";
  /** Pixel distance of the slide (reduced automatically on mobile) */
  distance?: number;
  /** Animation duration per child (seconds) */
  duration?: number;
  /** Starting scale for each child (1 = none) */
  scale?: number;
  /** Override trigger: fraction of container visible (0–1). Defaults to early margin trigger. */
  threshold?: number;
  /** Only animate the first time */
  once?: boolean;
  /** Render as a <ul> with <li> wrappers (children should be li content) */
  list?: boolean;
  /** Additional className on the container */
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.08,
  direction = "up",
  distance = 56,
  duration = 0.5,
  scale = 1,
  threshold,
  once = true,
  list = false,
  className = "",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);
  const isInView = useInView(ref, {
    once,
    ...(threshold !== undefined ? { amount: threshold } : REVEAL_VIEWPORT),
  });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const items = Children.toArray(children);

  if (prefersReducedMotion) {
    return list ? (
      <ul className={className}>
        {items.map((child, i) => (
          <li key={i}>{child}</li>
        ))}
      </ul>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  const d = isMobile ? distance * 0.6 : distance;
  const x = direction === "left" ? Math.min(d, isMobile ? 24 : d) : direction === "right" ? -Math.min(d, isMobile ? 24 : d) : 0;
  const y = direction === "up" ? d : 0;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, x, y, scale },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const Container = list ? motion.ul : motion.div;
  const Item = list ? motion.li : motion.div;

  return (
    <Container
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {items.map((child, i) => (
        <Item key={i} variants={childVariants}>
          {child}
        </Item>
      ))}
    </Container>
  );
}
