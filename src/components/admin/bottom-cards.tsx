"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Package,
  FileText,
  MessageSquareQuote,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface BottomCardsProps {
  contentHealth: {
    scorePct: number;
    missingProductImages: number;
    missingBlogCovers: number;
    outOfStockProducts: number;
    totalPublished: number;
  };
  verificationsQueue: {
    pendingCount: number;
    oldestWaitTime: string | null;
    decisionsCount: number;
    verifiedCount: number;
    rejectedCount: number;
  } | null;
  recentlyPublished: {
    id: string;
    title: string;
    section: "products" | "blog" | "testimonials";
    publishedAt: string;
    href: string;
  }[];
  hasVerifications: boolean;
}

export function OverviewBottomCards({
  contentHealth,
  verificationsQueue,
  recentlyPublished,
  hasVerifications,
}: BottomCardsProps) {
  const activeHealthSegments = Math.max(
    1,
    Math.round((contentHealth.scorePct / 100) * 10)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* ── Card 1: Content Health ── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          {/* Card Top */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F3DA] flex items-center justify-center text-[#2F5212]">
                <Sparkles size={16} />
              </div>
              <h3
                className="text-base font-bold text-black"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Content Health
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                contentHealth.scorePct >= 80
                  ? "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]"
                  : "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]"
              }`}
            >
              {contentHealth.scorePct}% Ready
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#F3F4F6]">
              <p className="text-[10px] uppercase font-bold text-[#6B7280]">
                Missing Images
              </p>
              <p
                className="text-lg font-bold text-black mt-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {contentHealth.missingProductImages + contentHealth.missingBlogCovers}
              </p>
              <p className="text-[10px] text-[#6B7280]">
                {contentHealth.missingProductImages} prods · {contentHealth.missingBlogCovers} posts
              </p>
            </div>

            <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#F3F4F6]">
              <p className="text-[10px] uppercase font-bold text-[#6B7280]">
                Stock Attention
              </p>
              <p
                className="text-lg font-bold text-black mt-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {contentHealth.outOfStockProducts}
              </p>
              <p className="text-[10px] text-[#6B7280]">Out of stock items</p>
            </div>
          </div>

          {/* Segmented Power Meter */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] mb-1.5">
              <span>Overall completeness</span>
              <span className="font-bold text-black">
                {activeHealthSegments}/10 Segments
              </span>
            </div>
            <div className="flex items-center gap-1 w-full">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition ${
                    idx < activeHealthSegments
                      ? contentHealth.scorePct >= 80
                        ? "bg-[#7BB042]"
                        : "bg-[#F5B82E]"
                      : "bg-[#F3F4F6]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#4B5563]">
              <span className="flex items-center gap-1.5">
                {contentHealth.missingProductImages === 0 ? (
                  <CheckCircle2 size={13} className="text-[#10B981]" />
                ) : (
                  <AlertCircle size={13} className="text-[#F5B82E]" />
                )}
                All products have primary media
              </span>
              <span className="font-semibold text-black">
                {contentHealth.missingProductImages === 0 ? "100%" : "Needs attention"}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              <span className="flex items-center gap-1.5">
                {contentHealth.outOfStockProducts === 0 ? (
                  <CheckCircle2 size={13} className="text-[#10B981]" />
                ) : (
                  <AlertCircle size={13} className="text-[#B3261E]" />
                )}
                Active catalogue in stock
              </span>
              <span className="font-semibold text-black">
                {contentHealth.outOfStockProducts === 0 ? "Optimal" : `${contentHealth.outOfStockProducts} zero stock`}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#F3F4F6]">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-between w-full text-sm font-bold text-black bg-[#E8F3DA] hover:bg-[#D5EAC0] border border-[#C3E49E] px-4 py-3 rounded-xl transition shadow-xs"
          >
            <span>Review catalogue health</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Card 2: Verification Queue ── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          {/* Card Top */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#5B21B6]">
                <ShieldCheck size={16} />
              </div>
              <h3
                className="text-base font-bold text-black"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Verification Queue
              </h3>
            </div>
            {hasVerifications && verificationsQueue && (
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  verificationsQueue.pendingCount > 0
                    ? "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]"
                    : "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]"
                }`}
              >
                {verificationsQueue.pendingCount} Pending
              </span>
            )}
          </div>

          {!hasVerifications ? (
            <div className="py-8 text-center">
              <p className="text-xs text-[#6B7280]">
                Client verifications section is not assigned to your account.
              </p>
            </div>
          ) : !verificationsQueue ? (
            <div className="py-8 text-center text-xs text-[#6B7280]">
              No verification records available.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Queue Status Box */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#F3F4F6]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#6B7280]">
                    Oldest pending submission
                  </span>
                  <span className="text-xs font-bold text-black">
                    {verificationsQueue.oldestWaitTime || "Queue clear"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                  <Clock size={13} className="text-[#9CA3AF]" />
                  <span>
                    {verificationsQueue.pendingCount > 0
                      ? `${verificationsQueue.pendingCount} client identity submissions awaiting review`
                      : "All submitted client verifications have been processed"}
                  </span>
                </div>
              </div>

              {/* Recent Decisions Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#4B5563]">
                  <span>Total decisions recorded</span>
                  <span className="font-bold text-black">
                    {verificationsQueue.decisionsCount} reviews
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#4B5563]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    Approved clients
                  </span>
                  <span className="font-semibold text-black">
                    {verificationsQueue.verifiedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#4B5563]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B3261E]" />
                    Rejected with reason
                  </span>
                  <span className="font-semibold text-black">
                    {verificationsQueue.rejectedCount}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {hasVerifications && (
          <div className="mt-5 pt-4 border-t border-[#F3F4F6]">
            <Link
              href="/admin/verifications"
              className="inline-flex items-center justify-between w-full text-sm font-bold text-black bg-[#7BB042] hover:bg-[#6A9E36] px-5 py-3 rounded-xl transition shadow-xs"
            >
              <span>Review client submissions</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* ── Card 3: Recently Published ── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          {/* Card Top */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F3DA] flex items-center justify-center text-[#2F5212]">
                <Package size={16} />
              </div>
              <h3
                className="text-base font-bold text-black"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Recently Published
              </h3>
            </div>
            <span className="text-xs font-bold bg-[#F3F4F6] text-[#4B5563] px-2.5 py-0.5 rounded-full">
              Live Assets
            </span>
          </div>

          {/* List of Recently Published */}
          {recentlyPublished.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6B7280]">
              No published items in your sections yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentlyPublished.slice(0, 4).map((item) => {
                const icon =
                  item.section === "products" ? (
                    <Package size={13} className="text-[#2F5212]" />
                  ) : item.section === "blog" ? (
                    <FileText size={13} className="text-[#1E40AF]" />
                  ) : (
                    <MessageSquareQuote size={13} className="text-[#92400E]" />
                  );

                return (
                  <Link
                    key={`${item.section}-${item.id}`}
                    href={item.href}
                    className="p-2.5 rounded-xl border border-[#F3F4F6] bg-[#F8F9FA] hover:bg-[#F4F9EC] hover:border-[#7BB042] transition block group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {icon}
                        <p className="text-xs font-bold text-black group-hover:text-[#2F5212] truncate">
                          {item.title}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-white border border-[#E5E7EB] text-[#4B5563] px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.section}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] pl-5">
                      Published {item.publishedAt}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-[#F3F4F6]">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-between w-full text-sm font-bold text-black bg-[#E8F3DA] hover:bg-[#D5EAC0] border border-[#C3E49E] px-4 py-3 rounded-xl transition shadow-xs"
          >
            <span>Manage active catalogue</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
