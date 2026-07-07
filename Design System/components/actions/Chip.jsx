import React from "react";

/**
 * A selectable pill — situation filters ("Bedtime", "Mealtime") and check-in
 * feelings. Toggles between quiet and selected; ≥44px tall for thumb use.
 */
export function Chip({ children, selected = false, leadingIcon, style, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      type="button"
      aria-pressed={selected}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        minHeight: "var(--tap-min)",
        padding: "0 18px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--type-label-size)",
        fontWeight: 600,
        color: selected ? "var(--on-accent)" : "var(--text-soft)",
        background: selected ? "var(--accent)" : "var(--surface-card)",
        border: `1px solid ${selected ? "transparent" : "var(--border-hairline)"}`,
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "transform var(--dur-fast) var(--ease-calm), background var(--dur-fast) var(--ease-calm), color var(--dur-fast) var(--ease-calm)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
