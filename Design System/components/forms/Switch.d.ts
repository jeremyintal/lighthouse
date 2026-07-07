import * as React from "react";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** Setting name (sentence case). */
  label?: string;
  /** Optional one-line description under the label. */
  description?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Calm settings toggle (haptics, bedtime theme, anonymous mode). Slow track slide. */
export function Switch(props: SwitchProps): JSX.Element;
