import * as React from "react";

export interface MomentDotsProps {
  /** One entry per day: "used" (breather used) · "hard" (hard day logged) · "quiet". */
  days?: ("used" | "hard" | "quiet")[];
  /** Human, non-judgmental caption, e.g. "14 hard moments this month; you used a breather in 9." */
  caption?: string;
  columns?: number;
  style?: React.CSSProperties;
}

/**
 * A gentle month view — one soft dot per day. Green = breather used, clay-outline
 * = hard day, quiet well = nothing. No streaks, no red, no scoreboard.
 * @startingPoint section="Steady" subtitle="Progress without guilt — no streaks" viewport="360x140"
 */
export function MomentDots(props: MomentDotsProps): JSX.Element;
