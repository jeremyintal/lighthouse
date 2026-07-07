import React from "react";

/**
 * Steady button. Honest verbs, sentence case, ≥44px tall (one-handed law).
 * Variants: primary (Steady green), repair (clay — aftermath moments),
 * secondary (tinted), ghost (quiet, for real declines), crisis (rare).
 */
export function Button({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = true,
  leadingIcon,
  trailingIcon,
  disabled = false,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);

  const sizes = {
    lg: { height: "var(--tap-comfy)", padding: "0 24px", font: "var(--type-label-size)" },
    md: { height: "var(--tap-min)", padding: "0 18px", font: "var(--type-label-size)" },
    sm: { height: 36, padding: "0 14px", font: "var(--type-caption-size)" },
  }[size];

  const variants = {
    primary: { background: "var(--accent)", color: "var(--on-accent)", border: "1px solid transparent" },
    repair: { background: "var(--repair)", color: "#ffffff", border: "1px solid transparent" },
    secondary: { background: "var(--accent-soft)", color: "var(--accent-strong)", border: "1px solid transparent" },
    ghost: { background: "transparent", color: "var(--text-soft)", border: "1px solid var(--border-hairline)" },
    crisis: { background: "var(--red-50)", color: "var(--red-700)", border: "1px solid var(--red-700)" },
  }[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: fullWidth ? "100%" : "auto",
        height: sizes.height,
        padding: sizes.padding,
        fontFamily: "var(--font-ui)",
        fontSize: sizes.font,
        fontWeight: 600,
        lineHeight: 1,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transform: pressed && !disabled ? "scale(0.98)" : "scale(1)",
        transition: "transform var(--dur-fast) var(--ease-calm), background var(--dur-fast) var(--ease-calm)",
        WebkitTapHighlightColor: "transparent",
        ...variants,
        ...style,
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
