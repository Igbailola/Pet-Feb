"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { SessionUser } from "@/lib/session";
import type { AttentionTask } from "@/lib/attention-queue";
import { useToast } from "./toast";
import {
  getDismissedNotificationIds,
  dismissNotification,
  dismissAllNotifications,
  restoreAllNotifications,
  restoreNotification,
  subscribeToNotificationChanges,
} from "@/lib/notifications-client";
import {
  Bell,
  CheckCircle2,
  ShieldCheck,
  Package,
  FileText,
  MessageSquareQuote,
  ArrowRight,
  AlertCircle,
  FileEdit,
  ImageOff,
  EyeOff,
  Clock,
  Trash2,
  X,
  RotateCcw,
} from "lucide-react";

interface NotificationsListProps {
  user: SessionUser;
  tasks: AttentionTask[];
}

type FilterCategory = "all" | "verifications" | "products" | "blog" | "testimonials";

interface CategoryMeta {
  id: FilterCategory;
  label: string;
  icon: React.ReactNode;
}

export function NotificationsList({ user, tasks }: NotificationsListProps) {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    setDismissedIds(getDismissedNotificationIds());
    return subscribeToNotificationChanges((ids) => setDismissedIds(ids));
  }, []);

  const hasSection = (s: string) => user.sections.includes(s as any);

  // Group helpers
  const getCategoryForTask = (task: AttentionTask): FilterCategory => {
    if (task.type === "verification_pending") return "verifications";
    if (
      task.type === "product_out_of_stock" ||
      task.type === "product_draft" ||
      task.type === "product_missing_image"
    ) {
      return "products";
    }
    if (task.type === "blog_draft" || task.type === "blog_missing_cover") {
      return "blog";
    }
    if (task.type === "testimonial_hidden") return "testimonials";
    return "all";
  };

  const activeTasks = tasks.filter((t) => !dismissedIds.includes(t.id));
  const verifTasks = activeTasks.filter((t) => getCategoryForTask(t) === "verifications");
  const productTasks = activeTasks.filter((t) => getCategoryForTask(t) === "products");
  const blogTasks = activeTasks.filter((t) => getCategoryForTask(t) === "blog");
  const testimonialTasks = activeTasks.filter((t) => getCategoryForTask(t) === "testimonials");

  // Determine available tabs based on user's held sections
  const availableTabs: CategoryMeta[] = [
    { id: "all", label: "All Items", icon: <Bell size={14} /> },
  ];

  if (hasSection("verifications")) {
    availableTabs.push({
      id: "verifications",
      label: "Verifications",
      icon: <ShieldCheck size={14} />,
    });
  }
  if (hasSection("products")) {
    availableTabs.push({
      id: "products",
      label: "Products",
      icon: <Package size={14} />,
    });
  }
  if (hasSection("blog")) {
    availableTabs.push({
      id: "blog",
      label: "Blog",
      icon: <FileText size={14} />,
    });
  }
  if (hasSection("testimonials")) {
    availableTabs.push({
      id: "testimonials",
      label: "Testimonials",
      icon: <MessageSquareQuote size={14} />,
    });
  }

  const getCountForCategory = (cat: FilterCategory) => {
    switch (cat) {
      case "all":
        return activeTasks.length;
      case "verifications":
        return verifTasks.length;
      case "products":
        return productTasks.length;
      case "blog":
        return blogTasks.length;
      case "testimonials":
        return testimonialTasks.length;
      default:
        return 0;
    }
  };

  const filteredTasks =
    filter === "all" ? activeTasks : activeTasks.filter((t) => getCategoryForTask(t) === filter);

  const getTaskIcon = (type: AttentionTask["type"]) => {
    switch (type) {
      case "verification_pending":
        return <Clock size={16} className="text-[#D97706]" />;
      case "product_out_of_stock":
        return <AlertCircle size={16} className="text-[#EF4444]" />;
      case "product_draft":
      case "blog_draft":
        return <FileEdit size={16} className="text-[#6B7280]" />;
      case "product_missing_image":
      case "blog_missing_cover":
        return <ImageOff size={16} className="text-[#D97706]" />;
      case "testimonial_hidden":
        return <EyeOff size={16} className="text-[#D97706]" />;
    }
  };

  const getTagBadgeStyle = (color: AttentionTask["tagColor"]) => {
    switch (color) {
      case "red":
        return "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]";
      case "amber":
        return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
      case "blue":
        return "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]";
      case "green":
        return "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]";
      case "gray":
      default:
        return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
    }
  };

  const renderTaskCard = (task: AttentionTask) => (
    <div
      key={task.id}
      className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#7BB042] transition shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 mt-0.5">
          {getTaskIcon(task.type)}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4
              className="text-sm font-bold text-black truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {task.title}
            </h4>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTagBadgeStyle(
                task.tagColor
              )}`}
            >
              {task.tag}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F3F4F6]">
        <button
          type="button"
          onClick={() => {
            dismissNotification(task.id);
            showToast("Notification cleared");
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E5E7EB] text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEE2E2] hover:border-[#FECACA] transition cursor-pointer"
          title="Clear notification"
          aria-label={`Clear notification: ${task.title}`}
        >
          <Trash2 size={13} />
          <span>Clear</span>
        </button>
        <Link
          href={task.href}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#E8F3DA] hover:bg-[#D2E8B5] text-[#2F5212] transition cursor-pointer"
        >
          <span>{task.actionLabel}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ── Filter Tabs & Actions Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {availableTabs.map((tab) => {
            const count = getCountForCategory(tab.id);
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  active
                    ? "bg-[#111611] text-white shadow-xs"
                    : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-black"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active
                      ? "bg-[#7BB042] text-black"
                      : count > 0
                      ? "bg-[#F3F4F6] text-[#374151]"
                      : "bg-[#F3F4F6] text-[#9CA3AF]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {filteredTasks.length > 0 && (
            <button
              type="button"
              onClick={() => {
                dismissAllNotifications(filteredTasks.map((t) => t.id));
                showToast(`Cleared ${filteredTasks.length} notifications`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] transition cursor-pointer"
              title="Clear visible notifications"
            >
              <Trash2 size={13} />
              <span>Clear {filter === "all" ? "all" : "section"} ({filteredTasks.length})</span>
            </button>
          )}

          {dismissedIds.length > 0 && (
            <button
              type="button"
              onClick={() => {
                restoreAllNotifications();
                showToast("All cleared notifications restored");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#3F6B1A] bg-[#F4F9EC] border border-[#C3E49E] hover:bg-[#E8F3DA] transition cursor-pointer"
              title="Restore all cleared notifications"
            >
              <RotateCcw size={13} />
              <span>Restore cleared ({dismissedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Content Area ── */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F3DA] text-[#2F5212] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} />
          </div>
          <h3
            className="text-lg font-bold text-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Nothing needs attention
          </h3>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto mt-1">
            {dismissedIds.length > 0
              ? "All notifications in this view have been cleared."
              : filter === "all"
              ? "All items across your assigned sections are currently up to date, published, and verified."
              : `No items require attention in the ${availableTabs.find((t) => t.id === filter)?.label} section.`}
          </p>
          {dismissedIds.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  restoreAllNotifications();
                  showToast("Cleared notifications restored");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition cursor-pointer shadow-xs"
              >
                <RotateCcw size={14} />
                <span>Restore {dismissedIds.length} cleared notifications</span>
              </button>
            </div>
          )}
        </div>
      ) : filter === "all" ? (
        // Grouped by type
        <div className="space-y-8">
          {verifTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#2F5212]" />
                  <h3
                    className="text-base font-bold text-black"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Client Verifications
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {verifTasks.length} {verifTasks.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="space-y-3">
                {verifTasks.map((t) => renderTaskCard(t))}
              </div>
            </div>
          )}

          {productTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-[#2F5212]" />
                  <h3
                    className="text-base font-bold text-black"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Products & Accessories
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {productTasks.length} {productTasks.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="space-y-3">
                {productTasks.map((t) => renderTaskCard(t))}
              </div>
            </div>
          )}

          {blogTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#2F5212]" />
                  <h3
                    className="text-base font-bold text-black"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Blog Articles
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {blogTasks.length} {blogTasks.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="space-y-3">
                {blogTasks.map((t) => renderTaskCard(t))}
              </div>
            </div>
          )}

          {testimonialTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote size={18} className="text-[#2F5212]" />
                  <h3
                    className="text-base font-bold text-black"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Client Testimonials
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {testimonialTasks.length} {testimonialTasks.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="space-y-3">
                {testimonialTasks.map((t) => renderTaskCard(t))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Specific category view
        <div className="space-y-3">
          {filteredTasks.map((t) => renderTaskCard(t))}
        </div>
      )}
    </div>
  );
}
