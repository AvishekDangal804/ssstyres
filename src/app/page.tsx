import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import HomeHero from "./HomeHero";
import styles from "./Home.module.css";

export const metadata = pageMetadata({
  title: "SSS Wheels & Tyres | Australian Wholesale Wheel & Tyre Supplier",
  description:
    "SSS Wheels & Tyres is an Australian trade-only wholesale supplier of wheels and tyres to panel shops, workshops, fleets and resellers.",
  path: "/",
});

const WHO_WE_SUPPLY = [
  {
    name: "Tyre Resellers",
    body: "Wholesale tyre and wheel stock for your shopfront.",
  },
  {
    name: "Mechanical Workshops",
    body: "Wheels and tyres for service and repair work.",
  },
  {
    name: "Panel Shops",
    body: "Replacement wheels for repair and insurance work.",
  },
  {
    name: "Fleet & Rideshare Operators",
    body: "Volume supply for fleet vehicles.",
  },
  {
    name: "4x4 & Accessory Fitters",
    body: "Off-road wheels and fitment support.",
  },
];

const BUILT_FOR_TRADE = [
  {
    name: "Own Warehouse Stock",
    body: "We hold our own stock at our Dandenong South warehouse.",
  },
  {
    name: "Online Ordering",
    body: "Place orders directly through our dealer portal.",
  },
  {
    name: "Dealer Support",
    body: "An account manager for pricing, range and lead times.",
  },
  {
    name: "Trade Pricing",
    body: "Wholesale pricing for approved trade accounts.",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <div className={styles.content}>
        <section className={styles.trust}>
          <div className={styles.trustInner}>
            <div className={styles.trustKicker}>Who we are</div>
            <p className={styles.trustText}>
              SSS Wheels &amp; Tyres is an Australian trade supplier of
              wheels and tyres — not a retailer. We hold our own stock at
              our Dandenong South warehouse and supply panel shops,
              mechanical workshops, fleets and resellers directly, with our
              own SSS wheel range built for local conditions.
            </p>
          </div>
        </section>

        <section className={styles.supplySection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionH2}>Who We Supply</h2>
          </div>
          <div className={styles.supplyGrid}>
            {WHO_WE_SUPPLY.map((c) => (
              <div key={c.name} className={styles.supplyCard}>
                <h3 className={styles.supplyName}>{c.name}</h3>
                <p className={styles.supplyBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.tradeSection}>
          <div className={styles.tradeInner}>
            <div className={styles.sectionHead}>
              <h2 className={`${styles.sectionH2} ${styles.onDark}`}>
                Built for the Trade
              </h2>
            </div>
            <div className={styles.tradeGrid}>
              {BUILT_FOR_TRADE.map((c) => (
                <div key={c.name} className={styles.tradeCard}>
                  <span className={styles.tradeBar} />
                  <h3 className={styles.tradeName}>{c.name}</h3>
                  <p className={styles.tradeBody}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.warehouseSection}>
          <div className={styles.warehousePhoto}>
            <Image
              src="/assets/lifestyle/silver-boxes.png"
              alt="SSS Wheels-branded boxes stacked in a warehouse, with a machined-silver beadlock-style wheel displayed in front"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              className={styles.warehousePhotoImg}
            />
          </div>
          <div className={styles.warehouseContent}>
            <div className={styles.trustKicker}>Warehouse &amp; distribution</div>
            <h2 className={styles.sectionH2}>Stocked in Melbourne</h2>
            <p className={styles.warehouseBody}>
              Our Melbourne warehouse is at 13 Advantage Drive, Dandenong
              South VIC 3175. Sydney, Brisbane and Adelaide are opening
              soon.
            </p>
            <Link href="/contact" className={styles.btnOutlineDark}>
              Get in touch <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
