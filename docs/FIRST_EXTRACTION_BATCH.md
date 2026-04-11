# First Extraction Batch

This file defines the safest first code blocks to move out of `index.html`.

## Batch 1 — utilities and exposure

### Move first
- `safeText()` -> `assets/js/core/utils.js`
- final `window.* = ...` assignments -> `assets/js/legacy-public-api.js`

### Why this batch first
- low risk
- minimal DOM coupling
- reduces duplication immediately

## Batch 2 — state synchronization

### Move next
- primitive runtime globals mapping into `assets/js/core/state.js`
- call `AsmaraStoreLegacyBridge.syncFromLegacyGlobals()` after legacy initialization

## Batch 3 — feature helpers with limited coupling

### Best candidates
- cart UI helper pieces
- ratings list rendering
- blog list rendering
- flights search helper

## Batch 4 — DOM boot logic

### Move later
- `DOMContentLoaded` orchestration
- event binding setup
- tab boot logic

## Important rule

Do not move more than one feature family at a time.
Validate after each batch.
