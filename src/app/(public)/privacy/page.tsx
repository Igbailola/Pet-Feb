import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/public/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Petfeb Solar",
  description: "Privacy statement and data protection guidelines of Pet-Feb International Company Limited.",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      badge="Legal & Governance"
      title="Petfeb Privacy Policy"
      description="We respect your privacy and protect personal data collected during system inquiries, on-site assessments, and Buy Small verification submissions in compliance with the Nigeria Data Protection Act (NDPA). Detailed legal clauses will be posted here."
      returnHref="/"
      returnLabel="Return to Homepage"
    />
  );
}
