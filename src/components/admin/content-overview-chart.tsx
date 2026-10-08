"use client";

import { useState } from "react";
import { Package, FileText, MessageSquareQuote, CheckCircle2, Layers } from "lucide-react";

interface ContentOverviewChartProps {
  productsStats?: { published: number; draft: number; total: number };
  blogStats?: { published: number; draft: number; total: number };
  testimonialsStats?: { published: number; hidden: number; total: number };
  hasProducts: boolean;
  hasBlog: boolean;
  hasTestimonials: boolean;
}

export function ContentOverviewChart({
  productsStats,
  blogStats,
  testimonialsStats,
  hasProducts,
  hasBlog,
  hasTestimonials,
}: ContentOverviewChartProps) {
  const [filter, setFilter] = useState<"all" | "products" | "blog" | "testimonials">("all");

  const pPub = productsStats?.published ?? 0;
  const pDraft = productsStats?.draft ?? 0;

  const bPub = blogStats?.published ?? 0;
  const bDraft = blogStats?.draft ?? 0;

  const tPub = testimonialsStats?.published ?? 0;
  const tHidden = testimonialsStats?.hidden ?? 0;

  const totalPublished = pPub + bPub + tPub;
  const totalDraft = pDraft + bDraft + tHidden;
  const grandTotal = totalPublished + totalDraft;
  const publishRate = grandTotal > 0 ? Math.round((totalPublished / grandTotal) * 100) : 100;

  // Maximum value for scale
  const maxVal = Math.max(pPub, pDraft, bPub, bDraft, tPub, tHidden, 5);

  const series = [
    {
      id: "products",
      label: "Products",
      visible: hasProducts && (filter === "all" || filter === "products"),
      published: pPub,
      draft: pDraft,
      icon: <Package size={15} />,
    },
    {
      id: "blog",
      label: "Blog Posts",
      visible: hasBlog && (filter === "all" || filter === "blog"),
      published: bPub,
      draft: bDraft,
      icon: <FileText size={15} />,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      visible: hasTestimonials && (filter === "all" || filter === "testimonials"),
      published: tPub,
      draft: tHidden,
      icon: <MessageSquareQuote size={15} />,
    },
  ].filter((s) => s.visible);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Card Header matching reference design */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
              <h2
                className="text-base sm:text-lg font-bold text-black tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Content Overview
              </h2>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Comparative volume of published catalogue and editorial assets versus drafts
            </p>
          </div>

          {/* Filter Pills matching design */}
          <div className="flex items-center gap-1 bg-[#F4F4F5] p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filter === "all"
                  ? "bg-[#7BB042] text-black shadow-xs"
                  : "text-[#6B7280] hover:text-black"
              }`}
            >
              All
            </button>
            {hasProducts && (
              <button
                onClick={() => setFilter("products")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === "products"
                    ? "bg-[#7BB042] text-black shadow-xs"
                    : "text-[#6B7280] hover:text-black"
                }`}
              >
                Products
              </button>
            )}
            {hasBlog && (
              <button
                onClick={() => setFilter("blog")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === "blog"
                    ? "bg-[#7BB042] text-black shadow-xs"
                    : "text-[#6B7280] hover:text-black"
                }`}
              >
                Blog
              </button>
            )}
            {hasTestimonials && (
              <button
                onClick={() => setFilter("testimonials")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === "testimonials"
                    ? "bg-[#7BB042] text-black shadow-xs"
                    : "text-[#6B7280] hover:text-black"
                }`}
              >
                Testimonials
              </button>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 text-xs mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-[#7BB042]" />
            <span className="font-semibold text-black">Published Assets</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-[#2B352B]" />
            <span className="font-medium text-[#6B7280]">Draft / Hidden Assets</span>
          </div>
          <div className="ml-auto text-xs text-[#6B7280] hidden sm:block">
            Publish rate: <span className="font-bold text-black">{publishRate}%</span>
          </div>
        </div>

        {/* Bar Chart Area */}
        {series.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#6B7280]">
            No content sections assigned to your account.
          </div>
        ) : (
          <div className="space-y-6 my-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 pb-2">
              {series.map((item) => {
                const pubHeight = Math.max(12, Math.round((item.published / maxVal) * 140));
                const draftHeight = Math.max(12, Math.round((item.draft / maxVal) * 140));

                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-[#F8F9FA] rounded-2xl p-4 border border-[#F3F4F6]"
                  >
                    {/* Bars Container */}
                    <div className="h-40 flex items-end justify-center gap-4 w-full px-4 border-b border-[#E5E7EB] pb-2">
                      {/* Published Bar */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[48px]">
                        <span
                          className="text-xs font-bold text-black"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.published}
                        </span>
                        <div
                          style={{ height: `${pubHeight}px` }}
                          className="w-full bg-[#7BB042] rounded-t-lg transition-all duration-300 hover:brightness-105"
                          title={`${item.label} Published: ${item.published}`}
                        />
                      </div>

                      {/* Draft Bar */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[48px]">
                        <span
                          className="text-xs font-semibold text-[#6B7280]"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.draft}
                        </span>
                        <div
                          style={{ height: `${draftHeight}px` }}
                          className="w-full bg-[#2B352B] rounded-t-lg transition-all duration-300 hover:brightness-110"
                          title={`${item.label} Draft/Hidden: ${item.draft}`}
                        />
                      </div>
                    </div>

                    {/* Column Label */}
                    <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-black">
                      <span className="text-[#6B7280]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Energy / Spec Strip at bottom of chart card matching design */}
      <div className="mt-4 pt-4 border-t border-[#F3F4F6] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Package size={15} className="text-[#7BB042]" />
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">
              Live Catalogue
            </p>
            <p className="font-bold text-black">{pPub} units</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FileText size={15} className="text-[#2563EB]" />
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">
              Live Articles
            </p>
            <p className="font-bold text-black">{bPub} posts</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquareQuote size={15} className="text-[#D97706]" />
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">
              Client Reviews
            </p>
            <p className="font-bold text-black">{tPub} verified</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-[#10B981]" />
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">
              Content Pipeline
            </p>
            <p className="font-bold text-black">{totalDraft} in queue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
