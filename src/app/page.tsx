"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  WHEELS,
  VEHICLES,
  STATS,
  type CategoryId,
} from "@/lib/wheels-data";
import styles from "./Home.module.css";

const SIZE_DEFS = [
  {
    size: "15",
    kicker: "Compact & trailer",
    fits: "Jimny · trailers · light utes",
  },
  { size: "16", kicker: "Fleet & touring", fits: "HiAce · HiLux · Prado" },
  { size: "17", kicker: "4x4 off-road", fits: "Ranger · HiLux · RAV4" },
] as const;

function prevalentImg(size: string) {
  return WHEELS.find((w) => w.size.startsWith(size))?.img ?? WHEELS[0].img;
}

function sizeCount(size: string) {
  return WHEELS.filter((w) => w.size.startsWith(size)).length;
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const stmtRef = useRef<HTMLElement | null>(null);
  const stmtWheelRef = useRef<HTMLDivElement | null>(null);
  const featRef = useRef<HTMLDivElement | null>(null);
  const featImgWrapRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [prog, setProg] = useState(0);
  const [hoverCat, setHoverCat] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<CategoryId>("offroad");
  const [feat, setFeat] = useState(0);
  const [track, setTrack] = useState({ sp: 0, sw: 0.3 });

  // Count-up stats on mount
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf = 0;
    if (reduced) {
      raf = requestAnimationFrame(() => setProg(1));
      return () => cancelAnimationFrame(raf);
    }
    const t0 = Date.now();
    const dur = 1500;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      setProg(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Combined scroll-driven parallax: hero pin/reveal, statement wheel, feature image
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const sectionProgress = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
    };

    let raf = 0;
    const run = () => {
      raf = 0;
      const hero = heroRef.current;
      const content = contentRef.current;
      if (hero && content) {
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
      }
      if (!reduced) {
        if (stmtRef.current && stmtWheelRef.current) {
          const q = sectionProgress(stmtRef.current);
          stmtWheelRef.current.style.transform = `translate3d(0, ${((q - 0.5) * 160).toFixed(1)}px, 0) rotate(${(q * 70).toFixed(1)}deg)`;
        }
        if (featRef.current && featImgWrapRef.current) {
          const q = sectionProgress(featRef.current);
          featImgWrapRef.current.style.transform = `translate3d(0, ${((q - 0.5) * -40).toFixed(1)}px, 0)`;
        }
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

  // Slider progress thumb
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const sw = el.scrollWidth ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
      const sp = max > 0 ? Math.min(1, el.scrollLeft / max) : 0;
      setTrack((cur) =>
        Math.abs(sw - cur.sw) > 0.002 || Math.abs(sp - cur.sp) > 0.002
          ? { sp, sw }
          : cur
      );
    };
    measure();
    const t = setTimeout(measure, 300);
    el.addEventListener("scroll", measure);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const slideBy = (dx: number) =>
    sliderRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  const featList = VEHICLES.filter((v) => v.img);
  const fv = featList[feat % featList.length] ?? featList[0];
  const gridVehicles = VEHICLES.slice(0, 4);

  return (
    <>
      <section ref={heroRef} className={styles.hero}>
        <div ref={heroImgRef} className={styles.heroImg} />
        <div className={styles.heroScrim} />
        <div ref={heroCopyRef} className={styles.heroCopyWrap}>
          <div className={styles.heroCopy}>
            <div className={styles.kickerRow}>
              <span className={styles.bar} />
              SSS Wheels · Australian trade supply
            </div>
            <h1 className={styles.heroH1}>
              Any road.
              <br />
              Any load.
            </h1>
            <p className={styles.heroBody}>
              Pressed-steel wheels engineered for Australian conditions — the
              SSS D-Locker and SSS D-Hole, supplied direct to workshops,
              fleets and resellers for 10 years.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/wheels" className={styles.btnWhite}>
                Explore wheels <span>→</span>
              </Link>
              <Link href="/dealer" className={styles.btnGhostLight}>
                Become a dealer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div ref={contentRef} className={styles.content}>
        <section className={styles.stats}>
          <div className={styles.statsGlow} />
          <div className={styles.statsGrid}>
            {STATS.map((s) => {
              const num = s.decimal
                ? (5 * prog).toFixed(1)
                : Math.round(s.n * prog).toLocaleString("en-AU");
              return (
                <div key={s.label} className={styles.statCell}>
                  <span className={styles.statBar} />
                  <div className={styles.statNum}>
                    {num}
                    <span>{s.accent ?? ""}</span>
                    {s.tail ?? ""}
                  </div>
                  {s.stars && <div className={styles.statStars}>★★★★★</div>}
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section ref={stmtRef} className={styles.statement}>
          <div ref={stmtWheelRef} className={styles.statementWheel} />
          <div className={styles.statementInner}>
            <div className={styles.statementLine} style={{ color: "#0E0E0E" }}>
              Any road<span>.</span>
            </div>
            <div className={styles.statementLine} style={{ color: "#6E6E6E" }}>
              Any load<span>.</span>
            </div>
            <div className={styles.statementLine} style={{ color: "#B8B8B8" }}>
              Anywhere<span>.</span>
            </div>
            <div className={styles.statementSub}>Australian trade wheels</div>
            <Link href="/wheels" className={styles.statementBtn}>
              <span className={styles.statementBtnIcon}>+</span>View wheels
            </Link>
          </div>
        </section>

        <section className={styles.sliderSection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionH2}>Popular wheels</h2>
            <Link href="/types" className={styles.btnOutlineDark}>
              See more <span>→</span>
            </Link>
          </div>
          <div ref={sliderRef} className={styles.slider}>
            {WHEELS.map((w) => (
              <div key={w.id} className={styles.slideCard}>
                <Link href={`/wheels?model=${w.model}`} className={styles.slideImgLink}>
                  <div
                    role="img"
                    aria-label={`${w.name} ${w.size}`}
                    className={styles.slideImg}
                    style={{ backgroundImage: `url('${w.img}')` }}
                  />
                </Link>
                {w.badge && (
                  <span
                    className={`${styles.slideBadge} ${w.badge === "Best seller" ? styles.best : styles.other}`}
                  >
                    {w.badge}
                  </span>
                )}
                <div className={styles.slideInfo}>
                  <Link href={`/wheels?model=${w.model}`} className={styles.slideName}>
                    {w.name}
                  </Link>
                  <div className={styles.slideFit}>
                    {w.size} · {w.pcd} · {w.offset}
                  </div>
                  <div className={styles.slideVariant}>
                    <span className={styles.swatch} style={{ background: w.hex }} />
                    <span className={styles.variantLabel}>{w.variant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sliderControls}>
            <button
              type="button"
              aria-label="Previous"
              className={styles.arrowBtn}
              onClick={() => slideBy(-384)}
            >
              ←
            </button>
            <div className={styles.track}>
              <div
                className={styles.thumb}
                style={{
                  width: `${(track.sw * 100).toFixed(2)}%`,
                  left: `${(track.sp * (1 - track.sw) * 100).toFixed(2)}%`,
                }}
              />
            </div>
            <button
              type="button"
              aria-label="Next"
              className={styles.arrowBtn}
              onClick={() => slideBy(384)}
            >
              →
            </button>
          </div>
        </section>

        <section className={styles.collectionsSection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionH2}>Wheel collections</h2>
            <Link href="/collections" className={styles.btnOutlineDark}>
              All collections <span>→</span>
            </Link>
          </div>
          <div className={styles.collectionsGrid}>
            {SIZE_DEFS.map((sd) => {
              const key = `size${sd.size}`;
              const on = hoverCat === key;
              const n = sizeCount(sd.size);
              return (
                <Link
                  key={sd.size}
                  href={`/wheels?size=${sd.size}`}
                  onMouseEnter={() => setHoverCat(key)}
                  onMouseLeave={() => setHoverCat(null)}
                  className={`${styles.collCard} ${on ? styles.on : ""}`}
                >
                  <div aria-hidden="true" className={styles.collBig}>
                    {sd.size}&quot;
                  </div>
                  <div className={styles.collRing} />
                  <div
                    role="img"
                    aria-label={`${sd.size}" wheel`}
                    className={styles.collImg}
                    style={{ backgroundImage: `url('${prevalentImg(sd.size)}')` }}
                  />
                  <div className={styles.collTopText}>
                    <span className={styles.collKicker}>{sd.kicker}</span>
                    <span className={styles.collSize}>{sd.size}&quot;</span>
                  </div>
                  <div className={styles.collBottomRow}>
                    <div className={styles.collFits}>
                      <span>{sd.fits}</span>
                      <span>
                        {n} {n === 1 ? "fitment" : "fitments"}
                      </span>
                    </div>
                    <span className={styles.collArrow}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={styles.types}>
          <div className={styles.typesGlowRed} />
          <div className={styles.typesGlowWhite} />
          <div className={styles.typesInner}>
            <div className={styles.typesHead}>
              <div>
                <div className={styles.typesKicker}>
                  <span className={styles.bar} />
                  Know your wheels
                </div>
                <h2 className={styles.sectionH2}>Types of wheels</h2>
              </div>
              <Link href="/types" className={styles.btnOutlineLight}>
                Wheel guide <span>→</span>
              </Link>
            </div>
            <div className={styles.typesStrip}>
              {CATEGORIES.map((c, i) => {
                const on = activeCat === c.id;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={c.id}
                    onMouseEnter={() => setActiveCat(c.id)}
                    onClick={() => setActiveCat(c.id)}
                    className={`${styles.panel} ${on ? styles.active : ""}`}
                  >
                    <div className={styles.panelGlow} />
                    <div
                      role="img"
                      aria-label={`${c.name} wheel`}
                      className={styles.panelImg}
                      style={{ backgroundImage: `url('${c.img}')` }}
                    />
                    <div className={styles.panelLabel}>
                      <span className={styles.panelLabelNum}>{num}</span>
                      <span className={styles.panelLabelName}>{c.name}</span>
                    </div>
                    <div className={styles.panelBody}>
                      <div className={styles.panelBodyKicker}>
                        {num} — {c.tag}
                      </div>
                      <div className={styles.panelBodyName}>{c.name}</div>
                      <p className={styles.panelBlurb}>{c.blurb}</p>
                      <div className={styles.panelChips}>
                        {c.bullets.map((b) => (
                          <span key={b} className={styles.panelChip}>
                            {b}
                          </span>
                        ))}
                      </div>
                      <Link href={`/wheels?cat=${c.id}`} className={styles.panelCta}>
                        View {c.name} wheels <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={featRef} className={styles.feat}>
          <div className={styles.featInner}>
            <div ref={featImgWrapRef} className={styles.featImgWrap}>
              <div
                className={styles.featImg}
                style={{ backgroundImage: fv.img ? `url('${fv.img}')` : undefined }}
              />
              <div className={styles.featScrim1} />
              <div className={styles.featScrim2} />
            </div>
            <div className={styles.featContent}>
              <div>
                <div className={styles.kickerRow} style={{ color: "var(--red)" }}>
                  <span className={styles.bar} />
                  On the road
                </div>
                <div className={styles.featTitle}>
                  {fv.make} {fv.model}
                </div>
                <div className={styles.featSub}>Fitted with the {fv.wheelName}</div>
              </div>
              <div className={styles.featTabs}>
                {featList.map((v, i) => (
                  <button
                    key={v.model}
                    type="button"
                    onClick={() => setFeat(i)}
                    className={`${styles.featTab} ${i === feat % featList.length ? styles.active : ""}`}
                  >
                    {v.model}
                  </button>
                ))}
                <Link href={`/wheels?model=${fv.wheel}`} className={styles.featCta}>
                  View wheel <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.vehiclesSection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionH2}>Popular vehicles</h2>
            <Link href="/fitment" className={styles.btnOutlineDark}>
              See more <span>→</span>
            </Link>
          </div>
          <div className={styles.vehiclesGrid}>
            {gridVehicles.map((v) => (
              <Link
                key={`${v.make}-${v.model}`}
                href={`/wheels?model=${v.wheel}`}
                className={styles.vehCard}
              >
                <div
                  role="img"
                  aria-label={`${v.make} ${v.model} on SSS wheels`}
                  className={styles.vehImg}
                  style={{ backgroundImage: v.img ? `url('${v.img}')` : undefined }}
                />
                <div className={styles.vehScrim} />
                <div className={styles.vehRow}>
                  <div className={styles.vehText}>
                    <span className={styles.vehMake}>{v.make}</span>
                    <span className={styles.vehModel}>{v.model}</span>
                  </div>
                  <span className={styles.vehPill}>
                    {v.wheelShort} <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
