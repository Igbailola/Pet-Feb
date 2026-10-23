import {
  Archive,
  BadgeCheck,
  Calendar,
  CalendarCheck,
  CalendarClock,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  CircleDashed,
  CirclePlay,
  CircleX,
  Clock,
  Eye,
  FilePen,
  Globe,
  Hammer,
  Hourglass,
  Inbox,
  Loader,
  OctagonAlert,
  Package,
  PackageCheck,
  ShieldQuestionMark,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Truck,
  Undo2,
  UserCheck,
  UserSearch,
  UserX,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "./cn";

/**
 * Status chips: docs/design-system.md section 12.2.
 * Height 28, radius-full, Roboto 500 at 12px, 14px icon plus label. Always icon plus text.
 * Status names are PRD labels and can be changed in settings: pass `label` to override the text.
 */
export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

const toneStyles: Record<StatusTone, string> = {
  neutral: "bg-neutral-100 text-neutral-800",
  info: "bg-info-100 text-info-600",
  success: "bg-primary-100 text-primary-900",
  warning: "bg-secondary-100 text-secondary-900",
  danger: "bg-error-100 text-error-600",
};

type StatusDef = { tone: StatusTone; icon: LucideIcon };

/** Every status named in spec 12.2, with its tone and a Lucide icon. */
const statuses = {
  // Neutral
  Pending: { tone: "neutral", icon: Clock },
  Cancelled: { tone: "neutral", icon: CircleX },
  Refunded: { tone: "neutral", icon: Undo2 },
  Draft: { tone: "neutral", icon: FilePen },
  Archived: { tone: "neutral", icon: Archive },
  "To Do": { tone: "neutral", icon: Circle },
  "Not Started": { tone: "neutral", icon: CircleDashed },
  Upcoming: { tone: "neutral", icon: Calendar },
  // Info
  "Payment Processing": { tone: "info", icon: Loader },
  Processing: { tone: "info", icon: Package },
  "Ready for Delivery": { tone: "info", icon: PackageCheck },
  "Out for Delivery": { tone: "info", icon: Truck },
  "Installation Scheduled": { tone: "info", icon: CalendarCheck },
  Assigned: { tone: "info", icon: UserCheck },
  Scheduled: { tone: "info", icon: CalendarCheck },
  "In Progress": { tone: "info", icon: Hammer },
  Review: { tone: "info", icon: Eye },
  // Success
  Paid: { tone: "success", icon: CircleCheck },
  Delivered: { tone: "success", icon: CircleCheckBig },
  "Installation Completed": { tone: "success", icon: BadgeCheck },
  Completed: { tone: "success", icon: BadgeCheck },
  Approved: { tone: "success", icon: ThumbsUp },
  Published: { tone: "success", icon: Globe },
  Active: { tone: "success", icon: CirclePlay },
  "On Track": { tone: "success", icon: TrendingUp },
  // Warning
  "Installation Pending": { tone: "warning", icon: Wrench },
  Requested: { tone: "warning", icon: Inbox },
  "Pending Assignment": { tone: "warning", icon: UserSearch },
  "Pending KYC": { tone: "warning", icon: ShieldQuestionMark },
  "Grace period": { tone: "warning", icon: Hourglass },
  Due: { tone: "warning", icon: CalendarClock },
  "At Risk": { tone: "warning", icon: TriangleAlert },
  // Danger
  Blocked: { tone: "danger", icon: OctagonAlert },
  Behind: { tone: "danger", icon: TrendingDown },
  "Failed payment": { tone: "danger", icon: CircleAlert },
  Overdue: { tone: "danger", icon: CircleAlert },
  Rejected: { tone: "danger", icon: UserX },
} as const satisfies Record<string, StatusDef>;

export type StatusName = keyof typeof statuses;

/** All status names grouped by tone, in spec order. Used by the design-system page. */
export const STATUS_BY_TONE: Record<StatusTone, StatusName[]> = (
  Object.keys(statuses) as StatusName[]
).reduce(
  (groups, name) => {
    groups[statuses[name].tone].push(name);
    return groups;
  },
  { neutral: [], info: [], success: [], warning: [], danger: [] } as Record<StatusTone, StatusName[]>,
);

export type StatusChipProps = {
  status: StatusName;
  /** Replaces the visible text, for settings-driven status names. */
  label?: string;
  className?: string;
};

export function StatusChip({ status, label, className }: StatusChipProps) {
  const { tone, icon: Icon } = statuses[status] as StatusDef;
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-0 leading-none font-medium whitespace-nowrap",
        toneStyles[tone],
        className,
      )}
    >
      <Icon aria-hidden="true" size={14} strokeWidth={2} className="shrink-0" />
      {label ?? status}
    </span>
  );
}
