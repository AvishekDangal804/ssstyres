import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import styles from "./About.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us | SSS Wheels & Tyres",
  description:
    "About SSS Wheels & Tyres — a trade-only wholesale supplier holding its own stock in Dandenong South, Melbourne, and supplying the SSS wheel range to dealers across Australia.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About us"
        title="Keeping the trade rolling"
        body="SSS Wheels & Tyres started as a small operation supplying tyres to local workshops. Today we supply wheels and tyres wholesale to panel shops, workshops, fleets and resellers across Australia — with our own wheel range built for the way Australians actually drive."
      />

      <section className={styles.storySection}>
        <div className={styles.photoWrap}>
          <Image
            src="/assets/about/warehouse.jpg"
            alt="SSS Wheels & Tyres warehouse at 13 Advantage Drive, Dandenong South"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.photoImg}
          />
        </div>
        <div>
          <h2 className={styles.storyTitle}>
            Built on straight answers, not a marketplace
          </h2>
          <p className={styles.storyBody}>
            We&apos;re not a marketplace and we&apos;re not a middleman. We
            hold our own stock in our Dandenong South warehouse and answer
            the phone with someone who actually knows fitment.
          </p>
          <p className={styles.storyBody}>
            Trade accounts get wholesale pricing on the full SSS range and
            order directly through our dealer portal.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>Own Warehouse</div>
              <div className={styles.statLabel}>Dandenong South, VIC</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>Trade Only</div>
              <div className={styles.statLabel}>Wholesale supply</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>Own Range</div>
              <div className={styles.statLabel}>SSS D-Locker &amp; D-Hole</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tilesSection}>
        <div className={styles.tilesGrid}>
          <div className={`${styles.tile} ${styles.light}`}>
            <div className={styles.tileTitle}>Who we supply</div>
            <p className={styles.tileBody}>
              Panel shops, mechanical workshops, taxi and rideshare fleets,
              4x4 fitters and approved tyre resellers — wholesale first,
              with retail customers pointed to our dealer network.
            </p>
          </div>
          <div className={`${styles.tile} ${styles.dark}`}>
            <div className={styles.tileTitle}>Where we are</div>
            <p className={styles.tileBody}>
              Melbourne — 13 Advantage Drive, Dandenong South VIC 3175.
              Sydney, Brisbane and Adelaide branches opening soon.
            </p>
          </div>
          <div className={`${styles.tile} ${styles.red}`}>
            <div className={styles.tileTitle}>Work with us</div>
            <p className={styles.tileBody}>
              Apply for a trade account and get wholesale pricing on the
              full SSS range.
            </p>
            <Link href="/dealer" className={styles.tileCta}>
              Become a dealer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
