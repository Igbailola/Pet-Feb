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
  createAccessory,
  updateAccessory,
  deleteAccessory,
  type ActionResult,
} from "@/app/actions/products";
import { PageHeader, SubmitButton, FormField, DeleteButton, useUnsavedChanges } from "./ui";
import { useToast } from "./toast";
import { Select } from "@/components/ui/select";
import { Upload, Star, X, LinkIcon, Unlink, ArrowLeft, Plus, CheckCircle2, ImageIcon, Loader2 } from "lucide-react";

type ProductImage = { id: string; url: string; alt_text: string; sort_order: number; is_main: boolean };
type Accessory = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  status: string;
};
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
  const [accessoriesList, setAccessoriesList] = useState<Accessory[]>(allAccessories);
  const [statusVal, setStatusVal] = useState<"draft" | "published">(product?.status === "published" ? "published" : "draft");

  // Accessory creation modal state
  const [showAddAccModal, setShowAddAccModal] = useState(false);
  const [accName, setAccName] = useState("");
  const [accPrice, setAccPrice] = useState("");
  const [accDesc, setAccDesc] = useState("");
  const [accStatus, setAccStatus] = useState<"published" | "draft">("published");
  const [accImageFile, setAccImageFile] = useState<File | null>(null);
  const [accImagePreview, setAccImagePreview] = useState<string | null>(null);
  const [isSavingAcc, setIsSavingAcc] = useState(false);
  const accFileRef = useRef<HTMLInputElement>(null);

  // Image upload previews
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  // Files staged before the product exists (create mode); uploaded right after creation
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const makeMainRef = useRef<HTMLInputElement>(null);

  // Trigger toasts on action state change
  useEffect(() => {
    if (state.success) {
      showToast(isEdit ? "Product updated successfully" : "Product created successfully", "success");
      setIsDirty(false);
      if (!isEdit) {
        (async () => {
          if (state.id && stagedFiles.length > 0) {
            const fd = new FormData();
            stagedFiles.forEach((f) => fd.append("files", f));
            fd.append("product_id", state.id);
            fd.append("alt_text", "");
            fd.append("sort_order", "0");
            if (makeMainRef.current?.checked) fd.append("is_main", "true");
            const res = await addProductImage({}, fd);
            if (res.error) {
              showToast(`Product created, but image upload failed: ${res.error}`, "error");
            } else {
              showToast(
                `${stagedFiles.length} product image${stagedFiles.length > 1 ? "s" : ""} uploaded`,
                "success"
              );
            }
          }
          router.push("/admin/products");
        })();
      } else {
        router.refresh();
      }
    } else if (state.error) {
      showToast(state.error, "error");
    }
  }, [state, isEdit, router, showToast, stagedFiles]);

  useEffect(() => {
    if (imgState.success) {
      showToast("Product image(s) uploaded successfully", "success");
      setPreviews([]);
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } else if (imgState.error) {
      showToast(imgState.error, "error");
    }
  }, [imgState, router, showToast]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
    if (files.length > 0) {
      setStagedFiles(files);
      setPreviews(files.map((f) => URL.createObjectURL(f)));
    } else {
      setStagedFiles([]);
      setPreviews([]);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const imageControls = (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 w-full">
          <input
            ref={fileRef}
            type="file"
            name="files"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="block w-full text-xs text-[#333] file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white file:border file:border-[#D9D9D9] file:text-[#333] hover:file:bg-[#F2F2F2] file:cursor-pointer"
          />
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-[#333] cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            name="is_main"
            value="true"
            ref={isEdit ? undefined : makeMainRef}
            className="rounded text-[#7BB042] focus:ring-[#7BB042]"
          />
          Make primary thumbnail
        </label>
        <button
          type="submit"
          form={isEdit ? undefined : "product-form"}
          disabled={isEdit ? imgPending || previews.length === 0 : pending || stagedFiles.length === 0}
          className="inline-flex items-center gap-1.5 bg-[#333] hover:bg-black text-white font-semibold rounded-xl px-5 py-2.5 text-xs disabled:opacity-50 transition shadow-sm whitespace-nowrap"
        >
          <Upload size={14} />{" "}
          {isEdit
            ? imgPending
              ? "Uploading…"
              : `Upload ${previews.length > 1 ? `${previews.length} photos` : "photo"}`
            : pending
              ? "Saving…"
              : stagedFiles.length > 1
                ? `Upload ${stagedFiles.length} photos`
                : "Upload photo"}
        </button>
      </div>

      {/* Multi-image preview grid */}
      {previews.length > 0 && (
        <div className="pt-2 border-t border-[#E5E5E5]/60 flex flex-wrap gap-2.5">
          {previews.map((src, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-[#D9D9D9] bg-white">
              <img src={src} alt={`Preview ${i + 1}`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
              <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] px-1 font-bold">
                #{i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {!isEdit && (
        <p className="text-[11px] text-[#767676]">
          Selected images are uploaded automatically right after the product is created.
        </p>
      )}
    </>
  );

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
          id="product-form"
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
              <Select
                id="status"
                name="status"
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value as "draft" | "published")}
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </FormField>

            <FormField label="Availability" name="in_stock">
              <Select
                id="in_stock"
                name="in_stock"
                defaultValue={product?.in_stock === false ? "false" : "true"}
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
              >
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
              </Select>
            </FormField>
          </div>

          <FormField
            label="Technical Specifications (JSON)"
            name="specs"
            type="textarea"
            defaultValue={specsStr}
            placeholder='{"inverter":"1kVA","battery":"1 x 100Ah","solar_panels":"2 x 200W"}'
          />

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#F2F2F2]">
            <button
              type="submit"
              onClick={() => setStatusVal("published")}
              disabled={pending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 size={16} />
              <span>{isEdit ? "Publish Product Changes" : "Publish Product"}</span>
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
              href="/admin/products"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#5C5C5C] hover:bg-[#F2F2F2] rounded-lg transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Images section (edit mode only) */}
      {/* Images section */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Product Gallery
            </h2>
            <p className="text-xs text-[#767676]">
              {isEdit
                ? "Manage gallery images and choose the main product thumbnail"
                : "Choose images now — they upload right after the product is created"}
            </p>
          </div>
          <span className="text-xs text-[#5C5C5C] font-semibold bg-[#F8F8F8] border border-[#D9D9D9] px-2.5 py-1 rounded-lg">
            {(isEdit ? product.product_images.length : stagedFiles.length)} image
            {(isEdit ? product.product_images.length : stagedFiles.length) !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Existing images grid */}
        {isEdit && product.product_images.length > 0 && (
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

          {/* Upload new images (supports multiple) */}
          <div className="bg-[#F8F8F8] rounded-xl p-4 sm:p-5 border border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[#333]">Upload product images</p>
              {previews.length > 0 && (
                <span className="text-[11px] font-semibold text-[#2F5212] bg-[#E8F3DA] px-2 py-0.5 rounded-full">
                  {previews.length} photo{previews.length > 1 ? "s" : ""} selected
                </span>
              )}
            </div>
            {isEdit ? (
              <form action={(fd) => { imgAction(fd); }} className="space-y-3">
                <input type="hidden" name="product_id" value={product.id} />
                <input type="hidden" name="alt_text" value="" />
                <input type="hidden" name="sort_order" value={product.product_images.length.toString()} />
                {imageControls}
              </form>
            ) : (
              <div className="space-y-3">{imageControls}</div>
            )}
          </div>
      </div>

      {/* Accessories section (edit mode only) */}
      {isEdit && (
        <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F2F2F2]">
            <div>
              <h2 className="text-lg font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Compatible Accessories
              </h2>
              <p className="text-xs text-[#767676]">Add and link accessories with images and specifications</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5C5C5C] font-semibold bg-[#F8F8F8] border border-[#D9D9D9] px-2.5 py-1 rounded-lg">
                {attached.length} attached
              </span>
              <button
                type="button"
                onClick={() => setShowAddAccModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-2xs cursor-pointer"
              >
                <Plus size={14} /> Add Accessory
              </button>
            </div>
          </div>

          {/* New Accessory Modal / Dialog */}
          {showAddAccModal && (
            <div className="mb-6 p-5 bg-[#F9FAFB] rounded-xl border border-[#7BB042] shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Create New Compatible Accessory
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddAccModal(false)}
                  className="p-1 text-[#767676] hover:text-black rounded"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1">Accessory Name *</label>
                  <input
                    type="text"
                    value={accName}
                    onChange={(e) => setAccName(e.target.value)}
                    placeholder="e.g. Heavy Duty Battery Rack (4-Tier)"
                    className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2 text-xs text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1">Price (₦ NGN) *</label>
                  <input
                    type="number"
                    value={accPrice}
                    onChange={(e) => setAccPrice(e.target.value)}
                    placeholder="e.g. 45000"
                    className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2 text-xs text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#333] mb-1">Description / Details</label>
                <textarea
                  value={accDesc}
                  onChange={(e) => setAccDesc(e.target.value)}
                  placeholder="e.g. Powder-coated steel rack compatible with 100Ah-220Ah tubular or lithium batteries."
                  rows={2}
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2 text-xs text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1">Accessory Image</label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={accFileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setAccImageFile(file);
                          setAccImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#E8F3DA] file:text-[#2F5212] hover:file:bg-[#D2E8B5]"
                    />
                    {accImagePreview && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                        <img src={accImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1">Publish Status</label>
                  <Select
                    value={accStatus}
                    onChange={(e) => setAccStatus(e.target.value as "published" | "draft")}
                    className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2 text-xs text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddAccModal(false)}
                  className="px-3 py-1.5 text-xs text-[#5C5C5C] hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSavingAcc || !accName.trim() || !accPrice.trim()}
                  onClick={async () => {
                    setIsSavingAcc(true);
                    try {
                      const fd = new FormData();
                      fd.append("name", accName.trim());
                      fd.append("price", accPrice.trim());
                      if (accDesc.trim()) fd.append("description", accDesc.trim());
                      fd.append("status", accStatus);
                      if (accImageFile) fd.append("image_file", accImageFile);
                      fd.append("attach_to_product_id", product.id);

                      const res = await createAccessory({}, fd);
                      if (res.error) {
                        showToast(res.error, "error");
                      } else {
                        showToast("Compatible accessory created and attached", "success");
                        if (res.accessory) {
                          setAccessoriesList((prev) => [res.accessory, ...prev]);
                          setAttached((prev) => [...prev, res.accessory.id]);
                        }
                        setShowAddAccModal(false);
                        setAccName("");
                        setAccPrice("");
                        setAccDesc("");
                        setAccImageFile(null);
                        setAccImagePreview(null);
                      }
                    } catch (err: any) {
                      showToast(err.message || "Failed to create accessory", "error");
                    } finally {
                      setIsSavingAcc(false);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition disabled:opacity-50"
                >
                  {isSavingAcc ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
                  <span>Save & Attach Accessory</span>
                </button>
              </div>
            </div>
          )}

          {/* Currently attached */}
          {attached.length > 0 ? (
            <div className="space-y-2 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#767676] mb-2">
                Attached to this product ({attached.length})
              </p>
              {attached.map((accId) => {
                const acc = accessoriesList.find((a) => a.id === accId);
                if (!acc) return null;
                return (
                  <div
                    key={accId}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4F9EC] border border-[#C3E49E] rounded-xl p-3 sm:px-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#C3E49E] flex items-center justify-center shrink-0 overflow-hidden">
                        {acc.image_url ? (
                          <img src={acc.image_url} alt={acc.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={18} className="text-[#7BB042]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#2F5212] truncate">{acc.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#2F5212] border border-[#C3E49E]">
                            ₦{Number(acc.price).toLocaleString()}
                          </span>
                        </div>
                        {acc.description && (
                          <p className="text-[11px] text-[#557B2F] line-clamp-1">{acc.description}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        await detachAccessory(product.id, accId);
                        setAttached((prev) => prev.filter((id) => id !== accId));
                        showToast(`Detached ${acc.name}`, "info");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#B3261E] hover:underline shrink-0"
                    >
                      <Unlink size={13} /> Detach
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-[#767676] bg-[#F9FAFB] rounded-xl border border-dashed border-[#D9D9D9] mb-6">
              No compatible accessories currently attached to this product.
            </div>
          )}

          {/* Available to attach from catalog */}
          {accessoriesList.filter((a) => !attached.includes(a.id)).length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#767676] mb-2">
                Available accessories in catalog ({accessoriesList.filter((a) => !attached.includes(a.id)).length})
              </p>
              <div className="space-y-2">
                {accessoriesList
                  .filter((a) => !attached.includes(a.id))
                  .map((acc) => (
                    <div
                      key={acc.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8F8F8] border border-[#EBEBEB] rounded-xl p-3 sm:px-4 hover:border-[#D9D9D9] transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0 overflow-hidden">
                          {acc.image_url ? (
                            <img src={acc.image_url} alt={acc.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={18} className="text-[#9CA3AF]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-[#333] truncate">{acc.name}</span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white text-[#5C5C5C] border border-[#E5E7EB]">
                              ₦{Number(acc.price).toLocaleString()}
                            </span>
                          </div>
                          {acc.description && (
                            <p className="text-[11px] text-[#767676] line-clamp-1">{acc.description}</p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          await attachAccessory(product.id, acc.id);
                          setAttached((prev) => [...prev, acc.id]);
                          showToast(`Attached ${acc.name}`, "success");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline shrink-0"
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
