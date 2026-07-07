import * as React from "react";

export interface SheetProps {
  open?: boolean;
  /** Serif title inside the sheet. */
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Bottom sheet with grabber and a plain (no-blur) scrim. The app's main surface
 * for a script or check-in. Renders absolutely inside a positioned phone frame.
 */
export function Sheet(props: SheetProps): JSX.Element;
