# Migration Checklist

## Phase 1 — completed groundwork
- [x] document architecture
- [x] document refactor plan
- [x] add status tracker
- [x] add file map
- [x] add base external CSS scaffolds
- [x] add external JS scaffolds
- [x] add feature scaffolds
- [x] add content scaffolds
- [x] add loader manifest

## Phase 2 — safe HTML wiring
- [ ] link external CSS files in `index.html`
- [ ] link external JS files in `index.html`
- [ ] keep inline CSS and JS intact for safety in first pass

## Phase 3 — CSS extraction
- [ ] remove reset block from inline style after verifying `base.css`
- [ ] remove root tokens from inline style after verifying `base.css`
- [ ] move layout rules fully to `layout.css`
- [ ] move component rules fully to `components.css`
- [ ] move form rules fully to `forms.css`
- [ ] move responsive rules fully to `responsive.css`

## Phase 4 — JS extraction
- [ ] move state logic to `core/state.js`
- [ ] move utility logic to `core/utils.js`
- [ ] move rendering logic to `ui/render.js`
- [ ] move cart logic to `features/cart.js`
- [ ] move auth logic to `features/auth.js`
- [ ] move messaging logic to `features/messaging.js`
- [ ] move ratings logic to `features/ratings.js`
- [ ] move flights logic to `features/flights.js`
- [ ] move search logic to `features/search.js`
- [ ] reduce inline script to orchestration only

## Phase 5 — production readiness
- [ ] replace demo auth with real auth
- [ ] replace remote demo images with organized assets
- [ ] connect real data source/backend
- [ ] moderation and reporting backend
- [ ] payments integration
