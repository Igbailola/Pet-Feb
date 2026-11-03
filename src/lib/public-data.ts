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
    id: "blog-empowering-engineers",
    title: "Empowering Tomorrow’s Engineers Inside Pet-Feb’s Solar Training Programs",
    slug: "empowering-tomorrows-engineers",
    cover_image:
      "https://framerusercontent.com/images/3nbXbY6KeeNsRkGhg0TmSY1jlU.png?width=3906&height=1656",
    hero_images: [
      "https://framerusercontent.com/images/3nbXbY6KeeNsRkGhg0TmSY1jlU.png?width=3906&height=1656",
      "https://framerusercontent.com/images/EqzEmErJ4EZPWDc6Z10DKBoSFTc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/ajestYwk9gWiDVpDM4R0bASbU.png?width=2444&height=2208",
      "https://framerusercontent.com/images/h86onno5G4w20Bz4ZvuI3lx6wc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/50LeTCmNyusbHkKeDFtzG7XcuI0.png?width=2444&height=2208",
    ],
    category: "Renewable Energy",
    status: "published",
    published_at: "2025-09-27T10:00:00.000Z",
    created_at: "2025-09-27T10:00:00.000Z",
    updated_at: "2025-09-27T10:00:00.000Z",
    body: `Discover how Pet-Feb is training Nigeria’s next generation of solar engineers through hands-on workshops and international knowledge exchange.

At Pet-Feb International Company Limited, we believe sustainable energy starts with people — the innovators, installers, and changemakers who make progress possible.

Guided by this belief, we continuously invest in solar training and workforce development across Nigeria. In a nation where access to clean energy drives growth, Pet-Feb is closing the skills gap by empowering the next generation of solar engineers, installers, and technicians.

Through our hands-on workshops and globally informed learning programs, participants gain both the technical expertise and confidence needed to champion renewable energy within their communities.

Through hands-on demonstrations, students and professionals alike learn to assemble, configure, and maintain solar power systems — from inverters and batteries to full-scale installations.

Our most recent collaboration with global solar manufacturers in China further strengthened this mission. The trip exposed our engineers and trainees to cutting-edge renewable energy technologies and manufacturing standards — a direct step toward raising Nigeria’s local capacity to global levels.

Every Pet-Feb trainee leaves not just with knowledge, but with purpose — equipped to drive clean energy adoption and sustainability across Africa.`,
  },
  {
    id: "blog-lighting-communities",
    title: "Lighting Up Communities Pet-Feb’s Renewable Energy Projects Transforming Lives",
    slug: "lighting-up-communities-transforming-lives",
    cover_image:
      "https://framerusercontent.com/images/CWkdJA2gAFDbAqRSfKsMSs3EJU.png?width=3906&height=1656",
    hero_images: [
      "https://framerusercontent.com/images/CWkdJA2gAFDbAqRSfKsMSs3EJU.png?width=3906&height=1656",
      "https://framerusercontent.com/images/DW7rme2XjltZ0m6fTH61XKd9TY.png?width=2444&height=2208",
      "https://framerusercontent.com/images/puOOkBFuMuVaH9XbrTjG4dDsZE.png?width=2444&height=2208",
      "https://framerusercontent.com/images/wBaJ3u4FK1D1Cbjos0cCoLeLxU.png?width=2444&height=2208",
      "https://framerusercontent.com/images/t9tRc4eUkv0WKXcaxW9yAYUscc.png?width=2444&height=2208",
    ],
    category: "Renewable Energy",
    status: "published",
    published_at: "2025-08-30T09:00:00.000Z",
    created_at: "2025-08-30T09:00:00.000Z",
    updated_at: "2025-08-30T09:00:00.000Z",
    body: `Discover how Pet-Feb’s solar projects are delivering affordable, reliable clean energy to Nigerian homes and businesses.

For Pet-Feb, every solar installation tells a story of empowerment, access, and transformation. Across Nigeria, thousands of families and businesses are embracing renewable energy thanks to our solar projects, which combine global expertise with local innovation.

Our mission is simple: to deliver reliable, sustainable, and affordable power to the people who need it most. Whether it’s lighting up schools, powering homes, or supporting small businesses, each project reinforces our belief that energy is not a privilege — it’s a right.

Recent highlights include our rural electrification projects in Eastern and Southern Nigeria, where off-grid communities now enjoy 24-hour solar-powered electricity for the first time.

But our work doesn’t stop at installation. Pet-Feb ensures long-term sustainability by training local technicians, offering maintenance support, and building awareness around energy conservation.

Through partnerships with top solar brands like Felicity Solar, Blue Carbon, and Jinko, we ensure that every Pet-Feb project meets international standards for safety, efficiency, and durability.

Our vision is to see every community, big or small, powered by clean, renewable energy — because when we light up communities, we light up the future.`,
  },
  {
    id: "blog-ph-expansion",
    title: "Feb Expands to Port Harcourt Bringing Solar Innovation Closer to Southern Nigeria",
    slug: "petfeb-expands-to-port-harcourt",
    cover_image: "/figma-assets/blog-ph-expansion.png",
    hero_images: [
      "/figma-assets/blog-ph-expansion.png",
      "https://framerusercontent.com/images/ouN3rsXAKyw7PjwEu9a9id2jDhk.png?width=1524&height=764",
      "https://framerusercontent.com/images/1QjfCy9Y4m1AwsOYggwt8cs8oY.png?width=1524&height=764",
      "https://framerusercontent.com/images/BxR3rcFDKdHvorb8nsw4BrCQF0.png?width=1524&height=764",
      "https://framerusercontent.com/images/xyrhLbRC9JyspLBq3TZdYJN7U.png?width=2444&height=2208",
    ],
    category: "Renewable Energy",
    status: "published",
    published_at: "2025-08-23T10:00:00.000Z",
    created_at: "2025-08-23T10:00:00.000Z",
    updated_at: "2025-08-23T10:00:00.000Z",
    body: `Pet-Feb opens a new regional office in Port Harcourt, reinforcing its commitment to clean energy access, innovation, and customer support.

In August 2025, Pet-Feb International Company Limited marked a new milestone with the opening of our regional office in Port Harcourt, Rivers State — a major step toward expanding clean energy access in Southern Nigeria.

The launch ceremony brought together team members, partners, and stakeholders who celebrated this exciting new chapter. The Port Harcourt office is not just a workspace — it’s a hub for innovation, training, and customer engagement, designed to support Pet-Feb’s growing network of renewable energy clients.

This expansion reflects our dedication to being closer to the people we serve. With the region’s increasing demand for clean, reliable energy, the new office enables faster response times for installations, maintenance, and technical support.

Pet-Feb’s Port Harcourt hub will also host training programs, product showcases, and community initiatives, ensuring that residents and businesses alike can experience the full potential of solar energy.

By expanding our reach, we’re taking another bold step toward our vision of a sustainable Nigeria powered by renewable energy.`,
  },
];

const BLOG_SLUG_ALIASES: Record<string, string> = {
  "lighting-up-communities": "lighting-up-communities-transforming-lives",
  "feb-expands-to-port-harcourt": "petfeb-expands-to-port-harcourt",
};

/**
 * Retrieves all published blog posts, sorted newest first.
 * Ensures the 3 official Pet-Feb blog posts always use the complete word-for-word body.
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
        const defaultBySlug = new Map(DEFAULT_BLOG_POSTS.map((p) => [p.slug, p]));
        const merged = (posts as BlogPost[]).map((p) => {
          const canonicalSlug = BLOG_SLUG_ALIASES[p.slug] || p.slug;
          const official = defaultBySlug.get(canonicalSlug);
          if (official) {
            defaultBySlug.delete(canonicalSlug);
            return official;
          }
          return p;
        });
        return [...Array.from(defaultBySlug.values()), ...merged];
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
  const canonicalSlug = BLOG_SLUG_ALIASES[slug] || slug;
  const defaultMatch = DEFAULT_BLOG_POSTS.find((p) => p.slug === canonicalSlug);
  if (defaultMatch) {
    return defaultMatch;
  }

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

  return null;
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
