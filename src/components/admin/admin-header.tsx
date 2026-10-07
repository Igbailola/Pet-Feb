"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/session";
import { SECTION_LABELS } from "@/lib/rbac";
import { searchAdmin, type SearchResultItem } from "@/app/actions/search";
import { logoutAction, changePasswordAction } from "@/app/actions/auth";
import { useToast } from "./toast";
import {
  Search,
  User,
  KeyRound,
  LogOut,
  X,
  Package,
  FileText,
  MessageSquareQuote,
  Loader2,
  ChevronDown,
  Shield,
} from "lucide-react";

export function AdminHeader({
  user,
  onOpenMobileSidebar,
}: {
  user: SessionUser;
  onOpenMobileSidebar: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white border-b border-[#D9D9D9]">
      <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
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

        {/* Global header search */}
        <div className="w-full">
          <HeaderSearch user={user} />
        </div>
      </div>

      <div className="flex items-center gap-2">
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

  const hasAccessToAny = user.sections.some((s) => ["products", "blog", "testimonials"].includes(s));

  if (!hasAccessToAny) {
    return null;
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767676] pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search products, blog, testimonials…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-lg border border-[#D9D9D9] bg-[#F8F8F8] text-[#333] placeholder-[#767676] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#767676] hover:text-black rounded"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-[#D9D9D9] shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-6 text-[#767676] text-xs">
              <Loader2 size={16} className="animate-spin mr-2" /> Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#767676]">
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
                  className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-[#F4F9EC] transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded bg-[#F2F2F2] group-hover:bg-white transition flex-shrink-0">
                      {typeIcons[item.type]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-black group-hover:text-[#2F5212] truncate">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-[11px] text-[#767676] truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#767676] bg-[#F2F2F2] px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
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
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F2F2F2] transition border border-[#D9D9D9]"
          aria-expanded={menuOpen}
          aria-label="Account menu"
        >
          <div className="w-7 h-7 rounded-full bg-[#7BB042] text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
            {initial}
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-[#333] max-w-[120px] truncate">
            {displayName}
          </span>
          <ChevronDown size={14} className="text-[#767676]" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-[#D9D9D9] shadow-xl p-3 z-50">
            {/* User details */}
            <div className="pb-3 mb-2 border-b border-[#F2F2F2]">
              <p className="text-sm font-bold text-black truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {user.fullName || "Staff Member"}
              </p>
              <p className="text-xs text-[#767676] truncate">{user.email}</p>
            </div>

            {/* Sections held */}
            <div className="pb-3 mb-2 border-b border-[#F2F2F2]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-1.5">
                Sections held ({user.sections.length})
              </p>
              {user.sections.length === 0 ? (
                <span className="text-xs text-[#B3261E]">No sections assigned</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {user.sections.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center text-[10px] font-medium bg-[#E8F3DA] text-[#2F5212] px-2 py-0.5 rounded-md"
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
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-[#333] hover:bg-[#F2F2F2] transition text-left"
              >
                <KeyRound size={15} className="text-[#767676]" />
                Change password
              </button>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-[#B3261E] hover:bg-[#FCE8E6] transition text-left"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#D9D9D9] shadow-2xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-[#767676] hover:bg-[#F2F2F2] hover:text-black transition"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E8F3DA] flex items-center justify-center text-[#2F5212]">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Change password
            </h3>
            <p className="text-xs text-[#767676]">Enter your new account password</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#FCE8E6] text-[#B3261E] text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#333] mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg border border-[#8A8A8A] text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#333] mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg border border-[#8A8A8A] text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5C5C5C] hover:bg-[#F2F2F2] rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7BB042] hover:bg-[#6A9E36] text-black text-xs font-bold rounded-lg disabled:opacity-50 transition"
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
