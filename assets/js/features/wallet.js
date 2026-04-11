/* Asmara.Store wallet feature scaffold */

window.AsmaraStoreWallet = {
  deposit(amount, type = 'Deposit') {
    const state = window.AsmaraStoreState;
    if (!state) return null;
    const value = Number(amount || 0);
    state.balance += value;
    state.transactions.unshift({
      type,
      amount: `+$${value}`,
      date: new Date().toLocaleDateString()
    });
    return { balance: state.balance, transactions: state.transactions };
  },
  listTransactions() {
    const state = window.AsmaraStoreState;
    return state ? state.transactions : [];
  }
};
