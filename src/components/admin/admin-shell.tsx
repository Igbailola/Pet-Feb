"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SessionUser } from "@/lib/session";
import type { AdminSection } from "@/lib/rbac";
import { logoutAction } from "@/app/actions/auth";
import { AdminHeader } from "./admin-header";
import type { AttentionTask } from "@/lib/attention-queue";
import {
  LayoutDashboard,
  Bell,
  Activity,
  Package,
  FileText,
  MessageSquareQuote,
  ShieldCheck,
  Layers,
  Settings,
  LogOut,
  X,
  ShoppingBag,
  Users,
  CreditCard,
  Calendar,
  Wrench,
  GraduationCap,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getDismissedNotificationIds,
  subscribeToNotificationChanges,
} from "@/lib/notifications-client";

// Setting: when true, greyed non-clickable planned modules are displayed with "Coming soon"
export const SHOW_PLANNED_MODULES = false;

interface AdminShellProps {
  user: SessionUser;
  attentionCount?: number;
  attentionTasks?: AttentionTask[];
  children: React.ReactNode;
}

export function AdminShell({
  user,
  attentionCount = 0,
  attentionTasks = [],
  children,
}: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attentionOpen, setAttentionOpen] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    setDismissedIds(getDismissedNotificationIds());
    return subscribeToNotificationChanges((ids) => setDismissedIds(ids));
  }, []);

  const effectiveAttentionCount = Math.max(
    0,
    attentionTasks.length > 0
      ? attentionTasks.filter((t) => !dismissedIds.includes(t.id)).length
      : attentionCount - dismissedIds.length
  );

  const hasSection = (s: AdminSection) => user.sections.includes(s);
  const hasAnySection = user.sections.length > 0;

  const getSectionSummary = () => {
    if (user.sections.length === 6) return "Full access (6 sections)";
    if (user.sections.length === 0) return "No access assigned";
    if (user.sections.length === 1) return "1 section assigned";
    return `${user.sections.length} sections assigned`;
  };

  const displayName = user.fullName ?? user.email.split("@")[0];
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isRouteActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const navLink = (
    href: string,
    label: string,
    icon: React.ReactNode,
    badge?: React.ReactNode
  ) => {
    const active = isRouteActive(href);
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setSidebarOpen(false)}
        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${
          active
            ? "bg-[#7BB042] text-black font-bold shadow-sm"
            : "text-[#A3B0A3] hover:bg-[#1E261E] hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={active ? "text-black" : "text-[#879687] group-hover:text-white"}>
            {icon}
          </span>
          <span className="truncate">{label}</span>
        </div>
        {badge ? (
          badge
        ) : active ? (
          <ChevronRight size={14} className="text-black" />
        ) : null}
      </Link>
    );
  };

  const plannedItem = (label: string, icon: React.ReactNode) => (
    <div
      key={label}
      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#525E52] cursor-not-allowed select-none"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[#3F4A3F]">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#1B221B] text-[#6E7B6E] px-1.5 py-0.5 rounded">
        Coming soon
      </span>
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111611] text-white">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-[#212A21]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7BB042] flex items-center justify-center flex-shrink-0 shadow-sm text-black">
              {/* Sun geometry icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </div>
            <div>
              <p
                className="text-sm font-bold text-white tracking-tight leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Petfeb Solar
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7BB042] mt-1">
                Operations Portal
              </p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#7BB042] animate-pulse" title="Connected" />
        </div>
      </div>

      {/* Staff profile chip in sidebar */}
      <div className="p-3 border-b border-[#212A21]">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#182018] border border-[#263326]">
          <div className="w-8 h-8 rounded-full bg-[#7BB042] text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {displayName}
            </p>
            <p className="text-[10px] text-[#869686] truncate">
              {getSectionSummary()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {(() => {
          type SidebarLinkItem = {
            type: "link";
            href: string;
            label: string;
            icon: React.ReactNode;
            badge?: React.ReactNode;
          };
          type SidebarPlannedItem = {
            type: "planned";
            label: string;
            icon: React.ReactNode;
          };
          type SidebarItem = SidebarLinkItem | SidebarPlannedItem;

          // 1. Overview
          const overviewItems: SidebarItem[] = [
            {
              type: "link",
              href: "/admin",
              label: "Dashboard",
              icon: <LayoutDashboard size={17} />,
            },
            {
              type: "link",
              href: "/admin/notifications",
              label: "Notifications",
              icon: <Bell size={17} />,
              badge:
                effectiveAttentionCount > 0 ? (
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none ${
                      isRouteActive("/admin/notifications")
                        ? "bg-black text-[#7BB042]"
                        : "bg-[#252F25] text-white border border-[#3A4A3A]"
                    }`}
                  >
                    {effectiveAttentionCount > 99 ? "99+" : effectiveAttentionCount}
                  </span>
                ) : null,
            },
          ];

          // 2. Sales and Contracts (all Coming soon)
          const salesItems: SidebarItem[] = SHOW_PLANNED_MODULES
            ? [
                { type: "planned", label: "Orders and Quotes", icon: <ShoppingBag size={17} /> },
                { type: "planned", label: "Customers and Portfolios", icon: <Users size={17} /> },
                { type: "planned", label: "Buy Small Agreements", icon: <CreditCard size={17} /> },
              ]
            : [];

          // 3. Operations (all Coming soon)
          const operationsItems: SidebarItem[] = SHOW_PLANNED_MODULES
            ? [
                { type: "planned", label: "Installations Schedule", icon: <Calendar size={17} /> },
                { type: "planned", label: "Field Technicians", icon: <Wrench size={17} /> },
              ]
            : [];

          // 4. Catalogue and Training
          const catalogueItems: SidebarItem[] = [
            ...(hasSection("products")
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/products",
                    label: "Products and accessories",
                    icon: <Package size={17} />,
                  },
                ]
              : []),
            ...(SHOW_PLANNED_MODULES
              ? [{ type: "planned" as const, label: "Academy", icon: <GraduationCap size={17} /> }]
              : []),
          ];

          // 5. Content
          const contentItems: SidebarItem[] = [
            ...(hasSection("blog")
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/blog",
                    label: "Blog",
                    icon: <FileText size={17} />,
                  },
                ]
              : []),
            ...(hasSection("testimonials")
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/testimonials",
                    label: "Testimonials",
                    icon: <MessageSquareQuote size={17} />,
                  },
                ]
              : []),
            ...(hasSection("cms")
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/cms",
                    label: "Site content",
                    icon: <Layers size={17} />,
                  },
                ]
              : []),
          ];

          // 6. Customers
          const customersItems: SidebarItem[] = [
            ...(hasSection("verifications")
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/verifications",
                    label: "Verifications",
                    icon: <ShieldCheck size={17} />,
                  },
                ]
              : []),
          ];

          // 7. Reports and Audits
          const reportsItems: SidebarItem[] = [
            ...(hasAnySection
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/activity",
                    label: "Activity",
                    icon: <Activity size={17} />,
                  },
                ]
              : []),
            ...(SHOW_PLANNED_MODULES
              ? [{ type: "planned" as const, label: "Reports", icon: <BarChart3 size={17} /> }]
              : []),
          ];

          // 8. Other updates
          const otherUpdatesItems: SidebarItem[] = [
            ...(hasSection("other_updates")
              ? [
                  {
                    type: "link" as const,
                    href: "/admin/other-updates",
                    label: "Other updates",
                    icon: <Settings size={17} />,
                  },
                ]
              : []),
          ];

          const groups = [
            { title: "Overview", items: overviewItems },
            { title: "Sales and Contracts", items: salesItems },
            { title: "Operations", items: operationsItems },
            { title: "Catalogue and Training", items: catalogueItems },
            { title: "Content", items: contentItems },
            { title: "Customers", items: customersItems },
            { title: "Reports and Audits", items: reportsItems },
            { title: "Other updates", items: otherUpdatesItems },
          ];

          return groups
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <div key={g.title}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#637263] px-3 mb-1">
                  {g.title}
                </p>
                <div className="space-y-1">
                  {g.items.map((item) =>
                    item.type === "link"
                      ? navLink(item.href, item.label, item.icon, item.badge)
                      : plannedItem(item.label, item.icon)
                  )}
                </div>
              </div>
            ));
        })()}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-3 py-3 border-t border-[#212A21]">
        <div className="px-2 py-1.5 flex items-center justify-between text-[11px] text-[#637263] mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" />
            <span>Petfeb Internal</span>
          </div>
          <span className="font-mono text-[10px]">v1.0</span>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#F87171] hover:bg-[#2A1616] hover:text-[#EF4444] transition w-full"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#333333]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-[#111611] border-r border-[#212A21] flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#111611] shadow-2xl z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#889788] hover:bg-white/10 hover:text-white transition"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AdminHeader
          user={user}
          attentionCount={effectiveAttentionCount}
          attentionTasks={attentionTasks}
          attentionOpen={attentionOpen}
          onToggleAttention={() => setAttentionOpen(!attentionOpen)}
          onOpenMobileSidebar={() => setSidebarOpen(true)}
        />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
