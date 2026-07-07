import React from "react";

/**
 * The hero. One big, soft, gently breathing button a parent taps mid-meltdown.
 * Fully round, always in the bottom half of the screen, huge hit target.
 * Breathes on an 8s cycle (respects prefers-reduced-motion via the CSS keyframe).
 */
export function SOSButton({ label = "It's happening", sublabel = "Tap for a breather", size = 220, onClick, style }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        position: "relative",
        width: size,
        height: size,
        border: "none",
        borderRadius: "var(--radius-full)",
        background: "transparent",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "transform var(--dur-fast) var(--ease-calm)",
        ...style,
      }}
    >
      {/* halo — soft, slow, out of phase */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -18,
          borderRadius: "var(--radius-full)",
          background: "var(--accent)",
          opacity: 0.16,
          animation: "steady-breathe-soft calc(var(--dur-breath) * 2) var(--ease-calm) infinite",
        }}
      />
      {/* core */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          borderRadius: "var(--radius-full)",
          background: "radial-gradient(120% 120% at 50% 30%, var(--accent) 0%, var(--accent-strong) 100%)",
          color: "var(--on-accent)",
          boxShadow: "var(--shadow-sos)",
          animation: "steady-breathe calc(var(--dur-breath) * 2) var(--ease-calm) infinite",
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: "30px", fontWeight: 560 }}>{label}</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-caption-size)", fontWeight: 500, opacity: 0.82 }}>{sublabel}</span>
      </span>
    </button>
  );
}
