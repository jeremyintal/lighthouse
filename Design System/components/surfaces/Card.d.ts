import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** surface (white, shadow) · well (sunken) · accent (green tint) · repair (clay tint) · deep (breather green). */
  tone?: "surface" | "well" | "accent" | "repair" | "deep";
  /** Whisper shadow on white surfaces; ignored for tinted tones (which use a hairline). */
  elevated?: boolean;
  padding?: number;
  onClick?: React.MouseEventHandler;
}

/**
 * Base surface — 20px radius, one whisper shadow OR a hairline, never both heavy.
 * @startingPoint section="Surfaces" subtitle="Five tones for the app's moments" viewport="360x220"
 */
export function Card(props: CardProps): JSX.Element;
