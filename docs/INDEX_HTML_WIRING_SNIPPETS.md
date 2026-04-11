# index.html Wiring Snippets

Use these exact blocks when editing `index.html`.

## 1) Add inside `<head>` after the external icon stylesheet

```html
<link rel="stylesheet" href="./assets/css/refactor.css" />
<link rel="stylesheet" href="./assets/css/base.css" />
<link rel="stylesheet" href="./assets/css/layout.css" />
<link rel="stylesheet" href="./assets/css/components.css" />
<link rel="stylesheet" href="./assets/css/forms.css" />
<link rel="stylesheet" href="./assets/css/responsive.css" />
```

## 2) Add before the big inline legacy `<script>` block

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
<script src="./assets/js/integrate-legacy.js"></script>
<script src="./assets/js/legacy-sync-hook.js"></script>
<script src="./assets/js/runtime.js"></script>
<script src="./assets/js/app-entry.js"></script>
<script src="./assets/js/app-entry-extended.js"></script>
```

## 3) What happens after wiring

- external CSS becomes available immediately
- external JS modules become available immediately
- legacy state gets synchronized on `DOMContentLoaded`
- inline CSS and JS can then be reduced safely in batches
