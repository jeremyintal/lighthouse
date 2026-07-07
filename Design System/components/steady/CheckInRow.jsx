import React from "react";

/**
 * The optional one-tap check-in after a moment: "How did that land?" — a row of
 * honest feeling chips, no scoring, no judgment. Never required to proceed.
 */
export function CheckInRow({
  prompt = "How did that land?",
  options = ["Steadier", "Still shaky", "Rough one"],
  value,
  onSelect,
  style,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, ...style }}>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-body-size)", fontWeight: 500, color: "var(--text-body)" }}>{prompt}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect && onSelect(opt)}
              style={{
                minHeight: "var(--tap-min)",
                padding: "0 18px",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--type-label-size)",
                fontWeight: 600,
                color: selected ? "var(--on-accent)" : "var(--text-soft)",
                background: selected ? "var(--accent)" : "var(--surface-well)",
                border: `1px solid ${selected ? "transparent" : "var(--border-hairline)"}`,
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                transition: "background var(--dur-fast) var(--ease-calm), color var(--dur-fast) var(--ease-calm)",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
