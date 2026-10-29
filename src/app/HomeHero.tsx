"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FITMENTS, FITMENT_SIZES, pcdsForSize } from "@/lib/wheels-data";
import styles from "./Home.module.css";

// Split hero: copy pane cycles alongside a stage of three studio scenes.
// All facts here must already be true and stated elsewhere on the site
// (fitments match wheels-data.ts; no age/tenure claims that aren't
// published anywhere else).
const SCENES = [
  {
    img: "/assets/hero/scene-truck.png",
    alt: "Black SSS dual-cab ute on SSS wheels in a dark studio",
    sceneClass: "sceneTruck",
    a: "Any road",
    b: "Any load",
    body: "SSS wheels, engineered for Australian conditions — supplied wholesale to workshops, fleets and resellers.",
  },
  {
    img: "/assets/hero/scene-wheel.png",
    alt: "SSS D-Locker wheel",
    sceneClass: "sceneWheel",
    a: "SSS D-Locker",
    b: "Built to be flogged",
    body: "Beadlock-style ring, 1250 kg load rating and fitments for HiLux, Ranger, HiAce and RAV4.",
  },
  {
    img: "/assets/hero/scene-pair.png",
    alt: "Two SSS wheels in a dark studio",
    sceneClass: "scenePair",
    a: "Two wheels",
    b: "Every fitment",
    body: 'D-Locker and D-Hole in 15", 16" and 17" — the PCDs, offsets and finishes the trade actually asks for, in stock and shipped from Dandenong South.',
  },
] as const;

const INTERVAL = 5200;
const COPY_SWAP = 480;
const FIRST = 350;

export default function HomeHero() {
  const router = useRouter();
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [started, setStarted] = useState(false);
  const [copyHidden, setCopyHidden] = useState(false);
  const [copyIdx, setCopyIdx] = useState(0);
  const [size, setSize] = useState("");
  const [pcd, setPcd] = useState("");
  const curRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pcdOptions = useMemo(() => (size ? pcdsForSize(size) : []), [size]);

  const goToFitment = useCallback(
    (s: string, p: string) => {
      router.push(`/wheels?size=${encodeURIComponent(s)}&pcd=${encodeURIComponent(p)}`);
    },
    [router]
  );

  const onSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!size || !pcd) return;
      goToFitment(size, pcd);
    },
    [size, pcd, goToFitment]
  );

  const goTo = useCallback((n: number) => {
    setPrev(curRef.current);
    curRef.current = n;
    setCur(n);
    setCopyHidden(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopyIdx(n);
      setCopyHidden(false);
    }, COPY_SWAP);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((curRef.current + 1) % SCENES.length);
    }, INTERVAL);
  }, [goTo]);

  // Stops the slide rotating while someone's mid-pick in the wheel-size
  // search, so an open PCD dropdown doesn't get yanked out from under them.
  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handleDot = useCallback(
    (n: number) => {
      goTo(n);
      startTimer();
    },
    [goTo, startTimer]
  );

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    const t = setTimeout(() => {
      setStarted(true);
      goTo(0);
      startTimer();
    }, FIRST);
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearInterval(timerRef.current);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [goTo, startTimer]);

  const active = SCENES[copyIdx];

  return (
    <section className={styles.hero}>
      <div className={styles.heroSplit}>
        <div className={styles.heroCopyPane}>
          <div className={styles.heroCopyInner}>
            <div className={styles.kickerRow}>
              <span className={styles.bar} />
              SSS Wheels &amp; Tyres · Australian trade supply
            </div>
            <h1 className={styles.heroH1} aria-live="polite">
              <span className={styles.heroLine}>
                <span className={`${styles.heroLineInner} ${!copyHidden ? styles.heroLineIn : ""}`}>
                  {active.a}
                  <span className={styles.heroDot}>.</span>
                </span>
              </span>
              <span className={styles.heroLine}>
                <span
                  className={`${styles.heroLineInner} ${styles.heroLineB} ${
                    !copyHidden ? styles.heroLineIn : ""
                  }`}
                >
                  {active.b}
                  <span className={styles.heroDot}>.</span>
                </span>
              </span>
            </h1>
            <p className={`${styles.heroBody} ${!copyHidden ? styles.heroBodyIn : ""}`}>{active.body}</p>
            <div className={styles.ctaRow}>
              <Link href="/wheels" className={styles.btnWhite}>
                Explore wheels <span>→</span>
              </Link>
              <Link href="/dealer" className={styles.btnGhostLight}>
                Become a dealer
              </Link>
            </div>
          </div>

          <div
            className={styles.heroSearch}
            onMouseEnter={pauseTimer}
            onMouseLeave={startTimer}
          >
            <span className={styles.heroSearchLabel}>Find your wheel size</span>
            <form className={styles.heroSearchBar} onSubmit={onSearchSubmit}>
              <select
                className={styles.heroSearchSelect}
                aria-label="Wheel size"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  setPcd("");
                }}
              >
                <option value="">Size</option>
                {FITMENT_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className={styles.heroSearchSelect}
                aria-label="Bolt pattern (PCD)"
                value={pcd}
                onChange={(e) => setPcd(e.target.value)}
                disabled={!size}
              >
                <option value="">{size ? "PCD" : "Size first"}</option>
                {pcdOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <button type="submit" className={styles.heroSearchBtn} disabled={!size || !pcd}>
                Search
              </button>
            </form>
            <div className={styles.heroSearchChips}>
              {FITMENTS.map((f) => (
                <button
                  key={`${f.size}-${f.pcd}`}
                  type="button"
                  className={styles.heroSearchChip}
                  onClick={() => goToFitment(f.size, f.pcd)}
                >
                  {f.size} · {f.pcd}
                </button>
              ))}
              <Link href="/fitment" className={styles.heroSearchHelp}>
                Need help?
              </Link>
            </div>
          </div>

          <div className={styles.heroTabs} role="tablist" aria-label="Hero scenes">
            {SCENES.map((s, i) => (
              <button
                key={s.img}
                type="button"
                role="tab"
                aria-selected={started && i === cur}
                aria-label={`0${i + 1}: ${s.a}`}
                className={styles.heroTabBtn}
                onClick={() => handleDot(i)}
              >
                <span className={`${styles.heroTabNum} ${started && i === cur ? styles.heroTabNumActive : ""}`}>
                  0{i + 1}
                </span>
                <span className={`${styles.heroTabBar} ${started && i === cur ? styles.heroTabBarActive : ""}`} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.heroStagePane}>
          <div className={styles.heroGlow} aria-hidden="true" />

          {SCENES.map((s, i) => (
            <div
              key={s.img}
              className={`${styles.scene} ${styles[s.sceneClass]} ${
                started && i === cur ? styles.sceneActive : ""
              } ${started && i === prev && i !== cur ? styles.sceneOut : ""}`}
            >
              {s.sceneClass === "scenePair" ? (
                <div className={styles.scenePairImg} role="img" aria-label={s.alt} />
              ) : (
                <Image
                  src={s.img}
                  alt={s.alt}
                  width={1600}
                  height={1600}
                  sizes="(max-width: 900px) 100vw, 58vw"
                  priority={i === 0}
                  className={styles.sceneImg}
                />
              )}
            </div>
          ))}

          <div className={styles.heroVignette} aria-hidden="true" />
          <div className={styles.heroProgressTrack} aria-hidden="true">
            <div className={`${styles.heroProgressFill} ${!copyHidden ? styles.heroProgressFillIn : ""}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
