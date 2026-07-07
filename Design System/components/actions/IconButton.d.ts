import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name (string) or a ReactNode. */
  icon: string | React.ReactNode;
  /** Required accessible label — icon-only controls must be named. */
  label: string;
  /** quiet (well) · onDark (over the breather) · accent (tinted). */
  variant?: "quiet" | "onDark" | "accent";
  /** Diameter in px; ≥44 (tap law). Default 44. */
  size?: number;
}

/** Round icon-only control for chrome actions (close, back). Always labeled. */
export function IconButton(props: IconButtonProps): JSX.Element;
