import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { PORTAL } from "@/lib/wheels-data";
import DealerForm from "./DealerForm";
import styles from "./Dealer.module.css";

export const metadata: Metadata = {
  title: "Become a Dealer | SSS Wheels & Tyres",
  description:
    "Apply for an SSS Wheels trade account — panel shops, mechanical workshops, fleets and tyre resellers order at wholesale pricing through the dealer portal.",
};

export default function DealerPage() {
  return (
    <>
      <PageHeader
        kicker="Wholesale"
        title="Become an SSS dealer"
        body="Panel shops, mechanical workshops, fleets and tyre resellers — apply for a trade account and order at wholesale pricing through the dealer portal."
      />
      <section className={styles.layout}>
        <div>
          <h2 className={styles.howTitle}>How it works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <div>
                <div className={styles.stepTitle}>Apply</div>
                <div className={styles.stepBody}>
                  Tell us about your business — takes two minutes. We&apos;ll
                  review your application and be in touch.
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <div>
                <div className={styles.stepTitle}>Get approved</div>
                <div className={styles.stepBody}>
                  Your account manager sets up wholesale pricing and walks
                  you through the range and lead times.
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <div>
                <div className={styles.stepTitle}>Order online</div>
                <div className={styles.stepBody}>
                  Log in to the dealer portal to place orders, dispatched
                  from Dandenong South.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.alreadyCard}>
            <div className={styles.alreadyTitle}>Already a dealer?</div>
            <p className={styles.alreadyBody}>
              Head straight to the portal to check stock and place orders.
            </p>
            <a
              href={PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.alreadyBtn}
            >
              Wholesale Login →
            </a>
          </div>
        </div>
        <div className={styles.formCard}>
          <DealerForm />
        </div>
      </section>
    </>
  );
}
