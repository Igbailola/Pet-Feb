"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SessionUser } from "@/lib/session";
import type { AdminSection } from "@/lib/rbac";
import { SECTION_LABELS } from "@/lib/rbac";
import { logoutAction } from "@/app/actions/auth";
import { AdminHeader } from "./admin-header";
import {
  LayoutDashboard,
  Package,
  FileText,
  MessageSquareQuote,
  ShieldCheck,
  Layers,
  Settings,
  LogOut,
  X,
  Activity,
} from "lucide-react";
import { useState } from "react";

const SECTION_ICONS: Record<AdminSection, React.ReactNode> = {
  products: <Package size={18} />,
  blog: <FileText size={18} />,
  testimonials: <MessageSquareQuote size={18} />,
  verifications: <ShieldCheck size={18} />,
  cms: <Layers size={18} />,
  other_updates: <Settings size={18} />,
};

const SECTION_PATHS: Record<AdminSection, string> = {
  products: "/admin/products",
  blog: "/admin/blog",
  testimonials: "/admin/testimonials",
  verifications: "/admin/verifications",
  cms: "/admin/cms",
  other_updates: "/admin/other-updates",
};

export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user.sections.map((s) => ({
    section: s,
    label: SECTION_LABELS[s],
    href: SECTION_PATHS[s],
    icon: SECTION_ICONS[s],
    active: pathname.startsWith(SECTION_PATHS[s]),
  }));

  const hasAnySection = user.sections.length > 0;

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-[#D9D9D9]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#7BB042] flex items-center justify-center flex-shrink-0 shadow-sm">
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
          <div className="min-w-0">
            <p className="text-sm font-bold text-black truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Petfeb Admin
            </p>
            <p className="text-xs text-[#5C5C5C] truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">
            Overview
          </p>
        </div>

        <Link
          href="/admin"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
            pathname === "/admin"
              ? "bg-[#E8F3DA] text-[#2F5212]"
              : "text-[#333] hover:bg-[#F2F2F2]"
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {hasAnySection && (
          <Link
            href="/admin/activity"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
              pathname.startsWith("/admin/activity")
                ? "bg-[#E8F3DA] text-[#2F5212]"
                : "text-[#333] hover:bg-[#F2F2F2]"
            }`}
          >
            <Activity size={18} />
            Activity log
          </Link>
        )}

        {navItems.length > 0 && (
          <div className="pt-4 pb-1 px-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">
              Sections
            </p>
          </div>
        )}

        {navItems.map((item) => (
          <Link
            key={item.section}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
              item.active
                ? "bg-[#E8F3DA] text-[#2F5212]"
                : "text-[#333] hover:bg-[#F2F2F2]"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-3 py-3 border-t border-[#D9D9D9]">
        <div className="px-3 py-1 mb-1">
          <p className="text-xs font-semibold text-[#333] truncate">
            {user.fullName ?? user.email}
          </p>
          <p className="text-[10px] text-[#767676]">
            {user.sections.length} section{user.sections.length !== 1 ? "s" : ""}
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#B3261E] hover:bg-[#FCE8E6] transition w-full"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8F8F8]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-white border-r border-[#D9D9D9] flex-shrink-0">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-lg text-[#767676] hover:bg-[#F2F2F2] hover:text-black transition"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AdminHeader
          user={user}
          onOpenMobileSidebar={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
