import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/public/PlaceholderPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Petfeb Solar",
  description: "Terms and conditions governing equipment supply, warranties, and installation agreements.",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      badge="Terms of Service"
      title="Terms & Installation Conditions"
      description="All solar kit purchases, warranty registrations, and installation services executed by Petfeb are governed by our standard engineering contract conditions. Comprehensive terms of use will be published here upon platform activation."
      returnHref="/"
      returnLabel="Return to Homepage"
    />
  );
}
