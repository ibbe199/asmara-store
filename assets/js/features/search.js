/* Asmara.Store search feature scaffold */

window.AsmaraStoreSearch = {
  filter(items, query = '') {
    const q = String(query || '').toLowerCase().trim();
    if (!q) return items || [];
    return (items || []).filter(item => {
      const name = String(item.name || '').toLowerCase();
      const description = String(item.description || '').toLowerCase();
      return name.includes(q) || description.includes(q);
    });
  }
};
