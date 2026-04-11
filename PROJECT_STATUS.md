# Asmara.Store Project Status

## Current reality

Asmara.Store now contains both:
1. a large legacy prototype in `index.html`
2. a structured external architecture prepared for migration

## Legacy entries
- `index.html` — current working legacy prototype

## New architecture entries
- `index.refactor.html` — clean modular entry
- `index.bridge.html` — bridge validation page
- `index.modules.html` — full module stack test page

## External CSS layers
- `assets/css/refactor.css`
- `assets/css/base.css`
- `assets/css/layout.css`
- `assets/css/components.css`
- `assets/css/forms.css`
- `assets/css/responsive.css`

## External JS layers
- `assets/js/bootstrap.js`
- `assets/js/app.js`
- `assets/js/app-entry.js`
- `assets/js/app-entry-extended.js`
- `assets/js/loader-manifest.js`
- `assets/js/loader-manifest-extended.js`
- `assets/js/legacy-bridge.js`

## Core / UI / Data
- `assets/js/core/state.js`
- `assets/js/core/utils.js`
- `assets/js/ui/render.js`
- `assets/js/data/mock-content.js`

## Features
- `assets/js/features/cart.js`
- `assets/js/features/auth.js`
- `assets/js/features/messaging.js`
- `assets/js/features/ratings.js`
- `assets/js/features/flights.js`
- `assets/js/features/search.js`
- `assets/js/features/tabs.js`
- `assets/js/features/wallet.js`
- `assets/js/features/modals.js`
- `assets/js/features/blog.js`

## Documentation
- `README.md`
- `REFRACTOR_STATUS.md`
- `docs/ARCHITECTURE.md`
- `docs/REFACTOR_PLAN.md`
- `docs/FILE_MAP.md`
- `docs/MIGRATION_CHECKLIST.md`
- `docs/ASSET_GUIDE.md`
- `docs/LEGACY_BRIDGE.md`
- `PROJECT_STATUS.md`

## What is still not finished

The legacy `index.html` has not yet been fully rewired to use the external CSS and JS files.
That is the final major migration step.

## What is finished

The repository architecture is now strongly prepared and almost complete from an organizational perspective.
