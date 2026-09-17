import type { Metadata } from "next";
import FitmentGuide from "./FitmentGuide";

export const metadata: Metadata = {
  title: "Fitment Guide | SSS Wheels & Tyres",
  description:
    "Find the right wheel size, PCD and offset for your vehicle. Pick your make and model and we'll show you exactly what to order.",
};

export default function FitmentPage() {
  return <FitmentGuide />;
}
