"use client";

import { Check, Minus } from "lucide-react";
import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn, type PreviewState } from "./cn";
import { errorId, helperId } from "./field";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "size"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  /** Shows the black dash. Purely visual state: set it when some, not all, children are ticked. */
  indeterminate?: boolean;
  preview?: PreviewState;
  className?: string;
};

/**
 * Checkbox (spec 9.4): 24px box, radius-xs, 1.5px neutral-400 border.
 * Checked = primary-500 fill with a black check. Indeterminate = black dash.
 */
export function Checkbox({
  id,
  label,
  helperText,
  error,
  indeterminate = false,
  preview,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const ref = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

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
          ref={ref}
          id={fieldId}
          type="checkbox"
          disabled={disabled}
          data-preview={preview}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-px flex size-6 shrink-0 items-center justify-center rounded-xs border-[1.5px] bg-neutral-0 text-on-brand",
            "transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-standard",
            hasError ? "border-error-600" : "border-control",
            "group-hover:border-neutral-700",
            "peer-checked:border-primary-500 peer-checked:bg-primary-500",
            "peer-indeterminate:border-primary-500 peer-indeterminate:bg-primary-500",
            "peer-focus-visible:ring-focus",
            "peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100 peer-disabled:text-neutral-600",
            "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 peer-indeterminate:[&>svg]:opacity-100",
            "[&>.ds-check]:peer-indeterminate:hidden [&>.ds-dash]:hidden [&>.ds-dash]:peer-indeterminate:block",
          )}
        >
          <Check size={16} strokeWidth={3} className="ds-check" />
          <Minus size={16} strokeWidth={3} className="ds-dash" />
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
