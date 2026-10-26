import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import WheelAnatomy from "./WheelAnatomy";
import styles from "./Guide.module.css";

export const metadata = pageMetadata({
  title: "Wheel Fitment Guide | SSS Wheels & Tyres",
  description:
    "The essential wheel measurements and how to check your fitment before you order SSS wheels.",
  path: "/fitment",
});

const STEPS = [
  {
    title: "Check the tyre placard",
    body: "Find it on the driver's door jamb. It lists factory rim and tyre sizes.",
  },
  {
    title: "Record your current specs",
    body: "Note your wheel size, bolt pattern and offset.",
  },
  {
    title: "Confirm with our team",
    body: "We'll confirm compatibility before you order.",
  },
];

export default function GuidePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroWheel} aria-hidden="true">
          <Image
            src="/assets/wheels/r7.png"
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 900px) 52vw, 760px"
            className={styles.contain}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div className={styles.kickerRow}>
            <span className={styles.bar} />
            SSS guide
          </div>
          <h1 className={styles.heroH1}>Wheel Fitment Guide</h1>
          <p className={styles.heroBody}>
            The measurements and steps to order the right SSS wheel the
            first time.
          </p>
          <div className={styles.heroCtas}>
            <a href="#enquire" className={styles.btnWhite}>
              Enquire About Fitment
            </a>
          </div>
        </div>
      </section>

      <WheelAnatomy />

      <section className={styles.finder}>
        <div className={styles.finderInner}>
          <div className={styles.sectionHeadTight}>
            <div className={styles.eyebrow}>Check your fitment</div>
            <h2 className={styles.h2}>How to check your fitment</h2>
          </div>
          <div className={styles.stepGrid}>
            {STEPS.map((st, i) => (
              <div key={st.title} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <h3 className={styles.stepTitle}>{st.title}</h3>
                <p className={styles.stepBody}>{st.body}</p>
              </div>
            ))}
          </div>
          <div id="enquire" className={styles.askCard}>
            <div className={styles.askText}>
              <h2 className={styles.askTitle}>Need help confirming fitment?</h2>
              <p className={styles.askBody}>
                Send your vehicle or wheel spec and we&apos;ll confirm
                fitment.
              </p>
            </div>
            <div className={styles.askBtns}>
              <Link href="/contact" className={styles.btnRed}>
                Enquire About Fitment <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
