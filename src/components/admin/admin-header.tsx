"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { SessionUser } from "@/lib/session";
import { SECTION_LABELS } from "@/lib/rbac";
import { searchAdmin, type SearchResultItem } from "@/app/actions/search";
import { logoutAction, changePasswordAction } from "@/app/actions/auth";
import { useToast } from "./toast";
import type { AttentionTask } from "@/lib/attention-queue";
import {
  Search,
  KeyRound,
  LogOut,
  X,
  Package,
  FileText,
  MessageSquareQuote,
  Loader2,
  ChevronDown,
  Bell,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import {
  getDismissedNotificationIds,
  dismissNotification,
  dismissAllNotifications,
  restoreAllNotifications,
  subscribeToNotificationChanges,
} from "@/lib/notifications-client";

interface AdminHeaderProps {
  user: SessionUser;
  attentionCount?: number;
  attentionTasks?: AttentionTask[];
  attentionOpen?: boolean;
  onToggleAttention?: () => void;
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({
  user,
  attentionCount = 0,
  attentionTasks = [],
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [attentionDropdownOpen, setAttentionDropdownOpen] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  // Sync dismissed notification IDs
  useEffect(() => {
    setDismissedIds(getDismissedNotificationIds());
    return subscribeToNotificationChanges((ids) => setDismissedIds(ids));
  }, []);

  const visibleTasks = attentionTasks.filter((t) => !dismissedIds.includes(t.id));
  const effectiveCount = visibleTasks.length;

  // Close attention popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setAttentionDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute breadcrumb segments based on pathname
  const getBreadcrumbs = () => {
    const parts = [{ label: "Petfeb Operations", href: "/admin" }];

    if (pathname === "/admin") {
      parts.push({ label: "Headquarters", href: "/admin" });
      parts.push({ label: "Overview", href: "/admin" });
    } else if (pathname.startsWith("/admin/notifications")) {
      parts.push({ label: "Overview", href: "/admin" });
      parts.push({ label: "Notifications", href: "/admin/notifications" });
    } else if (pathname.startsWith("/admin/activity")) {
      parts.push({ label: "Reports and Audits", href: "/admin/activity" });
      parts.push({ label: "Activity Log", href: "/admin/activity" });
    } else if (pathname.startsWith("/admin/products")) {
      parts.push({ label: "Catalogue", href: "/admin/products" });
      if (pathname === "/admin/products/new") {
        parts.push({ label: "Products", href: "/admin/products" });
        parts.push({ label: "New Product", href: pathname });
      } else if (pathname !== "/admin/products") {
        parts.push({ label: "Products", href: "/admin/products" });
        parts.push({ label: "Edit Product", href: pathname });
      } else {
        parts.push({ label: "Products & Accessories", href: "/admin/products" });
      }
    } else if (pathname.startsWith("/admin/blog")) {
      parts.push({ label: "Content", href: "/admin/blog" });
      if (pathname === "/admin/blog/new") {
        parts.push({ label: "Blog", href: "/admin/blog" });
        parts.push({ label: "New Post", href: pathname });
      } else if (pathname !== "/admin/blog") {
        parts.push({ label: "Blog", href: "/admin/blog" });
        parts.push({ label: "Edit Post", href: pathname });
      } else {
        parts.push({ label: "Blog Articles", href: "/admin/blog" });
      }
    } else if (pathname.startsWith("/admin/testimonials")) {
      parts.push({ label: "Content", href: "/admin/testimonials" });
      if (pathname === "/admin/testimonials/new") {
        parts.push({ label: "Testimonials", href: "/admin/testimonials" });
        parts.push({ label: "New Testimonial", href: pathname });
      } else if (pathname !== "/admin/testimonials") {
        parts.push({ label: "Testimonials", href: "/admin/testimonials" });
        parts.push({ label: "Edit Testimonial", href: pathname });
      } else {
        parts.push({ label: "Client Testimonials", href: "/admin/testimonials" });
      }
    } else if (pathname.startsWith("/admin/verifications")) {
      parts.push({ label: "Customers", href: "/admin/verifications" });
      parts.push({ label: "Client Verifications", href: "/admin/verifications" });
    } else if (pathname.startsWith("/admin/cms")) {
      parts.push({ label: "Content", href: "/admin/cms" });
      parts.push({ label: "Site Content", href: "/admin/cms" });
    } else if (pathname.startsWith("/admin/other-updates")) {
      parts.push({ label: "System", href: "/admin/other-updates" });
      parts.push({ label: "Other Updates", href: "/admin/other-updates" });
    }

    return parts;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleBellClick = () => {
    if (pathname === "/admin") {
      const el = document.getElementById("attention-queue");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    setAttentionDropdownOpen(!attentionDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white border-b border-[#E5E7EB]">
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#333] transition"
          aria-label="Open navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-[#767676] min-w-0">
          {breadcrumbs.map((b, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} className="text-[#A1A1AA]" />}
                {isLast ? (
                  <span className="font-semibold text-black truncate max-w-[200px]">
                    {b.label}
                  </span>
                ) : (
                  <Link href={b.href} className="hover:text-black transition truncate">
                    {b.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* Center & Right: Search, Bell, User Chip */}
      <div className="flex items-center gap-3 flex-1 justify-end max-w-xl">
        {/* Global header search */}
        <div className="flex-1 max-w-xs sm:max-w-sm">
          <HeaderSearch user={user} />
        </div>

        {/* Attention Notification Bell */}
        <div ref={bellRef} className="relative">
          <button
            onClick={handleBellClick}
            className="relative p-2 rounded-xl hover:bg-[#F4F4F5] text-[#4B5563] hover:text-black transition cursor-pointer"
            aria-label={`Attention queue (${effectiveCount} tasks)`}
            title={`${effectiveCount} items needing attention`}
          >
            <Bell size={18} />
            {effectiveCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#F5B82E] text-black text-[11px] font-bold shadow-xs">
                {effectiveCount}
              </span>
            )}
          </button>

          {/* Attention Queue Popover Modal */}
          {attentionDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] mb-3">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-[#F5B82E]" />
                  <h3
                    className="text-sm font-bold text-black"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Attention Queue
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {visibleTasks.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        dismissAllNotifications(visibleTasks.map((t) => t.id));
                        showToast("All visible notifications cleared");
                      }}
                      className="text-[11px] font-semibold text-[#DC2626] hover:bg-[#FEE2E2] px-2 py-0.5 rounded-md transition cursor-pointer"
                      title="Clear all visible notifications"
                    >
                      Clear all
                    </button>
                  )}
                  <span className="text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full">
                    {effectiveCount} {effectiveCount === 1 ? "task" : "tasks"}
                  </span>
                </div>
              </div>

              {visibleTasks.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#6B7280] space-y-2">
                  <p>
                    {dismissedIds.length > 0
                      ? "All notifications have been cleared."
                      : "No items require immediate attention."}
                  </p>
                  {dismissedIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        restoreAllNotifications();
                        showToast("Cleared notifications restored");
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3F6B1A] hover:underline cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Restore cleared ({dismissedIds.length})
                    </button>
                  )}
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
                  {visibleTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl border border-[#F3F4F6] bg-[#FAFAFA] hover:bg-[#F4F9EC] hover:border-[#7BB042] transition relative group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-black truncate pr-2">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[10px] font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] px-1.5 py-0.5 rounded">
                            {task.tag}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(task.id);
                              showToast("Notification cleared");
                            }}
                            className="p-1 text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-md transition cursor-pointer"
                            title="Clear notification"
                            aria-label={`Clear notification: ${task.title}`}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6B7280] mb-2 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => {
                            setAttentionDropdownOpen(false);
                            router.push(task.href);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2F5212] bg-[#E8F3DA] hover:bg-[#D2E8B5] px-2.5 py-1 rounded-lg transition cursor-pointer"
                        >
                          {task.actionLabel} <ArrowRight size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(task.id);
                            showToast("Notification cleared");
                          }}
                          className="text-[10px] text-[#9CA3AF] hover:text-[#DC2626] hover:underline cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 pt-2.5 border-t border-[#F3F4F6] flex justify-between items-center text-[11px]">
                <Link
                  href="/admin/notifications"
                  onClick={() => setAttentionDropdownOpen(false)}
                  className="font-semibold text-[#3F6B1A] hover:underline flex items-center gap-1"
                >
                  View all notifications ({effectiveCount}) <ArrowRight size={11} />
                </Link>
                <div className="flex items-center gap-2">
                  {dismissedIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        restoreAllNotifications();
                        showToast("Cleared notifications restored");
                      }}
                      className="text-[#6B7280] hover:text-[#3F6B1A] font-medium flex items-center gap-1 cursor-pointer"
                      title="Restore cleared notifications"
                    >
                      <RotateCcw size={11} />
                      Restore
                    </button>
                  )}
                  <button
                    onClick={() => setAttentionDropdownOpen(false)}
                    className="text-[#6B7280] hover:text-black font-medium cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Account Chip & Dropdown */}
        <AccountMenu user={user} />
      </div>
    </header>
  );
}

function HeaderSearch({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchAdmin(query);
        setResults(res);
      } catch (e) {
        console.error("Search failed:", e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const typeIcons = {
    product: <Package size={14} className="text-[#3F6B1A]" />,
    blog: <FileText size={14} className="text-[#2563EB]" />,
    testimonial: <MessageSquareQuote size={14} className="text-[#D97706]" />,
  };

  const hasAccessToAny = user.sections.some((s) =>
    ["products", "blog", "testimonials"].includes(s)
  );

  if (!hasAccessToAny) {
    return null;
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search catalogue & content…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] text-[#333] placeholder-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#9CA3AF] hover:text-black rounded"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-6 text-[#9CA3AF] text-xs">
              <Loader2 size={15} className="animate-spin mr-2" /> Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#6B7280]">
              No items match &ldquo;{query}&rdquo; in your accessible sections.
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {results.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    router.push(item.href);
                  }}
                  className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-[#F4F9EC] transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-[#F3F4F6] group-hover:bg-white transition flex-shrink-0">
                      {typeIcons[item.type]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-black group-hover:text-[#2F5212] truncate">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-[11px] text-[#6B7280] truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#6B7280] bg-[#F3F4F6] px-1.5 py-0.5 rounded-md ml-2 flex-shrink-0">
                    {item.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AccountMenu({ user }: { user: SessionUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user.fullName ?? user.email.split("@")[0];
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-xl hover:bg-[#F4F4F5] transition border border-[#E5E7EB]"
          aria-expanded={menuOpen}
          aria-label="Account menu"
        >
          <div className="w-7 h-7 rounded-full bg-[#7BB042] text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <span className="hidden sm:inline-block text-xs font-bold text-black max-w-[130px] truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {displayName}
          </span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            {/* User details */}
            <div className="pb-3 mb-2 border-b border-[#F3F4F6]">
              <p className="text-sm font-bold text-black truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {user.fullName || "Staff Member"}
              </p>
              <p className="text-xs text-[#6B7280] truncate">{user.email}</p>
            </div>

            {/* Sections held (No job title invented) */}
            <div className="pb-3 mb-2 border-b border-[#F3F4F6]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                Sections held ({user.sections.length})
              </p>
              {user.sections.length === 0 ? (
                <span className="text-xs font-semibold text-[#B3261E] bg-[#FCE8E6] px-2 py-0.5 rounded-md inline-block">
                  No access assigned
                </span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {user.sections.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center text-[10px] font-semibold bg-[#E8F3DA] text-[#2F5212] px-2 py-0.5 rounded-md"
                    >
                      {SECTION_LABELS[s]}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#333] hover:bg-[#F4F4F5] transition text-left"
              >
                <KeyRound size={15} className="text-[#6B7280]" />
                Change password
              </button>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#B3261E] hover:bg-[#FCE8E6] transition text-left"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Change password modal */}
      {modalOpen && <ChangePasswordModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    const fd = new FormData();
    fd.append("password", password);
    fd.append("confirm_password", confirmPassword);

    startTransition(async () => {
      const res = await changePasswordAction({}, fd);
      if (res.error) {
        setError(res.error);
      } else {
        showToast("Password updated successfully", "success");
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-xl text-[#6B7280] hover:bg-[#F4F4F5] hover:text-black transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F3DA] flex items-center justify-center text-[#2F5212]">
            <KeyRound size={20} />
          </div>
          <div>
            <h3
              className="text-base font-bold text-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Change password
            </h3>
            <p className="text-xs text-[#6B7280]">Enter your new account password</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-[#FCE8E6] text-[#B3261E] text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#333] mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#D1D5DB] text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#333] mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#D1D5DB] text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-[#6B7280] hover:bg-[#F4F4F5] rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-[#7BB042] hover:bg-[#6A9E36] text-black text-xs font-bold rounded-xl disabled:opacity-50 transition shadow-xs cursor-pointer"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {isPending ? "Updating…" : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
