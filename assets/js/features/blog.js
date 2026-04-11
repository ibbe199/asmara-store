/* Asmara.Store blog feature scaffold */

window.AsmaraStoreBlog = {
  list() {
    const content = window.AsmaraStoreContent;
    return content ? (content.blogPosts || []) : [];
  },
  getById(id) {
    const posts = this.list();
    return posts.find(post => post.id === id) || null;
  }
};
