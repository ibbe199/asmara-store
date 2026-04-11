/* Asmara.Store flights feature scaffold */

window.AsmaraStoreFlights = {
  search(fromCode) {
    const content = window.AsmaraStoreContent;
    if (!content) return [];
    return (content.flights || []).filter(f => !fromCode || f.from === fromCode);
  }
};
