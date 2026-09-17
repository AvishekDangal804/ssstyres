"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CATEGORIES,
  MODELS,
  WHEELS,
  PORTAL,
  catName,
} from "@/lib/wheels-data";
import PageHeader from "@/components/PageHeader";
import styles from "./Wheels.module.css";

const SIZES = ["15", "16", "17"];

function initialCat(qs: URLSearchParams): string {
  const cat = qs.get("cat");
  const model = qs.get("model");
  const size = qs.get("size");
  if (size) return `size:${size}`;
  if (model && MODELS.some((m) => m.id === model)) return `model:${model}`;
  if (cat && CATEGORIES.some((c) => c.id === cat)) return cat;
  return "all";
}

export default function WheelsCatalogue() {
  const searchParams = useSearchParams();
  const [cat, setCat] = useState(() => initialCat(searchParams));

  const filters = useMemo(
    () => [
      { id: "all", name: "All" },
      ...SIZES.map((z) => ({ id: `size:${z}`, name: `${z}"` })),
      ...MODELS.map((m) => ({ id: `model:${m.id}`, name: m.name })),
      ...CATEGORIES.map((c) => ({ id: c.id, name: c.name })),
    ],
    []
  );

  const isSize = cat.startsWith("size:");
  const isModel = cat.startsWith("model:");

  const wheels = useMemo(() => {
    const list =
      cat === "all"
        ? WHEELS
        : isSize
          ? WHEELS.filter((w) => w.size.startsWith(cat.slice(5)))
          : isModel
            ? WHEELS.filter((w) => w.model === cat.slice(6))
            : WHEELS.filter((w) => w.cat === cat || w.cat2 === cat);
    return list.map((w) => ({ ...w, catLabel: `SSS ${catName(w.cat)} Series` }));
  }, [cat, isSize, isModel]);

  const activeModel = isModel ? MODELS.find((m) => m.id === cat.slice(6)) : null;
  const activeCategory = CATEGORIES.find((c) => c.id === cat);
  const pageTitle = isSize
    ? `${cat.slice(5)}" Wheels`
    : activeModel
      ? activeModel.name
      : activeCategory
        ? `${activeCategory.name} Wheels`
        : "All Wheels";

  return (
    <>
      <PageHeader kicker="SSS Wheels · The range" title={pageTitle} />

      <section className={styles.filtersSection}>
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCat(f.id)}
              className={`${styles.filterBtn} ${cat === f.id ? styles.active : ""}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {wheels.map((w) => (
            <div key={w.id} className={styles.card}>
              <div className={styles.cardImgWrap}>
                <div
                  role="img"
                  aria-label={`SSS ${w.name} ${w.variant}`}
                  className={styles.cardImg}
                  style={{ backgroundImage: `url('${w.img}')` }}
                />
                {w.badge && <span className={styles.cardBadge}>{w.badge}</span>}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardCat}>{w.catLabel}</div>
                <div className={styles.cardName}>
                  {w.name} <span>{w.variant}</span>
                </div>
                <div className={styles.cardSpec}>
                  {w.size} · {w.pcd} · {w.offset}
                </div>
                <div className={styles.cardBuild}>
                  {w.build} · Load {w.load}
                </div>
                <a
                  href={PORTAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardCta}
                >
                  Order via dealer portal
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaStrip}>
          <div className={styles.ctaStripText}>
            <strong>Not a dealer yet?</strong> Ordering is available to
            approved trade accounts. Apply to become a dealer, or call{" "}
            <a href="tel:0391165787">03 9116 5787</a> for stock and fitment
            advice.
          </div>
          <Link href="/dealer" className={styles.ctaStripBtn}>
            Become a dealer
          </Link>
        </div>
      </section>
    </>
  );
}
