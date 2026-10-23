"use client";

import { CircleAlert, CircleCheck, Info, TriangleAlert, X, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "./cn";

/** Alerts: docs/design-system.md section 12.3. */
export type AlertTone = "success" | "warning" | "error" | "info";

const tones: Record<AlertTone, { box: string; bar: string; icon: LucideIcon }> = {
  success: { box: "bg-primary-100 text-primary-900", bar: "border-primary-700", icon: CircleCheck },
  warning: { box: "bg-secondary-100 text-secondary-900", bar: "border-secondary-800", icon: TriangleAlert },
  error: { box: "bg-error-100 text-error-600", bar: "border-error-600", icon: CircleAlert },
  info: { box: "bg-info-100 text-info-600", bar: "border-info-600", icon: Info },
};

export type AlertProps = {
  tone?: AlertTone;
  title?: ReactNode;
  /** An inline link or button shown under the text. */
  action?: ReactNode;
  /** Adds a close button that hides the alert. */
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: ReactNode;
};

/** Errors use role="alert". The other tones use role="status". */
export function Alert({
  tone = "info",
  title,
  action,
  dismissible,
  onDismiss,
  className,
  children,
}: AlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const { box, bar, icon: Icon } = tones[tone];

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("flex w-full items-start gap-3 rounded-lg border-l-4 p-4", box, bar, className)}
    >
      <Icon aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1 text-1 leading-[1.6]">
        {title && <p className="font-medium">{title}</p>}
        {children && <div>{children}</div>}
        {action && <div className="mt-2 font-medium underline underline-offset-4">{action}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setOpen(false);
            onDismiss?.();
          }}
          className="-m-2.5 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-neutral-900/10 focus-visible:ring-focus active:bg-neutral-900/20"
        >
          <X aria-hidden="true" size={20} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
