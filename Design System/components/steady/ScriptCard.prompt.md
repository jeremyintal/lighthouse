**ScriptCard** — the trust engine: one situation, the spoken line(s), one DO and one DON'T.

```jsx
<ScriptCard
  situation="When they hit or throw"
  say={["Get low. Say less.", "“I'm right here. I won't let you hit.”"]}
  doLine="Block the hit with a calm hand and name it once."
  dontLine="Don't explain the rule mid-storm — save teaching for later."
  free
/>
```

The `say` lines render in the serif script style (the words said out loud). Always supply exactly one `doLine` and one `dontLine`. Mark repair/aftermath scripts `free`.
