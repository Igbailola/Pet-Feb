import { createClient } from "@/lib/supabase/server";
import type {
  Product,
  ProductImage,
  Accessory,
  BlogPost,
  Testimonial,
} from "./public-types";

export * from "./public-types";

/**
 * Checks whether Supabase is configured with a real, reachable project URL.
 * Fails fast on missing or placeholder values (e.g. YOUR_PROJECT_REF)
 * to avoid multi-second DNS/connection timeouts in local preview/development.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (
    trimmed === "" ||
    trimmed.includes("YOUR_PROJECT_REF") ||
    trimmed.includes("your_project_ref") ||
    trimmed.includes("example.com")
  ) {
    return false;
  }
  return true;
}


/**
 * Fetches a single published site content value by key, falling back to a default value.
 */
export async function getSiteContent(key: string, fallback: string): Promise<string> {
  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", key)
      .eq("status", "published")
      .maybeSingle();

    if (!data || data.value === null || data.value === undefined) {
      return fallback;
    }

    if (typeof data.value === "string") {
      return data.value;
    }
    return JSON.stringify(data.value);
  } catch {
    return fallback;
  }
}

import { DEFAULT_PRODUCTS } from "./products-store";

/**
 * Retrieves all published products with their images.
 * Falls back to verified DEFAULT_PRODUCTS if database is offline or empty.
 */
export async function getPublishedProducts(): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: products, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!error && products && products.length > 0) {
        return products.map((p) => ({
          ...p,
          product_images: (p.product_images || []).sort(
            (a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order
          ),
        })) as Product[];
      }
    } catch {
      // Supabase unavailable or DNS failed, fall through to default products
    }
  }

  return DEFAULT_PRODUCTS;
}

/**
 * Retrieves a single published product by slug, including attached accessories and images.
 * Falls back to DEFAULT_PRODUCTS if database is offline or empty.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: product, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!error && product) {
        // Fetch attached published accessories
        const { data: links } = await supabase
          .from("product_accessories")
          .select("accessory_id, sort_order")
          .eq("product_id", product.id)
          .order("sort_order", { ascending: true });

        let accessories: Accessory[] = [];
        if (links && links.length > 0) {
          const accessoryIds = links.map((l) => l.accessory_id);
          const { data: accData } = await supabase
            .from("accessories")
            .select("*")
            .in("id", accessoryIds)
            .eq("status", "published");

          if (accData) {
            const map = new Map(accData.map((a) => [a.id, a]));
            accessories = links
              .map((l) => map.get(l.accessory_id))
              .filter((a): a is Accessory => Boolean(a));
          }
        }

        return {
          ...product,
          product_images: (product.product_images || []).sort(
            (a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order
          ),
          accessories,
        } as Product;
      }
    } catch {
      // Supabase unavailable or DNS failed, fall through to default products
    }
  }

  const defaultMatch = DEFAULT_PRODUCTS.find((p) => p.slug === slug);
  return defaultMatch || null;
}

/**
 * Retrieves all published blog posts, sorted newest first.
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error || !posts) {
      return [];
    }
    return posts as BlogPost[];
  } catch {
    return [];
  }
}

/**
 * Retrieves a single published blog post by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !post) {
      return null;
    }
    return post as BlogPost;
  } catch {
    return null;
  }
}

/**
 * Retrieves all published testimonials.
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !testimonials) {
      return [];
    }
    return testimonials as Testimonial[];
  } catch {
    return [];
  }
}

/**
 * Resolves the featured product for the Home hero quick-view modal:
 * 1. Checks if site_content has a named slug under `home.hero.featured_product_slug`.
 * 2. If missing or invalid, falls back to the first published product with a main image (or first published product).
 */
export async function getHeroModalProduct(): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();

      // 1. Check site_content for specified product slug
      const { data: cmsEntry } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "home.hero.featured_product_slug")
        .eq("status", "published")
        .maybeSingle();

      if (cmsEntry && typeof cmsEntry.value === "string" && cmsEntry.value.trim() !== "") {
        const slug = cmsEntry.value.replace(/^"|"$/g, "").trim();
        const product = await getProductBySlug(slug);
        if (product) return product;
      }

      // 2. Fallback: first published product with a main image
      const { data: products } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (products && products.length > 0) {
        const withMainImage = products.find((p) =>
          p.product_images && p.product_images.some((img: ProductImage) => img.is_main)
        );

        const chosen = withMainImage || products[0];
        return {
          ...chosen,
          product_images: (chosen.product_images || []).sort(
            (a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order
          ),
        } as Product;
      }
    } catch {
      // Supabase unavailable, fall through
    }
  }

  return DEFAULT_PRODUCTS[0] || null;
}
