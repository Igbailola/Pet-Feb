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
 * Fetches a single published site content value by key, falling back to a default value.
 */
export async function getSiteContent(key: string, fallback: string): Promise<string> {
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

/**
 * Retrieves all published products with their images.
 */
export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data: products, error } = await supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !products) {
      return [];
    }

    return products.map((p) => ({
      ...p,
      product_images: (p.product_images || []).sort(
        (a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order
      ),
    })) as Product[];
  } catch {
    return [];
  }
}

/**
 * Retrieves a single published product by slug, including attached accessories and images.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !product) {
      return null;
    }

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
        // preserve the product_accessories sort order
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
  } catch {
    return null;
  }
}

/**
 * Retrieves all published blog posts, sorted newest first.
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
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

    if (!products || products.length === 0) return null;

    // Prefer product with an is_main image
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
  } catch {
    return null;
  }
}
