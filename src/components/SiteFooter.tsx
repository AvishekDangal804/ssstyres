"use client";

import Link from "next/link";
import Image from "next/image";
import { PORTAL } from "@/lib/wheels-data";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const bandRef = useScrollProgress<HTMLDivElement>((p, el) => {
    const img = el.querySelector<HTMLElement>("[data-band-img]");
    if (img) img.style.transform = `translate3d(0, ${((p - 0.5) * 140).toFixed(1)}px, 0)`;
  });

  return (
    <footer>
      <section ref={bandRef} className={styles.band}>
        <div data-band-img className={styles.bandImg} aria-hidden="true">
          <Image
            src="/assets/beadlock-exploded.png"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className={styles.bandPhoto}
          />
        </div>
        <div className={styles.bandScrim} />
        <div className={styles.bandInner}>
          <div className={styles.bandKicker}>
            <span />
            Trade accounts
          </div>
          <h2 className={styles.bandTitle}>Ready to stock SSS Wheels?</h2>
          <p className={styles.bandBody}>
            Join workshops, fleets and resellers across Australia. Apply
            online to open a trade account.
          </p>
          <div className={styles.bandCtas}>
            <Link href="/dealer" className={styles.btnRed}>
              Apply to become a dealer <span>→</span>
            </Link>
            <a
              href={PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOutline}
            >
              Wholesale Login
            </a>
          </div>
        </div>
      </section>

      <div className={styles.dark}>
        <div className={styles.grid}>
          <div>
            <Image
              src="/assets/logo-white.png"
              alt="SSS Wheels & Tyres"
              width={208}
              height={32}
              style={{ height: 32, width: "auto" }}
            />
            <p className={styles.tagline}>
              Wholesale Wheels &amp; Tyres for Australian Trade
            </p>
            <p>
              Wheels and tyres supplied wholesale to Australian dealers,
              workshops, fleets and resellers.
            </p>
          </div>
          <div>
            <h2 className={styles.colTitle}>Wheels</h2>
            <div className={styles.colLinks}>
              <Link href="/wheels?cat=steel">Steel</Link>
              <Link href="/wheels?cat=offroad">Off Road</Link>
              <Link href="/wheels?cat=beadlock">Beadlocks</Link>
              <Link href="/wheels?cat=street">Street</Link>
              <Link href="/wheels?cat=commercial">Commercial</Link>
              <Link href="/wheels?cat=trailer">Trailer</Link>
              <Link href="/collections">All collections</Link>
            </div>
          </div>
          <div>
            <h2 className={styles.colTitle}>Company</h2>
            <div className={styles.colLinks}>
              <Link href="/dealer">Become a Dealer</Link>
              <Link href="/about">About Us</Link>
              <Link href="/accessories">Accessories</Link>
              <Link href="/fitment">Fitment Guide</Link>
              <Link href="/media">Media</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>
          <div>
            <h2 className={styles.colTitle}>Warehouse</h2>
            <div className={styles.colLinks}>
              <span>
                13 Advantage Drive
                <br />
                Dandenong South, VIC 3175
              </span>
              <span className={styles.faded}>
                Sydney, Brisbane &amp; Adelaide
                <br />
                opening soon
              </span>
              <a href="tel:0391165787" className={styles.white}>
                03 9116 5787
              </a>
              <a href="mailto:info@ssswheels.com.au" className={styles.white}>
                info@ssswheels.com.au
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomInner}>
            <span>© 2026 SSS Wheels &amp; Tyres Pty Ltd</span>
            <div className={styles.bottomLinks}>
              <Link href="/legal#privacy">Privacy</Link>
              <Link href="/legal#terms">Terms</Link>
              <Link href="/legal#warranty">Warranty &amp; Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
