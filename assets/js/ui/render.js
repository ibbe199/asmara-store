/* Asmara.Store external render scaffold */

window.AsmaraStoreRender = {
  mountPlaceholder(targetId, message) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = `<div class="card" style="box-shadow:none; border:1px dashed #d7dee7;">${message}</div>`;
  }
};
