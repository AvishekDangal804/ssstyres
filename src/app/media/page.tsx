import PageHeader from "@/components/PageHeader";
import MediaGallery from "./MediaGallery";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Media | SSS Wheels & Tyres",
  description:
    "Wholesale operations, tyre and wheel ranges, and the people and processes behind SSS Wheels & Tyres' trade supply business.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <>
      <PageHeader
        kicker="Media"
        title="Inside SSS Wheels & Tyres"
        body="Explore our wholesale operations, tyre and wheel ranges, and the people and processes behind our trade supply business."
      />

      <MediaGallery />
    </>
  );
}
