import { createClient } from "@/lib/supabase/server";
import type { AdminSection } from "@/lib/rbac";

export type ActivityLogEntry = {
  id: string;
  user_id: string;
  section: AdminSection;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_name: string;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string;
  } | null;
};

export async function logActivity({
  userId,
  section,
  action,
  entityType,
  entityId,
  entityName,
}: {
  userId: string;
  section: AdminSection;
  action: string;
  entityType: string;
  entityId?: string;
  entityName: string;
}) {
  try {
    const supabase = await createClient();
    await supabase.from("activity_logs").insert({
      user_id: userId,
      section,
      action,
      entity_type: entityType,
      entity_id: entityId ?? null,
      entity_name: (entityName || "Item").slice(0, 200),
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}
