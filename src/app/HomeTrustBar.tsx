import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
} from "@/lib/site";
import { StatIcon, type StatIconId } from "@/components/BrandIcons";
import styles from "./HomeTrustBar.module.css";

// Real facts already stated elsewhere on the site (Google rating, who we
// supply, warehouse location, trade-only supply) -- not new claims.
const ITEMS: {
  icon: StatIconId;
  kicker: string;
  main: string;
  sub: React.ReactNode;
}[] = [
  {
    icon: "star",
    kicker: GOOGLE_RATING,
    main: "Rated on Google",
    sub: (
      <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {GOOGLE_REVIEW_COUNT} reviews · Read them{" "}
        <span aria-hidden="true">→</span>
      </a>
    ),
  },
  {
    icon: "people",
    kicker: "Melbourne",
    main: "Workshops & panel shops",
    sub: "Plus fleets we supply",
  },
  {
    icon: "warehouse",
    kicker: "VIC",
    main: "Own warehouse",
    sub: "Dandenong South",
  },
  {
    icon: "truck",
    kicker: "Trade only",
    main: "Wholesale supply",
    sub: (
      <a
        href={GOOGLE_WRITE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Write a review{" "}
        <span aria-hidden="true">→</span>
      </a>
    ),
  },
];

export default function HomeTrustBar() {
  return (
    <section className={styles.wrap} aria-label="SSS Wheels & Tyres at a glance">
      <div className={styles.card}>
        {ITEMS.map((item) => (
          <div key={item.kicker} className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <StatIcon id={item.icon} />
            </span>
            <div className={styles.text}>
              <div className={styles.kicker}>
                {item.kicker}
                {item.icon === "star" && (
                  <span className={styles.stars} aria-hidden="true">
                    ★★★★★
                  </span>
                )}
              </div>
              <div className={styles.main}>{item.main}</div>
              <div className={styles.sub}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
