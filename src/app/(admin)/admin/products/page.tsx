import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { ProductsList } from "@/components/admin/products-list";

export default async function ProductsPage() {
  await requireSection("products");
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, product_images(id, url, alt_text, sort_order, is_main)")
    .order("created_at", { ascending: false });

  const { data: accessories } = await supabase
    .from("accessories")
    .select("*")
    .order("name");

  return (
    <ProductsList
      products={products ?? []}
      accessories={accessories ?? []}
    />
  );
}
