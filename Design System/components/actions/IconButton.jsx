import React from "react";
import { Icon } from "../steady/Icon.jsx";

/**
 * A round, icon-only control for quiet chrome actions (close a sheet, back).
 * Always carries an aria-label — icons never stand alone semantically.
 */
export function IconButton({ icon, label, variant = "quiet", size = 44, style, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  const variants = {
    quiet: { background: "var(--surface-well)", color: "var(--text-soft)" },
    onDark: { background: "rgba(255,255,255,0.16)", color: "var(--text-on-dark)" },
    accent: { background: "var(--accent-soft)", color: "var(--accent-strong)" },
  }[variant];
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        border: "none",
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "transform var(--dur-fast) var(--ease-calm)",
        WebkitTapHighlightColor: "transparent",
        ...variants,
        ...style,
      }}
      {...rest}
    >
      {typeof icon === "string" ? <Icon name={icon} size={Math.round(size * 0.45)} /> : icon}
    </button>
  );
}
