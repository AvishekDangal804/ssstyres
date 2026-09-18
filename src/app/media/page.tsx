import Image from "next/image";
import MediaGallery from "./MediaGallery";
import styles from "./Media.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Media | SSS Wheels & Tyres",
  description:
    "Wheel finishes, vehicle fitment imagery and warehouse photography from SSS Wheels & Tyres.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <Image
            src="/assets/vehicles/ranger.png"
            alt="Ford Ranger fitted with SSS wheels on a lakeside gravel track"
            fill
            preload
            sizes="100vw"
            className={styles.heroPhoto}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div>
            <div className={styles.kickerRow}>
              <span className={styles.bar} />
              Media
            </div>
            <h1 className={styles.heroH1}>Product &amp; fitment gallery</h1>
            <p className={styles.heroBody}>
              Wheel finishes, vehicle fitment imagery and warehouse
              photography.
            </p>
          </div>
        </div>
      </section>

      <MediaGallery />
    </>
  );
}
