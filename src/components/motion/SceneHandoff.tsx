"use client";

import { Children, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ScrollScale } from "./ScrollScale";

const QUERY = "(min-width: 1024px) and (min-height: 700px)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

interface SceneHandoffProps {
  /** Exactly two scenes: [outgoing, incoming] */
  children: React.ReactNode;
  /** Extra scroll distance (in viewport heights) used for the handoff */
  runway?: number;
  className?: string;
}

/**
 * Two scenes share ONE viewport. A short sticky runway drives both with the
 * same scroll progress: scene A scales/fades/lifts away while scene B rises,
 * scales up and fades in over it. Fully reversible.
 *
 * Falls back to a plain stacked layout on small/short viewports and under
 * prefers-reduced-motion, so no content is ever hidden or pinned there.
 */
export function SceneHandoff({ children, runway = 0.4, className = "" }: SceneHandoffProps) {
  const [a, b] = Children.toArray(children);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Outgoing scene: holds briefly, then exits upward & shrinks
  const aOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const aScale = useTransform(scrollYProgress, [0.12, 0.55], [1, 0.93]);
  const aY = useTransform(scrollYProgress, [0.12, 0.55], [0, -70]);
  // Incoming scene: starts entering while A is still leaving (shared progress)
  const bOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const bScale = useTransform(scrollYProgress, [0.15, 0.7], [0.9, 1]);
  const bY = useTransform(scrollYProgress, [0.15, 0.7], [160, 0]);

  if (reduce || !wide) {
    return (
      <div className={className}>
        <div>{a}</div>
        <div className="mt-10 sm:mt-14">
          <ScrollScale from={0.9} rise={40}>
            {b}
          </ScrollScale>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height: `${100 + runway * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden grid items-center">
        <motion.div
          style={{ opacity: aOpacity, scale: aScale, y: aY, gridArea: "1 / 1" }}
          className="pt-24 will-change-transform"
        >
          {a}
        </motion.div>
        <motion.div
          style={{ opacity: bOpacity, scale: bScale, y: bY, gridArea: "1 / 1" }}
          className="pt-24 will-change-transform"
        >
          {b}
        </motion.div>
      </div>
    </div>
  );
}
