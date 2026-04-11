/* Asmara.Store auth feature scaffold */

window.AsmaraStoreAuth = {
  login(username, role = 'user') {
    const state = window.AsmaraStoreState;
    if (!state) return null;
    state.currentUser = username || null;
    state.currentRole = role;
    return { user: state.currentUser, role: state.currentRole };
  },
  logout() {
    const state = window.AsmaraStoreState;
    if (!state) return null;
    state.currentUser = null;
    state.currentRole = 'guest';
    state.isVerified = false;
    return true;
  },
  verify() {
    const state = window.AsmaraStoreState;
    if (!state) return false;
    state.isVerified = true;
    return true;
  }
};
