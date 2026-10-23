/** Joins class names, ignoring falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Renders an interaction state without user input, for the /design-system page.
 * Maps to the data-preview hooks declared as custom variants in globals.css.
 */
export type PreviewState = "hover" | "focus" | "active";
