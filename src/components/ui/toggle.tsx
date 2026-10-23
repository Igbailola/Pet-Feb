"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn, type PreviewState } from "./cn";

export type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "size"> & {
  label?: ReactNode;
  preview?: PreviewState;
  className?: string;
};

/**
 * Toggle (spec 9.4): 44 x 24 track, radius-full. Off = neutral-400 track with a white knob.
 * On = primary-500 track with a black knob. Label on the right, the whole row is clickable.
 */
export function Toggle({ id, label, preview, disabled, className, ...rest }: ToggleProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <label
      htmlFor={fieldId}
      data-preview={preview}
      className={cn(
        "group inline-flex items-center gap-3 text-1 leading-[1.6] text-body",
        disabled ? "cursor-not-allowed text-muted" : "cursor-pointer",
        className,
      )}
    >
      <input
        {...rest}
        id={fieldId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        data-preview={preview}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border border-transparent bg-neutral-400",
          "transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-standard",
          "group-hover:bg-neutral-500 peer-checked:bg-primary-500 peer-checked:group-hover:bg-primary-600",
          "peer-focus-visible:ring-focus",
          "peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100 peer-disabled:group-hover:bg-neutral-100",
          "[&>span]:translate-x-0 [&>span]:bg-neutral-0",
          "peer-checked:[&>span]:translate-x-5 peer-checked:[&>span]:bg-neutral-900",
          "peer-disabled:[&>span]:bg-neutral-300",
        )}
      >
        <span className="absolute top-px left-px size-5 rounded-full shadow-xs transition-[transform,background-color] duration-(--duration-base) ease-standard" />
      </span>
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
