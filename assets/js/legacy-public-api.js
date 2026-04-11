/* Asmara.Store legacy public API scaffold */

window.AsmaraStoreLegacyPublicApi = {
  expose(api) {
    const target = api || {};
    Object.keys(target).forEach((key) => {
      window[key] = target[key];
    });
    return Object.keys(target);
  },
  describe() {
    return {
      purpose: 'Expose legacy functions on window during migration',
      note: 'Move the final window.* assignments from index.html into this helper in a later extraction pass.'
    };
  }
};
