import * as React from "react";

export interface CheckInRowProps {
  /** Plain prompt, e.g. "How did that land?". */
  prompt?: string;
  /** Feeling options — honest, non-scoring words. */
  options?: string[];
  value?: string;
  onSelect?: (option: string) => void;
  style?: React.CSSProperties;
}

/**
 * The optional one-tap check-in after a moment. No scoring, no judgment, never
 * required to continue. Feelings are plain words, not numbers or faces.
 * @startingPoint section="Steady" subtitle="Loop 1 close — optional, never required" viewport="360x160"
 */
export function CheckInRow(props: CheckInRowProps): JSX.Element;
