"use server";

import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { productSchema, accessorySchema, productImageSchema } from "@/schemas/content";
import { logActivity } from "@/lib/activity-log";

async function guardSection(section: "products" | "blog" | "testimonials" | "cms") {
  const user = await requireStaff();
  if (!user.sections.includes(section)) {
    throw new Error(`Forbidden: missing section "${section}"`);
  }
  return user;
}

export type ActionResult = { success?: boolean; error?: string; id?: string };

function revalidateProductPages(productId?: string, slug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/buy-small");
  revalidatePath("/projects");
  revalidatePath("/cart");
  if (slug) {
    revalidatePath(`/shop/${slug}`);
  }
  revalidatePath("/admin/products");
  if (productId) {
    revalidatePath(`/admin/products/${productId}`);
  }
  revalidatePath("/admin");
}

// ─── Products ───────────────────────────────────────────────

export async function createProduct(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await guardSection("products");
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Access denied" };
  }

  const inStockVal = formData.get("in_stock");
  let parsedSpecs: Record<string, unknown> = {};
  const specsRaw = (formData.get("specs") as string)?.trim();
  if (specsRaw) {
    try {
      parsedSpecs = JSON.parse(specsRaw);
      if (typeof parsedSpecs !== "object" || parsedSpecs === null || Array.isArray(parsedSpecs)) {
        return { error: "Technical Specifications must be a JSON object (e.g. {\"inverter\":\"1kVA\"})" };
      }
    } catch {
      return { error: "Invalid JSON format in Technical Specifications" };
    }
  }

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    in_stock: inStockVal === "false" ? false : true,
    specs: parsedSpecs,
  };
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data, error } = await supabase.from("products").insert(parsed.data).select("id").single();
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: parsed.data.status === "published" ? "created and published" : "created",
    entityType: "product",
    entityId: data?.id,
    entityName: parsed.data.name,
  });

  revalidateProductPages(data?.id, parsed.data.slug);
  return { success: true, id: data?.id };
}

export async function updateProduct(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await guardSection("products");
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Access denied" };
  }

  const id = formData.get("id") as string;
  if (!id) return { error: "Missing product ID" };

  const inStockVal = formData.get("in_stock");
  let parsedSpecs: Record<string, unknown> = {};
  const specsRaw = (formData.get("specs") as string)?.trim();
  if (specsRaw) {
    try {
      parsedSpecs = JSON.parse(specsRaw);
      if (typeof parsedSpecs !== "object" || parsedSpecs === null || Array.isArray(parsedSpecs)) {
        return { error: "Technical Specifications must be a JSON object (e.g. {\"inverter\":\"1kVA\"})" };
      }
    } catch {
      return { error: "Invalid JSON format in Technical Specifications" };
    }
  }

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    in_stock: inStockVal === "false" ? false : true,
    specs: parsedSpecs,
  };
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data: existing } = await supabase.from("products").select("status, in_stock, name").eq("id", id).single();

  const { error } = await supabase.from("products").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  let action = "updated";
  if (existing) {
    if (existing.status !== parsed.data.status) {
      action = parsed.data.status === "published" ? "published" : "unpublished";
    } else if (existing.in_stock !== parsed.data.in_stock) {
      action = parsed.data.in_stock ? "marked in stock" : "marked out of stock";
    }
  }

  await logActivity({
    userId: user.id,
    section: "products",
    action,
    entityType: "product",
    entityId: id,
    entityName: parsed.data.name,
  });

  revalidateProductPages(id, parsed.data.slug);
  return { success: true };
}

export async function toggleProductStock(id: string, inStock: boolean): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { data: prod } = await supabase.from("products").select("name, slug").eq("id", id).single();
  const prodName = prod?.name ?? "Product";

  const { error } = await supabase.from("products").update({ in_stock: inStock }).eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: inStock ? "marked in stock" : "marked out of stock",
    entityType: "product",
    entityId: id,
    entityName: prodName,
  });

  revalidateProductPages(id, prod?.slug);
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { data: prod } = await supabase.from("products").select("name, slug").eq("id", id).single();
  const prodName = prod?.name ?? "Product";

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: "deleted",
    entityType: "product",
    entityId: id,
    entityName: prodName,
  });

  revalidateProductPages(id, prod?.slug);
  return { success: true };
}

// ─── Product images ─────────────────────────────────────────

export async function addProductImage(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  let user;
  try {
    user = await guardSection("products");
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Access denied" };
  }

  const productId = formData.get("product_id") as string;
  if (!productId) return { error: "Missing product ID" };

  // Support both "files" (multiple) and "file" (single)
  const filesList = formData.getAll("files") as File[];
  const fileSingles = formData.getAll("file") as File[];
  const rawFiles = filesList.length > 0 ? filesList : fileSingles;
  const validFiles = rawFiles.filter((f) => f && typeof f === "object" && f.size > 0 && f.type.startsWith("image/"));

  if (validFiles.length === 0) {
    return { error: "Please select at least one valid image file (JPG, PNG, WebP)" };
  }

  const supabase = await createClient();
  const { data: prod } = await supabase.from("products").select("name, slug").eq("id", productId).single();

  const isMain = formData.get("is_main") === "true";
  let baseSortOrder = Number(formData.get("sort_order") || "0");
  let uploadedCount = 0;

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `products/${productId}/${Date.now()}-${i}-${safeName}`;
    const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
    if (uploadErr) {
      if (uploadedCount === 0) return { error: uploadErr.message };
      break;
    }

    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);

    const makeThisMain = isMain && i === 0;
    if (makeThisMain) {
      await supabase.from("product_images").update({ is_main: false }).eq("product_id", productId).eq("is_main", true);
    }

    const imgData = {
      product_id: productId,
      url: publicUrl,
      alt_text: (formData.get("alt_text") as string) || file.name,
      sort_order: baseSortOrder + i,
      is_main: makeThisMain,
    };
    const parsed = productImageSchema.safeParse(imgData);
    if (!parsed.success) {
      if (uploadedCount === 0) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };
      break;
    }

    const { data: inserted, error: insertErr } = await supabase.from("product_images").insert(parsed.data).select("id").single();
    if (insertErr) {
      if (uploadedCount === 0) return { error: insertErr.message };
      break;
    }

    uploadedCount++;
    await logActivity({
      userId: user.id,
      section: "products",
      action: "uploaded image",
      entityType: "product_image",
      entityId: inserted?.id,
      entityName: `${prod?.name ?? "Product"} image`,
    });
  }

  revalidateProductPages(productId, prod?.slug);
  return { success: true };
}

export const uploadProductImages = addProductImage;

export async function deleteProductImage(id: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { data: img } = await supabase.from("product_images").select("product_id").eq("id", id).single();
  const { error } = await supabase.from("product_images").delete().eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: "deleted image",
    entityType: "product_image",
    entityId: id,
    entityName: "Product image",
  });

  revalidateProductPages(img?.product_id);
  return { success: true };
}

export async function setMainImage(imageId: string, productId: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  await supabase.from("product_images").update({ is_main: false }).eq("product_id", productId).eq("is_main", true);
  const { error } = await supabase.from("product_images").update({ is_main: true }).eq("id", imageId);
  if (error) return { error: error.message };

  const { data: prod } = await supabase.from("products").select("name, slug").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "set main image",
    entityType: "product_image",
    entityId: imageId,
    entityName: `${prod?.name ?? "Product"} image`,
  });

  revalidateProductPages(productId, prod?.slug);
  return { success: true };
}

// ─── Accessories ────────────────────────────────────────────

export async function createAccessory(_prev: ActionResult, formData: FormData): Promise<ActionResult & { accessory?: any }> {
  const user = await guardSection("products");
  const supabase = await createClient();

  let imageUrl = (formData.get("image_url") as string) || undefined;
  const imageFile = formData.get("image_file") as File | null;

  if (imageFile && imageFile.size > 0 && typeof imageFile.name === "string") {
    const ext = imageFile.name.split(".").pop() || "jpg";
    const path = `accessories/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("media").upload(path, imageFile, {
      contentType: imageFile.type,
      upsert: true,
    });
    if (!uploadErr) {
      const { data: pubUrl } = supabase.storage.from("media").getPublicUrl(path);
      imageUrl = pubUrl.publicUrl;
    }
  }

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    price: Number(formData.get("price")),
    image_url: imageUrl,
    status: (formData.get("status") as string) || "published",
  };
  const parsed = accessorySchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const { data, error } = await supabase.from("accessories").insert(parsed.data).select("*").single();
  if (error) return { error: error.message };

  const attachToProductId = formData.get("attach_to_product_id") as string | null;
  if (attachToProductId) {
    await supabase.from("product_accessories").insert({ product_id: attachToProductId, accessory_id: data.id });
  }

  await logActivity({
    userId: user.id,
    section: "products",
    action: parsed.data.status === "published" ? "created and published" : "created",
    entityType: "accessory",
    entityId: data?.id,
    entityName: parsed.data.name,
  });

  revalidateProductPages(attachToProductId || undefined);
  return { success: true, accessory: data };
}

export async function updateAccessory(_prev: ActionResult, formData: FormData): Promise<ActionResult & { accessory?: any }> {
  const user = await guardSection("products");
  const id = formData.get("id") as string;
  const supabase = await createClient();

  let imageUrl = (formData.get("image_url") as string) || undefined;
  const imageFile = formData.get("image_file") as File | null;

  if (imageFile && imageFile.size > 0 && typeof imageFile.name === "string") {
    const ext = imageFile.name.split(".").pop() || "jpg";
    const path = `accessories/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("media").upload(path, imageFile, {
      contentType: imageFile.type,
      upsert: true,
    });
    if (!uploadErr) {
      const { data: pubUrl } = supabase.storage.from("media").getPublicUrl(path);
      imageUrl = pubUrl.publicUrl;
    }
  }

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    price: Number(formData.get("price")),
    image_url: imageUrl,
    status: (formData.get("status") as string) || "published",
  };
  const parsed = accessorySchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const { data, error } = await supabase.from("accessories").update(parsed.data).eq("id", id).select("*").single();
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: parsed.data.status === "published" ? "published" : "updated",
    entityType: "accessory",
    entityId: id,
    entityName: parsed.data.name,
  });

  revalidateProductPages();
  return { success: true, accessory: data };
}

export async function deleteAccessory(id: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { data: acc } = await supabase.from("accessories").select("name").eq("id", id).single();
  const accName = acc?.name ?? "Accessory";

  const { error } = await supabase.from("accessories").delete().eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: "deleted",
    entityType: "accessory",
    entityId: id,
    entityName: accName,
  });

  revalidateProductPages();
  return { success: true };
}

export async function attachAccessory(productId: string, accessoryId: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { error } = await supabase.from("product_accessories").insert({ product_id: productId, accessory_id: accessoryId });
  if (error) return { error: error.message };

  const { data: acc } = await supabase.from("accessories").select("name").eq("id", accessoryId).single();
  const { data: prod } = await supabase.from("products").select("name, slug").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "attached accessory",
    entityType: "accessory",
    entityId: accessoryId,
    entityName: `${acc?.name ?? "Accessory"} to ${prod?.name ?? "Product"}`,
  });

  revalidateProductPages(productId, prod?.slug);
  return { success: true };
}

export async function detachAccessory(productId: string, accessoryId: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { error } = await supabase.from("product_accessories").delete().eq("product_id", productId).eq("accessory_id", accessoryId);
  if (error) return { error: error.message };

  const { data: acc } = await supabase.from("accessories").select("name").eq("id", accessoryId).single();
  const { data: prod } = await supabase.from("products").select("name, slug").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "detached accessory",
    entityType: "accessory",
    entityId: accessoryId,
    entityName: `${acc?.name ?? "Accessory"} from ${prod?.name ?? "Product"}`,
  });

  revalidateProductPages(productId, prod?.slug);
  return { success: true };
}
