import React from "react";

/**
 * The 60-second breather. A slow expanding/contracting orb on the deep-green
 * immersive field, with a "Breathe in / Breathe out" cue. Pace is fixed at the
 * 8s calm cycle. Meant to be rendered full-bleed on a `deep` surface.
 */
export function BreatherOrb({ size = 260, cue = true }) {
  const [phase, setPhase] = React.useState("Breathe in");
  React.useEffect(() => {
    if (!cue) return;
    const id = setInterval(() => setPhase((p) => (p === "Breathe in" ? "Breathe out" : "Breathe in")), 4000);
    return () => clearInterval(id);
  }, [cue]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.10)", animation: "steady-breathe-soft calc(var(--dur-breath) * 2) var(--ease-calm) infinite" }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: size * 0.16, borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.16)", animation: "steady-breathe calc(var(--dur-breath) * 2) var(--ease-calm) infinite" }} />
        <span style={{ position: "absolute", inset: size * 0.30, borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.92)", animation: "steady-breathe calc(var(--dur-breath) * 2) var(--ease-calm) infinite" }} />
      </div>
      {cue && (
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--type-title-size)", fontWeight: 500, color: "var(--text-on-dark)", transition: "opacity var(--dur-gentle) var(--ease-calm)" }}>
          {phase}
        </span>
      )}
    </div>
  );
}
