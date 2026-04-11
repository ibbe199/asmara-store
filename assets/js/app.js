/* Asmara.Store - gradual JS extraction entry point */
/*
  This file is introduced as the first safe step in extracting inline script
  logic from index.html without breaking the current prototype.

  Planned extraction order:
  - utilities
  - state
  - rendering helpers
  - cart
  - auth
  - messaging
  - ratings
  - flights
*/

window.AsmaraStore = window.AsmaraStore || {
  version: '0.1.0',
  mode: 'gradual-refactor'
};
