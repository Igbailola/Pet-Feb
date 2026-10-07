"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createProduct,
  updateProduct,
  addProductImage,
  deleteProductImage,
  setMainImage,
  attachAccessory,
  detachAccessory,
  type ActionResult,
} from "@/app/actions/products";
import { PageHeader, SubmitButton, FormField, DeleteButton, useUnsavedChanges } from "./ui";
import { useToast } from "./toast";
import { Upload, Star, X, LinkIcon, Unlink, ArrowLeft } from "lucide-react";

type ProductImage = { id: string; url: string; alt_text: string; sort_order: number; is_main: boolean };
type Accessory = { id: string; name: string; description?: string; price: number; status: string };
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  status: string;
  in_stock?: boolean;
  specs: Record<string, unknown>;
  product_images: ProductImage[];
};

export function ProductForm({
  product,
  allAccessories,
  attachedIds,
}: {
  product?: Product;
  allAccessories: Accessory[];
  attachedIds: string[];
}) {
  const isEdit = !!product;
  const router = useRouter();
  const { showToast } = useToast();

  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  const action = isEdit ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(action, {});
  const [imgState, imgAction, imgPending] = useActionState<ActionResult, FormData>(addProductImage, {});
  const [attached, setAttached] = useState<string[]>(attachedIds);

  // Image upload preview
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Trigger toasts on action state change
  useEffect(() => {
    if (state.success) {
      showToast(isEdit ? "Product updated successfully" : "Product created successfully", "success");
      setIsDirty(false);
      if (!isEdit) {
        router.push("/admin/products");
      }
    } else if (state.error) {
      showToast(state.error, "error");
    }
  }, [state, isEdit, router, showToast]);

  useEffect(() => {
    if (imgState.success) {
      showToast("Product image uploaded successfully", "success");
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } else if (imgState.error) {
      showToast(imgState.error, "error");
    }
  }, [imgState, showToast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const specsStr = product ? JSON.stringify(product.specs, null, 2) : "{}";

  return (
    <div>
      <PageHeader
        title={isEdit ? `Edit: ${product.name}` : "New product"}
        description={isEdit ? `Slug: ${product.slug}` : "Create a new product listing in your catalog"}
        breadcrumbs={[
          { label: "Products", href: "/admin/products" },
          { label: isEdit ? `Edit: ${product.name}` : "New product" },
        ]}
        action={
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F6B1A] hover:underline"
          >
            <ArrowLeft size={16} /> Back to products
          </Link>
        }
      />

      {/* Main product form */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 mb-6 shadow-sm">
        <form
          action={formAction}
          onChange={() => setIsDirty(true)}
          className="space-y-4"
        >
          {isEdit && <input type="hidden" name="id" value={product.id} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Product Name"
              name="name"
              defaultValue={product?.name}
              required
              placeholder="e.g. 1kVA Starter Solar Kit"
            />
            <FormField
              label="Slug"
              name="slug"
              defaultValue={product?.slug}
              required
              placeholder="e.g. petfeb-1kva-starter-kit"
            />
          </div>

          <FormField
            label="Description"
            name="description"
            type="textarea"
            defaultValue={product?.description}
            placeholder="Detailed description of features, capacity, and use cases…"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              label="Price (₦ NGN)"
              name="price"
              type="number"
              defaultValue={product?.price}
              required
              placeholder="450000"
            />
            <FormField
              label="Category"
              name="category"
              defaultValue={product?.category}
              required
              placeholder="e.g. Solar kits"
            />
            <FormField label="Publish Status" name="status">
              <select
                id="status"
                name="status"
                defaultValue={product?.status ?? "draft"}
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </FormField>

            <FormField label="Availability" name="in_stock">
              <select
                id="in_stock"
                name="in_stock"
                defaultValue={product?.in_stock === false ? "false" : "true"}
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
              >
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
              </select>
            </FormField>
          </div>

          <FormField
            label="Technical Specifications (JSON)"
            name="specs"
            type="textarea"
            defaultValue={specsStr}
            placeholder='{"inverter":"1kVA","battery":"1 x 100Ah","solar_panels":"2 x 200W"}'
          />

          <div className="flex items-center gap-3 pt-3 border-t border-[#F2F2F2]">
            <SubmitButton pending={pending} label={isEdit ? "Save product changes" : "Create product"} />
            <Link
              href="/admin/products"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#5C5C5C] hover:bg-[#F2F2F2] rounded-lg transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Images section (edit mode only) */}
      {isEdit && (
        <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Product Gallery
              </h2>
              <p className="text-xs text-[#767676]">Manage gallery images and choose the main product thumbnail</p>
            </div>
            <span className="text-xs text-[#5C5C5C] font-semibold bg-[#F8F8F8] border border-[#D9D9D9] px-2.5 py-1 rounded-lg">
              {product.product_images.length} image{product.product_images.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Existing images grid */}
          {product.product_images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 mb-6">
              {product.product_images
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((img) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-[#D9D9D9] shadow-xs">
                    <img src={img.url} alt={img.alt_text} className="w-full h-36 object-cover bg-[#F2F2F2]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-2">
                      <button
                        type="button"
                        onClick={async () => {
                          await setMainImage(img.id, product.id);
                          showToast("Updated main thumbnail", "success");
                          router.refresh();
                        }}
                        title={img.is_main ? "Main thumbnail" : "Set as main thumbnail"}
                        className={`p-1.5 rounded-lg ${img.is_main ? "bg-[#F5B82E] text-black" : "bg-white/95 text-[#333] hover:bg-[#F5B82E]"} transition shadow-sm`}
                      >
                        <Star size={15} fill={img.is_main ? "currentColor" : "none"} />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await deleteProductImage(img.id);
                          showToast("Image removed", "success");
                          router.refresh();
                        }}
                        title="Remove image"
                        className="p-1.5 rounded-lg bg-white/95 text-[#B3261E] hover:bg-[#FCE8E6] transition shadow-sm"
                      >
                        <X size={15} />
                      </button>
                    </div>
                    {img.is_main && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#F5B82E] text-black px-2 py-0.5 rounded-md shadow-xs">
                        MAIN
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Upload new image */}
          <div className="bg-[#F8F8F8] rounded-xl p-4 border border-[#E5E5E5]">
            <p className="text-xs font-semibold text-[#333] mb-2">Upload new product image</p>
            <form action={(fd) => { imgAction(fd); }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input type="hidden" name="product_id" value={product.id} />
              <div className="flex-1 w-full sm:w-auto">
                <input
                  ref={fileRef}
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-[#333] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:border file:border-[#D9D9D9] file:text-[#333] hover:file:bg-[#F2F2F2] file:cursor-pointer"
                />
                {preview && (
                  <div className="mt-2.5">
                    <img src={preview} alt="Upload preview" className="w-20 h-20 object-cover rounded-lg border border-[#D9D9D9]" />
                  </div>
                )}
              </div>
              <input type="hidden" name="alt_text" value="" />
              <input type="hidden" name="sort_order" value={product.product_images.length.toString()} />
              <label className="flex items-center gap-2 text-xs font-medium text-[#333] cursor-pointer whitespace-nowrap">
                <input type="checkbox" name="is_main" value="true" className="rounded" />
                Make main photo
              </label>
              <button
                type="submit"
                disabled={imgPending}
                className="inline-flex items-center gap-1.5 bg-[#333] hover:bg-black text-white font-semibold rounded-lg px-4 py-2 text-xs disabled:opacity-50 transition shadow-sm"
              >
                <Upload size={14} /> {imgPending ? "Uploading…" : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Accessories section (edit mode only) */}
      {isEdit && (
        <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Compatible Accessories
              </h2>
              <p className="text-xs text-[#767676]">Link items that customers can add with this product</p>
            </div>
            <span className="text-xs text-[#5C5C5C] font-semibold bg-[#F8F8F8] border border-[#D9D9D9] px-2.5 py-1 rounded-lg">
              {attached.length} attached
            </span>
          </div>

          {/* Currently attached */}
          {attached.length > 0 && (
            <div className="space-y-2 mb-5">
              {attached.map((accId) => {
                const acc = allAccessories.find((a) => a.id === accId);
                if (!acc) return null;
                return (
                  <div key={accId} className="flex items-center justify-between bg-[#F4F9EC] border border-[#C3E49E] rounded-lg px-4 py-2.5">
                    <span className="text-xs sm:text-sm font-semibold text-[#2F5212]">{acc.name}</span>
                    <button
                      type="button"
                      onClick={async () => {
                        await detachAccessory(product.id, accId);
                        setAttached((prev) => prev.filter((id) => id !== accId));
                        showToast(`Detached ${acc.name}`, "info");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#B3261E] hover:underline"
                    >
                      <Unlink size={13} /> Detach
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Available to attach */}
          {allAccessories.filter((a) => !attached.includes(a.id)).length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#767676] mb-2">
                Available accessories in catalog
              </p>
              <div className="space-y-1.5">
                {allAccessories
                  .filter((a) => !attached.includes(a.id))
                  .map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between bg-[#F8F8F8] border border-[#EBEBEB] rounded-lg px-4 py-2">
                      <span className="text-xs text-[#5C5C5C]">{acc.name}</span>
                      <button
                        type="button"
                        onClick={async () => {
                          await attachAccessory(product.id, acc.id);
                          setAttached((prev) => [...prev, acc.id]);
                          showToast(`Attached ${acc.name}`, "success");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline"
                      >
                        <LinkIcon size={13} /> Attach
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
