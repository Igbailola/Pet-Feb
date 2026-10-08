"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireStaff } from "@/lib/session";
import { revalidatePath } from "next/cache";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export type ActionResult = { success?: boolean; error?: string };

export async function deleteActivityLog(id: string): Promise<ActionResult> {
  try {
    await requireStaff();
    if (!id) return { error: "Missing log ID" };

    const supabase = getAdminClient();
    const { error } = await supabase.from("activity_logs").delete().eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/admin");
    revalidatePath("/admin/activity");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to delete activity log" };
  }
}

export async function clearAllActivityLogs(): Promise<ActionResult> {
  try {
    await requireStaff();
    const supabase = getAdminClient();
    const { error } = await supabase.from("activity_logs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) return { error: error.message };

    revalidatePath("/admin");
    revalidatePath("/admin/activity");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to clear activity logs" };
  }
}
