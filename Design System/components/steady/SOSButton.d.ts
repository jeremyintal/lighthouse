import * as React from "react";

export interface SOSButtonProps {
  /** Serif label, e.g. "It's happening". */
  label?: string;
  /** Sans sublabel under it. */
  sublabel?: string;
  /** Diameter in px. Default 220 — this is the hero; keep it large. */
  size?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * The hero SOS button — big, soft, gently breathing (8s cycle). Lives in the
 * bottom half of the home screen. This is the whole product in one control.
 * @startingPoint section="Steady" subtitle="The hero — one tap, mid-meltdown" viewport="360x320"
 */
export function SOSButton(props: SOSButtonProps): JSX.Element;
