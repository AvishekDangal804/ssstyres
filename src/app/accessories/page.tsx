import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./Accessories.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Accessories | SSS Wheels & Tyres",
  description:
    "Wheel nuts, studs, centre caps, hub-centric rings, valves & TPMS, lock nut sets and beadlock hardware for SSS wheels — ordered alongside your wheels.",
  path: "/accessories",
});

interface Tile {
  id: string;
  kicker: string;
  title: string;
  sub: string;
  /** Product photo; omit for the SSS-mark tile. */
  img?: string;
  cta?: string;
  /** Internal route; tiles without one open the dealer portal. */
  href?: string;
}

const TILES: Tile[] = [
  {
    id: "nuts",
    kicker: "Dress the set",
    title: "Wheel nuts",
    sub: "Tapered, shank and mag-seat nuts in chrome and black.",
    img: "/assets/accessories/nuts.jpg",
  },
  {
    id: "studs",
    kicker: "Press-in",
    title: "Wheel studs",
    sub: "Knurled press-in studs to suit every SSS fitment.",
    img: "/assets/accessories/stud.jpg",
  },
  {
    id: "caps",
    kicker: "SSS",
    title: "Centre caps",
    sub: "Replacement caps in chrome, gloss and matte black.",
    img: "/assets/accessories/cap.jpg",
  },
  {
    id: "rings",
    kicker: "Vibration-free",
    title: "Hub-centric rings",
    sub: "Precision rings for a dead-centre, rattle-free fit.",
    img: "/assets/accessories/ring.jpg",
  },
  {
    id: "valves",
    kicker: "Late-model ready",
    title: "Valves & TPMS",
    sub: "Rubber and TPMS-compatible valve stems.",
    img: "/assets/accessories/valve.jpg",
  },
  {
    id: "locks",
    kicker: "Keyed",
    title: "Lock nut sets",
    sub: "Keyed lock nuts to keep the set on the vehicle.",
    img: "/assets/accessories/locks.jpg",
  },
  {
    id: "beadlock",
    kicker: "Replacement parts",
    title: "Beadlock hardware",
    sub: "Replacement rings, bolts and torque specs.",
    img: "/assets/accessories/beadlock.webp",
  },
  {
    id: "fit",
    kicker: "SSS",
    title: "Check the fit",
    sub: "Size, bolt pattern and offset — see how to confirm what fits.",
    cta: "How it works",
    href: "/fitment",
  },
];

const TICKER_WORDS = [
  "Wheel nuts",
  "Wheel studs",
  "Centre caps",
  "Hub-centric rings",
  "Valves & TPMS",
  "Lock nut sets",
  "Beadlock hardware",
];

function CardLink({
  tile,
  children,
}: {
  tile: Tile;
  children: ReactNode;
}) {
  return tile.href ? (
    <Link href={tile.href} className={styles.card}>
      {children}
    </Link>
  ) : (
    <a
      href={PORTAL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      {children}
    </a>
  );
}

export default function AccessoriesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroWheel} aria-hidden="true">
          <Image
            src="/assets/wheels/r7.png"
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 900px) 46vw, 640px"
            className={styles.contain}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div className={styles.kickerRow}>
            <span className={styles.bar} />
            Accessories
          </div>
          <h1 className={styles.heroH1}>Finish the set properly</h1>
          <p className={styles.heroBody}>
            Nuts, locks, caps and hardware to suit SSS fitments — stocked
            alongside the wheels so your order arrives fit-ready.
          </p>
        </div>
        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
              <span
                key={i}
                className={`${styles.tickerItem} ${i % 2 ? styles.tickerDim : ""}`}
              >
                {word} <span className={styles.tickerDiamond}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {TILES.map((t, i) => (
            <div
              key={t.id}
              className={styles.tileWrap}
              style={{ "--i": i } as CSSProperties}
            >
              <CardLink tile={t}>
                <span className={styles.cardBar} />
                <div
                  className={`${styles.panel} ${t.img ? "" : styles.panelDark}`}
                >
                  <div className={styles.glow} />
                  {t.img ? (
                    <div className={styles.photo}>
                      <Image
                        src={t.img}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 90vw, 300px"
                        className={styles.contain}
                      />
                    </div>
                  ) : (
                    <Image
                      src="/assets/logo-mark.png"
                      alt=""
                      width={150}
                      height={75}
                      className={styles.mark}
                    />
                  )}
                </div>
                <div className={styles.body}>
                  <div className={styles.kicker}>{t.kicker}</div>
                  <h2 className={styles.title}>{t.title}</h2>
                  <p className={styles.sub}>{t.sub}</p>
                  <div className={styles.cta}>
                    {t.cta ?? "Order via portal"}{" "}
                    <span className={styles.arrow}>→</span>
                  </div>
                </div>
              </CardLink>
            </div>
          ))}
        </div>

        <div className={styles.ctaBand}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Order accessories with your wheels</h2>
            <p className={styles.ctaBody}>
              Accessories are ordered alongside wheels through the dealer
              portal, or by phone for one-off requirements.
            </p>
          </div>
          <div className={styles.ctaBtns}>
            <a
              href={PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnRed}
            >
              Order via portal <span>→</span>
            </a>
            <Link href="/contact" className={styles.btnGhost}>
              Enquire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
