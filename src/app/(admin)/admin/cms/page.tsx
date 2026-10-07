import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { CmsEditor } from "@/components/admin/cms-editor";

export default async function CmsPage() {
  await requireSection("cms");
  const supabase = await createClient();
  const { data } = await supabase.from("site_content").select("*").order("key");
  return <CmsEditor entries={data ?? []} />;
}
