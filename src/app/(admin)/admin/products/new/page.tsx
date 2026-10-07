import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  await requireSection("products");
  const supabase = await createClient();

  const { data: allAccessories } = await supabase
    .from("accessories")
    .select("*")
    .order("name");

  return <ProductForm allAccessories={allAccessories ?? []} attachedIds={[]} />;
}
