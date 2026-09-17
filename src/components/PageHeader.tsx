import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

export default function PageHeader({
  kicker,
  title,
  body,
  meta,
}: {
  kicker: string;
  title: ReactNode;
  body?: ReactNode;
  meta?: ReactNode;
}) {
  const h1Class = body
    ? styles.withBody
    : meta
      ? styles.withMeta
      : "";
  return (
    <section className={styles.header}>
      <div className={styles.headerSlash} />
      <div className={styles.headerInner}>
        <div className={styles.kicker}>{kicker}</div>
        <h1 className={`${styles.h1} ${h1Class}`}>{title}</h1>
        {body && <p className={styles.body}>{body}</p>}
        {meta && <div className={styles.meta}>{meta}</div>}
      </div>
    </section>
  );
}
