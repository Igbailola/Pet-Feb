import { requireStaff } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { ActivityList } from "@/components/admin/activity-list";
import type { ActivityLogEntry } from "@/lib/activity-log";
import { redirect } from "next/navigation";

export default async function AdminActivityPage() {
  const user = await requireStaff();

  if (user.sections.length === 0) {
    redirect("/admin");
  }

  const supabase = await createClient();

  const { data: logs } = await supabase
    .from("activity_logs")
    .select("id, user_id, section, action, entity_type, entity_id, entity_name, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(200);

  // PostgREST infers joined profiles as array; normalize to single object
  const mappedLogs: ActivityLogEntry[] = ((logs ?? []) as Record<string, unknown>[]).map((l) => {
    const prof = l.profiles;
    const profileObj = Array.isArray(prof) ? prof[0] ?? null : (prof as { full_name: string | null; email: string } | null);
    return {
      id: l.id as string,
      user_id: l.user_id as string,
      section: l.section as ActivityLogEntry["section"],
      action: l.action as string,
      entity_type: l.entity_type as string,
      entity_id: (l.entity_id as string | null) ?? null,
      entity_name: l.entity_name as string,
      created_at: l.created_at as string,
      profiles: profileObj ?? null,
    };
  });

  return (
    <ActivityList
      logs={mappedLogs}
      userSections={user.sections}
    />
  );
}
