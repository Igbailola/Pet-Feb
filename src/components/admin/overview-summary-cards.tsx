"use client";

import Link from "next/link";
import {
  Package,
  FileText,
  MessageSquareQuote,
  ShieldCheck,
} from "lucide-react";

interface SummaryCardsProps {
  productsStats?: {
    published: number;
    draft: number;
    outOfStock: number;
    total: number;
  };
  blogStats?: {
    published: number;
    draft: number;
    total: number;
  };
  testimonialsStats?: {
    published: number;
    hidden: number;
    total: number;
  };
  verificationsStats?: {
    pending: number;
    total: number;
  };
  oldestWaitTime?: string | null;
  hasProducts: boolean;
  hasBlog: boolean;
  hasTestimonials: boolean;
  hasVerifications: boolean;
}

export function OverviewSummaryCards({
  productsStats,
  blogStats,
  testimonialsStats,
  verificationsStats,
  oldestWaitTime,
  hasProducts,
  hasBlog,
  hasTestimonials,
  hasVerifications,
}: SummaryCardsProps) {
  const cards = [];

  // 1. Products
  // - Big number: published products (SKUs)
  // - Badge: out-of-stock count (warning if > 0, calm "All in stock" if 0)
  // - Small second line: draft products count
  // - Progress dots: published share of all products
  if (hasProducts && productsStats) {
    const pub = productsStats.published;
    const tot = productsStats.total || 1;
    const pct = Math.min(100, Math.round((pub / tot) * 100));
    const oos = productsStats.outOfStock;
    const draftCount = productsStats.draft;

    cards.push({
      id: "products-card",
      title: "Products",
      value: pub,
      unit: "SKUs",
      href: "/admin/products",
      icon: <Package size={18} className="text-[#2F5212]" />,
      iconBg: "bg-[#E8F3DA]",
      badge: oos > 0 ? `${oos} out of stock` : "All in stock",
      badgeColor:
        oos > 0
          ? "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]"
          : "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]",
      subtext: `${draftCount} draft ${draftCount === 1 ? "product" : "products"}`,
      activeSegments: Math.max(1, Math.round((pct / 100) * 10)),
      progressColor: "bg-[#7BB042]",
    });
  }

  // 2. Blog
  // - Big number: published posts
  // - Badge: "Live articles"
  // - Small second line: draft posts count
  // - Progress dots: published share of all posts
  if (hasBlog && blogStats) {
    const pub = blogStats.published;
    const tot = blogStats.total || 1;
    const pct = Math.min(100, Math.round((pub / tot) * 100));
    const draftCount = blogStats.draft;

    cards.push({
      id: "blog-card",
      title: "Blog",
      value: pub,
      unit: "Posts",
      href: "/admin/blog",
      icon: <FileText size={18} className="text-[#1E40AF]" />,
      iconBg: "bg-[#DBEAFE]",
      badge: "Live articles",
      badgeColor: "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]",
      subtext: `${draftCount} draft ${draftCount === 1 ? "post" : "posts"}`,
      activeSegments: Math.max(1, Math.round((pct / 100) * 10)),
      progressColor: "bg-[#2563EB]",
    });
  }

  // 3. Testimonials
  // - Big number: published testimonials
  // - Badge: "Visible on site"
  // - Small second line: hidden testimonials count
  // - Progress dots: published share of all testimonials
  if (hasTestimonials && testimonialsStats) {
    const pub = testimonialsStats.published;
    const tot = testimonialsStats.total || 1;
    const pct = Math.min(100, Math.round((pub / tot) * 100));
    const hiddenCount = testimonialsStats.hidden;

    cards.push({
      id: "testimonials-card",
      title: "Testimonials",
      value: pub,
      unit: "Reviews",
      href: "/admin/testimonials",
      icon: <MessageSquareQuote size={18} className="text-[#92400E]" />,
      iconBg: "bg-[#FEF3C7]",
      badge: "Visible on site",
      badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      subtext: `${hiddenCount} hidden ${hiddenCount === 1 ? "review" : "reviews"}`,
      activeSegments: Math.max(1, Math.round((pct / 100) * 10)),
      progressColor: "bg-[#F5B82E]",
    });
  }

  // 4. Pending verifications
  // - Big number: pending count
  // - Badge: "Review required" if > 0, "Queue clear" if 0
  // - Small second line: oldest waiting time (only when > 0)
  // - Progress dots
  if (hasVerifications && verificationsStats) {
    const pend = verificationsStats.pending;

    cards.push({
      id: "verifications-card",
      title: "Pending Verifications",
      value: pend,
      unit: "Clients",
      href: "/admin/verifications",
      icon: <ShieldCheck size={18} className="text-[#5B21B6]" />,
      iconBg: "bg-[#EDE9FE]",
      badge: pend > 0 ? "Review required" : "Queue clear",
      badgeColor:
        pend > 0
          ? "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]"
          : "bg-[#E8F3DA] text-[#2F5212] border-[#C3E49E]",
      subtext: pend > 0 && oldestWaitTime ? `Oldest waiting: ${oldestWaitTime}` : undefined,
      activeSegments: pend > 0 ? Math.min(10, Math.max(1, pend * 2)) : 10,
      progressColor: pend > 0 ? "bg-[#F5B82E]" : "bg-[#7BB042]",
    });
  }

  if (cards.length === 0) return null;

  // Responsive grid adapting evenly to card count without empty gaps
  const getGridColsClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <div className={`grid ${getGridColsClass(cards.length)} gap-4`}>
      {cards.map((c) => (
        <Link
          key={c.id}
          href={c.href}
          className="group bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:border-[#7BB042] hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            {/* Top row: Title and Icon */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                {c.title}
              </span>
              <div
                className={`w-8 h-8 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition`}
              >
                {c.icon}
              </div>
            </div>

            {/* Stat value */}
            <div className="flex items-baseline gap-1.5 mb-2">
              <span
                className="text-2xl sm:text-3xl font-bold text-black tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {c.value}
              </span>
              <span className="text-xs font-semibold text-[#6B7280]">{c.unit}</span>
            </div>

            {/* Badge pill */}
            <div className="mb-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${c.badgeColor}`}
              >
                {c.badge}
              </span>
            </div>

            {/* Small second line */}
            <div className="h-5 mb-3 flex items-center">
              {c.subtext ? (
                <p className="text-xs text-[#6B7280] truncate">{c.subtext}</p>
              ) : null}
            </div>
          </div>

          {/* 10-Segment Progress Dots / Power Meter Bar */}
          <div className="pt-2 border-t border-[#F3F4F6]">
            <div className="flex items-center gap-1 w-full">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    idx < c.activeSegments ? c.progressColor : "bg-[#F3F4F6]"
                  }`}
                />
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
