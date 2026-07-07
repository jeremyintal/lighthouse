import * as React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, kebab-case, e.g. "wind", "heart-handshake", "life-buoy". */
  name: string;
  /** Pixel size. 20 inline, 24 in controls. Default 20. */
  size?: number;
  /** Any CSS color; defaults to currentColor so it inherits text color. */
  color?: string;
  strokeGuard?: boolean;
}

/**
 * Steady icon. Lucide glyph via CSS mask (currentColor-tintable).
 * Icons are sparing and always paired with text.
 */
export function Icon(props: IconProps): JSX.Element;
