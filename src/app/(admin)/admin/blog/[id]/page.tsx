import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-form";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("blog");
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (!post) notFound();
  return <BlogPostForm post={post} />;
}
