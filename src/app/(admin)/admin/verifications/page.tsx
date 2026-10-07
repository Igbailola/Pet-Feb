import { requireSection } from "@/lib/require-section";
import { PageHeader } from "@/components/admin/ui";

export default async function VerificationsPage() {
  await requireSection("verifications");

  return (
    <div>
      <PageHeader
        title="Client Verifications"
        description="The verification review screen will be built in a later step."
        breadcrumbs={[{ label: "Client verifications" }]}
      />
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-8 text-center max-w-lg mx-auto mt-6">
        <p className="text-sm text-[#5C5C5C]">
          The verification review interface is scheduled for build in the next step. Verification submissions can be previewed from the dashboard overview.
        </p>
      </div>
    </div>
  );
}
