import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import HomeHero from "./HomeHero";
import HomeShowcase from "./HomeShowcase";
import styles from "./Home.module.css";

export const metadata = pageMetadata({
  title: "SSS Wheels & Tyres | Australian Wholesale Wheel & Tyre Supplier",
  description:
    "SSS Wheels & Tyres is an Australian trade-only wholesale supplier of wheels and tyres to panel shops, workshops, fleets and resellers.",
  path: "/",
});

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

      <div className={styles.content}>
        <HomeShowcase />

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
