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

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-ph-expansion",
    title: "Feb Expands to Port Harcourt Bringing Solar Innovation Closer to Southern Nigeria",
    slug: "petfeb-expands-to-port-harcourt",
    cover_image: "/figma-assets/blog-ph-expansion.png",
    category: "Renewable Energy",
    status: "published",
    published_at: "2025-09-27T10:00:00.000Z",
    created_at: "2025-09-27T10:00:00.000Z",
    updated_at: "2025-09-27T10:00:00.000Z",
    body: `Pet-Feb International Company Limited has officially opened its new regional operational hub in Port Harcourt, Rivers State — a major milestone toward expanding clean, reliable energy access across Southern Nigeria.

The launch ceremony brought together team members, partners, and key community stakeholders who celebrated this exciting new chapter. The Port Harcourt facility is not just a workspace — it serves as a regional center for solar technical engineering, installer training, and rapid customer support.

This strategic expansion reflects our dedication to being closer to the communities and businesses we power. With the South-South region's increasing demand for sustainable commercial energy, our local hub will provide instant hardware dispatch, certified NEMSA installations, and specialized after-sales engineering care.

Pet-Feb's Port Harcourt hub will also host recurring solar PV workforce training programs, product showcases, and community clean power initiatives. By expanding our operational footprint, we take another bold step toward our vision of a sustainable Nigeria powered by clean energy.`,
  },
  {
    id: "blog-lighting-communities",
    title: "Lighting Up Communities Pet-Feb's Renewable Energy Projects Transforming Lives",
    slug: "lighting-up-communities-transforming-lives",
    cover_image: "/figma-assets/blog-2.png",
    category: "Project Case Studies",
    status: "published",
    published_at: "2025-09-23T09:00:00.000Z",
    created_at: "2025-09-23T09:00:00.000Z",
    updated_at: "2025-09-23T09:00:00.000Z",
    body: `See how Pet-Feb's solar street lighting and community minigrids are transforming rural and urban neighborhoods across Nigeria. From improving nighttime safety to powering essential cold storage and small enterprises, clean solar energy is revitalizing local economies.`,
  },
  {
    id: "blog-empowering-engineers",
    title: "Empowering Tomorrow's Engineers How Pet-Feb is Building Nigeria's Solar Workforce",
    slug: "empowering-tomorrows-engineers",
    cover_image: "/figma-assets/mission-img-2.png",
    category: "Training & Capacity",
    status: "published",
    published_at: "2025-09-18T12:00:00.000Z",
    created_at: "2025-09-18T12:00:00.000Z",
    updated_at: "2025-09-18T12:00:00.000Z",
    body: `Pet-Feb is shaping the future of Nigeria's renewable energy industry through comprehensive hands-on solar installation and battery sizing training. Over 18,000 individuals have been trained to date, equipping them with professional skills in high-voltage DC wiring, inverter programming, and solar PV system design.`,
  },
];

/**
 * Retrieves all published blog posts, sorted newest first.
 * Falls back to DEFAULT_BLOG_POSTS if database is offline or empty.
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false });

      if (!error && posts && posts.length > 0) {
        return posts as BlogPost[];
      }
    } catch {
      // Supabase unavailable, fall through
    }
  }

  return DEFAULT_BLOG_POSTS;
}

/**
 * Retrieves a single published blog post by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: post, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!error && post) {
        return post as BlogPost;
      }
    } catch {
      // Supabase unavailable, fall through
    }
  }

  const defaultMatch = DEFAULT_BLOG_POSTS.find((p) => p.slug === slug);
  return defaultMatch || null;
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
