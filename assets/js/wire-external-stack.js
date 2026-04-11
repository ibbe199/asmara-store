/* Asmara.Store external stack wiring helper */

window.AsmaraStoreWireExternalStack = {
  cssFiles() {
    const manifest = window.AsmaraStoreManifestExtended || window.AsmaraStoreManifest || {};
    return Array.isArray(manifest.css) ? manifest.css : [];
  },
  jsFiles() {
    const manifest = window.AsmaraStoreManifestExtended || window.AsmaraStoreManifest || {};
    return Array.isArray(manifest.js) ? manifest.js : [];
  },
  describe() {
    return {
      step: 'wire-external-stack',
      css: this.cssFiles(),
      js: this.jsFiles(),
      note: 'Use these file lists when wiring index.html to the external architecture.'
    };
  }
};
