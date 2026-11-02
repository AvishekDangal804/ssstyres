"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/wheels-data";
import styles from "./Types.module.css";

function Detail({ c, i, heading }: { c: Category; i: number; heading?: ReactNode }) {
  return (
    <>
      <div className={`${styles.imgWrap} ${i % 2 ? styles.second : ""}`}>
        <div className={styles.img}>
          <Image
            src={c.img}
            alt={`SSS ${c.name} series wheel`}
            fill
            sizes="(max-width: 700px) 100vw, 440px"
            className={styles.photo}
          />
        </div>
      </div>
      <div>
        {heading}
        <div className={styles.tag}>{c.tag}</div>
        <p className={styles.blurb}>{c.blurb}</p>
        <div className={styles.bullets}>
          {c.bullets.map((b) => (
            <div key={b} className={styles.bullet}>
              <span className={styles.bulletMark} />
              {b}
            </div>
          ))}
        </div>
        <Link href={`/wheels?cat=${c.id}`} className={styles.cta}>
          Browse {c.name} range
        </Link>
      </div>
    </>
  );
}

// Two separate blocks per category: .desktopRow is the original
// always-expanded layout, unchanged, CSS-hidden below 720px. .mobileRow is a
// compact tap-to-expand accordion, CSS-hidden at 720px+ -- matches the
// mobile design reference's scannable type list instead of one very long
// scroll of six fully-expanded rows.
export default function TypesAccordion({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {categories.map((c, i) => {
        const num = String(i + 1).padStart(2, "0");
        const isOpen = open === c.id;
        return (
          <div key={c.id}>
            <div className={styles.desktopRow}>
              <Detail
                c={c}
                i={i}
                heading={
                  <h2 className={styles.title}>
                    <span className={styles.numRow}>
                      <span className={styles.num}>{num}</span>
                      <span className={styles.series}>SSS {c.name} Series</span>
                    </span>
                    {c.name} wheels
                  </h2>
                }
              />
            </div>

            <div className={styles.mobileRow}>
              <h2 className={styles.summaryHeading}>
                <button
                  type="button"
                  className={styles.summaryBtn}
                  aria-expanded={isOpen}
                  aria-controls={`type-detail-${c.id}`}
                  onClick={() => setOpen(isOpen ? null : c.id)}
                >
                  <span className={styles.thumb} aria-hidden="true">
                    <Image src={c.img} alt="" fill sizes="56px" className={styles.photo} />
                  </span>
                  <span className={styles.summaryText}>
                    <span className={styles.numRowSmall} aria-hidden="true">
                      {num} · SSS {c.name} Series
                    </span>
                    <span className={styles.titleSmall}>{c.name} wheels</span>
                  </span>
                  <span
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
              </h2>
              <div id={`type-detail-${c.id}`} className={styles.mobileDetail} data-open={isOpen}>
                <Detail c={c} i={i} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
