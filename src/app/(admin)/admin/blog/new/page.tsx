import { requireSection } from "@/lib/require-section";
import { BlogPostForm } from "@/components/admin/blog-form";

export default async function NewBlogPostPage() {
  await requireSection("blog");
  return <BlogPostForm />;
}
