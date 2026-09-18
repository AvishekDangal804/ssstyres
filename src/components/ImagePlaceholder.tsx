import styles from "./ImagePlaceholder.module.css";

/**
 * Stand-in for photography the business hasn't supplied yet (per the design
 * handoff's asset notes). Renders inside a `position: relative` parent with
 * a defined aspect-ratio/size — swap for a real <Image> once the photo exists.
 */
export default function ImagePlaceholder({
  label,
  showLabel = true,
}: {
  label: string;
  showLabel?: boolean;
}) {
  return (
    <div className={styles.placeholder} role="img" aria-label={label}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={styles.icon}
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.75" />
        <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.12 0L4 19" />
      </svg>
      {showLabel && <span className={styles.label}>{label}</span>}
    </div>
  );
}
