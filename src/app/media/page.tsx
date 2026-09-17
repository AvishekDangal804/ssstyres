import type { Metadata } from "next";
import Link from "next/link";
import MediaGallery from "./MediaGallery";
import styles from "./Media.module.css";

export const metadata: Metadata = {
  title: "Media | SSS Wheels & Tyres",
  description:
    "Customer builds, fitment shots and behind-the-scenes from the SSS Wheels warehouse. Tag @ssswheels to be featured.",
};

export default function MediaPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroImg} />
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div>
            <div className={styles.kickerRow}>
              <span className={styles.bar} />
              Media
            </div>
            <h1 className={styles.heroH1}>SSS in the wild</h1>
            <p className={styles.heroBody}>
              Customer builds, fitment shots and behind-the-scenes from the
              warehouse. Tag <strong>@ssswheels</strong> to be featured.
            </p>
          </div>
          <Link href="/contact" className={styles.heroCta}>
            Submit your build <span>→</span>
          </Link>
        </div>
      </section>

      <MediaGallery />

      <section className={styles.featuredSection}>
        <div className={styles.featuredInner}>
          <div>
            <div className={`${styles.kickerRow} ${styles.featuredKicker}`}>
              <span className={styles.bar} />
              Get featured
            </div>
            <h2 className={styles.featuredH2}>Running SSS wheels? Show us.</h2>
            <p className={styles.featuredBody}>
              Send through a clean side-on shot with the vehicle, wheel and
              size — dealers and end customers both welcome. We credit
              every build we post.
            </p>
            <div className={styles.featuredCtas}>
              <Link href="/contact" className={styles.btnRed}>
                Submit a build <span>→</span>
              </Link>
              <Link href="/wheels" className={styles.btnGhostLight}>
                Browse wheels
              </Link>
            </div>
          </div>
          <div className={styles.featuredTiles}>
            <div
              className={styles.featuredTile}
              style={{ backgroundImage: "url('/assets/wheels/r7.png')" }}
            />
            <div
              className={styles.featuredTile}
              style={{ backgroundImage: "url('/assets/wheels/r4.png')" }}
            />
            <div
              className={styles.featuredTile}
              style={{ backgroundImage: "url('/assets/wheels/r3.png')" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
