"use server";

import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { testimonialSchema } from "@/schemas/content";
import { logActivity } from "@/lib/activity-log";

async function guardTestimonials() {
  const user = await requireStaff();
  if (!user.sections.includes("testimonials")) throw new Error("Forbidden: missing section testimonials");
  return user;
}

export type ActionResult = { success?: boolean; error?: string };

export async function createTestimonial(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardTestimonials();
  const raw = {
    author_name: formData.get("author_name") as string,
    author_role: (formData.get("author_role") as string) || undefined,
    message: formData.get("message") as string,
    photo_url: (formData.get("photo_url") as string) || undefined,
    status: formData.get("status") as string,
  };
  const parsed = testimonialSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data, error } = await supabase.from("testimonials").insert(parsed.data).select("id").single();
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "testimonials",
    action: parsed.data.status === "published" ? "created and published" : "created",
    entityType: "testimonial",
    entityId: data?.id,
    entityName: `Testimonial by ${parsed.data.author_name}`,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateTestimonial(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardTestimonials();
  const id = formData.get("id") as string;
  const raw = {
    author_name: formData.get("author_name") as string,
    author_role: (formData.get("author_role") as string) || undefined,
    message: formData.get("message") as string,
    photo_url: (formData.get("photo_url") as string) || undefined,
    status: formData.get("status") as string,
  };
  const parsed = testimonialSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data: existing } = await supabase.from("testimonials").select("status").eq("id", id).single();

  const { error } = await supabase.from("testimonials").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  let action = "updated";
  if (existing && existing.status !== parsed.data.status) {
    action = parsed.data.status === "published" ? "published" : "hidden";
  }

  await logActivity({
    userId: user.id,
    section: "testimonials",
    action,
    entityType: "testimonial",
    entityId: id,
    entityName: `Testimonial by ${parsed.data.author_name}`,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  const user = await guardTestimonials();
  const supabase = await createClient();
  const { data: item } = await supabase.from("testimonials").select("author_name").eq("id", id).single();
  const authorName = item?.author_name ?? "Testimonial";

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "testimonials",
    action: "deleted",
    entityType: "testimonial",
    entityId: id,
    entityName: `Testimonial by ${authorName}`,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
  return { success: true };
}

export async function uploadTestimonialPhoto(_prev: ActionResult, formData: FormData): Promise<ActionResult & { url?: string }> {
  await guardTestimonials();
  const file = formData.get("file") as File;
  if (!file || !file.type.startsWith("image/")) return { error: "Please select an image file" };

  const supabase = await createClient();
  const path = `testimonials/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) return { error: error.message };

  const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
  return { success: true, url: publicUrl };
}
