"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CATEGORIES,
  MODELS,
  WHEELS,
  PORTAL,
  groupWheels,
  defaultVariantIndex,
  type WheelGroup,
} from "@/lib/wheels-data";
import { useScrollProgress } from "@/lib/useScrollProgress";
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

  const heroRef = useScrollProgress<HTMLDivElement>((p, el) => {
    const img = el.querySelector<HTMLElement>("[data-hero-img]");
    if (img) img.style.transform = `translate3d(0, ${((p - 0.5) * 40).toFixed(1)}px, 0)`;
  });

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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section ref={heroRef} className={styles.hero}>
        <div data-hero-img className={styles.heroBg}>
          <Image
            src="/assets/statement/s3.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className={styles.heroBgImg}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> <span>›</span> Wheels
          </div>
          <div className={styles.heroKicker}>
            <span />
            SSS Wheels · The range
          </div>
          <h1 className={styles.heroH1}>{pageTitle}</h1>
          <p className={styles.heroBody}>
            Wholesale wheels supplied to workshops, fleets and resellers
            across Australia — beadlock-style and classic steel, in stock at
            our Dandenong South warehouse.
          </p>
        </div>
      </section>

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
        <div ref={gridRef} className={`${styles.grid} ${revealed ? styles.revealed : ""}`}>
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
  const model = MODELS.find((m) => m.id === w.model);

  return (
    <div className={styles.card}>
      <Link
        href={`/wheels?model=${w.model}`}
        className={styles.cardImgLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className={styles.cardImgWrap}>
          <div className={styles.cardImgInset}>
            <Image
              src={w.img}
              alt={`${w.name} ${w.size} in ${w.variant}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 33vw, 25vw"
              className={styles.cardPhoto}
            />
          </div>
        </div>
      </Link>

      <div className={styles.cardTextBlock}>
        <span className={styles.cardCon}>{w.build}</span>
        <Link href={`/wheels?model=${w.model}`} className={styles.cardName}>
          {w.name}
        </Link>
        {model && (
          <div className={styles.sizeRow}>
            {model.sizes.map((s, i) => (
              <Fragment key={s}>
                {i > 0 && <span className={styles.sizePipe}>|</span>}
                <span>{s}</span>
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardSwatchBlock}>
        <span className={styles.finishLabel}>{w.variant}</span>
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
      </div>

      <div className={styles.cardMeta}>
        {w.size} · {w.pcd} · {w.offset} · Load {w.load}
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
  );
}
