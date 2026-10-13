import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { MODELS, WHEELS, PORTAL } from "@/lib/wheels-data";
import styles from "./Collections.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Wheel Collections | SSS Wheels & Tyres",
  description:
    "The SSS D-Locker and SSS D-Hole collections — every size, finish and fitment.",
  path: "/collections",
});

const collections = MODELS.map((m, i) => {
  const dark = i % 2 === 0;
  const n = WHEELS.filter((w) => w.model === m.id).length;
  return {
    ...m,
    dark,
    chips: [m.sizes.join(" · "), m.finishes[0].name, `${n} ${n === 1 ? "fitment" : "fitments"}`],
    floatImg: m.finishes[0].front,
  };
});

const finishes = MODELS.flatMap((m) =>
  m.finishes.map((f) => ({
    modelId: m.id,
    name: m.name,
    finish: f.name,
    img: f.img,
  }))
);

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        kicker="SSS Wheels"
        title="Wheel collections"
        body="Two pressed-steel wheels, every fitment that matters. The beadlock-style D-Locker for touring and off-road builds, and the classic D-Hole for utes, vans, fleets and trailers."
      />

      <section style={{ flex: 1 }}>
        {collections.map((c, i) => (
          <div
            key={c.id}
            id={c.id}
            className={`${styles.band} ${c.dark ? styles.dark : styles.light}`}
          >
            <div className={styles.bgWord} aria-hidden="true">{c.short}</div>
            <div className={styles.bandInner}>
              <div className={`${styles.mediaWrap} ${i % 2 ? styles.second : ""}`}>
                <div className={styles.mediaBox}>
                  {c.lifestyle ? (
                    <Image
                      src={c.lifestyle}
                      alt={`${c.name} wheel on SSS-branded boxes in a warehouse`}
                      fill
                      sizes="(max-width: 700px) 100vw, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <ImagePlaceholder label={`${c.name} warehouse photo`} />
                  )}
                </div>
                <div className={styles.mediaFloat} aria-hidden="true">
                  <Image
                    src={c.floatImg}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 60vw, 25vw"
                    className={styles.contain}
                  />
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.tag}>
                  <span className={styles.bar} />
                  {c.tag}
                </div>
                <h2 className={styles.name}>{c.name}</h2>
                <p className={styles.blurb}>{c.blurb}</p>
                <div className={styles.chips}>
                  {c.chips.map((chip) => (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  ))}
                </div>
                <div className={styles.ctas}>
                  <Link href={`/wheels?model=${c.id}`} className={styles.btnPrimary}>
                    View fitments <span>→</span>
                  </Link>
                  <a
                    href={PORTAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnSecondary}
                  >
                    Order via portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.finishSection}>
          <div className={styles.finishHead}>
            <h2 className={styles.finishH2}>Every finish</h2>
            <Link href="/wheels" className={styles.btnOutlineDark}>
              Full catalogue <span>→</span>
            </Link>
          </div>
          <div className={styles.finishGrid}>
            {finishes.map((f) => (
              <Link
                key={`${f.modelId}-${f.finish}`}
                href={`/wheels?model=${f.modelId}`}
                className={styles.finishCard}
              >
                <div className={styles.finishImg}>
                  {f.img ? (
                    <Image
                      src={f.img}
                      alt={`${f.name} in ${f.finish}`}
                      fill
                      sizes="(max-width: 500px) 45vw, 220px"
                      className={styles.contain}
                    />
                  ) : (
                    <ImagePlaceholder label={`${f.name} ${f.finish} — photo coming soon`} compact />
                  )}
                </div>
                <div>
                  <div className={styles.finishName}>{f.name}</div>
                  <div className={styles.finishFinish}>{f.finish}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
