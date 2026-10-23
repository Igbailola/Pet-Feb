import type { ReactNode } from "react";
import { cn } from "./cn";

/** Chips and badges: docs/design-system.md section 12.1. */
export type ChipTone =
  | "training"
  | "project"
  | "news"
  | "featured"
  | "highlight"
  | "neutral"
  | "count";

const tones: Record<ChipTone, string> = {
  training: "bg-primary-100 text-primary-900",
  project: "bg-secondary-100 text-secondary-900",
  news: "bg-info-100 text-info-600",
  featured: "bg-primary-500 text-on-brand",
  highlight: "bg-secondary-500 text-on-brand",
  neutral: "bg-neutral-100 text-neutral-800",
  count: "bg-neutral-900 text-on-inverse",
};

export type ChipProps = {
  tone?: ChipTone;
  /** Optional 14px icon. Decorative: the label carries the meaning. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Height 24, padding 0 12, radius-full, Roboto 500 at 12px. */
export function Chip({ tone = "neutral", icon, className, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center justify-center gap-1 rounded-full text-0 leading-none font-medium whitespace-nowrap",
        tone === "count" ? "min-w-6 px-2" : "px-3",
        tones[tone],
        className,
      )}
    >
      {icon && (
        <span aria-hidden="true" className="flex shrink-0 items-center [&>svg]:size-3.5">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
