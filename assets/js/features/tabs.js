/* Asmara.Store tabs feature scaffold */

window.AsmaraStoreTabs = {
  activate(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active-pane'));
    const pane = document.getElementById(`${tabId}Pane`);
    if (pane) pane.classList.add('active-pane');

    document.querySelectorAll('.nav-tab-link').forEach(link => link.classList.remove('active'));
    const active = document.querySelector(`.nav-tab-link[data-tab="${tabId}"]`);
    if (active) active.classList.add('active');

    return tabId;
  }
};
