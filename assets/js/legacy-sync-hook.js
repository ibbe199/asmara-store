/* Asmara.Store legacy sync hook */

window.AsmaraStoreLegacySyncHook = {
  run() {
    if (!window.AsmaraStoreIntegrateLegacy) {
      return { ok: false, reason: 'integration-helper-missing' };
    }
    return window.AsmaraStoreIntegrateLegacy.sync();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  if (window.AsmaraStoreLegacySyncHook && window.AsmaraStoreLegacyBridge) {
    window.__asmaraLegacySyncResult = window.AsmaraStoreLegacySyncHook.run();
  }
});
