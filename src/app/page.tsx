import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import HomeHero from "./HomeHero";
import HeroSearch from "./HeroSearch";
import HomeShowcase from "./HomeShowcase";
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
    body: "Wholesale tyre and wheel stock for your shopfront, ordered through our dealer portal.",
    href: "/dealer",
    linkLabel: "Become a dealer",
  },
  {
    name: "Mechanical Workshops",
    body: "Wheels and tyres for service and repair work, with our fitment guide to confirm the spec.",
    href: "/fitment",
    linkLabel: "Wheel guide",
  },
  {
    name: "Panel Shops",
    body: "Replacement wheels for repair and insurance work, matched to the vehicle.",
    href: "/wheels",
    linkLabel: "Browse wheels",
  },
  {
    name: "Fleet & Rideshare Operators",
    body: "Volume supply for fleet vehicles, with an account manager for pricing and lead times.",
    href: "/trade#pricing",
    linkLabel: "Trade pricing",
  },
  {
    name: "4x4 & Accessory Fitters",
    body: "Off-road wheels and fitment support, plus the accessories that go with them.",
    href: "/accessories",
    linkLabel: "Accessories",
  },
];

const BUILT_FOR_TRADE = [
  {
    name: "Own Warehouse Stock",
    body: "We hold our own stock at our Dandenong South warehouse.",
    href: "/trade#warehouse",
  },
  {
    name: "Online Ordering",
    body: "Place orders directly through our dealer portal.",
    href: "/trade#ordering",
  },
  {
    name: "Dealer Support",
    body: "An account manager for pricing, range and lead times.",
    href: "/trade#support",
  },
  {
    name: "Trade Pricing",
    body: "Wholesale pricing for approved trade accounts.",
    href: "/trade#pricing",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <HeroSearch />

      <div className={styles.content}>
        <HomeShowcase />

        <section className={styles.supplySection}>
          <div className={styles.supplyIntro}>
            <div className={styles.supplyPhoto}>
              <Image
                src="/assets/lifestyle/workshop.jpg"
                alt="An SSS Wheels & Tyres technician fitting a wheel and tyre on a lift in a mechanical workshop"
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
                className={styles.supplyPhotoImg}
              />
            </div>
            <div>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionH2}>Who We Supply</h2>
              </div>
              <p className={styles.supplyLead}>
                SSS Wheels &amp; Tyres is a trade-only wholesale supplier —
                not a retailer. We hold our own stock at our Dandenong South
                warehouse and supply the businesses below directly, with
                wholesale pricing for approved trade accounts.
              </p>
              <Link href="/dealer" className={styles.btnOutlineDark}>
                Become a dealer <span>→</span>
              </Link>
            </div>
          </div>
          <div className={styles.supplyGrid}>
            {WHO_WE_SUPPLY.map((c) => (
              <Link key={c.name} href={c.href} className={styles.supplyCard}>
                <h3 className={styles.supplyName}>{c.name}</h3>
                <p className={styles.supplyBody}>{c.body}</p>
                <span className={styles.supplyMore}>
                  {c.linkLabel} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.tradeSection}>
          <div className={styles.tradeInner}>
            <div className={styles.sectionHead}>
              <h2 className={`${styles.sectionH2} ${styles.onDark}`}>
                Built for the Trade
              </h2>
              <Link href="/trade" className={styles.btnOutlineLight}>
                How it works <span>→</span>
              </Link>
            </div>
            <div className={styles.tradeGrid}>
              {BUILT_FOR_TRADE.map((c) => (
                <Link key={c.name} href={c.href} className={styles.tradeCard}>
                  <span className={styles.tradeBar} />
                  <h3 className={styles.tradeName}>{c.name}</h3>
                  <p className={styles.tradeBody}>{c.body}</p>
                  <span className={styles.tradeMore}>
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
