// Shared between HomeShowcase (stats strip, reviews banner) and HeroSearch
// (hero search card stat badges) -- kept in one place so both render the
// same marks for the same facts instead of two near-identical copies.

// Official Google "G" mark (per Google's brand guidelines for identifying
// content as coming from Google) -- not a stand-in icon.
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export type StatIconId =
  | "truck"
  | "wheel"
  | "warehouse"
  | "portal"
  | "wrench"
  | "spray"
  | "fleet"
  | "star"
  | "people";

export function StatIcon({ id }: { id: StatIconId }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "truck":
      return (
        <svg {...common}>
          <rect x="1.5" y="7" width="12" height="9" rx="1" />
          <path d="M13.5 10h4l3 3v3h-7z" />
          <circle cx="6" cy="18" r="1.6" />
          <circle cx="17" cy="18" r="1.6" />
        </svg>
      );
    case "wheel":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 5.5V9.6M12 14.4v4.1M5.5 12h4.1M14.4 12h4.1M7.3 7.3l2.9 2.9M13.8 13.8l2.9 2.9M16.7 7.3l-2.9 2.9M10.2 13.8l-2.9 2.9" />
        </svg>
      );
    case "warehouse":
      return (
        <svg {...common}>
          <path d="M2 10.5 12 4l10 6.5" />
          <path d="M4 9.5V20h16V9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      );
    case "portal":
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="19" height="13" rx="1.5" />
          <path d="M2.5 15h19" />
          <path d="M9 20h6" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L3 17.2V21h3.8l6.3-6.3a4 4 0 0 0 4.6-5.4l-2.8 2.8-2.1-2.1 2.9-2.8Z" />
        </svg>
      );
    case "spray":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="8" height="13" rx="1.4" />
          <path d="M9 8V5.5a2 2 0 0 1 2-2h1" />
          <path d="M14.5 3.5h2M16 6.5h3M15 9.5h2.5" />
        </svg>
      );
    case "fleet":
      return (
        <svg {...common}>
          <rect x="1.5" y="9" width="11" height="8" rx="1" />
          <path d="M12.5 11.5h3.2l2.8 2.8V17h-6z" />
          <circle cx="5.6" cy="17.6" r="1.6" />
          <circle cx="16.4" cy="17.6" r="1.6" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.2 14.5 9l6.3.5-4.8 4.1 1.5 6.2L12 16.7 6.5 19.8l1.5-6.2-4.8-4.1L9.5 9 12 3.2Z" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="8.5" cy="7.5" r="3" />
          <path d="M2.5 20v-1.5a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5V20" />
          <path d="M16 4.3a3 3 0 0 1 0 5.9" />
          <path d="M18.5 13.1a5 5 0 0 1 3 4.6V20" />
        </svg>
      );
  }
}
