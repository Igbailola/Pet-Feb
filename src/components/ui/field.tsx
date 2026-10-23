"use client";

import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn, type PreviewState } from "./cn";

/**
 * Shared field anatomy and control frame: docs/design-system.md section 9.1 and 9.2.
 * Label above (8px gap), control, helper or error below. Required fields say "(required)" in words.
 */

type FieldShellProps = {
  id: string;
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  className?: string;
  children: ReactNode;
};

export function helperId(id: string) {
  return `${id}-help`;
}
export function errorId(id: string) {
  return `${id}-error`;
}

/** The aria-describedby value for a control inside a FieldShell. */
export function describedBy(id: string, hasHelper: boolean, hasError: boolean): string | undefined {
  const ids = [hasError ? errorId(id) : null, hasHelper ? helperId(id) : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function FieldShell({
  id,
  label,
  required,
  helperText,
  error,
  hideLabel,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-1 leading-[1.3] font-medium text-body",
            hideLabel && "sr-only",
          )}
        >
          {label}
          {required && <span className="font-normal text-muted"> (required)</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={errorId(id)} className="flex items-start gap-1.5 text-0 leading-[1.4] tracking-[0.01em] text-danger">
          <CircleAlert aria-hidden="true" size={16} strokeWidth={2} className="mt-px shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId(id)} className="text-0 leading-[1.4] tracking-[0.01em] text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

type FieldFrameProps = {
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  valid?: boolean;
  /** Align children to the top (textarea) instead of centring them. */
  multiline?: boolean;
  dense?: boolean;
  preview?: PreviewState;
  className?: string;
  children: ReactNode;
};

/**
 * The visible box of a text control: 1px neutral-400 border, radius-md, white fill.
 * Focus draws a 2px black border without shifting layout (1px border + 1px inset ring).
 */
export function FieldFrame({
  disabled,
  readOnly,
  invalid,
  valid,
  multiline,
  dense,
  preview,
  className,
  children,
}: FieldFrameProps) {
  const state = disabled
    ? "cursor-not-allowed border-control bg-neutral-100 text-neutral-600"
    : invalid
      ? "border-error-600 bg-neutral-0 ring-1 ring-inset ring-error-600"
      : cn(
          readOnly ? "bg-neutral-50" : "bg-neutral-0",
          valid ? "border-primary-700" : "border-control",
          "hover:border-neutral-700",
          "focus-within:border-line-focus focus-within:ring-1 focus-within:ring-inset focus-within:ring-line-focus focus-within:shadow-xs",
        );

  return (
    <div
      data-preview={preview}
      className={cn(
        "relative flex w-full gap-2 rounded-md border px-3 text-body",
        "transition-[border-color,box-shadow] duration-(--duration-fast) ease-standard",
        multiline ? "items-start py-3" : cn("items-center", dense ? "h-10" : "h-12"),
        state,
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Classes for the bare element (input, textarea, select) inside a FieldFrame. */
export const bareControl =
  "min-w-0 flex-1 bg-transparent text-1 leading-[1.5] text-body outline-none pointer-coarse:text-touch " +
  "placeholder:text-placeholder disabled:cursor-not-allowed disabled:text-neutral-600";
