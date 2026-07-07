**CheckInRow** — the optional one-tap check-in that closes a moment: a plain prompt and honest feeling chips.

```jsx
<CheckInRow prompt="How did that land?"
  options={["Steadier", "Still shaky", "Rough one"]}
  value={feeling} onSelect={setFeeling} />
```

No scoring, no numbers, no faces — words only. Never gate progress on it. Feelings are non-judgmental ("Rough one", never "Failed").
