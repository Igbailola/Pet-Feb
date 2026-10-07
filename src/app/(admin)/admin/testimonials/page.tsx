import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { TestimonialsList } from "@/components/admin/testimonials-list";

export default async function TestimonialsPage() {
  await requireSection("testimonials");
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  return <TestimonialsList testimonials={data ?? []} />;
}
