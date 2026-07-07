import React from "react";

/**
 * A tiny status/category label. Quiet by default; sentence case, no shouting.
 * Used for "Free", "Bedtime", "New lesson" — never for counts or urgency.
 */
export function Badge({ children, tone = "neutral", style, ...rest }) {
  const tones = {
    neutral: { background: "var(--surface-well)", color: "var(--text-soft)" },
    accent: { background: "var(--accent-soft)", color: "var(--accent-strong)" },
    repair: { background: "var(--repair-soft)", color: "var(--repair-strong)" },
    free: { background: "var(--green-100)", color: "var(--accent-strong)" },
    warn: { background: "var(--amber-50)", color: "var(--amber-700)" },
  }[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--type-caption-size)",
        fontWeight: 600,
        borderRadius: "var(--radius-sm)",
        ...tones,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
