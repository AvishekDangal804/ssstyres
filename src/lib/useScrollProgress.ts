"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks a section's scroll progress p = clamp((vh - top) / (vh + height), 0, 1)
 * and calls onProgress(p, element) inside requestAnimationFrame. Skips work
 * when the user prefers reduced motion (callers should avoid transform-only
 * effects in that case).
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: (p: number, el: T) => void
) {
  const ref = useRef<T | null>(null);
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      callback.current(p, el);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    const t = setTimeout(update, 120);

    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
