import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import styles from "./About.module.css";

export const metadata: Metadata = {
  title: "About Us | SSS Wheels & Tyres",
  description:
    "Ten years of keeping the trade rolling — SSS Wheels & Tyres supplies wheels and tyres wholesale to panel shops, workshops, fleets and resellers across Australia.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About us"
        title="Ten years of keeping the trade rolling"
        body="SSS Wheels & Tyres started as a two-person operation supplying tyres to local workshops. Today we supply wheels and tyres wholesale to panel shops, workshops, fleets and resellers across Australia — with our own wheel range built for the way Australians actually drive."
      />

      <section className={styles.storySection}>
        <div className={styles.photoWrap}>
          <ImagePlaceholder label="Warehouse / team photo — Dandenong South" />
        </div>
        <div>
          <h2 className={styles.storyTitle}>
            Built on straight answers and fast dispatch
          </h2>
          <p className={styles.storyBody}>
            We&apos;re not a marketplace and we&apos;re not a middleman. We
            hold our own stock in our Dandenong South warehouse, answer the
            phone with someone who knows fitment, and dispatch same-day on
            orders placed before 2pm.
          </p>
          <p className={styles.storyBody}>
            That&apos;s why 2,500 of our 3,500+ customers keep coming back —
            and why our Google rating sits at 5.0.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>3,500+</div>
              <div className={styles.statLabel}>Customers</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>10 yrs</div>
              <div className={styles.statLabel}>Trade supply</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>
                5.0 <span>★</span>
              </div>
              <div className={styles.statLabel}>Google rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tilesSection}>
        <div className={styles.tilesGrid}>
          <div className={`${styles.tile} ${styles.dark}`}>
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
