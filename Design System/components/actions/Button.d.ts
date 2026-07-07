import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary (Steady green) · repair (clay, aftermath) · secondary (tinted) · ghost (real declines) · crisis (rare). */
  variant?: "primary" | "repair" | "secondary" | "ghost" | "crisis";
  /** lg = 56px comfy default · md = 44px floor · sm = 36px (chips-in-rows only). */
  size?: "lg" | "md" | "sm";
  /** Full-width by default — primary CTAs span the column and live in the bottom half. */
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
}

/**
 * The Steady button. Sentence case, honest verbs, ≥44px. Never smaller than `md`
 * for a primary action. Declines are `ghost` buttons — never shame-toned links.
 * @startingPoint section="Actions" subtitle="Primary, repair, secondary, ghost, crisis" viewport="360x260"
 */
export function Button(props: ButtonProps): JSX.Element;
