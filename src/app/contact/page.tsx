import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PORTAL } from "@/lib/wheels-data";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact | SSS Wheels & Tyres",
  description:
    "Stock, fitment, warranty or trade accounts — call, email or drop in to SSS Wheels & Tyres in Dandenong South.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact us"
        title="Talk to someone who knows wheels"
        body="Stock, fitment, warranty or trade accounts — call, email or drop in. We answer during business hours, Monday to Saturday."
      />
      <section className={styles.layout}>
        <div className={styles.infoStack}>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Phone</div>
            <a href="tel:0391165787" className={styles.infoBig}>
              03 9116 5787
            </a>
            <div className={styles.infoSub}>Mon–Fri 8:00–5:00 · Sat 8:30–12:30</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Email</div>
            <a
              href="mailto:info@ssswheels.com.au"
              className={`${styles.infoBig} ${styles.small}`}
            >
              info@ssswheels.com.au
            </a>
            <div className={styles.infoSub}>We aim to reply promptly</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Warehouse — Melbourne</div>
            <div className={`${styles.infoBig} ${styles.address}`}>
              13 Advantage Drive,
              <br />
              Dandenong South VIC 3175
            </div>
            <div className={styles.infoSub}>Sydney, Brisbane &amp; Adelaide opening soon</div>
          </div>
          <div className={styles.dealersCard}>
            <div className={styles.dealersLabel}>Dealers</div>
            <div className={styles.dealersBody}>
              Order through the wholesale portal, or apply for a trade
              account.
            </div>
            <div className={styles.dealersCtas}>
              <a
                href={PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnRed}
              >
                Wholesale Login
              </a>
              <Link href="/dealer" className={styles.btnGhostDark}>
                Become a dealer
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.formCard}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
