"use server";

import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/session";

export type SearchResultItem = {
  id: string;
  title: string;
  subtitle?: string;
  type: "product" | "blog" | "testimonial";
  href: string;
  status: string;
};

export async function searchAdmin(query: string): Promise<SearchResultItem[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const user = await requireStaff();
  const supabase = await createClient();
  const results: SearchResultItem[] = [];

  // Search products if user has products section
  if (user.sections.includes("products")) {
    const { data: prods } = await supabase
      .from("products")
      .select("id, name, category, status")
      .or(`name.ilike.%${trimmed}%,category.ilike.%${trimmed}%`)
      .limit(5);

    if (prods) {
      for (const p of prods) {
        results.push({
          id: p.id,
          title: p.name,
          subtitle: `Category: ${p.category}`,
          type: "product",
          href: `/admin/products/${p.id}`,
          status: p.status,
        });
      }
    }
  }

  // Search blog if user has blog section
  if (user.sections.includes("blog")) {
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("id, title, category, status")
      .ilike("title", `%${trimmed}%`)
      .limit(5);

    if (posts) {
      for (const b of posts) {
        results.push({
          id: b.id,
          title: b.title,
          subtitle: b.category ? `Category: ${b.category}` : "Blog post",
          type: "blog",
          href: `/admin/blog/${b.id}`,
          status: b.status,
        });
      }
    }
  }

  // Search testimonials if user has testimonials section
  if (user.sections.includes("testimonials")) {
    const { data: tests } = await supabase
      .from("testimonials")
      .select("id, author_name, author_role, status")
      .or(`author_name.ilike.%${trimmed}%,message.ilike.%${trimmed}%`)
      .limit(5);

    if (tests) {
      for (const t of tests) {
        results.push({
          id: t.id,
          title: t.author_name,
          subtitle: t.author_role ?? "Testimonial",
          type: "testimonial",
          href: `/admin/testimonials/${t.id}`,
          status: t.status,
        });
      }
    }
  }

  return results;
}
