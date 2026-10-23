"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "./cn";

/**
 * Tooltip: docs/design-system.md section 10.
 * neutral-800 fill, white 12px text, radius-sm, padding 6 x 10, shadow-md, 8px offset,
 * appears after 300ms on hover and immediately on keyboard focus, max width 240.
 * Tooltips never hold essential information or interactive content.
 */
export type TooltipSide = "top" | "bottom" | "left" | "right";

const placement: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export type TooltipProps = {
  content: ReactNode;
  side?: TooltipSide;
  /** Hover delay in milliseconds. */
  delay?: number;
  /** Keep the tooltip visible (design-system page only). */
  forceOpen?: boolean;
  /** A single focusable element, for example a Button. It receives aria-describedby. */
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
};

export function Tooltip({ content, side = "top", delay = 300, forceOpen, children, className }: TooltipProps) {
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const visible = shown || Boolean(forceOpen);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    const pending = timer;
    return () => {
      if (pending.current) clearTimeout(pending.current);
    };
  }, []);

  const showAfterDelay = () => {
    clear();
    timer.current = setTimeout(() => setShown(true), delay);
  };
  const showNow = () => {
    clear();
    setShown(true);
  };
  const hide = () => {
    clear();
    setShown(false);
  };

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={showAfterDelay}
      onMouseLeave={hide}
      onFocus={(event: FocusEvent<HTMLSpanElement>) => {
        // Only keyboard focus shows it immediately.
        if ((event.target as HTMLElement).matches(":focus-visible")) showNow();
      }}
      onBlur={hide}
      onKeyDown={(event) => {
        if (event.key === "Escape") hide();
      }}
    >
      {cloneElement(children, { "aria-describedby": id })}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-1400 w-max max-w-60 rounded-sm bg-neutral-800 px-2.5 py-1.5 text-0 leading-[1.4] tracking-[0.01em] text-on-inverse shadow-md",
          placement[side],
          visible
            ? "animate-[ds-fade-in_var(--duration-fast)_var(--ease-out)]"
            : "hidden",
        )}
      >
        {content}
      </span>
    </span>
  );
}
