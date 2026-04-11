# Refactor Plan for Asmara.Store

## Goal

Reorganize the current prototype without breaking the existing experience.

## Step 1 — repository hygiene

- keep the current working `index.html`
- document the current architecture
- add project metadata and contribution guidance
- define a migration path

## Step 2 — CSS extraction

Move inline `<style>` content into external stylesheets.

Suggested split:
- `assets/css/base.css`
- `assets/css/layout.css`
- `assets/css/components.css`
- `assets/css/responsive.css`

## Step 3 — JavaScript extraction

Move inline `<script>` content into external modules.

Suggested split:
- `assets/js/data/mock-data.js`
- `assets/js/core/state.js`
- `assets/js/core/utils.js`
- `assets/js/features/cart.js`
- `assets/js/features/auth.js`
- `assets/js/features/messaging.js`
- `assets/js/features/ratings.js`
- `assets/js/features/flights.js`
- `assets/js/features/search.js`
- `assets/js/ui/render.js`
- `assets/js/app.js`

## Step 4 — content and assets cleanup

- create a real logo path
- normalize image folders
- separate mock assets from production assets

## Step 5 — backend readiness

After front-end cleanup, prepare for:
- auth
- moderation
- reports
- payments
- database-backed ads
- uploads

## Success criteria

The refactor is successful when:
- the UI still looks and behaves the same
- no feature logic is lost
- `index.html` becomes thin and readable
- future changes can happen in isolated files
