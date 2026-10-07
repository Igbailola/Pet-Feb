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

export type ActionResult = { success?: boolean; error?: string };

// ─── Products ───────────────────────────────────────────────

export async function createProduct(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardSection("products");
  const inStockVal = formData.get("in_stock");
  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    in_stock: inStockVal === "false" ? false : true,
    specs: JSON.parse((formData.get("specs") as string) || "{}"),
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

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProduct(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardSection("products");
  const id = formData.get("id") as string;
  const inStockVal = formData.get("in_stock");
  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    in_stock: inStockVal === "false" ? false : true,
    specs: JSON.parse((formData.get("specs") as string) || "{}"),
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

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleProductStock(id: string, inStock: boolean): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { data: prod } = await supabase.from("products").select("name").eq("id", id).single();
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

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { data: prod } = await supabase.from("products").select("name").eq("id", id).single();
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

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  return { success: true };
}

// ─── Product images ─────────────────────────────────────────

export async function addProductImage(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardSection("products");
  const productId = formData.get("product_id") as string;
  const file = formData.get("file") as File;
  if (!file || !file.type.startsWith("image/")) return { error: "Please select an image file" };

  const supabase = await createClient();
  const path = `products/${productId}/${Date.now()}-${file.name}`;
  const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
  if (uploadErr) return { error: uploadErr.message };

  const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);

  const isMain = formData.get("is_main") === "true";
  if (isMain) {
    await supabase.from("product_images").update({ is_main: false }).eq("product_id", productId).eq("is_main", true);
  }

  const imgData = {
    product_id: productId,
    url: publicUrl,
    alt_text: (formData.get("alt_text") as string) || file.name,
    sort_order: Number(formData.get("sort_order") || "0"),
    is_main: isMain,
  };
  const parsed = productImageSchema.safeParse(imgData);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const { data: inserted, error } = await supabase.from("product_images").insert(parsed.data).select("id").single();
  if (error) return { error: error.message };

  const { data: prod } = await supabase.from("products").select("name").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "uploaded image",
    entityType: "product_image",
    entityId: inserted?.id,
    entityName: `${prod?.name ?? "Product"} image`,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function deleteProductImage(id: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
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

  revalidatePath("/admin/products");
  return { success: true };
}

export async function setMainImage(imageId: string, productId: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  await supabase.from("product_images").update({ is_main: false }).eq("product_id", productId).eq("is_main", true);
  const { error } = await supabase.from("product_images").update({ is_main: true }).eq("id", imageId);
  if (error) return { error: error.message };

  const { data: prod } = await supabase.from("products").select("name").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "set main image",
    entityType: "product_image",
    entityId: imageId,
    entityName: `${prod?.name ?? "Product"} image`,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

// ─── Accessories ────────────────────────────────────────────

export async function createAccessory(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardSection("products");
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    status: formData.get("status") as string,
  };
  const parsed = accessorySchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { data, error } = await supabase.from("accessories").insert(parsed.data).select("id").single();
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: parsed.data.status === "published" ? "created and published" : "created",
    entityType: "accessory",
    entityId: data?.id,
    entityName: parsed.data.name,
  });

  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateAccessory(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardSection("products");
  const id = formData.get("id") as string;
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    status: formData.get("status") as string,
  };
  const parsed = accessorySchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((e: {message: string}) => e.message).join(", ") };

  const supabase = await createClient();
  const { error } = await supabase.from("accessories").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "products",
    action: parsed.data.status === "published" ? "published" : "updated",
    entityType: "accessory",
    entityId: id,
    entityName: parsed.data.name,
  });

  revalidatePath("/admin/products");
  return { success: true };
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

  revalidatePath("/admin/products");
  return { success: true };
}

export async function attachAccessory(productId: string, accessoryId: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { error } = await supabase.from("product_accessories").insert({ product_id: productId, accessory_id: accessoryId });
  if (error) return { error: error.message };

  const { data: acc } = await supabase.from("accessories").select("name").eq("id", accessoryId).single();
  const { data: prod } = await supabase.from("products").select("name").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "attached accessory",
    entityType: "accessory",
    entityId: accessoryId,
    entityName: `${acc?.name ?? "Accessory"} to ${prod?.name ?? "Product"}`,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function detachAccessory(productId: string, accessoryId: string): Promise<ActionResult> {
  const user = await guardSection("products");
  const supabase = await createClient();
  const { error } = await supabase.from("product_accessories").delete().eq("product_id", productId).eq("accessory_id", accessoryId);
  if (error) return { error: error.message };

  const { data: acc } = await supabase.from("accessories").select("name").eq("id", accessoryId).single();
  const { data: prod } = await supabase.from("products").select("name").eq("id", productId).single();

  await logActivity({
    userId: user.id,
    section: "products",
    action: "detached accessory",
    entityType: "accessory",
    entityId: accessoryId,
    entityName: `${acc?.name ?? "Accessory"} from ${prod?.name ?? "Product"}`,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}
