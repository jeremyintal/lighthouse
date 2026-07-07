import React from "react";

/**
 * The trust engine. One script: an overline situation, the serif line(s) a
 * parent says out loud, one DO and one DON'T. Repair scripts stay free (badge).
 */
export function ScriptCard({ situation = "When they hit or throw", say = [], doLine, dontLine, free = false, style }) {
  const lines = Array.isArray(say) ? say : [say];
  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-overline-size)", fontWeight: 700, letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--text-accent)" }}>
          {situation}
        </span>
        {free && (
          <span style={{ padding: "4px 9px", fontFamily: "var(--font-ui)", fontSize: "var(--type-caption-size)", fontWeight: 600, borderRadius: "var(--radius-sm)", background: "var(--green-100)", color: "var(--accent-strong)" }}>
            Free
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lines.map((l, i) => (
          <p key={i} style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--type-script-size)", lineHeight: "var(--type-script-line)", fontWeight: "var(--type-script-weight)", color: "var(--text-body)" }}>
            {l.startsWith("“") ? l : l}
          </p>
        ))}
      </div>

      <div style={{ height: 1, background: "var(--border-hairline)" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Line kind="do" text={doLine} />
        <Line kind="dont" text={dontLine} />
      </div>
    </div>
  );
}

function Line({ kind, text }) {
  if (!text) return null;
  const isDo = kind === "do";
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span
        aria-hidden="true"
        style={{
          flex: "none",
          marginTop: 2,
          width: 22,
          height: 22,
          borderRadius: "var(--radius-full)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          background: isDo ? "var(--accent-soft)" : "var(--repair-soft)",
          color: isDo ? "var(--accent-strong)" : "var(--repair-strong)",
        }}
      >
        {isDo ? "✓" : "—"}
      </span>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-body-size)", lineHeight: "var(--type-body-line)", color: "var(--text-body)" }}>
        <b style={{ fontWeight: 700 }}>{isDo ? "Do. " : "Don't. "}</b>
        {text}
      </span>
    </div>
  );
}
