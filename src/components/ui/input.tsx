"use client";

import { CircleCheck, Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import type { PreviewState } from "./cn";
import { bareControl, describedBy, FieldFrame, FieldShell } from "./field";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & {
  label?: ReactNode;
  hideLabel?: boolean;
  helperText?: ReactNode;
  /** Error message. Sets the red border, the alert icon, aria-invalid and aria-describedby. */
  error?: ReactNode;
  /** Success state (primary-700 border and check). Use only where reassurance is needed. */
  success?: boolean;
  leadingIcon?: ReactNode;
  /** Anything placed at the end of the field: an icon button, a unit, a clear button. */
  trailing?: ReactNode;
  /** Static text before the value, for example "+234". */
  prefix?: ReactNode;
  /** Adds a show/hide button. Only applies to type="password". */
  showPasswordToggle?: boolean;
  /** Dense admin variant: 40px high instead of 48px. */
  dense?: boolean;
  preview?: PreviewState;
  wrapperClassName?: string;
};

export function Input({
  id,
  label,
  hideLabel,
  helperText,
  error,
  success,
  leadingIcon,
  trailing,
  prefix,
  showPasswordToggle,
  dense,
  preview,
  wrapperClassName,
  type = "text",
  disabled,
  readOnly,
  required,
  ...rest
}: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password" && showPasswordToggle;
  const hasError = Boolean(error);

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      helperText={helperText}
      error={error}
      className={wrapperClassName}
    >
      <FieldFrame
        disabled={disabled}
        readOnly={readOnly}
        invalid={hasError}
        valid={success && !hasError}
        dense={dense}
        preview={preview}
        className={leadingIcon ? "px-4" : undefined}
      >
        {leadingIcon && (
          <span aria-hidden="true" className="flex shrink-0 items-center text-neutral-600 [&>svg]:size-5">
            {leadingIcon}
          </span>
        )}
        {prefix && <span className="shrink-0 text-1 text-muted select-none">{prefix}</span>}
        <input
          {...rest}
          id={fieldId}
          type={isPassword && revealed ? "text" : type}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(fieldId, Boolean(helperText), hasError)}
          className={bareControl}
        />
        {success && !hasError && (
          <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="shrink-0 text-link" />
        )}
        {isPassword && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            className="-mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-600 outline-none hover:text-strong focus-visible:ring-focus disabled:cursor-not-allowed"
          >
            {revealed ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
          </button>
        )}
        {trailing}
      </FieldFrame>
    </FieldShell>
  );
}
