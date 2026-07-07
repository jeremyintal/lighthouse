import React from "react";

/**
 * Bottom sheet — the app's main way to surface a moment (script, check-in).
 * Plain scrim (no blur), 28px top radius, gentle slide. Grabber + optional close.
 */
export function Sheet({ children, open = true, title, onClose, style }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: open ? "rgba(34,48,43,0.4)" : "transparent",
        pointerEvents: open ? "auto" : "none",
        transition: "background var(--dur-gentle) var(--ease-calm)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-card)",
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          padding: "12px var(--screen-pad) calc(var(--screen-pad) + env(safe-area-inset-bottom, 8px))",
          boxShadow: "var(--shadow-raised)",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform var(--dur-gentle) var(--ease-settle)",
          ...style,
        }}
      >
        <div style={{ width: 40, height: 5, borderRadius: 999, background: "var(--line-strong)", margin: "0 auto 14px" }} />
        {title && (
          <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: "var(--type-title-size)", lineHeight: "var(--type-title-line)", fontWeight: "var(--type-title-weight)", color: "var(--text-body)" }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
