# Steady Design System

Design system for **Steady** (working title) — an emotion-regulation app for parents of toddlers. Not a parenting-advice library, not a meditation app: a pocket co-regulator for the hardest 90 seconds of a parent's day. The parent taps one big button mid-meltdown, gets a 60-second haptic breather, then one script and one "don't," then an optional one-tap check-in. Repair scripts ("what to say after you yell") are the trust engine and stay free.

## Sources

- Local folder `Parent Regulation/` (product plans only — no app code or prior UI existed):
  - `PARENT_REGULATION_APP_PLAN.md` — master product plan (problem, hypotheses, loops, metrics, task queue).
  - `ONBOARDING_REDESIGN_PLAN.md` / `.html` — onboarding & account-creation plan. The `.html` version carried a proto-palette (deep green `#2f6f5e`, warm paper `#fbfaf7`, ink `#26323a`) which this system adopts and extends.
- Everything else here is original, authored from scratch against those plans. **No logo exists** — render "Steady" in `--font-display` wherever a mark would go. Do not invent a logomark.

## Product context

- **User:** "Depleted Dana" — a parent, 27–40, mid-tantrum or post-guilt-spiral, one-handed, 60–90 seconds of attention, often in a dark room at bedtime.
- **The three loops:** (1) SOS moment — breather → script → check-in; (2) between-moment guidance — short audio lessons, situation playbooks; (3) community — anonymized "been there" moment stream.
- **Product law that binds design:** session length is a *cost* metric; no streaks, no guilt, no dark patterns; never positions itself as therapy; crisis signposting always reachable; nothing about the child is ever collected; every CTA ≥44pt and in the bottom half of the screen (one-handed law); WCAG AA on the calm palette.

## CONTENT FUNDAMENTALS

**Voice:** a steady, warm adult in the room — the calmest person the parent knows. Plainspoken, concrete, zero jargon, reading level ≤ grade 6.

- **Second person, present tense.** "You're not failing. This is a hard age." Never "users," never "parents should."
- **Sentence case everywhere** — titles, buttons, labels. Uppercase only for overlines (tiny section labels).
- **Short declaratives. Full stops.** Scripts are imperative and physical: "Get low. Say less. 'I'm right here. I won't let you hit.'"
- **Every script pairs one DO with one DON'T.** The don't is framed as relief, not correction: "Don't explain the rule mid-storm — save teaching for later."
- **No exclamation marks. No emoji. No guilt, no urgency, no streak language.** Never "You're doing great!!" — instead "That counts."
- **Name the hard thing without shame.** "For the moment you're about to lose it." / "What to say after you yell."
- **Buttons are honest verbs:** "It's happening" · "Try it now" · "Not now — stay anonymous" (declines are real buttons, never shame-toned ghost links).
- **Trust lines are plain, one sentence:** "We never collect anything about your child. Your moments are yours."
- **Numbers are kept human:** "14 hard moments this month; you used a breather in 9."

## VISUAL FOUNDATIONS

**Mood:** calm, warm, sturdy. The visual thesis: the app itself models regulation — soft shapes, warm paper, slow breath-paced motion, one grounded green.

- **Color:** warm paper `--paper #faf9f5` background, white cards, warm green-tinted ink `#22302b`. One primary: deep green `--accent #2f6f5e` (the "Steady green"). One warm secondary: clay `--repair #b4633f`, reserved for repair/aftermath moments. Amber for warnings, muted red *only* for crisis/destructive — rare by design. Immersive calm moments (the breather) invert onto deep green `--surface-accent-deep #274d42`. Max two background colors per screen.
- **Dark theme ("bedtime"):** first-class, warm and dim, never pure black — scope `[data-theme="dark"]`. Accents lighten to hold AA.
- **Type:** Source Serif 4 for warmth — headlines, and *the script lines a parent says out loud* (`--type-script`, 22/32, the signature text style). Public Sans for all UI. Body floor 17px. Overlines are 12px uppercase +0.08em, the only uppercase in the system.
- **Backgrounds:** flat color only. No photography, no illustration, no patterns, no gradients — except one: the deep-green breather gradient (`linear-gradient(160deg, #274d42, #2f6f5e 70%, #3d8571)`).
- **Shape:** soft everywhere. Cards 20px, sheets/script cards 28px, buttons/inputs 14px, pills and SOS fully round. No sharp corners anywhere.
- **Elevation:** two whisper shadows (`--shadow-card`, `--shadow-raised`), warm-tinted, never hard. The single colored shadow belongs to the SOS button (`--shadow-sos`).
- **Borders:** hairline `--line #e4e1d7` on cards *or* shadow — not both heavy. Inputs use `--line-strong`.
- **Motion:** breath-paced. `--ease-calm`, durations 200/400/700ms; the signature is `steady-breathe` — a 8s scale cycle (4s in, 4s out) on the SOS button and breather orb. Nothing bounces, nothing shakes, nothing pulses fast. `prefers-reduced-motion` fully respected.
- **Hover:** darken one step (`--accent-strong`) or tint (`--accent-faint` fill). **Press:** scale to 0.98, 200ms — a settle, not a shrink.
- **Focus:** 3px soft green ring (`--focus-ring`), always visible, never removed.
- **Layout:** single column, 24px screen margins, generous whitespace. Primary actions live in the bottom half of the screen (one-handed law). Progress is a thin 3px bar, never dots or "step 3 of 9."
- **Transparency/blur:** none. Sheets use a plain `rgba(34,48,43,0.4)` scrim.
- **Imagery:** none in v1. If a slot is ever needed, use a flat `--accent-faint` block — never stock photos of children.

## ICONOGRAPHY

- No icon assets existed in the source. The system uses **Lucide** (CDN, `lucide-static`) — 2px stroke, rounded caps, matching the soft-sturdy shape language. This is an intentional substitution; flag before production (self-host the SVGs).
- Usage: sparing. Icons support text, never replace it. Standard size 20px inline / 24px in controls, colored `currentColor` via the `Icon` component (CSS mask over `lucide-static` CDN).
- Common set: `wind` (breather), `heart-handshake` (repair), `shield` (privacy), `moon` (bedtime), `chevron-right`, `x`, `check`, `life-buoy` (crisis resources).
- **No emoji, ever.** No unicode-as-icon.

## Index

- `styles.css` — global entry; imports everything under `tokens/`.
- `tokens/` — `fonts` · `colors` · `dark` · `typography` · `spacing` · `shape` · `motion`.
- `guidelines/` — foundation specimen cards (colors, type, spacing, shape, motion, voice).
- `components/actions/` — `Button`, `IconButton`, `Chip`.
- `components/forms/` — `Input`, `Switch`.
- `components/surfaces/` — `Card`, `Badge`, `Sheet`.
- `components/steady/` — the app-specific heart: `SOSButton`, `BreatherOrb`, `ScriptCard`, `CheckInRow`, `MomentDots`, `Icon`.
- `ui_kits/app/` — full-screen recreations-by-plan: Home (SOS), Script, Breather, Check-in, Progress, Onboarding landing; `index.html` is an interactive click-through.
- `SKILL.md` — agent-skill entry point.

## Intentional additions

- `Icon` — thin wrapper for the Lucide CDN set (no icon assets existed in source).
- All components are additions by definition (no prior component source existed); the set is sized to the three loops in the plan, nothing speculative.
