import { Suspense } from "react";
import WheelsCatalogue from "./WheelsCatalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Wheels | SSS Wheels & Tyres",
  description:
    "Browse the SSS D-Locker and SSS D-Hole wheel range by size, model or type. Order via the trade dealer portal.",
  path: "/wheels",
});

export default function WheelsPage() {
  return (
    <Suspense fallback={null}>
      <WheelsCatalogue />
    </Suspense>
  );
}
