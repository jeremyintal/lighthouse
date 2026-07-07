import * as React from "react";

export interface ScriptCardProps {
  /** Overline situation label, e.g. "When they hit or throw". */
  situation?: string;
  /** The serif line(s) a parent says out loud. String or array. */
  say?: string | string[];
  /** The one DO (physical, imperative). */
  doLine?: string;
  /** The one DON'T (framed as relief, not correction). */
  dontLine?: string;
  /** Repair scripts stay free — shows a "Free" badge. */
  free?: boolean;
  style?: React.CSSProperties;
}

/**
 * The trust engine: one situation, the spoken script (serif), one DO + one DON'T.
 * Every script pairs exactly one do with one don't.
 * @startingPoint section="Steady" subtitle="Loop 1 — one script, one do, one don't" viewport="360x340"
 */
export function ScriptCard(props: ScriptCardProps): JSX.Element;
