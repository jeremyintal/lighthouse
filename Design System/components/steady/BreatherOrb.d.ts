import * as React from "react";

export interface BreatherOrbProps {
  /** Orb diameter in px. Default 260. */
  size?: number;
  /** Show the "Breathe in / Breathe out" cue (toggles every 4s). Default true. */
  cue?: boolean;
}

/**
 * The 60-second breather orb — slow expand/contract on the deep-green field.
 * Render full-bleed on a `deep`/breather surface. Fixed 8s calm pace.
 * @startingPoint section="Steady" subtitle="Loop 1 — the 60-second breather" viewport="360x360"
 */
export function BreatherOrb(props: BreatherOrbProps): JSX.Element;
