# index.html Integration Plan

## Goal

Migrate the legacy `index.html` entry toward the external architecture without breaking the current prototype.

## Current challenge

`index.html` still contains:
- large inline CSS
- large inline JavaScript
- UI behavior mixed with mock data
- direct DOM rendering and event binding in one place

## Safe migration sequence

### Step 1 — wire external files
Add these files to `index.html` while keeping all inline code in place:

```html
<link rel="stylesheet" href="./assets/css/refactor.css" />
<link rel="stylesheet" href="./assets/css/base.css" />
<link rel="stylesheet" href="./assets/css/layout.css" />
<link rel="stylesheet" href="./assets/css/components.css" />
<link rel="stylesheet" href="./assets/css/forms.css" />
<link rel="stylesheet" href="./assets/css/responsive.css" />
```

and before the closing `</body>`:

```html
<script src="./assets/js/loader-manifest-extended.js"></script>
<script src="./assets/js/bootstrap.js"></script>
<script src="./assets/js/app.js"></script>
<script src="./assets/js/core/state.js"></script>
<script src="./assets/js/core/utils.js"></script>
<script src="./assets/js/data/mock-content.js"></script>
<script src="./assets/js/ui/render.js"></script>
<script src="./assets/js/features/cart.js"></script>
<script src="./assets/js/features/auth.js"></script>
<script src="./assets/js/features/messaging.js"></script>
<script src="./assets/js/features/ratings.js"></script>
<script src="./assets/js/features/flights.js"></script>
<script src="./assets/js/features/search.js"></script>
<script src="./assets/js/features/tabs.js"></script>
<script src="./assets/js/features/wallet.js"></script>
<script src="./assets/js/features/modals.js"></script>
<script src="./assets/js/features/blog.js"></script>
<script src="./assets/js/legacy-bridge.js"></script>
<script src="./assets/js/runtime.js"></script>
<script src="./assets/js/app-entry.js"></script>
<script src="./assets/js/app-entry-extended.js"></script>
```

### Step 2 — bridge runtime state
After legacy inline state initialization finishes, run:

```js
window.AsmaraStoreLegacyBridge.syncFromLegacyGlobals();
```

### Step 3 — CSS removal in batches
Remove only one inline CSS block category at a time:
1. reset and root variables
2. layout rules
3. component rules
4. form rules
5. responsive rules

### Step 4 — JS extraction in batches
Move only one feature at a time:
1. safeText and utilities
2. state-related globals
3. cart
4. auth
5. messaging
6. ratings
7. flights
8. search
9. blog
10. tabs and modal helpers

### Step 5 — shrink legacy entry
When external modules fully cover behavior:
- reduce inline script to orchestration only
- keep `index.html` as main entry or replace with `index.next.html`

## Success definition

The integration is successful when:
- `index.html` still works visually
- boot state is available externally
- external modules hold most logic
- inline script is much smaller
