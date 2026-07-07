**Sheet** — bottom sheet with a grabber and a plain scrim (no blur); the app's main way to surface a moment.

```jsx
<Sheet open={open} title="After the storm" onClose={close}>
  …script, check-in…
</Sheet>
```

28px top radius, gentle slide on a settle easing. Renders absolutely — place it inside a `position:relative` phone frame. Tap the scrim to close.
