"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./Home.module.css";

// Hero pin/reveal: the content that follows slides over the pinned hero as
// the page scrolls. Kept as its own client component so the rest of the home
// page can stay a server component.
export default function HomeHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const stacked = window.matchMedia("(max-width: 720px)");

    let raf = 0;
    const run = () => {
      raf = 0;
      const hero = heroRef.current;
      const content = hero?.nextElementSibling;
      if (!hero || !content) return;
      if (stacked.matches) {
        // Phone layout is a static stack — clear any leftover desktop effect.
        if (heroImgRef.current) heroImgRef.current.style.transform = "";
        if (heroCopyRef.current) {
          heroCopyRef.current.style.opacity = "";
          heroCopyRef.current.style.transform = "";
        }
        return;
      }
      const H = hero.offsetHeight || 1;
      const p = Math.max(
        0,
        Math.min(1, (H - content.getBoundingClientRect().top) / H)
      );
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = reduced
          ? ""
          : `translate3d(0, ${(p * 40).toFixed(1)}px, 0) scale(${(1 + p * 0.08).toFixed(3)})`;
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
    <section ref={heroRef} className={styles.hero}>
      <div ref={heroImgRef} className={styles.heroImg}>
        <Image
          src="/assets/hero/hero-warehouse.jpg"
          alt="SSS wheels and tyres stacked in the Dandenong South warehouse"
          fill
          preload
          sizes="100vw"
          className={styles.heroPhoto}
        />
      </div>
      <div className={styles.heroScrim} />
      <div ref={heroCopyRef} className={styles.heroCopyWrap}>
        <div className={styles.heroCopy}>
          <div className={styles.kickerRow}>
            <span className={styles.bar} />
            Premium wheels &amp; tyres
          </div>
          <h1 className={styles.heroH1}>
            Built for
            <br />
            <span className={styles.heroH1Accent}>the long run</span>
          </h1>
          <p className={styles.heroBody}>
            Supplying quality wheels and tyres to dealers, workshops, fleets
            and resellers across Australia.
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
  );
}
