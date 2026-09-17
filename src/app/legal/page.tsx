import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LegalTabs from "./LegalTabs";

export const metadata: Metadata = {
  title: "Legal | SSS Wheels & Tyres",
  description:
    "Terms & Conditions, Warranty & Refunds, and Privacy Policy for SSS Wheels & Tyres Pty Ltd.",
};

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
