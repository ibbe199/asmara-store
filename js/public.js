document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCookie("lang") || "ar";
  const savedTab = getCookie("lastTab") || "home";

  applyLanguage(savedLang);
  switchTab(savedTab);

  renderGallery("realEstateGallery", realEstateAds);
  renderGallery("electronicsGallery", electronicsAds);
  renderGallery("carsGallery", carsAds);
  renderGallery("jobsGallery", jobsAds);

  const waLink = `https://wa.me/${APP_CONFIG.whatsappNumber}`;
  const aboutWhatsapp = document.getElementById("aboutWhatsapp");
  const privacyWhatsapp = document.getElementById("privacyWhatsapp");
  const floatingWhatsapp = document.getElementById("floatingWhatsapp");

  if (aboutWhatsapp) aboutWhatsapp.href = waLink;
  if (privacyWhatsapp) privacyWhatsapp.href = waLink;
  if (floatingWhatsapp) floatingWhatsapp.href = waLink;

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });

  const searchFlightBtn = document.getElementById("searchFlightBtn");
  if (searchFlightBtn) {
    searchFlightBtn.addEventListener("click", () => {
      const from = document.getElementById("flightFrom").value;
      const date = document.getElementById("flightDate").value;
      const results = flightsData[`${from}-ASM`] || [];
      const box = document.getElementById("flightResults");

      if (!results.length) {
        box.innerHTML = "لا توجد رحلات";
        return;
      }

      box.innerHTML = results.map(f => `✈️ ${f.airline} | ${f.price} | ${date}`).join("<br>");
    });
  }

  const cookieAcceptBtn = document.getElementById("cookieAcceptBtn");
  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener("click", () => {
      setCookie("cookiesAccepted", "true", 365);
      document.getElementById("cookieBanner").style.display = "none";
    });
  }

  if (getCookie("cookiesAccepted")) {
    const cookieBanner = document.getElementById("cookieBanner");
    if (cookieBanner) cookieBanner.style.display = "none";
  }

  const homeFlightsPreview = document.getElementById("homeFlightsPreview");
  if (homeFlightsPreview) {
    homeFlightsPreview.innerHTML = `
      <div>DXB → ASM | FlyDubai | $450</div>
      <div>JED → ASM | Ethiopian | $380</div>
    `;
  }

  const homeBlogPreview = document.getElementById("homeBlogPreview");
  if (homeBlogPreview) {
    homeBlogPreview.innerHTML = blogPosts.slice(0, 3).map(post => `
      <div>
        <strong>${post.title}</strong><br>
        <small>${post.excerpt}</small><br>
        <a href="blog.html">قراءة المزيد</a>
      </div>
    `).join("");
  }
});
