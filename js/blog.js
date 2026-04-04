document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCookie("lang") || "ar";
  applyLanguage(savedLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  const blogList = document.getElementById("blogList");
  if (blogList) {
    blogList.innerHTML = blogPosts.map(post => `
      <article class="blog-card">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="${post.link}">قراءة المقال</a>
      </article>
    `).join("");
  }
});
