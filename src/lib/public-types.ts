export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_main: boolean;
}

export interface Accessory {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  status: "draft" | "published";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  status: "draft" | "published";
  in_stock: boolean;
  specs: Record<string, string>;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
  accessories?: Accessory[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  body: string;
  category: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  message: string;
  photo_url: string | null;
  status: "published" | "hidden";
  created_at: string;
}

/**
 * Resolves a storage or asset URL.
 * Handles seed/relative paths, fully qualified URLs, and Supabase storage paths.
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return url;
  return `${supabaseUrl}/storage/v1/object/public/media/${url}`;
}

/**
 * Formats a numeric price into Nigerian Naira (NGN).
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
