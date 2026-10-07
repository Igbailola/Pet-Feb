import { requireSection } from "@/lib/require-section";
import { PageHeader } from "@/components/admin/ui";

export default async function OtherUpdatesPage() {
  await requireSection("other_updates");

  return (
    <div>
      <PageHeader
        title="Other Updates"
        description="Orders, Buy Small plans, installers and projects will be built in later phases."
        breadcrumbs={[{ label: "Other updates" }]}
      />
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-8 text-center max-w-lg mx-auto mt-6">
        <p className="text-sm text-[#5C5C5C]">
          This section is reserved for future operations. No tables or edit interfaces are active yet.
        </p>
      </div>
    </div>
  );
}
