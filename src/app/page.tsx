import { pageMetadata } from "@/lib/site";
import HomeHero from "./HomeHero";
import HomeTrustBar from "./HomeTrustBar";
import HomeShowcase from "./HomeShowcase";
import styles from "./Home.module.css";

export const metadata = pageMetadata({
  title: "SSS Wheels & Tyres | Australian Wholesale Wheel & Tyre Supplier",
  description:
    "SSS Wheels & Tyres is an Australian trade-only wholesale supplier of wheels and tyres to panel shops, workshops, fleets and resellers.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeTrustBar />

      <div className={styles.content}>
        <HomeShowcase />
      </div>
    </>
  );
}
