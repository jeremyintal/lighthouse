# Lighthouse

Planning, design system, and MVP app materials for a parent emotion regulation app currently using the working title **Steady**.

The project explores a mobile app that helps parents build a daily ritual of becoming 1% steadier: one positive morning question, one evening small-win reflection, and a candle-breathing moment for regulation.

## Current Artifacts

- `PARENT_REGULATION_APP_PLAN.md` - master product strategy and phased validation plan
- `ONBOARDING_REDESIGN_PLAN.md` - onboarding, account creation, permissions, and measurement plan
- `ONBOARDING_REDESIGN_PLAN.html` - HTML version of the onboarding plan
- `PROJECT_REVIEW.html` - synthesized project review for strategy discussion
- `Design System/` - early design system tokens, components, guidelines, and UI kit assets
- `app/` and `src/` - Expo MVP of the Steady daily ritual experience
- `.codex/environments/environment.toml` - Codex Run button configuration

## Run the MVP

Install dependencies, then start Expo:

```bash
npm install
npm start
```

Useful variants:

```bash
npm run web
npm run ios
npm run android
```

From the Codex app, use the `Run` action to start Expo or `Run Web` for the browser target.

## Status

Concept and pre-validation with a clickable Expo MVP. The app is not production-ready: it has no backend, auth, analytics, subscriptions, clinical review, or live validation data yet.
