import Link from "next/link";
import { requireStaff } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { SECTION_LABELS, type AdminSection } from "@/lib/rbac";
import {
  Package,
  FileText,
  MessageSquareQuote,
  ShieldCheck,
  Plus,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const user = await requireStaff();
  const supabase = await createClient();

  // Empty state for staff with no sections
  if (user.sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FDF0CC] flex items-center justify-center mb-5 text-[#8A5A00] shadow-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          No access assigned
        </h1>
        <p className="text-[#5C5C5C] text-sm max-w-sm mb-4">
          Your account is registered as staff, but no admin sections have been assigned to you yet. Please contact a system administrator to grant you access.
        </p>
        <div className="text-xs text-[#767676] bg-white border border-[#D9D9D9] px-4 py-2.5 rounded-lg">
          Logged in as: <span className="font-semibold text-black">{user.email}</span>
        </div>
      </div>
    );
  }

  // ─── 1. Fetch counts for held sections ─────────────────────────
  type SummaryData = {
    products?: { published: number; draft: number };
    blog?: { published: number; draft: number };
    testimonials?: { published: number; hidden: number };
    verifications?: { pending: number };
  };
  const summary: SummaryData = {};

  if (user.sections.includes("products")) {
    const { data } = await supabase.from("products").select("status");
    const prods = data ?? [];
    summary.products = {
      published: prods.filter((p) => p.status === "published").length,
      draft: prods.filter((p) => p.status === "draft").length,
    };
  }

  if (user.sections.includes("blog")) {
    const { data } = await supabase.from("blog_posts").select("status");
    const posts = data ?? [];
    summary.blog = {
      published: posts.filter((p) => p.status === "published").length,
      draft: posts.filter((p) => p.status === "draft").length,
    };
  }

  if (user.sections.includes("testimonials")) {
    const { data } = await supabase.from("testimonials").select("status");
    const tests = data ?? [];
    summary.testimonials = {
      published: tests.filter((t) => t.status === "published").length,
      hidden: tests.filter((t) => t.status === "hidden").length,
    };
  }

  if (user.sections.includes("verifications")) {
    const { data } = await supabase
      .from("verification_submissions")
      .select("decision")
      .eq("decision", "pending");
    summary.verifications = {
      pending: (data ?? []).length,
    };
  }

  // ─── 2. Fetch "Needs attention" items ──────────────────────────
  type AttentionItem = {
    id: string;
    type: "product_draft" | "product_out_of_stock" | "blog_draft" | "testimonial_hidden" | "verification_pending";
    title: string;
    subtitle: string;
    href: string;
    badge: string;
    badgeColor: string;
  };
  const attentionItems: AttentionItem[] = [];

  if (user.sections.includes("products")) {
    // Draft products & published out-of-stock products
    const { data: prods } = await supabase
      .from("products")
      .select("id, name, status, in_stock")
      .or("status.eq.draft,in_stock.eq.false")
      .limit(6);

    for (const p of prods ?? []) {
      if (p.status === "draft") {
        attentionItems.push({
          id: `prod-draft-${p.id}`,
          type: "product_draft",
          title: p.name,
          subtitle: "Product is in draft status",
          href: `/admin/products/${p.id}`,
          badge: "Draft",
          badgeColor: "bg-[#F2F2F2] text-[#5C5C5C]",
        });
      } else if (p.status === "published" && p.in_stock === false) {
        attentionItems.push({
          id: `prod-oos-${p.id}`,
          type: "product_out_of_stock",
          title: p.name,
          subtitle: "Published product is out of stock",
          href: `/admin/products/${p.id}`,
          badge: "Out of Stock",
          badgeColor: "bg-[#FCE8E6] text-[#B3261E]",
        });
      }
    }
  }

  if (user.sections.includes("blog")) {
    const { data: drafts } = await supabase
      .from("blog_posts")
      .select("id, title")
      .eq("status", "draft")
      .limit(6);

    for (const b of drafts ?? []) {
      attentionItems.push({
        id: `blog-draft-${b.id}`,
        type: "blog_draft",
        title: b.title,
        subtitle: "Draft post awaiting publication",
        href: `/admin/blog/${b.id}`,
        badge: "Draft",
        badgeColor: "bg-[#F2F2F2] text-[#5C5C5C]",
      });
    }
  }

  if (user.sections.includes("testimonials")) {
    const { data: hiddens } = await supabase
      .from("testimonials")
      .select("id, author_name")
      .eq("status", "hidden")
      .limit(6);

    for (const t of hiddens ?? []) {
      attentionItems.push({
        id: `test-hidden-${t.id}`,
        type: "testimonial_hidden",
        title: `Testimonial by ${t.author_name}`,
        subtitle: "Hidden from public website",
        href: `/admin/testimonials/${t.id}`,
        badge: "Hidden",
        badgeColor: "bg-[#FDF0CC] text-[#8A5A00]",
      });
    }
  }

  if (user.sections.includes("verifications") && summary.verifications?.pending) {
    attentionItems.push({
      id: "verif-pending",
      type: "verification_pending",
      title: `${summary.verifications.pending} Pending Client Verification${summary.verifications.pending !== 1 ? "s" : ""}`,
      subtitle: "Clients awaiting identity verification review",
      href: "/admin/verifications",
      badge: "Review Required",
      badgeColor: "bg-[#FEF3C7] text-[#92400E]",
    });
  }

  // ─── 3. Fetch Recent Changes (Activity logs) ───────────────────
  let recentLogs: {
    id: string;
    user_id: string;
    section: AdminSection;
    action: string;
    entity_name: string;
    created_at: string;
    profiles?: { full_name: string | null; email: string } | null;
  }[] = [];

  try {
    const { data: logs } = await supabase
      .from("activity_logs")
      .select("id, user_id, section, action, entity_name, created_at, profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(6);

    if (logs) {
      recentLogs = (logs as Record<string, unknown>[]).map((l) => {
        const prof = l.profiles;
        const profileObj = Array.isArray(prof) ? prof[0] ?? null : (prof as { full_name: string | null; email: string } | null);
        return {
          id: l.id as string,
          user_id: l.user_id as string,
          section: l.section as AdminSection,
          action: l.action as string,
          entity_name: l.entity_name as string,
          created_at: l.created_at as string,
          profiles: profileObj ?? null,
        };
      });
    }
  } catch (err) {
    console.error("Could not load activity logs:", err);
  }

  const formatRelativeTime = (timestamp: string) => {
    try {
      const now = Date.now();
      const past = new Date(timestamp).getTime();
      const diffMs = now - past;
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return "Just now";
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  const displayName = user.fullName ?? user.email;

  return (
    <div className="space-y-8">
      {/* ── Greeting & Sections Held ── */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold text-black tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Welcome back, {displayName}
        </h1>
        <p className="text-[#5C5C5C] text-sm mt-1">
          {user.sections.length === 6 ? (
            <span>You have full administrative access across all 6 sections.</span>
          ) : (
            <span>
              Your assigned sections:{" "}
              <span className="font-semibold text-black">
                {user.sections.map((s) => SECTION_LABELS[s]).join(", ")}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {user.sections.includes("products") && summary.products && (
          <Link
            href="/admin/products"
            className="group bg-white rounded-xl border border-[#D9D9D9] p-5 hover:border-[#7BB042] hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#767676]">
                Products
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#E8F3DA] flex items-center justify-center text-[#2F5212] group-hover:scale-105 transition">
                <Package size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {summary.products.published}
              </span>
              <span className="text-xs text-[#2F5212] font-semibold bg-[#E8F3DA] px-2 py-0.5 rounded-full">
                Published
              </span>
            </div>
            <p className="text-xs text-[#767676] mt-2">
              {summary.products.draft} draft product{summary.products.draft !== 1 ? "s" : ""}
            </p>
          </Link>
        )}

        {user.sections.includes("blog") && summary.blog && (
          <Link
            href="/admin/blog"
            className="group bg-white rounded-xl border border-[#D9D9D9] p-5 hover:border-[#7BB042] hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#767676]">
                Blog
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center text-[#1E40AF] group-hover:scale-105 transition">
                <FileText size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {summary.blog.published}
              </span>
              <span className="text-xs text-[#1E40AF] font-semibold bg-[#DBEAFE] px-2 py-0.5 rounded-full">
                Published
              </span>
            </div>
            <p className="text-xs text-[#767676] mt-2">
              {summary.blog.draft} draft post{summary.blog.draft !== 1 ? "s" : ""}
            </p>
          </Link>
        )}

        {user.sections.includes("testimonials") && summary.testimonials && (
          <Link
            href="/admin/testimonials"
            className="group bg-white rounded-xl border border-[#D9D9D9] p-5 hover:border-[#7BB042] hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#767676]">
                Testimonials
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center text-[#92400E] group-hover:scale-105 transition">
                <MessageSquareQuote size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {summary.testimonials.published}
              </span>
              <span className="text-xs text-[#2F5212] font-semibold bg-[#E8F3DA] px-2 py-0.5 rounded-full">
                Published
              </span>
            </div>
            <p className="text-xs text-[#767676] mt-2">
              {summary.testimonials.hidden} hidden testimonial{summary.testimonials.hidden !== 1 ? "s" : ""}
            </p>
          </Link>
        )}

        {user.sections.includes("verifications") && summary.verifications && (
          <Link
            href="/admin/verifications"
            className="group bg-white rounded-xl border border-[#D9D9D9] p-5 hover:border-[#7BB042] hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#767676]">
                Verifications
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#5B21B6] group-hover:scale-105 transition">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {summary.verifications.pending}
              </span>
              <span className="text-xs text-[#92400E] font-semibold bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                Pending
              </span>
            </div>
            <p className="text-xs text-[#767676] mt-2">
              Awaiting review
            </p>
          </Link>
        )}
      </div>

      {/* ── Quick Actions (only for held sections) ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#767676] mb-3">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {user.sections.includes("products") && (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-[#7BB042] text-black font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg hover:bg-[#6A9E36] transition shadow-sm"
            >
              <Plus size={16} /> New product
            </Link>
          )}
          {user.sections.includes("blog") && (
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-white border border-[#D9D9D9] text-[#333] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg hover:bg-[#F2F2F2] transition shadow-sm"
            >
              <Plus size={16} /> New blog post
            </Link>
          )}
          {user.sections.includes("testimonials") && (
            <Link
              href="/admin/testimonials/new"
              className="inline-flex items-center gap-2 bg-white border border-[#D9D9D9] text-[#333] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg hover:bg-[#F2F2F2] transition shadow-sm"
            >
              <Plus size={16} /> New testimonial
            </Link>
          )}
        </div>
      </div>

      {/* ── Grid: Needs Attention + Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs attention */}
        <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#D97706]" />
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Needs attention
              </h2>
            </div>
            {attentionItems.length > 0 && (
              <span className="text-xs font-semibold bg-[#FDF0CC] text-[#8A5A00] px-2 py-0.5 rounded-full">
                {attentionItems.length} item{attentionItems.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {attentionItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <div className="w-10 h-10 rounded-full bg-[#E8F3DA] text-[#2F5212] flex items-center justify-center mb-2">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-sm font-semibold text-black">All caught up!</p>
              <p className="text-xs text-[#767676] mt-0.5">
                No draft items or pending tasks in your sections.
              </p>
            </div>
          ) : (
            <div className="space-y-2 flex-1">
              {attentionItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#F2F2F2] hover:border-[#7BB042] hover:bg-[#F4F9EC] transition group"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs sm:text-sm font-semibold text-black group-hover:text-[#2F5212] truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#767676] truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <ArrowRight size={14} className="text-[#767676] group-hover:text-[#2F5212] transition" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Changes */}
        <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#5C5C5C]" />
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Recent changes
              </h2>
            </div>
            <Link
              href="/admin/activity"
              className="text-xs font-semibold text-[#3F6B1A] hover:underline flex items-center gap-1"
            >
              View all <ExternalLink size={11} />
            </Link>
          </div>

          {recentLogs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <p className="text-xs text-[#767676]">
                No recent activity recorded yet. Edits made in admin sections will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {recentLogs.map((log) => {
                const author = log.profiles?.full_name ?? log.profiles?.email ?? "Staff";
                return (
                  <div
                    key={log.id}
                    className="flex items-start justify-between gap-3 text-xs pb-2.5 border-b border-[#F2F2F2] last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#333] truncate">
                        <span className="font-semibold text-black">{author}</span>{" "}
                        <span className="text-[#5C5C5C]">{log.action}</span>{" "}
                        <span className="font-medium text-black">&ldquo;{log.entity_name}&rdquo;</span>
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] bg-[#F2F2F2] px-1.5 py-0.5 rounded">
                          {log.section}
                        </span>
                        <span className="text-[11px] text-[#A0A0A0]">
                          {formatRelativeTime(log.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
