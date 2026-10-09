"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MODELS,
  WHEELS,
  groupWheelsBySize,
  defaultVariantIndex,
  type WheelGroup,
} from "@/lib/wheels-data";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./Wheels.module.css";

// Rounds the card's photo box AND its image to whole device pixels together
// in one pass. Fixes a reproducible Chromium bug: a flex-centred image
// whose box resolves to a fractional pixel size (routine in a fluid,
// clamp()-sized grid, and still fractional even after rounding the photo
// box alone, since 80% of a rounded integer is usually fractional again)
// can render flush against 2-3 edges with all its margin shoved onto the
// remaining side -- confirmed in isolation with byte-identical source
// images, independent of whether the image is painted via <img>,
// object-fit or a CSS background. Re-measures on resize, since the fluid
// grid's layout changes with viewport width.
function useCardImgSnap() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    let raf = 0;
    const snap = () => {
      raf = 0;
      // Clear this snap's own previous width/height/transform first -- re-
      // measuring without doing this reads the box *after* that correction
      // was already applied, usually lands back on (or very near) a whole
      // pixel, computes a near-zero delta and overwrites the transform with
      // it, silently erasing the original correction. That's what made the
      // bug intermittently reappear on a second snap (e.g. the image's
      // "load" firing after the initial mount snap).
      wrap.style.width = "";
      wrap.style.height = "";
      wrap.style.transform = "";
      const r = wrap.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      const dx = Math.round(r.left) - r.left;
      const dy = Math.round(r.top) - r.top;
      wrap.style.width = `${w}px`;
      wrap.style.height = `${h}px`;
      wrap.style.transform = `translate(${dx}px, ${dy}px)`;
      const img = wrap.querySelector<HTMLImageElement>(`.${styles.cardImgInset}`);
      if (img) {
        const side = `${Math.round(w * 0.8)}px`;
        img.style.maxWidth = side;
        img.style.maxHeight = side;
      }
      // Forces layout to flush synchronously. Without this, Chromium can
      // leave the image painted against its pre-snap (fractional) box even
      // though the computed styles above are already correct -- reading
      // any geometry (even one already known) is enough to make it repaint
      // correctly; skipping this step is what left the bug intermittently
      // reproducible after the style writes above.
      void wrap.offsetHeight;
    };
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(snap);
    };
    snap();
    // A lazy-loaded <img> can still be mid-decode on mount; once it loads,
    // the browser resolves its real intrinsic size and can relayout the
    // max-width-constrained box on its own, independent of this snap --
    // re-snapping on load re-asserts the rounded pixel size against that.
    const img = wrap.querySelector<HTMLImageElement>(`.${styles.cardImgInset}`);
    img?.addEventListener("load", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      img?.removeEventListener("load", onResize);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

export default function WheelsCatalogue() {
  // One card per real fitment (size + PCD), so "17x8 6x139.7" is its own
  // card and a swatch there picks between the real colours manager actually
  // stocks that fitment in -- not every card gets swatches, since most sizes
  // only come in one real colour.
  const groups = useMemo(() => groupWheelsBySize(WHEELS), []);

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
          <h1 className={styles.heroH1}>All Wheels</h1>
          <p className={styles.heroBody}>
            Wholesale wheels supplied to workshops, fleets and resellers
            across Australia — beadlock-style and classic steel, in stock at
            our Dandenong South warehouse.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div ref={gridRef} className={`${styles.grid} ${revealed ? styles.revealed : ""}`}>
          {groups.map((g) => (
            <WheelCard key={g.key} group={g} />
          ))}
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
  const imgWrapRef = useCardImgSnap();

  return (
    <div className={styles.card}>
      <Link
        href={`/wheels?model=${w.model}`}
        className={styles.cardImgLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div ref={imgWrapRef} className={styles.cardImgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain
              img, flex-centred and sized via max-width/max-height; see
              .cardImgWrap comment in Wheels.module.css for why this
              avoids next/image's fill+object-fit here. */}
          <img
            src={w.img}
            alt={`${w.name} ${w.size} in ${w.variant}`}
            className={styles.cardImgInset}
            loading="lazy"
          />
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

      <div className={styles.cardMeta}>
        {w.size} · {w.pcd} · {w.offset} · Load {w.load}
      </div>

      <div className={styles.cardSwatchBlock}>
        <span className={styles.finishLabel}>{w.variant}</span>
        {group.variants.length > 1 && (
          <div className={styles.colourDots} role="radiogroup" aria-label="Finish">
            {group.variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={i === active}
                aria-label={v.variant}
                title={v.variant}
                className={`${styles.colourDot} ${i === active ? styles.colourDotActive : ""}`}
                style={{ background: v.hex }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
