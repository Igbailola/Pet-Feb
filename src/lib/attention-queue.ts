import { createClient } from "@/lib/supabase/server";
import type { SessionUser } from "@/lib/session";

export type AttentionTask = {
  id: string;
  type:
    | "verification_pending"
    | "product_out_of_stock"
    | "product_draft"
    | "product_missing_image"
    | "blog_draft"
    | "blog_missing_cover"
    | "testimonial_hidden";
  title: string;
  tag: string;
  tagColor: "red" | "amber" | "gray" | "green" | "blue";
  description: string;
  href: string;
  actionLabel: string;
};

export async function getAttentionQueue(user: SessionUser): Promise<AttentionTask[]> {
  if (user.sections.length === 0) return [];

  const supabase = await createClient();
  const tasks: AttentionTask[] = [];

  // 1. Pending Verifications
  if (user.sections.includes("verifications")) {
    try {
      const { data: verifs } = await supabase
        .from("verification_submissions")
        .select("id, submitted_at, profiles(full_name, email)")
        .eq("decision", "pending")
        .order("submitted_at", { ascending: true })
        .limit(10);

      for (const v of verifs ?? []) {
        const prof = Array.isArray(v.profiles) ? v.profiles[0] : v.profiles;
        const clientName = prof?.full_name || prof?.email || "Client";
        tasks.push({
          id: `verif-pending-${v.id}`,
          type: "verification_pending",
          title: `Verification: ${clientName}`,
          tag: "Pending Review",
          tagColor: "amber",
          description: `Identity verification submission for ${clientName} awaiting review for Buy Small eligibility.`,
          href: "/admin/verifications",
          actionLabel: "Review",
        });
      }
    } catch (e) {
      console.error("Error fetching verification attention items:", e);
    }
  }

  // 2. Products Attention
  if (user.sections.includes("products")) {
    try {
      const { data: prods } = await supabase
        .from("products")
        .select("id, name, status, in_stock, product_images(id, is_main)")
        .limit(50);

      for (const p of prods ?? []) {
        const isOut = p.in_stock === false;
        const isDraft = p.status === "draft";
        const isPublished = p.status === "published";
        const images = (p.product_images as { id: string; is_main: boolean }[]) ?? [];
        const hasMainImage = images.some((img) => img.is_main);

        // Published out-of-stock
        if (isPublished && isOut) {
          tasks.push({
            id: `prod-oos-${p.id}`,
            type: "product_out_of_stock",
            title: p.name,
            tag: "Out of Stock",
            tagColor: "red",
            description: "Published product is flagged as out of stock.",
            href: `/admin/products/${p.id}`,
            actionLabel: "Open",
          });
        }

        // Draft waiting to be published
        if (isDraft) {
          tasks.push({
            id: `prod-draft-${p.id}`,
            type: "product_draft",
            title: p.name,
            tag: "Draft Product",
            tagColor: "gray",
            description: "Product is in draft status awaiting review and publishing.",
            href: `/admin/products/${p.id}`,
            actionLabel: "Open",
          });
        }

        // Product with no main image
        if (isPublished && !hasMainImage) {
          tasks.push({
            id: `prod-no-img-${p.id}`,
            type: "product_missing_image",
            title: p.name,
            tag: "Missing Image",
            tagColor: "amber",
            description: "Published product has no primary image configured.",
            href: `/admin/products/${p.id}`,
            actionLabel: "Open",
          });
        }
      }
    } catch (e) {
      console.error("Error fetching product attention items:", e);
    }
  }

  // 3. Blog Attention
  if (user.sections.includes("blog")) {
    try {
      const { data: posts } = await supabase
        .from("blog_posts")
        .select("id, title, status, cover_image")
        .limit(50);

      for (const b of posts ?? []) {
        if (b.status === "draft") {
          tasks.push({
            id: `blog-draft-${b.id}`,
            type: "blog_draft",
            title: b.title,
            tag: "Draft Post",
            tagColor: "gray",
            description: "Blog article is in draft awaiting publication.",
            href: `/admin/blog/${b.id}`,
            actionLabel: "Open",
          });
        }
        if (b.status === "published" && !b.cover_image) {
          tasks.push({
            id: `blog-no-cover-${b.id}`,
            type: "blog_missing_cover",
            title: b.title,
            tag: "Missing Cover",
            tagColor: "amber",
            description: "Published blog article has no cover image.",
            href: `/admin/blog/${b.id}`,
            actionLabel: "Open",
          });
        }
      }
    } catch (e) {
      console.error("Error fetching blog attention items:", e);
    }
  }

  // 4. Testimonials Attention
  if (user.sections.includes("testimonials")) {
    try {
      const { data: tests } = await supabase
        .from("testimonials")
        .select("id, author_name, status")
        .eq("status", "hidden")
        .limit(20);

      for (const t of tests ?? []) {
        tasks.push({
          id: `test-hidden-${t.id}`,
          type: "testimonial_hidden",
          title: `Testimonial by ${t.author_name}`,
          tag: "Hidden",
          tagColor: "amber",
          description: "Testimonial is currently hidden from public display.",
          href: `/admin/testimonials/${t.id}`,
          actionLabel: "Open",
        });
      }
    } catch (e) {
      console.error("Error fetching testimonial attention items:", e);
    }
  }

  return tasks;
}
