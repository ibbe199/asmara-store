/* Asmara.Store modals feature scaffold */

window.AsmaraStoreModals = {
  open(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    el.style.display = 'flex';
    return true;
  },
  close(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    el.style.display = 'none';
    return true;
  }
};
