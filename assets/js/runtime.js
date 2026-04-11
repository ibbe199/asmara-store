/* Asmara.Store runtime scaffold */

window.AsmaraStoreRuntime = {
  boot() {
    const manifest = window.AsmaraStoreManifestExtended || window.AsmaraStoreManifest || {};
    const state = window.AsmaraStoreState || {};
    return {
      cssCount: Array.isArray(manifest.css) ? manifest.css.length : 0,
      jsCount: Array.isArray(manifest.js) ? manifest.js.length : 0,
      currentLang: state.currentLang || 'en',
      currentRole: state.currentRole || 'guest',
      ready: true
    };
  }
};
