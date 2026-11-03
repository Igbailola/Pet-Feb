"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToHash(hash: string): boolean {
  if (!hash || hash === "#") return false;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

/**
 * Smooth-scrolls to in-page anchors (e.g. `/#contact`), both for same-page
 * clicks and when arriving from another route. Sections use `scroll-mt-*`
 * so the sticky header never covers the target.
 */
export function HashScroller() {
  const pathname = usePathname();

  // Arrival from another route with a hash in the URL.
  useEffect(() => {
    if (!window.location.hash) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (scrollToHash(window.location.hash) || attempts >= 15) {
        window.clearInterval(timer);
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [pathname]);

  // Same-page anchor clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.hash &&
        document.getElementById(decodeURIComponent(url.hash.slice(1)))
      ) {
        e.preventDefault();
        scrollToHash(url.hash);
        window.history.pushState(null, "", url.hash);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

