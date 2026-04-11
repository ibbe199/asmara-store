# Asmara.Store Architecture

## Current state

The project currently runs as a large static prototype centered around a single `index.html` file.

That file currently contains:
- markup
- inline CSS
- inline JavaScript
- mock data
- UI behavior
- admin and agent flows

There is also a separate `main.css` file in the repository, but the current `index.html` does not fully depend on it yet.

## Current repository shape

- `index.html` — current working prototype
- `main.css` — partial external stylesheet
- `README.md` — project overview

## Main architectural issue

The core issue is not the product idea. The issue is the implementation shape:
- presentation, logic, and data are tightly coupled
- changes are hard to test safely
- maintainability is low
- future backend integration will be harder than necessary

## Recommended target structure

```text
asmara-store/
├── index.html
├── main.css
├── assets/
│   ├── css/
│   │   └── components/
│   ├── js/
│   │   ├── core/
│   │   ├── features/
│   │   └── data/
│   └── images/
├── docs/
│   ├── ARCHITECTURE.md
│   └── REFACTOR_PLAN.md
└── package.json
```

## Refactor direction

### Phase 1
Keep the prototype working while documenting the current system and preparing folders.

### Phase 2
Move inline CSS out of `index.html` into maintainable CSS files.

### Phase 3
Move inline JavaScript into organized modules:
- core UI
- tab handling
- auth demo logic
- cart
- messaging
- ratings
- search
- rendering helpers
- mock data

### Phase 4
Replace mock storage and demo flows with real backend services when the product is ready.

## Product classification

At this stage, Asmara.Store should be treated as a **rich prototype** rather than a production-ready marketplace.

That is a strength, not a weakness. The prototype is already useful because it validates the product vision and interaction design.
