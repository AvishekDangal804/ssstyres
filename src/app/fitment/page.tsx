import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import WheelAnatomy from "./WheelAnatomy";
import styles from "./Guide.module.css";

export const metadata = pageMetadata({
  title: "Guide | SSS Wheels & Tyres",
  description:
    "How to read a wheel spec, popular wheel sizes and how to find your own fitment — plain-language guidance before you order SSS wheels.",
  path: "/fitment",
});

const SIZES = [
  {
    size: '15"',
    tag: "Steel & trailer",
    tyre: '30–31"',
    suits: "Jimny · trailers",
    body: "The budget-friendly workhorse size. Maximum sidewall for airing down off-road, cheap to replace, and the go-to for box, boat and camper trailers.",
    img: "/assets/wheels/r3.png",
    dark: false,
  },
  {
    size: '16"',
    tag: "Touring & fleet",
    tyre: '32–33"',
    suits: "HiAce · Prado",
    body: "The tourer's sweet spot. Enough sidewall to survive outback corrugations, light-truck load ratings, and a size most 4x4 tyres are made in.",
    img: "/assets/wheels/r7.png",
    dark: true,
  },
  {
    size: '17"',
    tag: "4x4 all-rounder",
    tyre: '32–34"',
    suits: "Ranger · HiLux · RAV4",
    body: "A very common size on Australian dual cabs. Balances an aggressive look with real off-road sidewall.",
    img: "/assets/wheels/r4.png",
    dark: true,
  },
];

const STEPS = [
  {
    title: "Check the tyre placard",
    body: "Open the driver's door and look at the placard on the door jamb (or in the owner's manual). It lists the factory rim size, tyre size and recommended pressures — your safe starting point.",
  },
  {
    title: "Count studs & measure PCD",
    body: "Count the wheel studs. For an even count (6), measure centre-to-centre across two opposite studs. For 5-stud, measure from the back of one hole to the centre of the second one along. That's your bolt pattern, e.g. 6x139.7.",
  },
  {
    title: "Read the back of the wheel",
    body: "Most wheels are stamped on the inner barrel or spoke with the size and offset — look for markings like 17x8 and ET0 (or +0). Note them down along with your bolt pattern and you have a full spec.",
  },
];

const CARE = [
  {
    tag: "Torque",
    title: "Tighten to spec, in a star pattern",
    body: "Use a torque wrench and the manufacturer's figure for your vehicle — never a rattle gun by feel. Tighten opposite studs in a criss-cross pattern so the wheel seats evenly on the hub.",
  },
  {
    tag: "Re-torque",
    title: "Re-check after the first 100 km",
    body: "New wheels bed in as they're driven. Re-torque every wheel after roughly 100 km (and after any tyre rotation) — skipping this step is a common cause of loose wheels.",
  },
  {
    tag: "Beadlock",
    title: "Inspect ring hardware regularly",
    body: "On beadlock-style wheels, check the ring bolts are at the correct torque before serious off-road use and re-inspect after airing down. Keep the mating surfaces clean and free of grit.",
  },
  {
    tag: "Finish care",
    title: "Wash warm, never harsh chemicals",
    body: "Clean with mild car soap and water and dry with a soft cloth. Avoid acidic or high-alkaline wheel cleaners on machined and painted finishes — harsh chemicals can dull or corrode the finish, and that damage isn't covered by the warranty.",
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
            The SSS guide
          </div>
          <h1 className={styles.heroH1}>Know your wheels. Order with confidence.</h1>
          <p className={styles.heroBody}>
            Learn to read a wheel spec, find the right size for your vehicle,
            and check the fitment — everything you need before you place an
            order, in plain language.
          </p>
          <div className={styles.heroCtas}>
            <a href="#anatomy" className={styles.btnWhite}>
              How to read a wheel <span>↓</span>
            </a>
            <a href="#finder" className={styles.btnGhostLight}>
              Find my fitment
            </a>
          </div>
          <div className={styles.heroStats}>
            <div>
              <div className={styles.heroStatNum}>3</div>
              <div className={styles.heroStatLabel}>Numbers to know</div>
            </div>
            <div>
              <div className={styles.heroStatNum}>15–17&quot;</div>
              <div className={styles.heroStatLabel}>Size range</div>
            </div>
          </div>
        </div>
      </section>

      <WheelAnatomy />

      <section className={styles.sizes} aria-labelledby="guide-sizes">
        <div className={styles.sizesHead}>
          <div>
            <div className={styles.eyebrow}>Part 2 — Sizing</div>
            <h2 id="guide-sizes" className={styles.h2}>
              Popular wheel sizes
            </h2>
          </div>
          <div className={styles.sizesNote}>
            Bigger isn&apos;t always better — match the size to how the vehicle
            is used.
          </div>
        </div>
        <div className={styles.sizeGrid}>
          {SIZES.map((s) => (
            <div
              key={s.size}
              className={`${styles.sizeCard} ${s.dark ? styles.sizeDark : ""}`}
            >
              <div className={styles.sizeArt} aria-hidden="true">
                <Image
                  src={s.img}
                  alt=""
                  fill
                  sizes="150px"
                  className={styles.contain}
                />
              </div>
              <div className={styles.sizeInner}>
                <div className={styles.sizeNum}>{s.size}</div>
                <div className={styles.sizeTag}>{s.tag}</div>
                <p className={styles.sizeBody}>{s.body}</p>
                <dl className={styles.sizeFacts}>
                  <div>
                    <dt>Tyre</dt>
                    <dd>{s.tyre}</dd>
                  </div>
                  <div>
                    <dt>Suits</dt>
                    <dd>{s.suits}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="finder" className={styles.finder}>
        <div className={styles.finderInner}>
          <div className={styles.sectionHeadTight}>
            <div className={styles.eyebrow}>Part 3 — Find your own fitment</div>
            <h2 className={styles.h2}>Read it straight off your vehicle</h2>
            <p className={styles.lead}>
              Your current setup already carries every number you need.
              Here&apos;s where to find each one before you order.
            </p>
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
          <div className={styles.rule}>
            <span className={styles.ruleLabel}>Golden rule</span>
            <span className={styles.ruleText}>
              Bolt pattern and centre bore must match exactly. Size and offset
              can change within legal limits — but if you&apos;re lifting,
              going wider or unsure of the law in your state, confirm with us
              first.
            </span>
          </div>
        </div>
      </section>

      <section className={styles.care} aria-labelledby="guide-care">
        <div className={styles.sectionHeadTight}>
          <div className={styles.eyebrow}>Part 4 — Fitting &amp; aftercare</div>
          <h2 id="guide-care" className={styles.h2}>
            Fit them right, keep them right
          </h2>
          <p className={styles.lead}>
            A wheel is only as good as its fitting. These steps apply to every
            SSS wheel and line up with the conditions in our{" "}
            <Link href="/legal#warranty" className={styles.inlineLink}>
              warranty terms
            </Link>
            .
          </p>
        </div>
        <div className={styles.careGrid}>
          {CARE.map((c) => (
            <div key={c.tag} className={styles.careCard}>
              <div className={styles.careTag}>{c.tag}</div>
              <h3 className={styles.careTitle}>{c.title}</h3>
              <p className={styles.careBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ask}>
        <div className={styles.askCard}>
          <div className={styles.askText}>
            <div className={styles.askEyebrow}>Still not sure?</div>
            <h2 className={styles.askTitle}>
              Send us your details — we&apos;ll confirm it.
            </h2>
            <p className={styles.askBody}>
              Give us your vehicle, rego or current wheel spec and our team
              will confirm the exact fitment, load rating and the legal offset
              range for your state before you order.
            </p>
          </div>
          <div className={styles.askBtns}>
            <Link href="/contact" className={styles.btnRed}>
              Ask our team <span>→</span>
            </Link>
            <a href="tel:0391165787" className={styles.btnGhostLight}>
              Call 03 9116 5787
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
