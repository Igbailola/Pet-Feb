"use client";

import { LoaderCircle } from "lucide-react";
import type { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";
import {
  buttonIconSize,
  buttonStyles,
  iconButtonStyles,
  type ButtonSize,
  type ButtonSurface,
  type ButtonVariant,
} from "./button-styles";
import type { PreviewState } from "./cn";

const spinner = "animate-[ds-spin_1s_linear_infinite]";

type CommonProps = {
  variant?: ButtonVariant;
  surface?: ButtonSurface;
  /** Spinner replaces the icon, the label stays, aria-busy is set and clicks are blocked. */
  loading?: boolean;
  /** Render an interaction state without user input (design-system page only). */
  preview?: PreviewState;
};

export type ButtonProps = Omit<ComponentPropsWithRef<"button">, "className"> &
  CommonProps & {
    size?: ButtonSize;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    fullWidth?: boolean;
    className?: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  surface,
  loading = false,
  leadingIcon,
  trailingIcon,
  fullWidth,
  preview,
  className,
  type = "button",
  disabled,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const iconSize = buttonIconSize[size];

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      data-preview={preview}
      onClick={handleClick}
      className={buttonStyles({ variant, size, surface, fullWidth, className })}
    >
      {loading ? (
        <LoaderCircle aria-hidden="true" size={iconSize} strokeWidth={2} className={spinner} />
      ) : (
        leadingIcon
      )}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}

export type IconButtonProps = Omit<ComponentPropsWithRef<"button">, "className" | "aria-label"> &
  CommonProps & {
    /** Required: an icon alone does not name the control. */
    "aria-label": string;
    icon: ReactNode;
    size?: "md" | "lg";
    className?: string;
  };

/** 44px square button (52px for lg). Takes any button type. */
export function IconButton({
  variant = "primary",
  size = "md",
  surface,
  loading = false,
  icon,
  preview,
  className,
  type = "button",
  disabled,
  onClick,
  ...rest
}: IconButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      data-preview={preview}
      onClick={handleClick}
      className={iconButtonStyles({ variant, size, surface, className })}
    >
      {loading ? <LoaderCircle aria-hidden="true" size={20} strokeWidth={2} className={spinner} /> : icon}
    </button>
  );
}
