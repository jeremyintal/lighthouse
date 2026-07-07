import React from "react";

/**
 * Steady's only iconography wrapper. Renders a Lucide glyph via CSS mask over
 * the lucide-static CDN, colored with currentColor. Icons support text, never
 * replace it. No emoji, ever.
 */
export function Icon({ name, size = 20, color = "currentColor", strokeGuard = true, style, ...rest }) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/${name}.svg`;
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flex: "none",
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
      {...rest}
    />
  );
}
