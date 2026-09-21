import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { CATEGORIES } from "@/lib/wheels-data";
import styles from "./Types.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Types of Wheels | SSS Wheels & Tyres",
  description:
    "Steel or alloy? Beadlock or simulated? What each SSS wheel type is built for, and which vehicles it suits.",
  path: "/types",
});

export default function TypesPage() {
  return (
    <>
      <PageHeader
        kicker="Know your wheels"
        title="Types of wheels, explained"
        body="Steel or alloy? Beadlock or simulated? Here's what each type is built for, what it weighs up, and which vehicles it suits — so you order the right wheel first time."
      />
      <section className={styles.section}>
        <figure className={styles.banner}>
          <div className={styles.bannerImg}>
            <Image
              src="/assets/lifestyle/wheel-styles.jpg"
              alt="Four alloy wheels in black, white and bronze finishes lined up on a reflective floor"
              fill
              sizes="(max-width: 1100px) 94vw, 1268px"
              className={styles.bannerPhoto}
            />
          </div>
          <figcaption className={styles.bannerCaption}>
            Illustrative image of wheel styles.
          </figcaption>
        </figure>
        {CATEGORIES.map((c, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <div key={c.id} className={styles.row}>
              <div className={`${styles.imgWrap} ${i % 2 ? styles.second : ""}`}>
                <div className={styles.img}>
                  <Image
                    src={c.img}
                    alt={`SSS ${c.name} series wheel`}
                    fill
                    sizes="(max-width: 700px) 100vw, 440px"
                    className={styles.photo}
                  />
                </div>
              </div>
              <div>
                <div className={styles.numRow}>
                  <span className={styles.num}>{num}</span>
                  <span className={styles.series}>SSS {c.name} Series</span>
                </div>
                <h2 className={styles.title}>{c.name} wheels</h2>
                <div className={styles.tag}>{c.tag}</div>
                <p className={styles.blurb}>{c.blurb}</p>
                <div className={styles.bullets}>
                  {c.bullets.map((b) => (
                    <div key={b} className={styles.bullet}>
                      <span className={styles.bulletMark} />
                      {b}
                    </div>
                  ))}
                </div>
                <Link href={`/wheels?cat=${c.id}`} className={styles.cta}>
                  Browse {c.name} range
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
