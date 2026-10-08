"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial, uploadTestimonialPhoto, type ActionResult } from "@/app/actions/testimonials";
import { PageHeader, SubmitButton, FormField, useUnsavedChanges } from "./ui";
import { useToast } from "./toast";
import { Upload, ArrowLeft, CheckCircle2 } from "lucide-react";

type Testimonial = {
  id: string;
  author_name: string;
  author_role: string | null;
  message: string;
  photo_url: string | null;
  status: string;
};

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const isEdit = !!testimonial;
  const router = useRouter();
  const { showToast } = useToast();

  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  const action = isEdit ? updateTestimonial : createTestimonial;
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(action, {});
  const [statusVal, setStatusVal] = useState<"published" | "hidden">(testimonial?.status === "published" ? "published" : "hidden");
  const [photoUrl, setPhotoUrl] = useState(testimonial?.photo_url ?? "");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) {
      showToast(isEdit ? "Testimonial updated successfully" : "Testimonial created successfully", "success");
      setIsDirty(false);
      if (!isEdit) {
        router.push("/admin/testimonials");
      } else {
        router.refresh();
      }
    } else if (state.error) {
      showToast(state.error, "error");
    }
  }, [state, isEdit, router, showToast]);

  const handlePhotoUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadTestimonialPhoto({}, fd);
    setUploading(false);
    if (result.error) {
      showToast(result.error, "error");
    } else if (result.url) {
      setPhotoUrl(result.url);
      setPreview(null);
      setIsDirty(true);
      showToast("Author photo uploaded successfully", "success");
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? `Edit: ${testimonial.author_name}` : "New testimonial"}
        description={isEdit ? "Update client review" : "Add customer testimonial to display on the site"}
        breadcrumbs={[
          { label: "Testimonials", href: "/admin/testimonials" },
          { label: isEdit ? `Edit: ${testimonial.author_name}` : "New testimonial" },
        ]}
        action={
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F6B1A] hover:underline"
          >
            <ArrowLeft size={16} /> Back to testimonials
          </Link>
        }
      />

      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 mb-6 shadow-sm">
        <form
          action={formAction}
          onChange={() => setIsDirty(true)}
          className="space-y-4"
        >
          {isEdit && <input type="hidden" name="id" value={testimonial.id} />}
          <input type="hidden" name="photo_url" value={photoUrl} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Author Name"
              name="author_name"
              defaultValue={testimonial?.author_name}
              required
              placeholder="e.g. Chioma Adeyemi"
            />
            <FormField
              label="Role or Location"
              name="author_role"
              defaultValue={testimonial?.author_role ?? ""}
              placeholder="e.g. Homeowner, Lekki Phase 1"
            />
          </div>

          <FormField
            label="Testimonial Message"
            name="message"
            type="textarea"
            defaultValue={testimonial?.message}
            required
            placeholder="What the customer said about Petfeb products and solar installation…"
          />

          <FormField label="Display Status" name="status">
            <select
              id="status"
              name="status"
              value={statusVal}
              onChange={(e) => setStatusVal(e.target.value as "published" | "hidden")}
              className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
            >
              <option value="hidden">Hidden / Draft</option>
              <option value="published">Published</option>
            </select>
          </FormField>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#F2F2F2]">
            <button
              type="submit"
              onClick={() => setStatusVal("published")}
              disabled={pending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 size={16} />
              <span>{isEdit ? "Publish Changes" : "Publish Testimonial"}</span>
            </button>
            <button
              type="submit"
              onClick={() => setStatusVal("hidden")}
              disabled={pending}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-[#D9D9D9] text-[#333] hover:bg-[#F2F2F2] transition cursor-pointer disabled:opacity-50"
            >
              <span>Save as Hidden</span>
            </button>
            <Link
              href="/admin/testimonials"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#5C5C5C] hover:bg-[#F2F2F2] rounded-lg transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Photo upload */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 shadow-sm">
        <h2 className="text-lg font-bold text-black mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Author Photo (Optional)
        </h2>
        <p className="text-xs text-[#767676] mb-4">Upload an avatar or headshot of the client</p>

        {photoUrl && (
          <div className="mb-4">
            <img
              src={photoUrl}
              alt="Author preview"
              className="w-20 h-20 rounded-full object-cover border border-[#D9D9D9]"
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
            <img src={preview} alt="New photo preview" className="w-12 h-12 object-cover rounded-full border border-[#D9D9D9]" />
          )}
          <button
            type="button"
            onClick={handlePhotoUpload}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 bg-[#333] hover:bg-black text-white font-semibold rounded-lg px-4 py-2 text-xs disabled:opacity-50 transition shadow-sm"
          >
            <Upload size={14} /> {uploading ? "Uploading…" : "Upload photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
