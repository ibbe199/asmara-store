# Legacy Bridge

## Purpose

The legacy bridge exists to help Asmara.Store move from the large inline prototype in `index.html` to the new externalized architecture without breaking behavior all at once.

## File

- `assets/js/legacy-bridge.js`

## What it does

It reads selected legacy globals when they exist and mirrors them into the new external state object:

- `messages`
- `ratings`
- `cart`
- `currentLang`
- `currentUser`
- `currentRole`
- `isVerified`
- `isAgentMode`
- `balance`
- `transactions`

## Why this matters

During migration, some logic will still live inside the old inline script while new modules begin to take over.

The bridge reduces duplication and keeps the new architecture aware of the old runtime state.

## Intended usage

In the first integration stage, load this file after:
- `core/state.js`
- legacy inline script initialization

Then call:

```js
window.AsmaraStoreLegacyBridge.syncFromLegacyGlobals();
```

## Limits

This does not replace the legacy script.
It only synchronizes key values so external modules can start operating safely during the transition.
