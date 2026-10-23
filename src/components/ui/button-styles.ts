import { cn } from "./cn";

/**
 * Button types, states and sizes: docs/design-system.md section 8.
 * Tokens only. Kept free of "use client" so server components can call buttonStyles().
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-inverse"
  | "light"
  | "dark"
  | "deep"
  | "ghost"
  | "destructive";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

/** "dark" = the button sits on bg-inverse, deep green or a photo overlay, so it gets ring-focus-inverse. */
export type ButtonSurface = "light" | "dark";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-heading font-semibold " +
  "tracking-[0.005em] whitespace-nowrap select-none cursor-pointer outline-none " +
  "transition-[background-color,border-color,color,box-shadow] duration-(--duration-fast) ease-standard " +
  "disabled:cursor-not-allowed disabled:shadow-none aria-busy:cursor-progress";

/** Disabled treatment shared by every filled type (spec 8.2). */
const disabledFilled = "disabled:bg-neutral-100 disabled:text-neutral-600";

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-primary-500 text-on-brand",
    "hover:bg-primary-600 hover:shadow-xs",
    "active:bg-primary-700 active:shadow-inset",
    disabledFilled,
  ),
  secondary: cn(
    "bg-secondary-500 text-on-brand",
    "hover:bg-secondary-600 hover:shadow-xs",
    "active:bg-secondary-700 active:shadow-inset",
    disabledFilled,
  ),
  outline: cn(
    "border-[1.5px] border-outline bg-transparent text-strong",
    "hover:bg-primary-50",
    "active:bg-primary-100",
    "disabled:border-neutral-200 disabled:bg-transparent disabled:text-neutral-600",
  ),
  "outline-inverse": cn(
    "border-[1.5px] border-neutral-0 bg-transparent text-on-inverse",
    "hover:bg-neutral-0/15",
    "active:bg-neutral-0/25",
    "disabled:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600",
  ),
  light: cn(
    "bg-neutral-0 text-link",
    "hover:bg-primary-50",
    "active:bg-primary-100",
    disabledFilled,
  ),
  dark: cn(
    "bg-neutral-800 text-on-inverse",
    "hover:bg-neutral-850",
    "active:bg-neutral-900",
    disabledFilled,
  ),
  deep: cn(
    "bg-primary-700 text-on-inverse",
    "hover:bg-primary-800",
    "active:bg-primary-900",
    disabledFilled,
  ),
  ghost: cn(
    "bg-transparent text-link underline underline-offset-4 decoration-1",
    "hover:text-primary-900 hover:decoration-2",
    "active:text-primary-950",
    "disabled:bg-transparent disabled:text-neutral-600 disabled:no-underline",
  ),
  destructive: cn(
    "bg-error-600 text-on-inverse",
    "hover:bg-error-700",
    "active:bg-error-800",
    disabledFilled,
  ),
};

/** Heights 28 / 36 / 44 / 52, horizontal padding 12 / 16 / 20 / 28, text 12 / 15 / 15 / 19 (spec 8.3). */
const sizes: Record<ButtonSize, string> = {
  xs: "h-7 px-3 text-0 pointer-coarse:min-h-11",
  sm: "h-9 px-4 text-1",
  md: "h-11 px-5 text-1",
  lg: "h-13 px-7 text-2",
};

/** Square icon-button sizes. 44px is the default touch target. */
const iconSizes: Record<"md" | "lg", string> = {
  md: "size-11 text-1",
  lg: "size-13 text-2",
};

/** Variants that default to the dark-surface focus ring. */
const darkByDefault: ReadonlySet<ButtonVariant> = new Set(["light", "outline-inverse"]);

export function ringFor(variant: ButtonVariant, surface?: ButtonSurface): string {
  const dark = surface ? surface === "dark" : darkByDefault.has(variant);
  return dark ? "focus-visible:ring-focus-inverse" : "focus-visible:ring-focus";
}

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  surface?: ButtonSurface;
  fullWidth?: boolean;
  className?: string;
};

/** Class string for anything that should look like a button (for example a Next.js Link). */
export function buttonStyles({
  variant = "primary",
  size = "md",
  surface,
  fullWidth,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], ringFor(variant, surface), fullWidth && "w-full", className);
}

export function iconButtonStyles({
  variant = "primary",
  size = "md",
  surface,
  className,
}: Omit<ButtonStyleOptions, "size" | "fullWidth"> & { size?: "md" | "lg" } = {}): string {
  return cn(base, variants[variant], iconSizes[size], ringFor(variant, surface), "px-0", className);
}

/** Icon pixel size per button size (spec 8.3): 16 for xs and sm, 20 for md and lg. */
export const buttonIconSize: Record<ButtonSize, number> = { xs: 16, sm: 16, md: 20, lg: 20 };
