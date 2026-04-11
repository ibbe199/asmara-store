/* Asmara.Store external app entry orchestrator */

window.AsmaraStoreApp = {
  boot() {
    return {
      bootstrap: !!window.AsmaraStoreBootstrap,
      state: !!window.AsmaraStoreState,
      utils: !!window.AsmaraStoreUtils,
      render: !!window.AsmaraStoreRender,
      content: !!window.AsmaraStoreContent,
      cart: !!window.AsmaraStoreCart,
      auth: !!window.AsmaraStoreAuth,
      messaging: !!window.AsmaraStoreMessaging,
      ratings: !!window.AsmaraStoreRatings,
      flights: !!window.AsmaraStoreFlights,
      search: !!window.AsmaraStoreSearch
    };
  }
};
