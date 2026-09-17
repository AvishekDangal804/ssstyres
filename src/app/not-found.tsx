import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "96px 28px",
        gap: 18,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 800,
          fontSize: "clamp(64px, 10vw, 140px)",
          lineHeight: 0.9,
          color: "var(--red)",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 800,
          fontSize: "clamp(26px, 3vw, 36px)",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Page not found
      </h1>
      <p style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: 480, margin: 0 }}>
        That page doesn&apos;t exist — it may have moved, or the link was
        mistyped. Try the wheels catalogue or head back home.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 50,
            padding: "0 26px",
            borderRadius: 999,
            background: "var(--black)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Back to home
        </Link>
        <Link
          href="/wheels"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 50,
            padding: "0 26px",
            borderRadius: 999,
            border: "1.5px solid var(--black)",
            color: "var(--black)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Browse wheels
        </Link>
      </div>
    </section>
  );
}
