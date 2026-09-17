import { Suspense } from "react";
import type { Metadata } from "next";
import WheelsCatalogue from "./WheelsCatalogue";

export const metadata: Metadata = {
  title: "Wheels | SSS Wheels & Tyres",
  description:
    "Browse the SSS D-Locker and SSS D-Hole wheel range by size, model or type. Order via the trade dealer portal.",
};

export default function WheelsPage() {
  return (
    <Suspense fallback={null}>
      <WheelsCatalogue />
    </Suspense>
  );
}
