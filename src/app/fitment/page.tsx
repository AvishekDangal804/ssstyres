import FitmentGuide from "./FitmentGuide";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Fitment Guide | SSS Wheels & Tyres",
  description:
    "Find the right wheel size, PCD and offset for your vehicle. Pick your make and model and we'll show you exactly what to order.",
  path: "/fitment",
});

export default function FitmentPage() {
  return <FitmentGuide />;
}
