import PageHeader from "@/components/PageHeader";
import LegalTabs from "./LegalTabs";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Legal | SSS Wheels & Tyres",
  description:
    "Terms & Conditions, Warranty & Refunds, and Privacy Policy for SSS Wheels & Tyres Pty Ltd.",
  path: "/legal",
});

export default function LegalPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="The fine print, in plain terms."
        meta="Last updated September 2026"
      />
      <LegalTabs />
    </>
  );
}
