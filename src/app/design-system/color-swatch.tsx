"use client";

import { useEffect, useRef } from "react";

/**
 * A colour swatch that fills from a CSS variable and prints the resolved hex,
 * so the page shows the real token value from globals.css (no duplicated hex here).
 */
export function ColorSwatch({ token, label }: { token: string; label?: string }) {
  const hexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = hexRef.current;
    if (!el) return;
    // Resolve through a probe so semantic tokens that point at other tokens print a real value.
    const probe = document.createElement("span");
    probe.style.color = `var(--${token})`;
    probe.style.display = "none";
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color;
    document.body.removeChild(probe);
    const match = rgb.match(/\d+(\.\d+)?/g);
    if (match && match.length >= 3) {
      el.textContent =
        "#" +
        match
          .slice(0, 3)
          .map((n) => Math.round(Number(n)).toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase();
    } else {
      el.textContent = rgb;
    }
  }, [token]);

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div
        className="h-16 w-full rounded-md border border-line"
        style={{ backgroundColor: `var(--${token})` }}
        aria-hidden="true"
      />
      <div className="flex flex-col">
        <span className="truncate text-0 leading-[1.3] font-medium text-strong">{label ?? token}</span>
        <span ref={hexRef} className="text-0 leading-[1.3] text-muted tabular-nums">
          &nbsp;
        </span>
      </div>
    </div>
  );
}
