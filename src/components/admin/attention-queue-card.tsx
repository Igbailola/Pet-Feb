"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { AttentionTask } from "@/lib/attention-queue";
import { useToast } from "./toast";
import {
  getDismissedNotificationIds,
  dismissNotification,
  dismissAllNotifications,
  restoreAllNotifications,
  subscribeToNotificationChanges,
} from "@/lib/notifications-client";
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  FilePen,
  ShieldAlert,
  ImageOff,
  EyeOff,
  ArrowRight,
  Trash2,
  X,
  RotateCcw,
} from "lucide-react";

export function AttentionQueueCard({ tasks }: { tasks: AttentionTask[] }) {
  const getIcon = (type: AttentionTask["type"]) => {
    switch (type) {
      case "verification_pending":
        return <ShieldAlert size={16} className="text-[#D97706]" />;
      case "product_out_of_stock":
        return <AlertTriangle size={16} className="text-[#DC2626]" />;
      case "product_draft":
      case "blog_draft":
        return <FilePen size={16} className="text-[#4B5563]" />;
      case "product_missing_image":
      case "blog_missing_cover":
        return <ImageOff size={16} className="text-[#D97706]" />;
      case "testimonial_hidden":
        return <EyeOff size={16} className="text-[#4B5563]" />;
      default:
        return <AlertTriangle size={16} className="text-[#D97706]" />;
    }
  };

  const getTagStyle = (color: AttentionTask["tagColor"]) => {
    switch (color) {
      case "red":
        return "bg-[#FCE8E6] text-[#B3261E] border-[#F8B4B4]";
      case "amber":
        return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
      case "green":
        return "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]";
      default:
        return "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
    }
  };

  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    setDismissedIds(getDismissedNotificationIds());
    return subscribeToNotificationChanges((ids) => setDismissedIds(ids));
  }, []);

  const visibleTasks = tasks.filter((t) => !dismissedIds.includes(t.id));

  return (
    <div
      id="attention-queue"
      className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
    >
      <div>
        {/* Card Header matching design */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#92400E]">
              <ClipboardList size={16} />
            </div>
            <div>
              <h2
                className="text-base font-bold text-black tracking-tight leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Attention Queue
              </h2>
              <p className="text-[11px] text-[#6B7280] mt-0.5">
                Prioritised pending operations & drafts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {visibleTasks.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  dismissAllNotifications(visibleTasks.map((t) => t.id));
                  showToast("All attention items cleared");
                }}
                className="text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] border border-transparent hover:border-[#FECACA] px-2.5 py-1 rounded-xl transition cursor-pointer"
                title="Clear all attention items"
              >
                Clear all
              </button>
            )}
            <span className="text-xs font-bold bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
              {visibleTasks.length} {visibleTasks.length === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>

        {/* Task Cards Stack */}
        {visibleTasks.length === 0 ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F3DA] text-[#2F5212] flex items-center justify-center mb-3">
              <CheckCircle2 size={24} />
            </div>
            <p
              className="text-sm font-bold text-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {dismissedIds.length > 0 ? "All notifications cleared" : "All caught up!"}
            </p>
            <p className="text-xs text-[#6B7280] max-w-xs mt-1">
              {dismissedIds.length > 0
                ? "You have cleared all pending items in your attention queue."
                : "No pending verifications, drafts, or out-of-stock items requiring attention in your sections."}
            </p>
            {dismissedIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  restoreAllNotifications();
                  showToast("Cleared items restored");
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6B1A] bg-[#F4F9EC] border border-[#C3E49E] hover:bg-[#E8F3DA] px-3 py-1.5 rounded-xl transition cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Restore cleared items ({dismissedIds.length})</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {visibleTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] hover:bg-[#F4F9EC] hover:border-[#7BB042] transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1 rounded-lg bg-white border border-[#E5E7EB] flex-shrink-0">
                        {getIcon(task.type)}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-black group-hover:text-[#2F5212] truncate">
                        {task.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getTagStyle(
                          task.tagColor
                        )}`}
                      >
                        {task.tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          dismissNotification(task.id);
                          showToast("Notification cleared");
                        }}
                        className="p-1 text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition cursor-pointer"
                        title="Clear notification"
                        aria-label={`Clear ${task.title}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B7280] line-clamp-2 pl-7 mb-3">
                    {task.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#F3F4F6]">
                  <button
                    type="button"
                    onClick={() => {
                      dismissNotification(task.id);
                      showToast("Notification cleared");
                    }}
                    className="inline-flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#DC2626] transition cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Clear</span>
                  </button>
                  <Link
                    href={task.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-[#7BB042] hover:bg-[#6A9E36] px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
                  >
                    <span>{task.actionLabel}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 mt-3 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#6B7280]">
        <span>Automated triaging from database</span>
        <div className="flex items-center gap-2">
          {dismissedIds.length > 0 && (
            <button
              type="button"
              onClick={() => {
                restoreAllNotifications();
                showToast("Cleared items restored");
              }}
              className="text-[#6B7280] hover:text-[#3F6B1A] font-medium flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={11} />
              Restore ({dismissedIds.length})
            </button>
          )}
          <span className="font-semibold text-[#3F6B1A]">
            {visibleTasks.length > 0 ? `${visibleTasks.length} active items` : "Operational health clear"}
          </span>
        </div>
      </div>
    </div>
  );
}
