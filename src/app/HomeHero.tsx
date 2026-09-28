"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";

// Three scenes auto-cycle behind the copy; the copy text swaps mid-fade so it
// never visibly jump-cuts. All facts here must already be true and stated
// elsewhere on the site (fitments match wheels-data.ts; no age/tenure claims
// that aren't published anywhere else).
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
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [started, setStarted] = useState(false);
  const [copyHidden, setCopyHidden] = useState(false);
  const [copyIdx, setCopyIdx] = useState(0);
  const curRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      <div className={styles.heroStage}>
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
                sizes="(max-width: 720px) 120vw, 90vw"
                priority={i === 0}
                className={styles.sceneImg}
              />
            )}
          </div>
        ))}

        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={`${styles.heroCopyWrap} ${copyHidden ? styles.copyHidden : ""}`}>
          <div className={styles.heroCopy}>
            <div className={styles.kickerRow}>
              <span className={styles.bar} />
              SSS Wheels &amp; Tyres · Australian trade supply
            </div>
            <h1 className={styles.heroH1}>
              {active.a}
              <span className={styles.heroDot}>.</span>
              <br />
              {active.b}
              <span className={styles.heroDot}>.</span>
            </h1>
            <p className={styles.heroBody}>{active.body}</p>
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

        <div className={styles.heroDots} role="tablist" aria-label="Hero scenes">
          {SCENES.map((s, i) => (
            <button
              key={s.img}
              type="button"
              role="tab"
              aria-selected={started && i === cur}
              aria-label={`Scene ${i + 1}`}
              className={`${styles.heroDotBtn} ${started && i === cur ? styles.heroDotActive : ""}`}
              onClick={() => handleDot(i)}
            />
          ))}
        </div>

        <div className={styles.heroVignette} aria-hidden="true" />
      </div>
    </section>
  );
}
