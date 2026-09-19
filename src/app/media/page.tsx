import FullVehicleImage from "@/components/FullVehicleImage";
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
          <FullVehicleImage
            src="/assets/vehicles/ranger.png"
            alt="Ford Ranger fitted with SSS wheels on a lakeside gravel track"
            sizes="(max-width: 1100px) 100vw, 60vw"
            preload
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
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
