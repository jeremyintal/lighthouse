import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** neutral · accent · repair · free (repair scripts stay free) · warn. */
  tone?: "neutral" | "accent" | "repair" | "free" | "warn";
}

/** Tiny category/status label. Sentence case, quiet — never for counts or urgency. */
export function Badge(props: BadgeProps): JSX.Element;
