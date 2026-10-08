"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost, uploadBlogCover, type ActionResult } from "@/app/actions/blog";
import { PageHeader, SubmitButton, FormField, useUnsavedChanges } from "./ui";
import { useToast } from "./toast";
import { Upload, ArrowLeft, CheckCircle2 } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  body: string;
  category: string | null;
  status: string;
  published_at: string | null;
};

export function BlogPostForm({ post }: { post?: Post }) {
  const isEdit = !!post;
  const router = useRouter();
  const { showToast } = useToast();

  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  const action = isEdit ? updateBlogPost : createBlogPost;
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(action, {});
  const [statusVal, setStatusVal] = useState<"draft" | "published">(post?.status === "published" ? "published" : "draft");
  const [coverUrl, setCoverUrl] = useState(post?.cover_image ?? "");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) {
      showToast(isEdit ? "Blog post updated successfully" : "Blog post created successfully", "success");
      setIsDirty(false);
      if (!isEdit) {
        router.push("/admin/blog");
      } else {
        router.refresh();
      }
    } else if (state.error) {
      showToast(state.error, "error");
    }
  }, [state, isEdit, router, showToast]);

  const handleCoverUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadBlogCover({}, fd);
    setUploading(false);
    if (result.error) {
      showToast(result.error, "error");
    } else if (result.url) {
      setCoverUrl(result.url);
      setPreview(null);
      setIsDirty(true);
      showToast("Cover image uploaded successfully", "success");
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? `Edit: ${post.title}` : "New blog post"}
        description={isEdit ? `Slug: ${post.slug}` : "Draft or publish an informational article"}
        breadcrumbs={[
          { label: "Blog", href: "/admin/blog" },
          { label: isEdit ? `Edit: ${post.title}` : "New blog post" },
        ]}
        action={
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F6B1A] hover:underline"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>
        }
      />

      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 mb-6 shadow-sm">
        <form
          action={formAction}
          onChange={() => setIsDirty(true)}
          className="space-y-4"
        >
          {isEdit && <input type="hidden" name="id" value={post.id} />}
          <input type="hidden" name="cover_image" value={coverUrl} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Article Title"
              name="title"
              defaultValue={post?.title}
              required
              placeholder="e.g. How to size a home solar system in Nigeria"
            />
            <FormField
              label="URL Slug"
              name="slug"
              defaultValue={post?.slug}
              required
              placeholder="e.g. how-to-size-solar-system"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Category"
              name="category"
              defaultValue={post?.category ?? ""}
              placeholder="e.g. Solar Guides"
            />
            <FormField label="Status" name="status">
              <select
                id="status"
                name="status"
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value as "draft" | "published")}
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </FormField>
            <FormField
              label="Publish Date"
              name="published_at"
              type="datetime-local"
              defaultValue={post?.published_at ? post.published_at.slice(0, 16) : ""}
            />
          </div>

          <FormField
            label="Article Body"
            name="body"
            type="textarea"
            defaultValue={post?.body}
            placeholder="Write your article content here…"
          />

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#F2F2F2]">
            <button
              type="submit"
              onClick={() => setStatusVal("published")}
              disabled={pending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 size={16} />
              <span>{isEdit ? "Publish Changes" : "Publish Blog Post"}</span>
            </button>
            <button
              type="submit"
              onClick={() => setStatusVal("draft")}
              disabled={pending}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-[#D9D9D9] text-[#333] hover:bg-[#F2F2F2] transition cursor-pointer disabled:opacity-50"
            >
              <span>Save as Draft</span>
            </button>
            <Link
              href="/admin/blog"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#5C5C5C] hover:bg-[#F2F2F2] rounded-lg transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Cover image upload */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 shadow-sm">
        <h2 className="text-lg font-bold text-black mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Cover Image
        </h2>
        <p className="text-xs text-[#767676] mb-4">Upload a feature banner for the post</p>

        {coverUrl && (
          <div className="mb-4">
            <img
              src={coverUrl}
              alt="Cover preview"
              className="w-full max-w-md h-48 object-cover rounded-xl border border-[#D9D9D9]"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#F8F8F8] p-4 rounded-xl border border-[#E5E5E5]">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f && f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
            }}
            className="block w-full sm:w-auto text-xs text-[#333] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:border file:border-[#D9D9D9] file:text-[#333] hover:file:bg-[#F2F2F2] file:cursor-pointer"
          />
          {preview && (
            <img src={preview} alt="New cover preview" className="w-16 h-16 object-cover rounded-lg border border-[#D9D9D9]" />
          )}
          <button
            type="button"
            onClick={handleCoverUpload}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 bg-[#333] hover:bg-black text-white font-semibold rounded-lg px-4 py-2 text-xs disabled:opacity-50 transition shadow-sm"
          >
            <Upload size={14} /> {uploading ? "Uploading…" : "Upload cover"}
          </button>
        </div>
      </div>
    </div>
  );
}
