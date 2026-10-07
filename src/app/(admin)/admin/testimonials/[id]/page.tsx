import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("testimonials");
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).single();
  if (!data) notFound();
  return <TestimonialForm testimonial={data} />;
}
