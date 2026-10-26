"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  VEHICLES,
  type CategoryId,
} from "@/lib/wheels-data";
import styles from "./HomeShowcase.module.css";

// Leaflet touches window/document on import, so it can only ever run on the
// client -- ssr:false keeps it out of the server render entirely.
const DeliveryCoverageMap = dynamic(() => import("./DeliveryCoverageMap"), {
  ssr: false,
});

// Statement band backdrop: SSS wheels in five settings, cross-fading. Decorative.
const STATEMENT_SLIDES = [
  "/assets/statement/s1.jpg",
  "/assets/statement/s2.jpg",
  "/assets/statement/s3.jpg",
  "/assets/statement/s4.jpg",
  "/assets/statement/s5.jpg",
];
const SLIDE_MS = 4200;
const LAST_SLIDE = STATEMENT_SLIDES.length - 1;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(REDUCED_MOTION);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

// The image-led sections of the home page: fact strip, statement, wheel
// slider, size collections, wheel types, featured vehicle and vehicle grid.
export default function HomeShowcase() {
  const stmtRef = useRef<HTMLElement | null>(null);
  const stmtCopyRef = useRef<HTMLDivElement | null>(null);
  const featRef = useRef<HTMLElement | null>(null);
  const featImgWrapRef = useRef<HTMLDivElement | null>(null);

  const [activeCat, setActiveCat] = useState<CategoryId>("offroad");
  const [feat, setFeat] = useState(0);

  // Statement slideshow. `reach` is the highest slide mounted so far: slides
  // are added just before they're needed so the page doesn't load all five up
  // front. It never auto-advances for visitors who prefer reduced motion, and
  // anyone can pause it.
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [show, setShow] = useState({ slide: 0, reach: 1 });
  // `advancing` is the slideshow actually moving: not paused, not reduced
  // motion, and the band on screen (so it always starts on the first image and
  // does no work while off-screen).
  const advancing = !paused && !reducedMotion && inView;

  const goToSlide = (i: number) =>
    setShow((s) => ({ slide: i, reach: Math.max(s.reach, Math.min(LAST_SLIDE, i + 1)) }));

  useEffect(() => {
    const el = stmtRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!advancing) return;
    const id = setInterval(() => {
      setShow((s) => {
        const next = s.slide === LAST_SLIDE ? 0 : s.slide + 1;
        return { slide: next, reach: Math.max(s.reach, Math.min(LAST_SLIDE, next + 1)) };
      });
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [advancing]);

  // Scroll-driven parallax: statement copy + featured vehicle image
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const sectionProgress = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
    };

    let raf = 0;
    const run = () => {
      raf = 0;
      if (stmtRef.current && stmtCopyRef.current) {
        const q = sectionProgress(stmtRef.current);
        stmtCopyRef.current.style.transform = `translate3d(0, ${((q - 0.5) * -50).toFixed(1)}px, 0)`;
      }
      if (featRef.current && featImgWrapRef.current) {
        const q = sectionProgress(featRef.current);
        featImgWrapRef.current.style.transform = `translate3d(0, ${((q - 0.5) * -40).toFixed(1)}px, 0)`;
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

  const featList = VEHICLES.filter((v) => v.img);
  const fv = featList[feat % featList.length] ?? featList[0];

  return (
    <div className={styles.showcase}>
      <section ref={stmtRef} className={styles.statement}>
        <div className={styles.statementBg} aria-hidden="true">
          {STATEMENT_SLIDES.map((src, i) =>
            i <= show.reach ? (
              <div
                key={src}
                className={`${styles.slide} ${i === show.slide ? styles.slideOn : ""}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
                  className={`${styles.slideImg} ${advancing ? "" : styles.slidePaused}`}
                />
              </div>
            ) : null
          )}
        </div>
        <div className={styles.statementShade} />
        <div ref={stmtCopyRef} className={styles.statementCopy}>
          <div className={styles.statementSub}>Australian trade supply</div>
          <Link href="/wheels" className={styles.statementBtn}>
            <span className={styles.statementBtnIcon} aria-hidden="true">
              +
            </span>
            View wheels
          </Link>
          <div className={styles.statementControls}>
            {STATEMENT_SLIDES.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`${styles.dot} ${i === show.slide ? styles.dotOn : ""}`}
                aria-label={`Show image ${i + 1} of ${STATEMENT_SLIDES.length}`}
                aria-current={i === show.slide}
                onClick={() => goToSlide(i)}
              />
            ))}
            {!reducedMotion && (
              <button
                type="button"
                className={styles.playBtn}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                onClick={() => setPaused((p) => !p)}
              >
                <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={styles.types} aria-labelledby="home-types">
        <div className={styles.typesGlowRed} />
        <div className={styles.typesGlowWhite} />
        <div className={styles.typesInner}>
          <div className={styles.typesHead}>
            <div>
              <h2 id="home-types" className={styles.sectionH2}>
                Types of wheels
              </h2>
            </div>
            <Link href="/types" className={styles.btnOutlineLight}>
              Wheel guide <span>→</span>
            </Link>
          </div>
          <div className={styles.typesPanel}>
            <div className={styles.typesList}>
              {CATEGORIES.map((c, i) => {
                const on = activeCat === c.id;
                const num = String(i + 1).padStart(2, "0");
                if (on) {
                  return (
                    <div
                      key={c.id}
                      className={`${styles.typeRow} ${styles.typeRowActive}`}
                    >
                      <span className={styles.typeRowNum}>{num}</span>
                      <span className={styles.typeRowName}>{c.name}</span>
                      <div className={styles.typeRowImg} aria-hidden="true">
                        <Image src={c.img} alt="" fill sizes="48px" className={styles.contain} />
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={c.id}
                    type="button"
                    onMouseEnter={() => setActiveCat(c.id)}
                    onFocus={() => setActiveCat(c.id)}
                    onClick={() => setActiveCat(c.id)}
                    className={styles.typeRow}
                  >
                    <span className={styles.typeRowNum}>{num}</span>
                    <span className={styles.typeRowName}>{c.name}</span>
                    <div className={styles.typeRowImg} aria-hidden="true">
                      <Image src={c.img} alt="" fill sizes="48px" className={styles.contain} />
                    </div>
                  </button>
                );
              })}
            </div>
            {(() => {
              const curIndex = CATEGORIES.findIndex((c) => c.id === activeCat);
              const cur = CATEGORIES[curIndex] ?? CATEGORIES[0];
              const num = String(curIndex + 1).padStart(2, "0");
              return (
                <div className={styles.typeStage}>
                  <div className={styles.typeStageImgWrap}>
                    <Image
                      src={cur.img}
                      alt={`${cur.name} wheel`}
                      fill
                      sizes="(max-width: 760px) 90vw, 420px"
                      className={styles.contain}
                    />
                  </div>
                  <div className={styles.typeStageBody}>
                    <div className={styles.typeStageKicker}>
                      {num} — {cur.tag}
                    </div>
                    <h3 className={styles.typeStageName}>{cur.name}</h3>
                    <p className={styles.typeStageBlurb}>{cur.blurb}</p>
                    <div className={styles.typeStageFeats}>
                      {cur.bullets.map((b) => (
                        <div key={b} className={styles.typeStageFeat}>
                          <span aria-hidden="true" />
                          {b}
                        </div>
                      ))}
                    </div>
                    <div className={styles.panelCtaRow}>
                      <Link href={`/wheels?cat=${cur.id}`} className={styles.panelCta}>
                        View {cur.name} wheels <span>→</span>
                      </Link>
                      <Link href="/fitment" className={styles.panelCtaGhost}>
                        Fitment guide
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      <section ref={featRef} className={styles.feat} aria-labelledby="home-feat">
        <div className={styles.featInner}>
          <div ref={featImgWrapRef} className={styles.featImgWrap}>
            <Image
              key={fv.img}
              src={fv.img as string}
              alt={`${fv.make} ${fv.model} with SSS wheels`}
              fill
              sizes="100vw"
              className={styles.featImg}
            />
            <div className={styles.featScrim1} />
            <div className={styles.featScrim2} />
          </div>
          <div className={styles.featContent}>
            <div>
              <div className={styles.kickerRow}>
                <span className={styles.bar} />
                Vehicle fitment
              </div>
              <h2 id="home-feat" className={styles.featTitle}>
                {fv.make} {fv.model}
              </h2>
              <div className={styles.featSub}>Recommended: {fv.wheelName}</div>
            </div>
            <div className={styles.featTabs}>
              {featList.map((v, i) => (
                <button
                  key={v.model}
                  type="button"
                  aria-pressed={i === feat % featList.length}
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

      <DeliveryCoverageMap />
    </div>
  );
}
