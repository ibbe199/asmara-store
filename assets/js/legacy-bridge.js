/* Asmara.Store legacy bridge */

window.AsmaraStoreLegacyBridge = {
  syncFromLegacyGlobals() {
    const state = window.AsmaraStoreState;
    if (!state) return { synced: false, reason: 'state-missing' };

    if (Array.isArray(window.messages)) {
      state.messages = [...window.messages];
    }

    if (Array.isArray(window.ratings)) {
      state.ratings = [...window.ratings];
    }

    if (Array.isArray(window.cart)) {
      state.cart = [...window.cart];
    }

    if (typeof window.currentLang === 'string') {
      state.currentLang = window.currentLang;
    }

    if (typeof window.currentUser === 'string' || window.currentUser === null) {
      state.currentUser = window.currentUser;
    }

    if (typeof window.currentRole === 'string') {
      state.currentRole = window.currentRole;
    }

    if (typeof window.isVerified === 'boolean') {
      state.isVerified = window.isVerified;
    }

    if (typeof window.isAgentMode === 'boolean') {
      state.isAgentMode = window.isAgentMode;
    }

    if (typeof window.balance === 'number') {
      state.balance = window.balance;
    }

    if (Array.isArray(window.transactions)) {
      state.transactions = [...window.transactions];
    }

    return {
      synced: true,
      snapshot: {
        currentLang: state.currentLang,
        currentUser: state.currentUser,
        currentRole: state.currentRole,
        messages: state.messages.length,
        ratings: state.ratings.length,
        cart: state.cart.length,
        transactions: state.transactions.length,
        balance: state.balance
      }
    };
  }
};
