# Asset Organization Guide

## Goal
Organize Asmara.Store static assets in a predictable way as the prototype moves toward a maintainable project layout.

## Suggested image structure
- `assets/images/logo/`
- `assets/images/hero/`
- `assets/images/products/`
- `assets/images/blog/`
- `assets/images/icons/`

## Current state
The current prototype still relies on many remote demo images referenced directly inside `index.html`.

## Next migration step
When production-ready assets are available:
1. move remote placeholders into local files
2. normalize naming
3. update references gradually
4. keep a single source of truth for logos and hero media
