import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./Trade.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Built for the Trade | SSS Wheels & Tyres",
  description:
    "How SSS Wheels & Tyres works with trade customers: own warehouse stock in Dandenong South, online ordering through the dealer portal, dealer support and wholesale pricing for approved trade accounts.",
  path: "/trade",
});

const JUMPS = [
  { href: "#warehouse", label: "Own warehouse stock" },
  { href: "#ordering", label: "Online ordering" },
  { href: "#support", label: "Dealer support" },
  { href: "#pricing", label: "Trade pricing" },
];

const STEPS = [
  {
    title: "Apply",
    body: "Tell us about your business. We'll review your application and be in touch.",
  },
  {
    title: "Get approved",
    body: "Your account manager sets up wholesale pricing and walks you through the range and lead times.",
  },
  {
    title: "Order online",
    body: "Log in to the dealer portal to place orders, dispatched from Dandenong South.",
  },
];

export default function TradePage() {
  return (
    <>
      <PageHeader
        kicker="Trade accounts"
        title="Built for the trade"
        body="SSS Wheels & Tyres supplies panel shops, mechanical workshops, fleet and rideshare operators and approved tyre resellers on a wholesale basis. Here's how it works."
      />

      <nav className={styles.jumpBar} aria-label="On this page">
        <div className={styles.jumpInner}>
          {JUMPS.map((j) => (
            <a key={j.href} href={j.href} className={styles.jump}>
              {j.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 01 — Own warehouse stock */}
      <section id="warehouse" className={styles.block} aria-labelledby="trade-warehouse">
        <div className={styles.text}>
          <div className={styles.num}>01</div>
          <h2 id="trade-warehouse" className={styles.h2}>
            Own warehouse stock
          </h2>
          <p className={styles.lead}>
            We hold our own stock at our Dandenong South warehouse.
          </p>
          <p className={styles.body}>
            Trade orders are dispatched from Dandenong South — the SSS
            D-Locker and D-Hole wheel range, plus the accessories that go
            with it.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Warehouse</dt>
              <dd>13 Advantage Drive, Dandenong South VIC 3175</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:0391165787">03 9116 5787</a> · Mon–Fri 8:00–5:00 ·
                Sat 8:30–12:30
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:info@ssswheels.com.au">info@ssswheels.com.au</a>
              </dd>
            </div>
          </dl>
          <div className={styles.links}>
            <Link href="/wheels" className={styles.btnDark}>
              See the wheel range <span>→</span>
            </Link>
            <Link href="/accessories" className={styles.btnOutline}>
              Accessories
            </Link>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.photo}>
            <Image
              src="/assets/lifestyle/silver-boxes.png"
              alt="SSS Wheels-branded boxes stacked in a warehouse, with a machined-silver beadlock-style wheel displayed in front"
              fill
              sizes="(max-width: 800px) 94vw, 600px"
              className={styles.photoImg}
            />
          </div>
        </div>
      </section>

      {/* 02 — Online ordering */}
      <section id="ordering" className={`${styles.block} ${styles.flip}`} aria-labelledby="trade-ordering">
        <div className={styles.text}>
          <div className={styles.num}>02</div>
          <h2 id="trade-ordering" className={styles.h2}>
            Online ordering
          </h2>
          <p className={styles.lead}>
            Place orders directly through our dealer portal.
          </p>
          <p className={styles.body}>
            Approved trade accounts log in to the portal to order. Wholesale
            orders generally need a registered trade account that we&apos;ve
            approved — the{" "}
            <Link href="/legal#terms" className={styles.inlineLink}>
              Terms
            </Link>{" "}
            set out the details. Accessories are ordered alongside wheels
            through the portal, or by phone for one-off requirements.
          </p>
          <div className={styles.links}>
            <a
              href={PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnRed}
            >
              Wholesale login <span>→</span>
            </a>
            <Link href="/dealer" className={styles.btnOutline}>
              Become a dealer
            </Link>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.darkCard}>
            <div className={styles.cardLabel}>How it works</div>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div>
                    <div className={styles.stepTitle}>{s.title}</div>
                    <div className={styles.stepBody}>{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 — Dealer support */}
      <section id="support" className={styles.block} aria-labelledby="trade-support">
        <div className={styles.text}>
          <div className={styles.num}>03</div>
          <h2 id="trade-support" className={styles.h2}>
            Dealer support
          </h2>
          <p className={styles.lead}>
            An account manager for pricing, range and lead times.
          </p>
          <p className={styles.body}>
            Once your account is approved, your account manager sets up
            wholesale pricing and walks you through the range and lead times.
            Trade account holders can also contact their account manager
            about warranty claims — see{" "}
            <Link href="/legal#warranty" className={styles.inlineLink}>
              Warranty &amp; Returns
            </Link>
            .
          </p>
          <p className={styles.body}>
            Not sure what fits? Our{" "}
            <Link href="/fitment" className={styles.inlineLink}>
              Guide
            </Link>{" "}
            explains how to read a wheel spec, and our team will confirm the
            exact fitment before you order.
          </p>
          <div className={styles.links}>
            <Link href="/contact" className={styles.btnDark}>
              Talk to the team <span>→</span>
            </Link>
            <Link href="/fitment" className={styles.btnOutline}>
              Wheel guide
            </Link>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.lightCard}>
            <div className={styles.cardLabel}>Contact us</div>
            <a href="tel:0391165787" className={styles.big}>
              03 9116 5787
            </a>
            <div className={styles.cardSub}>Mon–Fri 8:00–5:00 · Sat 8:30–12:30</div>
            <a href="mailto:info@ssswheels.com.au" className={styles.mail}>
              info@ssswheels.com.au
            </a>
          </div>
        </div>
      </section>

      {/* 04 — Trade pricing */}
      <section id="pricing" className={`${styles.block} ${styles.flip}`} aria-labelledby="trade-pricing">
        <div className={styles.text}>
          <div className={styles.num}>04</div>
          <h2 id="trade-pricing" className={styles.h2}>
            Trade pricing
          </h2>
          <p className={styles.lead}>
            Wholesale pricing for approved trade accounts.
          </p>
          <p className={styles.body}>
            Panel shops, mechanical workshops, fleets and tyre resellers order
            at wholesale pricing through the dealer portal. Apply for a trade
            account to get started.
          </p>
          <div className={styles.links}>
            <Link href="/dealer" className={styles.btnRed}>
              Apply for a trade account <span>→</span>
            </Link>
            <Link href="/legal#terms" className={styles.btnOutline}>
              Read the Terms
            </Link>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.lightCard}>
            <div className={styles.cardLabel}>Good to know</div>
            <ul className={styles.notes}>
              <li>Prices are in Australian dollars.</li>
              <li>
                Unless stated otherwise, prices exclude delivery, which is
                confirmed at the time of order.
              </li>
              <li>
                Goods are generally dispatched once cleared payment has been
                received, unless you hold an approved trade account with
                agreed payment terms.
              </li>
              <li>
                We may decline an application for a trade account at our
                discretion.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
