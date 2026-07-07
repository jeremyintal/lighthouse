import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  /** Label above the field (sentence case). */
  label?: string;
  /** Helper or trust line below — e.g. "We never collect anything about your child." */
  helper?: string;
  invalid?: boolean;
  style?: React.CSSProperties;
}

/** Quiet 56px text field with soft green focus ring and optional trust line. */
export function Input(props: InputProps): JSX.Element;
