/* Asmara.Store ratings feature scaffold */

window.AsmaraStoreRatings = {
  add(entry) {
    const state = window.AsmaraStoreState;
    if (!state) return [];
    state.ratings.unshift(entry);
    return state.ratings;
  },
  list() {
    const state = window.AsmaraStoreState;
    return state ? state.ratings : [];
  }
};
