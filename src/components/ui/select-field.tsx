"use client";

import { ChevronDown } from "lucide-react";
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import type { PreviewState } from "./cn";
import { bareControl, describedBy, FieldFrame, FieldShell } from "./field";

export type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  label?: ReactNode;
  hideLabel?: boolean;
  helperText?: ReactNode;
  error?: ReactNode;
  success?: boolean;
  leadingIcon?: ReactNode;
  dense?: boolean;
  preview?: PreviewState;
  wrapperClassName?: string;
  /** <option> and <optgroup> elements. */
  children: ReactNode;
};

/**
 * Select field (spec 9.3): looks like a text input with a trailing chevron-down.
 * Uses the native <select>, which the spec allows and which gives mobile its native picker.
 * The existing src/components/ui/select.tsx is untouched because the admin screens import it.
 */
export function SelectField({
  id,
  label,
  hideLabel,
  helperText,
  error,
  success,
  leadingIcon,
  dense,
  preview,
  wrapperClassName,
  disabled,
  required,
  children,
  ...rest
}: SelectFieldProps) {
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
        disabled={disabled}
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
        <select
          {...rest}
          id={fieldId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(fieldId, Boolean(helperText), hasError)}
          className={`${bareControl} cursor-pointer appearance-none pr-8`}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={20}
          strokeWidth={1.75}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-600"
        />
      </FieldFrame>
    </FieldShell>
  );
}

export { SelectField as Select };
