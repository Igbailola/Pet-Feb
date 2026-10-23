"use client";

import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import type { PreviewState } from "./cn";
import { bareControl, describedBy, FieldFrame, FieldShell } from "./field";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label?: ReactNode;
  hideLabel?: boolean;
  helperText?: ReactNode;
  error?: ReactNode;
  success?: boolean;
  preview?: PreviewState;
  wrapperClassName?: string;
};

/** Min height 120, vertical resize only (spec 9.2). */
export function Textarea({
  id,
  label,
  hideLabel,
  helperText,
  error,
  success,
  preview,
  wrapperClassName,
  disabled,
  readOnly,
  required,
  rows = 4,
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
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
        multiline
        disabled={disabled}
        readOnly={readOnly}
        invalid={hasError}
        valid={success && !hasError}
        preview={preview}
      >
        <textarea
          {...rest}
          id={fieldId}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(fieldId, Boolean(helperText), hasError)}
          className={`${bareControl} min-h-30 resize-y`}
        />
      </FieldFrame>
    </FieldShell>
  );
}
