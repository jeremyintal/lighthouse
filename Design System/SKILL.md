---
name: Steady Design System
description: >
  Design system for Steady — an emotion-regulation app for parents of toddlers.
  A pocket co-regulator for the hardest 90 seconds of a parent's day: one SOS
  button → 60-second breather → one script (one DO + one DON'T) → optional
  one-tap check-in. Calm, warm, sturdy; deep-green primary on warm paper; serif
  for warmth, sans for UI; breath-paced motion; dark "bedtime" theme; no
  streaks, no guilt, no dark patterns. Invoke when building any Steady screen,
  component, or marketing surface.
---

# Steady Design System

## Read first
- `readme.md` — full brand context, content fundamentals, visual foundations, iconography, and the file index. **Read it before building anything.**
- `styles.css` — the single global entry. Import it in every file; it pulls in all tokens under `tokens/`.

## How to use
1. **Import tokens, don't hardcode.** `<link rel="stylesheet" href="…/styles.css">`, then reference `var(--accent)`, `var(--font-display)`, `var(--radius-lg)`, etc. Never paste raw hex or px from the specimens.
2. **Compose the components** in `components/`. Each has a `.jsx` (implementation), `.d.ts` (typed API + `@startingPoint`), and `.prompt.md` (when/how to use). React is a global (classic runtime) — components do `import React from "react"`; when embedding standalone, use the classic-runtime harness shown in `components/*/_gallery.card.html` and `ui_kits/app/index.html` (load React UMD, then `Babel.transform(src,{presets:[["react",{runtime:"classic"}]]})`). Do **not** use the automatic JSX runtime — it needs a bundler.
3. **Lift screen patterns** from `ui_kits/app/index.html` — Onboarding, Home (SOS), Breather, Script, Check-in, Progress, Settings, in both light and bedtime themes.
4. **Dark mode:** add `data-theme="dark"` to a container; every token re-resolves.

## Component map
- `components/actions/` — `Button` (primary · repair · secondary · ghost · crisis), `IconButton`, `Chip`.
- `components/forms/` — `Input`, `Switch`.
- `components/surfaces/` — `Card` (surface · well · accent · repair · deep), `Badge`, `Sheet`.
- `components/steady/` — the heart: `SOSButton`, `BreatherOrb`, `ScriptCard`, `CheckInRow`, `MomentDots`, `Icon`.

## Non-negotiables (from the product plan)
- Every primary CTA ≥44px and in the **bottom half** of the screen (one-handed law).
- **No streaks, no guilt, no urgency, no dark patterns.** Session length is a cost, not a goal.
- Voice is a calm adult in the room: second person, sentence case, ≤ grade-6, no emoji, no exclamation marks. Declines are honest buttons, never shame links.
- Every script pairs exactly **one DO with one DON'T**. Repair scripts stay **free**.
- Never collect or depict anything about the child. Crisis signposting always reachable.
- WCAG AA on the calm palette; `prefers-reduced-motion` fully respected.

## Intentional substitutions (flag before production)
- **Fonts** load from Google Fonts (Source Serif 4 + Public Sans) — self-host for production.
- **Icons** use the Lucide CDN via `Icon` — self-host the SVGs for production.
- **No logo** exists — render "Steady" in `--font-display`; do not invent a mark.
