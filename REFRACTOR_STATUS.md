# Asmara.Store Refactor Status

## Completed

- Added architecture documentation
- Added refactor plan
- Added minimal package.json
- Added external JS entry file at `assets/js/app.js`
- Added external CSS entry file at `assets/css/refactor.css`
- Added first extracted stylesheet at `assets/css/base.css`

## Current state

The live prototype still runs from `index.html` with inline CSS and inline JavaScript.

## Safe next move

The next safe edit is to wire `index.html` to these external files without removing any inline code yet:

```html
<link rel="stylesheet" href="./assets/css/refactor.css" />
<link rel="stylesheet" href="./assets/css/base.css" />
<script src="./assets/js/app.js"></script>
```

## After wiring

1. Move reset and root variables out of inline `<style>`
2. Move layout rules
3. Move component rules
4. Split inline JavaScript into modules progressively

## Priority

Do not rewrite the entire prototype in one step.
Keep the current UI stable while extracting code in small batches.
