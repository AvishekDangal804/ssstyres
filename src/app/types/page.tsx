import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { CATEGORIES } from "@/lib/wheels-data";
import TypesAccordion from "./TypesAccordion";
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
        <TypesAccordion categories={CATEGORIES} />
      </section>
    </>
  );
}
