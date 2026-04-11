# Last Three Steps

## 1) Wire `index.html`
Insert the CSS and JS blocks from:
- `docs/INDEX_HTML_WIRING_SNIPPETS.md`
- `docs/INDEX_HTML_PATCH.diff`

## 2) Extract Batch 1
Move:
- `safeText()` into `assets/js/core/utils.js`
- final `window.*` public assignments into `assets/js/legacy-public-api.js`

## 3) Reduce legacy inline code gradually
After wiring is stable:
- remove duplicated inline CSS blocks in small batches
- move one feature family at a time out of the legacy script
- keep validating against `index.wired.preview.html` and `index.smoke.html`
