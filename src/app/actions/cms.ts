"use server";

import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-log";

async function guardCms() {
  const user = await requireStaff();
  if (!user.sections.includes("cms")) throw new Error("Forbidden: missing section cms");
  return user;
}

export type ActionResult = { success?: boolean; error?: string };

export async function updateSiteContent(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardCms();
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;

  try {
    JSON.parse(value);
  } catch {
    return { error: "Value must be valid JSON" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .update({ value: JSON.parse(value) })
    .eq("key", key);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "cms",
    action: "updated",
    entityType: "site_content",
    entityId: key,
    entityName: `Content block: ${key}`,
  });

  revalidatePath("/admin/cms");
  revalidatePath("/admin");
  return { success: true };
}

export async function createSiteContent(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await guardCms();
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;

  if (!key?.trim()) return { error: "Key is required" };
  try {
    JSON.parse(value);
  } catch {
    return { error: "Value must be valid JSON" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .insert({ key: key.trim(), value: JSON.parse(value) });
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "cms",
    action: "created",
    entityType: "site_content",
    entityId: key.trim(),
    entityName: `Content block: ${key.trim()}`,
  });

  revalidatePath("/admin/cms");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteSiteContent(key: string): Promise<ActionResult> {
  const user = await guardCms();
  const supabase = await createClient();
  const { error } = await supabase.from("site_content").delete().eq("key", key);
  if (error) return { error: error.message };

  await logActivity({
    userId: user.id,
    section: "cms",
    action: "deleted",
    entityType: "site_content",
    entityId: key,
    entityName: `Content block: ${key}`,
  });

  revalidatePath("/admin/cms");
  revalidatePath("/admin");
  return { success: true };
}
