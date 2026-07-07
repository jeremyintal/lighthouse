import React from "react";

/**
 * A calm toggle for the few settings Steady has (haptics, bedtime theme,
 * anonymous mode). Slow track transition; ≥44px row hit area recommended.
 */
export function Switch({ checked = false, onChange, label, description, disabled = false, style }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 16, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      {(label || description) && (
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {label && <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-body-size)", fontWeight: 500, color: "var(--text-body)" }}>{label}</span>}
          {description && <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-caption-size)", color: "var(--text-soft)" }}>{description}</span>}
        </span>
      )}
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          position: "relative",
          width: 52,
          height: 32,
          flex: "none",
          borderRadius: "var(--radius-full)",
          background: checked ? "var(--accent)" : "var(--surface-well)",
          border: `1px solid ${checked ? "transparent" : "var(--border-input)"}`,
          transition: "background var(--dur-gentle) var(--ease-calm)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 23 : 3,
            width: 24,
            height: 24,
            borderRadius: "var(--radius-full)",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(30,45,40,0.25)",
            transition: "left var(--dur-gentle) var(--ease-settle)",
          }}
        />
      </span>
    </label>
  );
}
