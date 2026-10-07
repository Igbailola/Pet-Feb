import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { BlogList } from "@/components/admin/blog-list";

export default async function BlogPage() {
  await requireSection("blog");
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <BlogList posts={posts ?? []} />;
}
