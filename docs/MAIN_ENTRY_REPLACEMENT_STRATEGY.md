# Main Entry Replacement Strategy

## Objective

Decide how `index.html` should evolve after the external architecture is ready.

## Available entry points today

- `index.html` — legacy prototype
- `index.refactor.html` — modular refactor entry
- `index.bridge.html` — migration bridge test page
- `index.modules.html` — full module stack test page
- `index.next.html` — candidate next-stage entry

## Recommended path

### Option A — gradual replacement (recommended)
1. keep `index.html` as the public entry
2. wire it to external CSS and JS
3. reduce inline CSS and JS in batches
4. once stable, let `index.html` become the fully externalized main entry

### Option B — controlled swap
1. continue improving `index.next.html`
2. once feature parity is sufficient, rename or replace it as `index.html`
3. archive the original prototype as `index.legacy.html`

## Recommendation

Use **Option A** first because it preserves the existing behavior and reduces migration risk.

## When to choose Option B

Choose Option B only when:
- the new entry has enough feature parity
- the external modules can fully replace the old inline logic
- the legacy page is no longer needed as the main runtime

## Success criteria

The main entry replacement is successful when:
- the public site still works
- the external architecture becomes the primary source of truth
- the legacy inline code is no longer the dominant runtime
