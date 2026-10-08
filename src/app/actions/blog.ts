"use server";

import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { blogPostSchema } from "@/schemas/content";
import { logActivity } from "@/lib/activity-log";

async function guardBlog() {
  const user = await requireStaff();
  if (!user.sections.includes("blog")) throw new Error("Forbidden: missing section blog");
  return user;
}

export type ActionResult = { success?: boolean; error?: string };

function revalidateBlogPages(id?: string, slug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/admin/blog");
  if (id) {
    revalidatePath(`/admin/blog/${id}`);
  }
  revalidatePath("/admin");
}

export async function createBlogPost(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardBlog();
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    cover_image: (formData.get("cover_image") as string) || undefined,
    body: formData.get("body") as string,
    category: (formData.get("category") as string) || undefined,
    status: (formData.get("status") as string) || "draft",
    published_at: (formData.get("published_at") as string)?.trim() || (formData.get("status") === "published" ? new Date().toISOString() : undefined),
  };
  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").insert(parsed.data).select("id").single();
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "blog",
    action: parsed.data.status === "published" ? "created and published" : "created",
    entityType: "blog_post",
    entityId: data?.id,
    entityName: parsed.data.title,
  });

  revalidateBlogPages(data?.id, parsed.data.slug);
  return { success: true };
}

export async function updateBlogPost(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardBlog();
  const id = formData.get("id") as string;
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    cover_image: (formData.get("cover_image") as string) || undefined,
    body: formData.get("body") as string,
    category: (formData.get("category") as string) || undefined,
    status: (formData.get("status") as string) || "draft",
    published_at: (formData.get("published_at") as string)?.trim() || (formData.get("status") === "published" ? new Date().toISOString() : undefined),
  };
  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data: existing } = await supabase.from("blog_posts").select("status").eq("id", id).single();

  const { error } = await supabase.from("blog_posts").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  let action = "updated";
  if (existing && existing.status !== parsed.data.status) {
    action = parsed.data.status === "published" ? "published" : "unpublished";
  }

  await logActivity({
    userId: user.id,
    section: "blog",
    action,
    entityType: "blog_post",
    entityId: id,
    entityName: parsed.data.title,
  });

  revalidateBlogPages(id, parsed.data.slug);
  return { success: true };
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  const user = await guardBlog();
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("title, slug").eq("id", id).single();
  const title = post?.title ?? "Blog post";

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "blog",
    action: "deleted",
    entityType: "blog_post",
    entityId: id,
    entityName: title,
  });

  revalidateBlogPages(id, post?.slug);
  return { success: true };
}

export async function uploadBlogCover(_prev: ActionResult, formData: FormData): Promise<ActionResult & { url?: string }> {
  await guardBlog();
  const file = formData.get("file") as File;
  if (!file || !file.type.startsWith("image/")) return { error: "Please select an image file" };

  const supabase = await createClient();
  const path = `blog/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) return { error: error.message };

  const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
  return { success: true, url: publicUrl };
}
