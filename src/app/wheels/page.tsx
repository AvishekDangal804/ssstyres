import WheelsCatalogue from "./WheelsCatalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Wheels | SSS Wheels & Tyres",
  description:
    "Browse the full SSS D-Locker and SSS D-Hole wheel range. Order via the trade dealer portal.",
  path: "/wheels",
});

export default function WheelsPage() {
  return <WheelsCatalogue />;
}
