**MomentDots** — a gentle month picture: one soft dot per day, no streaks, no scoreboard.

```jsx
<MomentDots
  days={["used","hard","quiet","used","used","hard","quiet", ...]}
  caption="14 hard moments this month; you used a breather in 9. That counts." />
```

Green dot = a breather was used; clay-outlined = a hard day logged; quiet well = nothing. Never render this as a streak, a percentage, or with red. The caption carries the human, non-judgmental read of the data.
