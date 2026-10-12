"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  WHEELS,
  VEHICLES,
  groupWheels,
  defaultVariantIndex,
  type CategoryId,
  type WheelGroup,
} from "@/lib/wheels-data";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
} from "@/lib/site";
import styles from "./HomeShowcase.module.css";

// Leaflet touches window/document on import, so it can only ever run on the
// client -- ssr:false keeps it out of the server render entirely.
const DeliveryCoverageMap = dynamic(() => import("./DeliveryCoverageMap"), {
  ssr: false,
});

// Official Google "G" mark (per Google's brand guidelines for identifying
// content as coming from Google) -- not a stand-in icon.
function GoogleG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

// The same three customer types already named in the reviews section's own
// body copy ("workshops, panel shops and fleets") -- not a new claim, just
// that sentence rendered as icons too.
const REVIEW_TYPES = [
  { label: "Workshops", icon: "wrench" as const },
  { label: "Panel shops", icon: "spray" as const },
  { label: "Fleets", icon: "fleet" as const },
];

// Plain-fact strip. Only things that are true of the business and already
// stated elsewhere on the site — no counts, ratings or years.
const FACTS = [
  { title: "Trade Only", label: "Wholesale supply", icon: "truck" as const },
  { title: "Own Range", label: "SSS D-Locker & D-Hole", icon: "wheel" as const },
  { title: "Own Warehouse", label: "Dandenong South, VIC", icon: "warehouse" as const },
  { title: "Dealer Portal", label: "Online trade ordering", icon: "portal" as const },
];

type FactIcon = (typeof FACTS)[number]["icon"] | "wrench" | "spray" | "fleet";

function StatIcon({ id }: { id: FactIcon }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "truck":
      return (
        <svg {...common}>
          <rect x="1.5" y="7" width="12" height="9" rx="1" />
          <path d="M13.5 10h4l3 3v3h-7z" />
          <circle cx="6" cy="18" r="1.6" />
          <circle cx="17" cy="18" r="1.6" />
        </svg>
      );
    case "wheel":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 5.5V9.6M12 14.4v4.1M5.5 12h4.1M14.4 12h4.1M7.3 7.3l2.9 2.9M13.8 13.8l2.9 2.9M16.7 7.3l-2.9 2.9M10.2 13.8l-2.9 2.9" />
        </svg>
      );
    case "warehouse":
      return (
        <svg {...common}>
          <path d="M2 10.5 12 4l10 6.5" />
          <path d="M4 9.5V20h16V9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      );
    case "portal":
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="19" height="13" rx="1.5" />
          <path d="M2.5 15h19" />
          <path d="M9 20h6" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L3 17.2V21h3.8l6.3-6.3a4 4 0 0 0 4.6-5.4l-2.8 2.8-2.1-2.1 2.9-2.8Z" />
        </svg>
      );
    case "spray":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="8" height="13" rx="1.4" />
          <path d="M9 8V5.5a2 2 0 0 1 2-2h1" />
          <path d="M14.5 3.5h2M16 6.5h3M15 9.5h2.5" />
        </svg>
      );
    case "fleet":
      return (
        <svg {...common}>
          <rect x="1.5" y="9" width="11" height="8" rx="1" />
          <path d="M12.5 11.5h3.2l2.8 2.8V17h-6z" />
          <circle cx="5.6" cy="17.6" r="1.6" />
          <circle cx="16.4" cy="17.6" r="1.6" />
        </svg>
      );
  }
}

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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [activeCat, setActiveCat] = useState<CategoryId>("offroad");
  const [feat, setFeat] = useState(0);
  const [track, setTrack] = useState({ sp: 0, sw: 0.3 });
  // One card per model, with every colour as a swatch inside it -- the Home
  // slider wants a few rich cards you flip through, not one card per finish.
  const wheelGroups = useMemo(() => groupWheels(WHEELS), []);

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
    <div className={styles.showcase}>
      <section className={styles.stats} aria-label="At a glance">
        <div className={styles.statsGlow} />
        <div className={styles.statsGrid}>
          {FACTS.map((f) => (
            <div key={f.title} className={styles.statCell}>
              <span className={styles.statIcon}>
                <StatIcon id={f.icon} />
              </span>
              <span className={styles.statBar} />
              <div className={styles.statNum}>{f.title}</div>
              <div className={styles.statLabel}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

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

      <section className={styles.sliderSection} aria-labelledby="home-range">
        <div className={styles.sectionHead}>
          <h2 id="home-range" className={styles.sectionH2}>
            Wheel range
          </h2>
          <Link href="/wheels" className={styles.btnOutlineDark}>
            All wheels <span>→</span>
          </Link>
        </div>
        <div ref={sliderRef} className={styles.slider}>
          {wheelGroups.map((g) => (
            <RangeCard key={g.key} group={g} />
          ))}
          <Link href="/wheels" className={styles.rangeMoreCard}>
            <span className={styles.rangeMoreIcon} aria-hidden="true">
              →
            </span>
            <span className={styles.rangeMoreTitle}>See every fitment</span>
            <span className={styles.rangeMoreSub}>
              All sizes, PCDs and finishes
            </span>
          </Link>
        </div>
        <div className={styles.sliderControls}>
          <button
            type="button"
            aria-label="Previous wheels"
            className={styles.arrowBtn}
            onClick={() => slideBy(-384)}
          >
            ←
          </button>
          <div className={styles.track} aria-hidden="true">
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
            aria-label="Next wheels"
            className={styles.arrowBtn}
            onClick={() => slideBy(384)}
          >
            →
          </button>
        </div>
      </section>

      <section className={styles.types} aria-labelledby="home-types">
        <div className={styles.typesGlowRed} />
        <div className={styles.typesGlowWhite} />
        <div className={styles.typesInner}>
          <div className={styles.typesHead}>
            <div>
              <div className={styles.typesKicker}>
                <span className={styles.bar} />
                Know your wheels
              </div>
              <h2 id="home-types" className={styles.sectionH2}>
                Types of wheels
              </h2>
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
                  role="group"
                  aria-label={c.name}
                  tabIndex={0}
                  onMouseEnter={() => setActiveCat(c.id)}
                  onFocus={() => setActiveCat(c.id)}
                  onClick={() => setActiveCat(c.id)}
                  className={`${styles.panel} ${on ? styles.active : ""}`}
                >
                  <div className={styles.panelGlow} />
                  <div className={styles.panelImg} aria-hidden="true">
                    <Image
                      src={c.img}
                      alt=""
                      fill
                      sizes="(max-width: 1040px) 60vw, 520px"
                      className={styles.contain}
                    />
                  </div>
                  <div className={styles.panelLabel} aria-hidden="true">
                    <span className={styles.panelLabelNum}>{num}</span>
                    <span className={styles.panelLabelName}>{c.name}</span>
                  </div>
                  <div className={styles.panelBody}>
                    <div className={styles.panelBodyKicker}>
                      {num} — {c.tag}
                    </div>
                    <h3 className={styles.panelBodyName}>{c.name}</h3>
                    <p className={styles.panelBlurb}>{c.blurb}</p>
                    <div className={styles.panelChips}>
                      {c.bullets.map((b) => (
                        <span key={b} className={styles.panelChip}>
                          {b}
                        </span>
                      ))}
                    </div>
                    <div className={styles.panelCtaRow}>
                      <Link
                        href={`/wheels?cat=${c.id}`}
                        className={styles.panelCta}
                        tabIndex={on ? 0 : -1}
                      >
                        View {c.name} wheels <span>→</span>
                      </Link>
                      <Link
                        href="/fitment"
                        className={styles.panelCtaGhost}
                        tabIndex={on ? 0 : -1}
                      >
                        Fitment guide
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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

      <section className={styles.vehiclesSection} aria-labelledby="home-vehicles">
        <div className={styles.sectionHead}>
          <h2 id="home-vehicles" className={styles.sectionH2}>
            Vehicle fitments
          </h2>
          <Link href="/fitment" className={styles.btnOutlineDark}>
            Guide <span>→</span>
          </Link>
        </div>
        <div className={styles.vehiclesGrid}>
          {gridVehicles.map((v) => (
            <Link
              key={`${v.make}-${v.model}`}
              href={`/wheels?model=${v.wheel}`}
              className={styles.vehCard}
            >
              {v.img && (
                <Image
                  src={v.img}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.vehImg}
                />
              )}
              <div className={styles.vehScrim} />
              <div className={styles.vehRow}>
                <div className={styles.vehText}>
                  <span className={styles.vehMake}>{v.make}</span>
                  <span className={styles.vehModel}>{v.model}</span>
                </div>
                <span className={styles.vehPill}>
                  {v.wheelShort} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.reviewsSection} aria-labelledby="home-reviews">
        <div className={styles.reviewsInner}>
          <div className={styles.reviewsText}>
            <div className={styles.reviewsTop}>
              <GoogleG className={styles.googleG} />
              <span className={styles.reviewsStars} aria-hidden="true">
                ★★★★★
              </span>
              <span className={styles.reviewsCount}>
                {GOOGLE_REVIEW_COUNT} reviews
              </span>
            </div>
            <h2 id="home-reviews" className={styles.reviewsHeading}>
              {GOOGLE_RATING} rated on Google
            </h2>
            <p className={styles.reviewsBody}>
              By the workshops, panel shops and fleets we supply across
              Melbourne.
            </p>
            <ul className={styles.reviewsTypes}>
              {REVIEW_TYPES.map((t) => (
                <li key={t.label} className={styles.reviewsType}>
                  <span className={styles.reviewsTypeIcon} aria-hidden="true">
                    <StatIcon id={t.icon} />
                  </span>
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.reviewsCtas}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnRed}
            >
              Read our reviews <span>→</span>
            </a>
            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOutlineDark}
            >
              Write a review <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <DeliveryCoverageMap />
    </div>
  );
}

function RangeCard({ group }: { group: WheelGroup }) {
  const initial = useMemo(() => defaultVariantIndex(group.variants), [group.variants]);
  const [active, setActive] = useState(initial);
  // See the same guard in WheelsCatalogue.tsx's WheelCard: `active` is state
  // keyed on the group, so a shorter variants array for the same key can
  // leave it pointing past the end.
  const w = group.variants[active] ?? group.variants[0];

  // One swatch per distinct colour, not one per SKU: a model stocked in 6
  // colours across 3 sizes has 18 variants, but showing all 18 as swatches
  // is 3 visually-identical thumbnails per colour. Falls back to every
  // variant when there's only one real colour (e.g. D-Hole), since there the
  // swatches are the only way to reach its other sizes at all.
  const swatchIndexes = useMemo(() => {
    const firstOfEach = new Map<string, number>();
    group.variants.forEach((v, i) => {
      if (!firstOfEach.has(v.variant)) firstOfEach.set(v.variant, i);
    });
    const unique = [...firstOfEach.values()];
    return unique.length > 1 ? unique : group.variants.map((_, i) => i);
  }, [group.variants]);

  return (
    <div className={styles.slideCard}>
      <Link
        href={`/wheels?model=${w.model}`}
        className={styles.slideImgLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={w.img}
          alt=""
          fill
          sizes="(max-width: 720px) 80vw, 300px"
          className={styles.contain}
        />
      </Link>
      <div className={styles.slideInfo}>
        <Link href={`/wheels?model=${w.model}`} className={styles.slideName}>
          {w.name}
        </Link>
        <div className={styles.slideFinish}>{w.variant}</div>
        <div className={styles.slideFit}>
          {w.size} · {w.pcd} · {w.offset}
        </div>

        {swatchIndexes.length > 1 && (
          <div className={styles.sizeChips} role="radiogroup" aria-label="Finish">
            {swatchIndexes.map((i) => {
              const v = group.variants[i];
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={i === active}
                  aria-label={v.variant}
                  title={v.variant}
                  className={`${styles.sizeChip} ${i === active ? styles.sizeChipActive : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <Image src={v.img} alt="" fill sizes="64px" className={styles.sizeChipImg} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
