"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CATEGORIES,
  MODELS,
  WHEELS,
  PORTAL,
  catName,
  groupWheels,
  defaultVariantIndex,
  type WheelGroup,
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
    return cat === "all"
      ? WHEELS
      : isSize
        ? WHEELS.filter((w) => w.size.startsWith(cat.slice(5)))
        : isModel
          ? WHEELS.filter((w) => w.model === cat.slice(6))
          : WHEELS.filter((w) => w.cat === cat || w.cat2 === cat);
  }, [cat, isSize, isModel]);

  const groups = useMemo(() => groupWheels(wheels), [wheels]);

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
        <div className={styles.filters} role="group" aria-label="Filter wheels">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCat(f.id)}
              aria-pressed={cat === f.id}
              className={`${styles.filterBtn} ${cat === f.id ? styles.active : ""}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {groups.map((g) => (
            <WheelCard key={g.key} group={g} />
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

function WheelCard({ group }: { group: WheelGroup }) {
  // Lead with a non-black finish where the wheel actually comes in one —
  // matte black is real stock, just not the first thing shown.
  const initial = useMemo(() => defaultVariantIndex(group.variants), [group.variants]);
  const [active, setActive] = useState(initial);
  // `active` is state keyed on the group's model|size|pcd, which React reuses
  // across a filter change even when the new group (same key) has fewer
  // variants — clamp instead of indexing straight in, or switching filters
  // with a non-default swatch already selected throws reading `undefined.cat`.
  const w = group.variants[active] ?? group.variants[0];
  // Recomputed per active variant, not fixed at group creation — a swatch
  // change can genuinely put the wheel in a different real category.
  const catLabel = `SSS ${catName(w.cat)} Series`;

  return (
    <div className={styles.card}>
      <div className={styles.cardImgWrap}>
        <div className={styles.cardImg}>
          <Image
            src={w.img}
            alt={`${w.name} ${w.size} in ${w.variant}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 33vw, 25vw"
            className={styles.cardPhoto}
          />
        </div>
      </div>

      {group.variants.length > 1 && (
        <div className={styles.swatchRow} role="radiogroup" aria-label="Size and finish">
          {group.variants.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={i === active}
              aria-label={`${v.variant} — ${v.size} · ${v.pcd}`}
              title={`${v.variant} — ${v.size} · ${v.pcd}`}
              className={`${styles.swatch} ${i === active ? styles.swatchActive : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <Image src={v.img} alt="" fill sizes="64px" className={styles.swatchImg} />
            </button>
          ))}
        </div>
      )}

      <div className={styles.cardBody}>
        <div className={styles.cardCat}>{catLabel}</div>
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
  );
}
