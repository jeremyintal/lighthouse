import React from "react";

/**
 * A gentle, non-judgmental picture of the month — one soft dot per day. Filled
 * dots are days a breather was used; hollow are hard days logged. NO streaks,
 * no counts of failure, no red. Reassurance, not a scoreboard.
 */
export function MomentDots({ days = [], caption, columns = 7, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, ...style }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8, justifyItems: "center" }}>
        {days.map((d, i) => {
          const used = d === "used";
          const hard = d === "hard";
          return (
            <span
              key={i}
              title={used ? "Used a breather" : hard ? "A hard day" : "Quiet day"}
              style={{
                width: 18,
                height: 18,
                borderRadius: "var(--radius-full)",
                background: used ? "var(--accent)" : hard ? "var(--repair-soft)" : "var(--surface-well)",
                border: used ? "none" : `1.5px solid ${hard ? "var(--repair)" : "var(--border-hairline)"}`,
              }}
            />
          );
        })}
      </div>
      {caption && (
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-caption-size)", color: "var(--text-soft)", lineHeight: "var(--type-caption-line)" }}>
          {caption}
        </span>
      )}
    </div>
  );
}
