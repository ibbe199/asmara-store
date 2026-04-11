/* Asmara.Store external utilities scaffold */

window.AsmaraStoreUtils = {
  safeText(value) {
    return String(value ?? '').replace(/[&<>\"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '\"': '&quot;',
      "'": '&#39;'
    }[char]));
  },
  currency(value) {
    return `$${Number(value || 0)}`;
  }
};
