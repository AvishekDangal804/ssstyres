"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./Home.module.css";

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
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Hero pin/reveal parallax: the content wrapper slides over the pinned
  // hero as the page scrolls past it.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    const run = () => {
      raf = 0;
      const hero = heroRef.current;
      const content = contentRef.current;
      if (!hero || !content) return;
      const H = hero.offsetHeight || 1;
      const p = Math.max(
        0,
        Math.min(1, (H - content.getBoundingClientRect().top) / H)
      );
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = reduced
          ? ""
          : `translate3d(0, ${(p * 110).toFixed(1)}px, 0) scale(${(1 + p * 0.08).toFixed(3)})`;
      }
      if (heroCopyRef.current) {
        heroCopyRef.current.style.opacity = String(Math.max(0, 1 - p * 1.5));
        heroCopyRef.current.style.transform = reduced
          ? ""
          : `translate3d(0, ${(-p * 60).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(run);
    };
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    run();
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className={styles.hero}>
        <div ref={heroImgRef} className={styles.heroImg} />
        <div className={styles.heroScrim} />
        <div ref={heroCopyRef} className={styles.heroCopyWrap}>
          <div className={styles.heroCopy}>
            <div className={styles.kickerRow}>
              <span className={styles.bar} />
              SSS Wheels &amp; Tyres · Australian Trade Supply
            </div>
            <h1 className={styles.heroH1}>
              Wholesale Wheels &amp; Tyres.
              <br />
              Built for the Trade.
            </h1>
            <p className={styles.heroBody}>
              Supplying quality wheels and tyres to dealers, workshops,
              fleets and resellers across Australia.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/dealer" className={styles.btnWhite}>
                Become a Dealer <span>→</span>
              </Link>
              <a
                href={PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGhostLight}
              >
                Wholesale Login
              </a>
            </div>
          </div>
        </div>
      </section>

      <div ref={contentRef} className={styles.content}>
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
                <div className={styles.supplyName}>{c.name}</div>
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
                  <div className={styles.tradeName}>{c.name}</div>
                  <p className={styles.tradeBody}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.warehouseSection}>
          <div className={styles.warehousePhoto} />
          <div className={styles.warehouseContent}>
            <div className={styles.trustKicker}>Warehouse &amp; distribution</div>
            <h2 className={styles.sectionH2}>Melbourne Warehouse</h2>
            <p className={styles.warehouseBody}>
              13 Advantage Drive, Dandenong South VIC 3175. Sydney, Brisbane
              and Adelaide opening soon.
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
