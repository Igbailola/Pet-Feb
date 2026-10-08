"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-log";

async function guardOtherUpdates() {
  const user = await requireStaff();
  if (!user.sections.includes("other_updates")) {
    throw new Error("Forbidden: missing section other_updates");
  }
  return user;
}

export type OtherUpdateActionResult = {
  success?: boolean;
  error?: string;
  id?: string;
};

/**
 * Publish / update a showcase project on the website
 */
export async function publishProjectAction(formData: FormData): Promise<OtherUpdateActionResult> {
  let user;
  try {
    user = await guardOtherUpdates();
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Access denied" };
  }

  const title = (formData.get("title") as string)?.trim();
  const category = (formData.get("category") as string)?.trim() || "Commercial Solar";
  const capacity = (formData.get("capacity") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const summary = (formData.get("summary") as string)?.trim();
  const impact = (formData.get("impact") as string)?.trim();
  let imageUrl = (formData.get("imageUrl") as string)?.trim() || "";
  const status = (formData.get("status") as string) || "published";

  if (!title || !capacity || !location) {
    return { error: "Please provide the project title, capacity, and location." };
  }

  // Handle uploaded image file
  const imageFile = formData.get("image_file") as File | null;
  if (imageFile && imageFile.size > 0) {
    try {
      const adminClient = createAdminClient();
      const ext = imageFile.name.split(".").pop() || "jpg";
      const path = `cms/projects/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const { error: uploadErr } = await adminClient.storage
        .from("media")
        .upload(path, imageFile, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (!uploadErr) {
        const { data: { publicUrl } } = adminClient.storage.from("media").getPublicUrl(path);
        imageUrl = publicUrl;
      } else {
        console.error("Project image upload error:", uploadErr);
      }
    } catch (uploadErr) {
      console.error("Project image upload exception:", uploadErr);
    }
  }

  const projectKey = `project.${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

  try {
    const supabase = await createClient();
    // Upsert into site_content so it's persisted in the system
    const { error } = await supabase.from("site_content").upsert({
      key: projectKey,
      value: {
        title,
        category,
        capacity,
        location,
        summary,
        impact,
        imageUrl: imageUrl || "/api/websitepic/community",
        status,
        published_at: new Date().toISOString(),
      },
    });

    if (error) {
      console.error("Failed to persist project:", error);
    }

    await logActivity({
      userId: user.id,
      section: "other_updates",
      action: status === "published" ? "published project" : "saved project draft",
      entityType: "project",
      entityId: projectKey,
      entityName: title,
    });

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/other-updates");
    revalidatePath("/admin");

    return { success: true, id: projectKey };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to publish project" };
  }
}

/**
 * Publish / update technical training details on the website
 */
export async function publishTrainingAction(formData: FormData): Promise<OtherUpdateActionResult> {
  let user;
  try {
    user = await guardOtherUpdates();
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Access denied" };
  }

  const cohortName = (formData.get("cohortName") as string)?.trim();
  const duration = (formData.get("duration") as string)?.trim();
  const fee = (formData.get("fee") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const schedule = (formData.get("schedule") as string)?.trim();
  const curriculum = (formData.get("curriculum") as string)?.trim();
  let imageUrl = (formData.get("imageUrl") as string)?.trim() || "";
  const status = (formData.get("status") as string) || "published";

  if (!cohortName || !duration) {
    return { error: "Please provide the cohort name and course duration." };
  }

  // Handle uploaded image file
  const imageFile = formData.get("image_file") as File | null;
  if (imageFile && imageFile.size > 0) {
    try {
      const adminClient = createAdminClient();
      const ext = imageFile.name.split(".").pop() || "jpg";
      const path = `cms/training/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const { error: uploadErr } = await adminClient.storage
        .from("media")
        .upload(path, imageFile, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (!uploadErr) {
        const { data: { publicUrl } } = adminClient.storage.from("media").getPublicUrl(path);
        imageUrl = publicUrl;
      } else {
        console.error("Training image upload error:", uploadErr);
      }
    } catch (uploadErr) {
      console.error("Training image upload exception:", uploadErr);
    }
  }

  const trainingKey = `training.${cohortName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("site_content").upsert({
      key: trainingKey,
      value: {
        cohortName,
        duration,
        fee,
        location,
        schedule,
        curriculum,
        imageUrl: imageUrl || "/api/websitepic/training",
        status,
        published_at: new Date().toISOString(),
      },
    });

    if (error) {
      console.error("Failed to persist training details:", error);
    }

    await logActivity({
      userId: user.id,
      section: "other_updates",
      action: status === "published" ? "published training details" : "saved training draft",
      entityType: "training",
      entityId: trainingKey,
      entityName: cohortName,
    });

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/training");
    revalidatePath("/admin/other-updates");
    revalidatePath("/admin");

    return { success: true, id: trainingKey };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to publish training details" };
  }
}
