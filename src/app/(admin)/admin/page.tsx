import Link from "next/link";
import { requireStaff } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { SECTION_LABELS, type AdminSection } from "@/lib/rbac";
import { getAttentionQueue } from "@/lib/attention-queue";
import { OverviewSummaryCards } from "@/components/admin/overview-summary-cards";
import { ContentOverviewChart } from "@/components/admin/content-overview-chart";
import { AttentionQueueCard } from "@/components/admin/attention-queue-card";
import { RecentActivityCard } from "@/components/admin/recent-activity-card";
import { OverviewBottomCards } from "@/components/admin/bottom-cards";
import type { ActivityLogEntry } from "@/lib/activity-log";
import {
  Plus,
  ShieldCheck,
  Package,
  FileText,
  MessageSquareQuote,
  ShieldAlert,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const user = await requireStaff();

  // ─── Empty state for staff with no sections ─────────────────────────
  if (user.sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] flex items-center justify-center mb-5 text-[#92400E] shadow-xs">
          <ShieldAlert size={30} />
        </div>
        <h1
          className="text-2xl font-bold text-black mb-2 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          No access assigned
        </h1>
        <p className="text-[#6B7280] text-sm max-w-md mb-6 leading-relaxed">
          Your account is registered as staff, but no admin sections have been assigned to you yet.
          Please contact a system administrator to configure your section permissions.
        </p>
        <div className="text-xs text-[#4B5563] bg-white border border-[#E5E7EB] px-4 py-3 rounded-xl shadow-xs">
          Logged in as: <span className="font-bold text-black">{user.email}</span>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const hasProducts = user.sections.includes("products");
  const hasBlog = user.sections.includes("blog");
  const hasTestimonials = user.sections.includes("testimonials");
  const hasVerifications = user.sections.includes("verifications");
  const hasCms = user.sections.includes("cms");

  // ─── 1. Parallel Data Fetching ───────────────────────────────────────
  const [
    productsRes,
    blogRes,
    testimonialsRes,
    verificationsRes,
    logsRes,
    attentionTasks,
  ] = await Promise.all([
    hasProducts
      ? supabase
          .from("products")
          .select("id, name, slug, status, in_stock, price, created_at, updated_at, product_images(id, is_main, url)")
      : Promise.resolve({ data: null }),
    hasBlog
      ? supabase
          .from("blog_posts")
          .select("id, title, slug, status, cover_image, published_at, created_at, updated_at")
      : Promise.resolve({ data: null }),
    hasTestimonials
      ? supabase
          .from("testimonials")
          .select("id, author_name, author_role, status, photo_url, created_at, updated_at")
      : Promise.resolve({ data: null }),
    hasVerifications
      ? supabase
          .from("verification_submissions")
          .select("id, decision, submitted_at, decided_at, profiles(full_name, email)")
      : Promise.resolve({ data: null }),
    supabase
      .from("activity_logs")
      .select("id, user_id, section, action, entity_type, entity_id, entity_name, created_at, profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(100),
    getAttentionQueue(user),
  ]);

  // ─── 2. Calculate Real Statistics ────────────────────────────────────

  // Products
  const prods = (productsRes.data as Array<{
    id: string;
    name: string;
    slug: string;
    status: string;
    in_stock?: boolean;
    product_images?: Array<{ id: string; is_main: boolean; url: string }>;
    created_at?: string;
  }>) ?? [];
  const publishedProducts = prods.filter((p) => p.status === "published");
  const draftProducts = prods.filter((p) => p.status === "draft");
  const outOfStockProducts = publishedProducts.filter((p) => p.in_stock === false);
  const productsMissingImage = publishedProducts.filter(
    (p) => !p.product_images || !p.product_images.some((img) => img.is_main)
  );

  const productsStats = hasProducts
    ? {
        published: publishedProducts.length,
        draft: draftProducts.length,
        outOfStock: outOfStockProducts.length,
        total: prods.length,
      }
    : undefined;

  // Blog
  const posts = (blogRes.data as Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    cover_image?: string | null;
    published_at?: string | null;
    created_at?: string;
  }>) ?? [];
  const publishedBlog = posts.filter((p) => p.status === "published");
  const draftBlog = posts.filter((p) => p.status === "draft");
  const blogMissingCover = publishedBlog.filter((p) => !p.cover_image);

  const blogStats = hasBlog
    ? {
        published: publishedBlog.length,
        draft: draftBlog.length,
        total: posts.length,
      }
    : undefined;

  // Testimonials
  const tests = (testimonialsRes.data as Array<{
    id: string;
    author_name: string;
    author_role?: string | null;
    status: string;
    photo_url?: string | null;
    created_at?: string;
  }>) ?? [];
  const publishedTestimonials = tests.filter((t) => t.status === "published");
  const hiddenTestimonials = tests.filter((t) => t.status === "hidden");

  const testimonialsStats = hasTestimonials
    ? {
        published: publishedTestimonials.length,
        hidden: hiddenTestimonials.length,
        total: tests.length,
      }
    : undefined;

  // Verifications
  const verifs = (verificationsRes.data as Array<{
    id: string;
    decision: string;
    submitted_at: string;
  }>) ?? [];
  const pendingVerifs = verifs.filter((v) => v.decision === "pending");
  const verifiedClients = verifs.filter((v) => v.decision === "verified");
  const rejectedClients = verifs.filter((v) => v.decision === "rejected");

  const verificationsStats = hasVerifications
    ? {
        pending: pendingVerifs.length,
        total: verifs.length,
      }
    : undefined;

  // Oldest wait time calculation
  let oldestWaitTime: string | null = null;
  if (pendingVerifs.length > 0) {
    const sortedPending = [...pendingVerifs].sort(
      (a, b) => new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
    );
    const oldest = sortedPending[0];
    const diffMs = Date.now() - new Date(oldest.submitted_at).getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 1) {
      const diffMin = Math.floor(diffMs / 60000);
      oldestWaitTime = `${diffMin}m ago`;
    } else if (diffHours < 24) {
      oldestWaitTime = `${diffHours}h ago`;
    } else {
      const days = Math.floor(diffHours / 24);
      oldestWaitTime = `${days}d ago`;
    }
  }

  // Activity logs formatting
  const logs = (logsRes.data ?? []) as Record<string, unknown>[];
  const mappedLogs: ActivityLogEntry[] = logs.map((l) => {
    const prof = l.profiles;
    const profileObj = Array.isArray(prof)
      ? prof[0] ?? null
      : (prof as { full_name: string | null; email: string } | null);
    return {
      id: l.id as string,
      user_id: l.user_id as string,
      section: l.section as AdminSection,
      action: l.action as string,
      entity_type: l.entity_type as string,
      entity_id: (l.entity_id as string | null) ?? null,
      entity_name: l.entity_name as string,
      created_at: l.created_at as string,
      profiles: profileObj ?? null,
    };
  });

  // Content Health Score calculation
  const totalItemsToCheck = publishedProducts.length + publishedBlog.length;
  const healthDeficits =
    productsMissingImage.length + blogMissingCover.length + outOfStockProducts.length;
  const contentHealthScore =
    totalItemsToCheck > 0
      ? Math.max(10, Math.min(100, Math.round(((totalItemsToCheck - healthDeficits) / totalItemsToCheck) * 100)))
      : 100;

  // Recently Published items
  type RecentlyPublishedItem = {
    id: string;
    title: string;
    section: "products" | "blog" | "testimonials";
    publishedAt: string;
    href: string;
  };
  const recentlyPublishedList: RecentlyPublishedItem[] = [];

  if (hasProducts) {
    publishedProducts.slice(0, 3).forEach((p) => {
      recentlyPublishedList.push({
        id: p.id,
        title: p.name,
        section: "products",
        publishedAt: p.created_at ? new Date(p.created_at).toLocaleDateString() : "Recently",
        href: `/admin/products/${p.id}`,
      });
    });
  }
  if (hasBlog) {
    publishedBlog.slice(0, 3).forEach((b) => {
      recentlyPublishedList.push({
        id: b.id,
        title: b.title,
        section: "blog",
        publishedAt: b.published_at ? new Date(b.published_at).toLocaleDateString() : "Recently",
        href: `/admin/blog/${b.id}`,
      });
    });
  }
  if (hasTestimonials) {
    publishedTestimonials.slice(0, 2).forEach((t) => {
      recentlyPublishedList.push({
        id: t.id,
        title: `Review by ${t.author_name}`,
        section: "testimonials",
        publishedAt: t.created_at ? new Date(t.created_at).toLocaleDateString() : "Recently",
        href: `/admin/testimonials/${t.id}`,
      });
    });
  }

  // Greeting title
  const displayName = user.fullName ?? user.email.split("@")[0];
  const todayFormatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const getAccessBadgeText = () => {
    if (user.sections.length === 6) return "Full Operations Access · 6 Sections";
    if (user.sections.length === 1) return `${SECTION_LABELS[user.sections[0]]} Manager`;
    return `${user.sections.length} Sections Assigned`;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── 1. Greeting Row matching reference design ── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h1
              className="text-2xl sm:text-3xl font-bold text-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Good morning, {displayName}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3DA] text-[#2F5212] border border-[#C3E49E] whitespace-nowrap">
              <ShieldCheck size={14} />
              {getAccessBadgeText()}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            {todayFormatted} · Petfeb Solar Operations Hub
          </p>
        </div>

        {/* Quick action buttons (only for held sections) */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {hasProducts && (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-[#7BB042] hover:bg-[#6A9E36] text-black font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-xs whitespace-nowrap"
            >
              <Plus size={16} />
              <span>New product</span>
            </Link>
          )}

          {hasBlog && (
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F4F4F5] border border-[#E5E7EB] text-[#333] font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-xs whitespace-nowrap"
            >
              <Plus size={16} />
              <span>New blog post</span>
            </Link>
          )}

          {hasTestimonials && (
            <Link
              href="/admin/testimonials/new"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F4F4F5] border border-[#E5E7EB] text-[#333] font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-xs whitespace-nowrap"
            >
              <Plus size={16} />
              <span>New testimonial</span>
            </Link>
          )}
        </div>
      </div>

      {/* ── 2. Row of Summary Cards (4 cards in design style) ── */}
      <OverviewSummaryCards
        productsStats={productsStats}
        blogStats={blogStats}
        testimonialsStats={testimonialsStats}
        verificationsStats={verificationsStats}
        oldestWaitTime={oldestWaitTime}
        hasProducts={hasProducts}
        hasBlog={hasBlog}
        hasTestimonials={hasTestimonials}
        hasVerifications={hasVerifications}
      />

      {/* ── 3. Middle Section: Content Overview Chart + Attention Queue ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContentOverviewChart
            productsStats={productsStats}
            blogStats={blogStats}
            testimonialsStats={testimonialsStats}
            hasProducts={hasProducts}
            hasBlog={hasBlog}
            hasTestimonials={hasTestimonials}
          />
        </div>

        <div className="lg:col-span-1">
          <AttentionQueueCard tasks={attentionTasks} />
        </div>
      </div>

      {/* ── 4. Wide Table Card: Recent Activity (matching design's table) ── */}
      <RecentActivityCard
        logs={mappedLogs}
        userSections={user.sections}
      />

      {/* ── 5. Bottom Row: Content Health, Verification Queue, Recently Published ── */}
      <OverviewBottomCards
        contentHealth={{
          scorePct: contentHealthScore,
          missingProductImages: productsMissingImage.length,
          missingBlogCovers: blogMissingCover.length,
          outOfStockProducts: outOfStockProducts.length,
          totalPublished: publishedProducts.length + publishedBlog.length,
        }}
        verificationsQueue={
          hasVerifications
            ? {
                pendingCount: pendingVerifs.length,
                oldestWaitTime,
                decisionsCount: verifs.length,
                verifiedCount: verifiedClients.length,
                rejectedCount: rejectedClients.length,
              }
            : null
        }
        recentlyPublished={recentlyPublishedList}
        hasVerifications={hasVerifications}
      />
    </div>
  );
}
