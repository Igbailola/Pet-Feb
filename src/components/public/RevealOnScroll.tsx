"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-triggered entrance for any element tagged `data-reveal`
 * (optionally `data-reveal-delay="120"` in ms for staggering).
 * Elements already on screen at load are left untouched, so there is no flash,
 * and nothing is hidden when reduced motion is requested.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pending = targets.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92
    );
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    pending.forEach((el) => {
      const delay = Number(el.dataset.revealDelay || 0);
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

