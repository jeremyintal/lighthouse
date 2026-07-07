# Steady — Onboarding & Account Creation Redesign Plan

> Status: **Plan only — not yet executed.**
> Created: 2026-07-03. Companion to [PARENT_REGULATION_APP_PLAN.md](PARENT_REGULATION_APP_PLAN.md); expands and supersedes the one-line PREG-P1-013 ("Auth + accounts") and shapes PREG-P1-011/P1-017.
> Scope: everything between App Store install and the user's first *real* SOS moment — first-run experience, personalization, account creation, permissions, and the measurement/experiment system around them.

---

## 1. Why onboarding is the highest-leverage screen set in the product

The entire business rests on the activation metric: **≥50% of new users complete one full SOS flow within 7 days of install** (§7 of the master plan). Everything downstream — H1 (they reach for the phone mid-moment), H3 (retention), H5 (willingness to pay) — is gated on the parent knowing, *before the next meltdown*, that the SOS button exists, where it lives, and that it takes 90 seconds. Onboarding is the only guaranteed touchpoint where we can teach that. A parent who installs at 10pm and never rehearses the flow will not remember it at 5:45pm the next day with a screaming toddler on the floor.

The conversion math: consumer wellness apps lose 25–60% of installs at a forced signup wall, and each added onboarding screen costs roughly 5–15% of the remaining cohort. Our audience compounds this — Depleted Dana is installing one-handed during a nap window or at 11pm post-guilt-spiral. She has minutes, not attention.

**Onboarding's single job: get the parent to *rehearse* one SOS flow in the first session, and remove every obstacle between install and that rehearsal.** Account creation, personalization, permissions, and monetization are all subordinate to that job and must individually justify their screen-time cost.

## 2. Design principles (product law for this flow)

1. **Value before identity.** No account wall at first launch. The breather and first script work before we know the user's email. Accounts are offered when there is something worth saving, not demanded as an entry toll. (Also keeps us clean under App Store Guideline 5.1.1 — apps may not require account creation for non-account-based features.)
2. **Every screen pays rent.** A screen ships only if it measurably increases activation, personalizes the first script, or is legally required. "Welcome tour" carousels explaining features do not pay rent; a rehearsed breather does.
3. **Two minutes to first value, one-handed.** Total first-run time budget: ≤120 seconds to a completed practice breather. Every screen operable with a thumb; every question answerable with one tap; "Skip" visible on everything non-essential.
4. **Trust is the conversion mechanic.** This audience is privacy-sensitive and shame-loaded. The plain-language privacy promise ("we never collect data about your child"), the clinician-review badge, and zero-judgment copy do more for signup conversion than any growth pattern. No guilt copy, no fake urgency, no dark patterns — consistent with the §3 non-goals.
5. **Ask for things at the moment they make sense.** Notifications, widget install, account creation, and (eventually) payment each have a contextual moment where the value is self-evident. Front-loading all asks into first-run is where onboarding flows go to die.
6. **The flow must fail gracefully into full anonymity.** A user who skips every question, declines every permission, and never creates an account still gets a working SOS flow. Free-tier metering runs on-device/anonymous-ID until an account exists.

## 3. The redesigned flow, screen by screen

Total: 6 steps, ~90–120 seconds, 3 of them skippable. Progress shown as a thin bar, not "step 3 of 9" (dots/counts invite abandonment math).

### Step 0 — App Store product page (part of the funnel, not an afterthought)
- Screenshots sell the 90-second moment (per PREG-P3-030): first screenshot is the big SOS button, second is a script card, third is the "reviewed by a licensed family therapist" trust frame.
- Copy sets the expectation onboarding then fulfills: "Help for the hardest 90 seconds of your day." Message match between store page and first screen is a known conversion lever; a mismatch is a silent churn source we'd never see in analytics.

### Step 1 — Emotional landing (1 screen, ~10s)
- One screen, no carousel. Full-bleed calm visual. Headline names the real problem without shame: **"For the moment you're about to lose it."** Subline: "90 seconds. One hand. No judgment."
- Single CTA: **"Show me how it works."** Secondary, smaller: "I already have an account" (returning-user path, §6).
- No logo-splash-then-tour. This screen's only job is "you're in the right place," felt in under 5 seconds.

### Step 2 — Micro-personalization (2 taps, ~15s, skippable)
Exactly two questions, each one tap, each directly consumed by the very next screen:
1. **"How old is your kid?"** — age bands only (Under 2 / 2–3 / 4–5 / A few of these). Framed as "so the scripts match your kid's stage." Never a name, never a birthdate — this is the no-child-data promise made visible.
2. **"Which moment is hardest right now?"** — the top-5 flashpoint taxonomy from PREG-P0-001 (tantrums / hitting / refusals / public meltdowns / bedtime).

Rules: no free-text anywhere in first-run (keeps the crisis-interception surface at zero during onboarding), "Skip" on both, answers editable later. Two questions is the ceiling, not the floor — the experiment backlog (§8) tests whether even these earn their cost. Each answer immediately visibly matters (question 2's answer is literally the next screen's content), which is what makes personalization feel like service rather than data collection.

### Step 3 — The payoff: their script + a rehearsed breather (~45s) — **the activation moment**
This is the core redesign move: onboarding doesn't *describe* the product, it *is* the product once.

- Show the script card for the flashpoint they picked ("Here's exactly what you'll get mid-meltdown"), in the real card UI.
- Then: **"The breather works best if you've done it once when things are calm. 60 seconds — try it now."** Run the real haptic breather, full production quality, ending on the reframe line.
- Close: "That's it. That's the whole thing. Next time it's happening, it's one button away."
- This rehearsal is the onboarding activation event (`practice_breather_completed`) and the strongest known predictor we can manufacture for the real 7-day activation metric. It also front-loads H2's positioning: the first thing the app ever does is regulate *the parent*.

### Step 4 — Put the button where the moment happens (~15s, skippable)
- Immediately after the rehearsal, while motivation is peak: **"Meltdowns don't wait for you to find an app. Put SOS on your lock screen."** Guided lock-screen widget / App Intent setup (PREG-P1-012), with a 15-second visual walkthrough (iOS widget install is genuinely unintuitive; assume zero prior widget knowledge).
- "I'll do it later" persists the prompt as a dismissible home-screen card, and it re-offers once after the first *real* SOS (the moment the user has proven the need).
- This step exists because H1 lives or dies on entry friction; it is the only "feature setup" allowed in first-run.

### Step 5 — Account creation, soft-gated (~20s, declinable)
Full design in §4. Placement rationale: the user has now received value (script + rehearsal), so the ask lands as "keep this" rather than "pay a toll." Framing: **"Save your setup"** — keeps your scripts, your progress view, and your free SOS flows across devices. Decline path is a real button ("Not now — stay anonymous"), not a shame-toned ghost link.

### Step 6 — Land on the real home screen (~5s)
- Home is the big SOS button with a one-time coach mark: "This is all you need to remember."
- No notification prompt yet (see §5). No paywall (see §7). First-run ends here, under budget.

### Post-first-session onboarding (the part most apps skip)
Activation isn't done at first-run close; it's done at the first *real* SOS. The days between are bridged by:
- **Day-1 message (if notifications granted; else email if account exists):** one message, the single most useful repair script as content, not a nag: "For the next time it goes sideways: what to say after you yell." Repair is the trust engine (§7 of master plan) — leading with it makes the first notification a gift.
- **Widget re-prompt** after first real SOS if declined at Step 4.
- **Second-session coach mark** on the progress view once ≥1 real SOS is logged.
- Hard cap: no more than 2 proactive messages in week 1. Session length and message volume are cost metrics for this product, not wins.

## 4. Account creation design

### Model: anonymous-first with upgrade, not signup-first
- **First launch creates a Supabase anonymous session silently.** All state (personalization answers, rehearsal completion, free-tier meter, progress view) attaches to it from second zero. There is no logged-out state in the app at all — only *anonymous* vs. *claimed* accounts.
- **Upgrading to a claimed account is offered, never required, at four contextual moments:**
  1. Step 5 of first-run ("save your setup") — the primary offer.
  2. First progress-view visit with real data in it ("14 hard moments this month" is now worth protecting).
  3. Any future purchase (payment requires a claimed account for restore/receipt reasons — RevenueCat + Supabase identity link).
  4. Community/"been there" participation (pseudonymous but claimed, for moderation accountability).
- Supabase anonymous-auth → identity-link migration preserves all data on upgrade; the user never re-answers anything. Losing state at signup is one of the classic silent-churn bugs — treat data continuity as an acceptance criterion, not a nice-to-have.

### Methods: passwordless only
- **Primary: Sign in with Apple.** One tap, no keyboard, native sheet, and "Hide My Email" actively *helps* our privacy positioning. iOS-first product → this should carry ≥70% of claimed accounts. (Also mandatory under App Store Guideline 4.8 the moment we offer any third-party login, so we lead with it rather than comply with it.)
- **Secondary: email magic link / 6-digit OTP.** For the Apple-averse and as the cross-platform bridge for month-6+ Android. OTP over pure magic-link as primary verification: parents installing on a phone where their email lives in another app abandon at the inbox hop; a 6-digit code typed from a notification banner survives it. (Supabase email OTP supports both from one flow.)
- **At Android launch: add Google Sign-In.** Not before — every extra button on the auth sheet costs conversion on iOS.
- **No passwords, ever.** Removes the reset flow, credential-stuffing exposure, "forgot password" support burden, and one full screen of first-run friction. For a ≤8 hr/week founder, no-passwords is an ops decision as much as a UX one.
- **Data collected at signup: the auth identifier. Nothing else.** No name field (display name is auto-generated pseudonym, editable later for community), no phone number, no demographics. Every field we don't ask for is conversion we keep and breach surface we don't carry.

### Copy & trust framing on the auth sheet
- Header: "Save your setup" (benefit), never "Create an account" (chore).
- Three benefit bullets max: keeps your scripts & progress · works across devices · your free SOS flows follow you.
- Inline privacy promise, plain language, one line: *"We never collect anything about your child. Your moments are yours."* Link to the full plain-language privacy page (PREG-P0-006 asset). For this audience this line is expected to *raise* conversion; §8 tests it rather than assumes it.
- Decline: "Not now — stay anonymous" with honest fine print: "Your data stays on this account; sign up any time to protect it if you switch phones."

### Account edge cases to design up front (cheaper now than as support tickets)
- **Anonymous user gets a new phone:** unclaimed data is genuinely unrecoverable — say so honestly at every decline moment (see fine print above) rather than burying it.
- **Sign in with Apple, then deletes the app, then reinstalls:** Apple returns the user's name/email only on first authorization; the flow must never depend on those fields.
- **Same email via Apple private relay and via direct email OTP:** two identities, one human. Accept it in v1 (document as known limitation); account-merge is explicitly out of scope until it appears in real support volume.
- **Account deletion:** in-app, self-serve, required by App Store Guideline 5.1.1(v). One screen in settings, hard-deletes Supabase user + rows, confirmation email if claimed. Build it in the same PR as auth — retrofitting deletion is always worse.
- **Returning user on Step 1:** "I already have an account" → same passwordless sheet in sign-in mode → skips straight to home (no re-onboarding).

## 5. Permissions strategy (the asks that aren't account creation)

- **Notifications: never in first-run.** Ask contextually at the *end of the first real SOS check-in*, with a pre-permission screen that states the actual contract: "One idea a week, and your repair script when you need it. No streaks, no guilt, no 'we miss you.'" Contextual + pre-primed notification asks convert 2–3× cold first-run asks, and a denied iOS prompt is nearly unrecoverable — we get one shot, so we spend it where the value is proven.
- **Widget/lock-screen (not a permission, but an ask):** Step 4 as designed; the highest-value "permission" we have.
- **Nothing else.** No location, no contacts, no ATT/ad-tracking prompt ever (no ad identifiers per §9 of master plan — which also keeps the App Privacy label clean, itself a conversion asset on the product page).

## 6. Special entry paths

- **Partner referral ("Converted Chris," PREG-P3-033):** deep link from a shared script must open *that script* first — the thing his partner wanted him to see — then run an abbreviated onboarding (Step 3's rehearsal offer + Step 5's account offer; skip Step 2, inheriting the sharer's flashpoint context). Referral traffic that lands on a generic welcome screen wastes the warmest acquisition channel in the plan.
- **Waitlist/beta cohort (Phase 2):** arrive via invite link with email pre-verified → skip the auth sheet entirely, land at Step 1 with account pre-claimed. Beta friction is pure loss; there's nothing to learn from it.
- **Web-prototype veterans (PREG-P0-003):** if the smoke-test collected emails, honor them: "Welcome back — pick up where you left off" variant of Step 1.

## 7. Where monetization touches onboarding (and where it doesn't)

- **v1/beta (Phase 1–2): no paywall anywhere in first-run.** The paywall ships in PREG-P2-024 and lives at *free-tier boundary moments* (4th SOS of the month) and *post-value moments* (after a completed real SOS with a good check-in), not at install. Rationale: the free tier (3 SOS/month + repair scripts) *is* the onboarding for the paid product, and the PMF evidence we need in Phase 2 is uncontaminated by paywall-induced churn.
- **Phase 3 experiment, not assumption:** consumer-wellness convention says an onboarding paywall (post-Step-3, pre-home) often wins on revenue-per-install despite hurting activation. Given that our whole thesis says activation (H1) is the scarce resource, the default stays *no onboarding paywall* — but we A/B it honestly at Phase 3 scale rather than religion-ing it (§8, experiment E7). If it wins on 90-day LTV without killing week-1 SOS usage, convention beats thesis and we take the money.
- **Founding-member offer (beta):** shown as a home-screen card, never as an onboarding interstitial.

## 8. Measurement & experimentation

### Funnel event contract (extends PREG-P1-014's ~12-event budget; these are 10 of them)
| Event | Properties | Funnel role |
|---|---|---|
| `first_open` | acquisition source (if attributable organically) | Funnel top |
| `onboarding_step_viewed` / `_completed` | step id, skip? | Per-screen drop-off |
| `personalization_answered` | age band, flashpoint (pseudonymous) | Powers content + E2 |
| `practice_breather_completed` | duration | **Onboarding activation event** |
| `widget_prompt_outcome` | installed / later / skipped | H1 friction signal |
| `account_prompt_outcome` | method / declined, surface (which of the 4 moments) | Auth conversion by context |
| `account_claimed` | method, days-since-install | Anonymous→claimed lag |
| `notification_prompt_outcome` | pre-prompt shown?, OS grant? | One-shot ask hit rate |
| `first_real_sos_started` | hours-since-install, entry (widget/app) | **The** activation metric |
| `onboarding_abandoned` | last step viewed | Where we bleed |

### Targets (first-run cohort, reviewed weekly during beta)
- ≥85% reach Step 3; ≥70% complete the practice breather; median first-run duration ≤2:00.
- ≥35% claim an account in first-run; ≥55% by day 7 (across all four surfaces).
- ≥40% install the widget by day 7 (Step 4 + post-SOS re-prompt combined).
- Onboarding→activation link: practice-breather completers hit the 7-day real-SOS metric at ≥1.5× the rate of skippers (validates the whole §3 design; if this link doesn't show up, the rehearsal thesis is wrong and Step 3 gets redesigned, not defended).

### Experiment backlog, priority order (one at a time; beta cohort sizes are small — prefer big-swing variants over button-color tests, and accept directional reads pre-launch)
1. **E1 — Account timing:** Step-5 soft gate vs. no first-run offer at all (first offer = progress-view moment). Hypothesis: deferring costs nothing on day-7 claimed rate and improves first-run completion.
2. **E2 — Personalization depth:** 2 questions vs. 0 (default script = most common flashpoint from P0 data). Hypothesis: the 2 questions pay for themselves via Step-3 relevance; if not, cut them — the plan's own principle demands it.
3. **E3 — Privacy line on auth sheet:** present vs. absent. Validates the trust-as-conversion thesis with data.
4. **E4 — Step-3 framing:** "practice now" vs. "see a demo" copy for the rehearsal.
5. **E5 — Widget prompt placement:** Step 4 vs. post-first-real-SOS only.
6. **E6 — Day-1 message content:** repair script vs. "your script, one tap away" reminder.
7. **E7 — (Phase 3 only) onboarding paywall:** per §7, judged on 90-day LTV *and* week-1 SOS usage together.

## 9. Content, accessibility, and safety requirements (acceptance criteria, not polish)

- **Copy:** every onboarding string reviewed in the same clinician pass as script content (PREG-P0-007) — onboarding is the first place tone can accidentally shame ("Stop yelling at your kids!" as a hook would convert and betray the product in the same breath). Reading level ≤ grade 6; no parenting-theory jargon before the user has felt the product work.
- **Accessibility:** full VoiceOver labels and logical focus order on every step; all CTAs ≥44pt targets in the bottom half of the screen (one-handed law); breather rehearsal works with audio + haptics for screen-off/eyes-free use; supports Dynamic Type without breaking script cards; WCAG AA contrast on the calm palette (calm palettes chronically fail contrast — check early).
- **Localization posture:** English-only v1, but all strings externalized from day one.
- **Safety:** no free-text in first-run (by design, §3 Step 2) so no crisis-interception surface exists there; the crisis-resources screen is reachable from the auth sheet footer and settings from day one; onboarding never makes claims that cross the "not therapy" line (no "clinically proven," "reviewed by a licensed family therapist" only once PREG-P0-007 is actually true).
- **Offline:** first-run must complete on airplane mode after install (content bundled; anonymous session queues until connectivity). A parent's worst moment doesn't check for signal, and neither does first-run.

## 10. Task breakdown (slots into Phase 1; replaces PREG-P1-013)

Ordered; ONB-1 through ONB-4 are the critical path to PREG-P1-017's usability test.

- **PREG-ONB-001 — Flow spec & copy deck.** Screen-by-screen spec of §3 with final copy, all states (skip/decline/error/offline), and the returning-user + referral variants (§6). Clinician tone-review included. *Exit: reviewed copy deck, zero TBD strings.*
- **PREG-ONB-002 — Anonymous-first auth foundation.** Supabase anonymous session on first launch; identity-link upgrade path; Sign in with Apple + email OTP; account deletion screen; data-continuity test (personalization + meter survive upgrade). *Exit: claim/decline/delete all pass on device; no logged-out state exists.*
- **PREG-ONB-003 — First-run flow build.** Steps 1–6 including the real breather in rehearsal mode and the widget walkthrough. One-handed + ≤2:00 median are acceptance criteria. *Exit: stranger completes first-run unaided in under 2 minutes (feeds PREG-P1-017).*
- **PREG-ONB-004 — Funnel instrumentation.** §8's event contract wired and reconciled with PREG-P1-014's budget; funnel dashboard with per-step drop-off before beta starts. *Exit: dashboard shows a complete synthetic-user funnel.*
- **PREG-ONB-005 — Contextual ask system.** Post-SOS notification pre-prompt, widget re-prompt, progress-view account prompt, message frequency cap. *Exit: all four contextual surfaces fire exactly once each in a scripted QA run.*
- **PREG-ONB-006 — Special entry paths.** Referral deep-link → script-first onboarding; beta invite pre-claimed path. *Exit: both paths land correctly from cold install.*
- **PREG-ONB-007 — Onboarding usability test (n=8, merged into PREG-P1-017).** Cold parents, one-handed, phone in hand while holding a bag (simulate the real ergonomic): observe Steps 1–6 + widget install; fix top 3 failures; re-test. *Exit: ≥7/8 complete unaided; widget install success ≥5/8.*
- **PREG-ONB-008 — Experiment harness (Phase 2 gate).** Assignment + exposure logging sufficient to run E1–E6 sequentially on the beta cohort. *Exit: E1 configured and dry-run.*

## 11. Risks specific to this flow

- **The rehearsal doesn't predict real usage** (Step-3 thesis fails): the §8 correlation check catches it in beta; fallback is shifting onboarding weight to the widget + day-1 repair message (i.e., optimize for *entry-point presence* over *muscle memory*).
- **Anonymous-first hides the audience from us** (no email = no re-engagement channel for decliners): accepted trade-off; mitigated by the four contextual claim surfaces and by notifications as the fallback channel. If day-7 claimed rate lands under ~40%, E1's "defer everything" arm is the wrong bet — revisit.
- **Widget setup friction on iOS** (multi-step, OS-controlled, changes across iOS versions): budget for re-shooting the walkthrough at every major iOS release; App Intents/Shortcuts as the secondary entry.
- **Apple review risk:** low by design (soft gate satisfies 5.1.1, Sign in with Apple satisfies 4.8, in-app deletion satisfies 5.1.1(v)) — but the anonymous free-tier meter must not look like it's dodging IAP rules when the paywall arrives; keep metering logic server-side by Phase 2.
- **Scope creep back toward a tour:** every future feature will ask to "just add one onboarding screen." Principle 2 (§2) is the standing answer; the ≤2:00 median is the enforcement mechanism — it's a tracked metric, so regressions are visible.

## 12. Open questions (decide before PREG-ONB-001 exits)

1. Does Step 2's flashpoint list come from PREG-P0-001's interview taxonomy or ship with a provisional top-5? (Dependency: onboarding copy can't finalize before the taxonomy does.)
2. Is the practice breather the full 60s production asset or a 30s "trailer" cut? (Test in ONB-007 before optimizing.)
3. Pseudonym generation style for community-ready display names — decide at ONB-002 so the account model doesn't need a migration later.
4. Do we want a "how did you find us?" one-tap attribution question at Step 5 decline/complete? It's a third question (violates the 2-question ceiling) but may be the only acquisition signal available with no ad identifiers. Recommend: no in v1; revisit if Phase 3 channel decisions are starved for data.
