"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Guide.module.css";

const SIZES = [
  {
    size: '15"',
    tag: "Steel & trailer",
    tyre: '30–31"',
    suits: "Jimny · trailers",
    body: "The budget-friendly workhorse size. Maximum sidewall for airing down off-road, cheap to replace, and the go-to for box, boat and camper trailers.",
    dark: false,
  },
  {
    size: '16"',
    tag: "Touring & fleet",
    tyre: '32–33"',
    suits: "HiAce · Prado",
    body: "The tourer's sweet spot. Enough sidewall to survive outback corrugations, light-truck load ratings, and a size most 4x4 tyres are made in.",
    dark: true,
  },
  {
    size: '17"',
    tag: "4x4 all-rounder",
    tyre: '32–34"',
    suits: "Ranger · HiLux · RAV4",
    body: "A very common size on Australian dual cabs. Balances an aggressive look with real off-road sidewall.",
    dark: true,
  },
];

export default function SizesGrid() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={`${styles.sizeGrid} ${revealed ? styles.revealed : ""}`}>
      {SIZES.map((s) => (
        <div
          key={s.size}
          className={`${styles.sizeCard} ${s.dark ? styles.sizeDark : ""}`}
        >
          <div className={styles.sizeGlow} aria-hidden="true" />
          <div className={styles.sizeInner}>
            <div className={styles.sizeNum}>{s.size}</div>
            <div className={styles.sizeTag}>{s.tag}</div>
            <p className={styles.sizeBody}>{s.body}</p>
            <dl className={styles.sizeFacts}>
              <div>
                <dt>Tyre</dt>
                <dd>{s.tyre}</dd>
              </div>
              <div>
                <dt>Suits</dt>
                <dd>{s.suits}</dd>
              </div>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
