/* Asmara.Store messaging feature scaffold */

window.AsmaraStoreMessaging = {
  addMessage(message) {
    const state = window.AsmaraStoreState;
    if (!state) return [];
    state.messages.push(message);
    return state.messages;
  },
  list() {
    const state = window.AsmaraStoreState;
    return state ? state.messages : [];
  }
};
