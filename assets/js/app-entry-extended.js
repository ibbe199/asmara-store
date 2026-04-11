/* Asmara.Store extended external app entry */

window.AsmaraStoreAppExtended = {
  boot() {
    const boot = window.AsmaraStoreApp ? window.AsmaraStoreApp.boot() : {};
    return {
      ...boot,
      tabs: !!window.AsmaraStoreTabs,
      wallet: !!window.AsmaraStoreWallet,
      modals: !!window.AsmaraStoreModals,
      blog: !!window.AsmaraStoreBlog,
      legacyBridge: !!window.AsmaraStoreLegacyBridge
    };
  }
};
