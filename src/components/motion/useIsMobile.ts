"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 639px)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

/** True below the `sm` breakpoint. Server snapshot is false (desktop values). */
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Trigger options shared by all time-based reveals: fire as soon as the top of
 * the element is ~12% inside the viewport instead of waiting for a fraction of
 * the whole (possibly very tall) element to be visible.
 */
export const REVEAL_VIEWPORT = { amount: 0, margin: "0px 0px -12% 0px" } as const;
