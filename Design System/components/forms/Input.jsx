import React from "react";

/**
 * A quiet, honest text field. Label sits above; helper/trust line below.
 * Big (56px) target, soft focus ring, warm well when empty.
 */
export function Input({
  label,
  helper,
  value,
  placeholder,
  type = "text",
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const id = React.useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", ...style }}>
      {label && (
        <label htmlFor={id} style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-label-size)", fontWeight: 600, color: "var(--text-body)" }}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: "var(--tap-comfy)",
          padding: "0 16px",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--type-body-size)",
          color: "var(--text-body)",
          background: "var(--surface-card)",
          border: `1px solid ${invalid ? "var(--red-700)" : focus ? "var(--accent)" : "var(--border-input)"}`,
          borderRadius: "var(--radius-md)",
          outline: "none",
          boxShadow: focus ? "var(--focus-ring)" : "none",
          transition: "border-color var(--dur-fast) var(--ease-calm), box-shadow var(--dur-fast) var(--ease-calm)",
        }}
        {...rest}
      />
      {helper && (
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--type-caption-size)", color: invalid ? "var(--red-700)" : "var(--text-soft)" }}>
          {helper}
        </span>
      )}
    </div>
  );
}
