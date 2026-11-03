"use client";

import React from "react";
import Link from "next/link";

export interface ProductCardButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * Reusable Product Card Action Button with green-to-white sliding background hover animation.
 *
 * - Default: Solid Pet-Feb green background (#7BB042) with white label/icons.
 * - Hover: Green panel slides out to the right while white panel slides in from the left (same direction wipe).
 * - Label & icons remain 100% stationary and smoothly transition to deep forest green (#1F3A0B).
 * - Bi-directional smooth reverse on pointer exit.
 * - Fully accessible with keyboard focus ring and prefers-reduced-motion fallback.
 */
export function ProductCardButton({
  href,
  onClick,
  children,
  className = "",
  ariaLabel,
  disabled = false,
  type = "button",
}: ProductCardButtonProps) {
  const combinedClasses = `product-card-btn-slide inline-flex items-center justify-center cursor-pointer select-none ${className}`;

  if (href && !disabled) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={combinedClasses}
      >
        <span className="product-card-btn-content">{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${combinedClasses} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <span className="product-card-btn-content">{children}</span>
    </button>
  );
}
