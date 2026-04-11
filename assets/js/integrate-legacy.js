/* Asmara.Store legacy integration helper */

window.AsmaraStoreIntegrateLegacy = {
  describe() {
    return {
      step: 'legacy-index-integration',
      note: 'Use this helper during the staged wiring of index.html to the external architecture.',
      required: [
        'external CSS links added to head',
        'external JS links added before closing body',
        'legacy bridge sync called after legacy state is initialized'
      ]
    };
  },
  sync() {
    if (!window.AsmaraStoreLegacyBridge) {
      return { ok: false, reason: 'legacy-bridge-missing' };
    }
    return window.AsmaraStoreLegacyBridge.syncFromLegacyGlobals();
  }
};
