import { requireSection } from "@/lib/require-section";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { OtherUpdatesEditor, PublishedItem } from "@/components/admin/other-updates-editor";

export const dynamic = "force-dynamic";

export default async function OtherUpdatesPage() {
  await requireSection("other_updates");
  const supabase = await createClient();

  const { data } = await supabase
    .from("site_content")
    .select("key, value")
    .or("key.like.project.%,key.like.training.%")
    .order("key");

  const existingItems: PublishedItem[] = (data ?? []).map((item) => ({
    key: String(item.key),
    value: (typeof item.value === "object" && item.value !== null ? item.value : {}) as Record<string, unknown>,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Other Updates: Projects & Training Details"
        description="Publish solar installations, engineering showcase projects, and technical training cohort details directly to the website."
        breadcrumbs={[{ label: "Other updates" }]}
      />
      <OtherUpdatesEditor existingItems={existingItems} />
    </div>
  );
}
