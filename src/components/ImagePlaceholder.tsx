import styles from "./ImagePlaceholder.module.css";

/**
 * Stand-in for photography the business hasn't supplied yet (per the design
 * handoff's asset notes). Renders inside a `position: relative` parent with
 * a defined aspect-ratio/size — swap for a real <Image> once the photo exists.
 */
export default function ImagePlaceholder({
  label,
  showLabel = true,
  compact = false,
}: {
  label: string;
  showLabel?: boolean;
  /** Icon-only, no padding/label -- for small contexts like a 56px swatch
      where the standard icon+label treatment would overflow. */
  compact?: boolean;
}) {
  return (
    <div
      className={`${styles.placeholder} ${compact ? styles.compact : ""}`}
      role="img"
      aria-label={label}
    >
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
      {showLabel && !compact && <span className={styles.label}>{label}</span>}
    </div>
  );
}
