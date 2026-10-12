import { Suspense } from "react";
import WheelsCatalogue from "./WheelsCatalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Wheels | SSS Wheels & Tyres",
  description:
    "Browse the full SSS D-Locker and SSS D-Hole wheel range. Order via the trade dealer portal.",
  path: "/wheels",
});

export default function WheelsPage() {
  // WheelsCatalogue reads ?size=&pcd= (from the home page's size search)
  // via useSearchParams, which requires a Suspense boundary.
  return (
    <Suspense>
      <WheelsCatalogue />
    </Suspense>
  );
}
