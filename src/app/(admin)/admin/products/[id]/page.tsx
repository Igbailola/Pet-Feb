import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("products");
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, product_images(id, url, alt_text, sort_order, is_main)")
    .eq("id", id)
    .single();

  if (!product) notFound();

  const { data: allAccessories } = await supabase
    .from("accessories")
    .select("*")
    .order("name");

  const { data: attached } = await supabase
    .from("product_accessories")
    .select("accessory_id")
    .eq("product_id", id);

  return (
    <ProductForm
      product={product}
      allAccessories={allAccessories ?? []}
      attachedIds={(attached ?? []).map((a: { accessory_id: string }) => a.accessory_id)}
    />
  );
}
