import { requireSection } from "@/lib/require-section";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function NewTestimonialPage() {
  await requireSection("testimonials");
  return <TestimonialForm />;
}
