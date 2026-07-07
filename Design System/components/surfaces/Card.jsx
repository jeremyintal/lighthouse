import React from "react";

/**
 * The base surface. Soft 20px radius, whisper shadow OR hairline (not both heavy).
 * `tone` shifts the fill for repair / bedtime / accent moments.
 */
export function Card({ children, tone = "surface", elevated = true, padding = 20, onClick, style, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  const tones = {
    surface: { background: "var(--surface-card)", color: "var(--text-body)" },
    well: { background: "var(--surface-well)", color: "var(--text-body)" },
    accent: { background: "var(--accent-faint)", color: "var(--text-body)" },
    repair: { background: "var(--repair-soft)", color: "var(--repair-strong)" },
    deep: { background: "var(--surface-accent-deep)", color: "var(--text-on-dark)" },
  }[tone];
  const interactive = !!onClick;
  return (
    <div
      onClick={onClick}
      onPointerDown={() => interactive && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: elevated && tone === "surface" ? "var(--shadow-card)" : "none",
        border: elevated && tone === "surface" ? "none" : tone === "deep" ? "none" : "1px solid var(--border-hairline)",
        cursor: interactive ? "pointer" : "default",
        transform: pressed ? "scale(0.99)" : "scale(1)",
        transition: "transform var(--dur-fast) var(--ease-calm)",
        ...tones,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
