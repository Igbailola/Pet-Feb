"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn, type PreviewState } from "./cn";
import { errorId, helperId } from "./field";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "size"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  preview?: PreviewState;
  className?: string;
};

/**
 * Radio (spec 9.4): 24px circle. Selected = primary-500 fill with a black centre dot.
 * Group radios by giving them the same `name`.
 */
export function Radio({ id, label, helperText, error, preview, disabled, className, ...rest }: RadioProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hasError = Boolean(error);

  const describedBy = [hasError ? errorId(fieldId) : null, helperText ? helperId(fieldId) : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={fieldId}
        data-preview={preview}
        className={cn(
          "group inline-flex items-start gap-3 text-1 leading-[1.6] text-body",
          disabled ? "cursor-not-allowed text-muted" : "cursor-pointer",
        )}
      >
        <input
          {...rest}
          id={fieldId}
          type="radio"
          disabled={disabled}
          data-preview={preview}
          aria-describedby={describedBy || undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-px flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] bg-neutral-0",
            "transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-standard",
            hasError ? "border-error-600" : "border-control",
            "group-hover:border-neutral-700",
            "peer-checked:border-primary-500 peer-checked:bg-primary-500",
            "peer-focus-visible:ring-focus",
            "peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100",
            "[&>span]:scale-0 peer-checked:[&>span]:scale-100 peer-disabled:[&>span]:bg-neutral-600",
          )}
        >
          <span className="size-2.5 rounded-full bg-neutral-900 transition-transform duration-(--duration-fast) ease-standard" />
        </span>
        {label && <span className="select-none">{label}</span>}
      </label>
      {hasError ? (
        <p id={errorId(fieldId)} className="text-0 leading-[1.4] tracking-[0.01em] text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId(fieldId)} className="text-0 leading-[1.4] tracking-[0.01em] text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
