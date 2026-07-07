**BreatherOrb** — the 60-second breather: a slow expand/contract orb with a "Breathe in / Breathe out" cue.

```jsx
<Card tone="deep" style={{ minHeight: 480 }}>
  <BreatherOrb />
</Card>
```

Designed for the deep-green immersive field (`tone="deep"` / the breather gradient). Fixed 8s pace; the cue text swaps every 4s. Pass `cue={false}` for a silent orb.
