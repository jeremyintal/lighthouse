import * as React from "react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected fills with the Steady green. */
  selected?: boolean;
  leadingIcon?: React.ReactNode;
}

/** Selectable pill for situation filters and check-in feelings. ≥44px tall. */
export function Chip(props: ChipProps): JSX.Element;
