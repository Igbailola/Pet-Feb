"use client";

import { Check, AlertCircle, Loader2, ChevronRight, ChevronLeft, ArrowUpDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useToast } from "./toast";

// ─── Status banner (retained for backward compatibility, but toasts used primarily) ────
export function StatusBanner({ success, error }: { success?: boolean; error?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (success || error) {
      setVisible(true);
      if (success) {
        const t = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(t);
      }
    }
  }, [success, error]);

  if (!visible) return null;

  if (success) {
    return (
      <div className="flex items-center gap-2 bg-[#E8F3DA] text-[#2F5212] text-sm rounded-lg px-4 py-3 mb-4">
        <Check size={16} /> Saved successfully
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 bg-[#FCE8E6] text-[#B3261E] text-sm rounded-lg px-4 py-3 mb-4">
        <AlertCircle size={16} /> {error}
      </div>
    );
  }

  return null;
}

// ─── Submit button with loader ────────────────────────────────
export function SubmitButton({ pending, label = "Save" }: { pending: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-[#7BB042] text-black font-semibold rounded-xl px-5 py-2.5 min-h-[44px] text-sm hover:bg-[#6A9E36] active:bg-[#4F8221] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {pending ? "Saving…" : label}
    </button>
  );
}

// ─── Delete button with confirm and toast ─────────────────────
export function DeleteButton({
  onDelete,
  label = "Delete",
  itemName = "Item",
}: {
  onDelete: () => Promise<void>;
  label?: string;
  itemName?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  if (confirming) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-xs text-[#B3261E] font-medium">Confirm?</span>
        <button
          type="button"
          onClick={async () => {
            try {
              setDeleting(true);
              await onDelete();
              showToast(`${itemName} deleted successfully`, "success");
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Failed to delete";
              showToast(msg, "error");
            } finally {
              setDeleting(false);
              setConfirming(false);
            }
          }}
          disabled={deleting}
          className="text-xs font-semibold text-white bg-[#B3261E] rounded-lg px-3 py-1.5 min-h-[36px] hover:bg-red-700 disabled:opacity-50 transition cursor-pointer"
        >
          {deleting ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs font-semibold text-[#333] bg-[#F2F2F2] rounded-lg px-3 py-1.5 min-h-[36px] hover:bg-[#D9D9D9] transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-sm font-semibold text-[#B3261E] hover:underline transition cursor-pointer py-1"
    >
      {label}
    </button>
  );
}

// ─── Form field ───────────────────────────────────────────────
export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  children,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  if (children) {
    return (
      <div>
        <label htmlFor={name} className="block text-xs font-semibold text-[#333] mb-1.5">
          {label}
        </label>
        {children}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name} className="block text-xs font-semibold text-[#333] mb-1.5">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          rows={4}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-[#333] mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        step={type === "number" ? "0.01" : undefined}
        onChange={onChange}
        className="w-full min-h-[44px] rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
      />
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    published: "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]",
    draft: "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]",
    hidden: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    pending: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    verified: "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]",
    rejected: "bg-[#FCE8E6] text-[#B3261E] border-[#F8B4B4]",
    in_stock: "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]",
    out_of_stock: "bg-[#FCE8E6] text-[#B3261E] border-[#F8B4B4]",
  };

  const labels: Record<string, string> = {
    in_stock: "In stock",
    out_of_stock: "Out of stock",
  };

  const style = colors[status] ?? "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
  const display = labels[status] ?? (status.charAt(0).toUpperCase() + status.slice(1));

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${style}`}>
      {display}
    </span>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────────
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-3">
      <Link href="/admin" className="hover:text-black transition">
        Dashboard
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-[#9CA3AF]" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-black transition">
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-black truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

// ─── Page header ──────────────────────────────────────────────
export function PageHeader({
  title,
  description,
  action,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <div className="mb-6">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {title}
          </h1>
          {description && <p className="text-[#6B7280] text-xs sm:text-sm mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────
export function EmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs">
      <p className="text-[#6B7280] text-sm mb-4">{message}</p>
      {action}
    </div>
  );
}

// ─── Table skeleton loader ───────────────────────────────────
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-xs animate-pulse">
      <div className="h-6 bg-[#F3F4F6] rounded-xl mb-4 w-1/3"></div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={c} className="h-4 bg-[#F3F4F6] rounded-lg flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pagination controls ─────────────────────────────────────
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}) {
  if (totalPages <= 1) return null;

  const startItem = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem = totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : undefined;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-white border-t border-[#D9D9D9] rounded-b-xl">
      <div className="text-xs text-[#767676]">
        {startItem && endItem && totalItems ? (
          <span>
            Showing <span className="font-semibold text-black">{startItem}</span> to{" "}
            <span className="font-semibold text-black">{endItem}</span> of{" "}
            <span className="font-semibold text-black">{totalItems}</span> results
          </span>
        ) : (
          <span>
            Page <span className="font-semibold text-black">{currentPage}</span> of{" "}
            <span className="font-semibold text-black">{totalPages}</span>
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 self-center sm:self-auto">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg border border-[#D9D9D9] text-xs font-semibold text-[#333] hover:bg-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronLeft size={14} /> Previous
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const p = idx + 1;
          // Show first, last, and pages close to currentPage
          if (totalPages > 7 && Math.abs(p - currentPage) > 2 && p !== 1 && p !== totalPages) {
            if (p === 2 || p === totalPages - 1) {
              return <span key={p} className="px-1 text-xs text-[#767676]">…</span>;
            }
            return null;
          }
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold transition cursor-pointer ${
                currentPage === p
                  ? "bg-[#7BB042] text-black font-bold shadow-xs"
                  : "text-[#5C5C5C] hover:bg-[#F2F2F2]"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg border border-[#D9D9D9] text-xs font-semibold text-[#333] hover:bg-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Sort select control ─────────────────────────────────────
export function SortSelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (val: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown size={14} className="absolute left-3 text-[#767676] pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="pl-8 pr-7 py-2 min-h-[40px] bg-white rounded-xl border border-gray-300 text-xs font-semibold text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronRight size={12} className="absolute right-2.5 text-[#767676] rotate-90 pointer-events-none" />
    </div>
  );
}

// ─── Unsaved changes hook ────────────────────────────────────
export function useUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Intercept click on links if dirty
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isDirty) return;
      const target = (e.target as HTMLElement).closest("a");
      if (!target || !target.href || target.target === "_blank") return;

      const url = new URL(target.href);
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
        const confirmed = window.confirm("You have unsaved changes. Are you sure you want to leave?");
        if (!confirmed) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDirty]);
}
