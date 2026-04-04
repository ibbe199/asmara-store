function applyLanguage(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  document.body.className = `lang-${lang}`;

  const tagline = document.getElementById("tagline");
  const homeIntro = document.getElementById("homeIntro");
  const aboutTitle = document.getElementById("aboutTitle");
  const aboutText = document.getElementById("aboutText");
  const privacyTitle = document.getElementById("privacyTitle");
  const privacyText = document.getElementById("privacyText");
  const aboutWhatsapp = document.getElementById("aboutWhatsapp");
  const privacyWhatsapp = document.getElementById("privacyWhatsapp");
  const floatingWhatsapp = document.getElementById("floatingWhatsapp");
  const floatingAgent = document.getElementById("floatingAgent");
  const cookieText = document.getElementById("cookieText");
  const cookieAcceptBtn = document.getElementById("cookieAcceptBtn");

  if (tagline) tagline.textContent = t.tagline;
  if (homeIntro) homeIntro.textContent = t.homeIntro;
  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  if (aboutText) aboutText.textContent = t.aboutText;
  if (privacyTitle) privacyTitle.textContent = t.privacyTitle;
  if (privacyText) privacyText.textContent = t.privacyText;
  if (aboutWhatsapp) aboutWhatsapp.textContent = t.whatsapp;
  if (privacyWhatsapp) privacyWhatsapp.textContent = t.whatsapp;
  if (floatingWhatsapp) floatingWhatsapp.textContent = t.whatsapp;
  if (floatingAgent) floatingAgent.textContent = t.agent;
  if (cookieText) cookieText.textContent = t.cookieText;
  if (cookieAcceptBtn) cookieAcceptBtn.textContent = t.cookieAccept;

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  setCookie("lang", lang, 365);
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active-pane"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

  const pane = document.getElementById(`${tabId}Pane`);
  const link = document.querySelector(`.nav-link[data-tab="${tabId}"]`);

  if (pane) pane.classList.add("active-pane");
  if (link) link.classList.add("active");

  setCookie("lastTab", tabId, 30);
}

function renderGallery(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.innerHTML = `
      <img src="${item.image}" alt="">
      <h4>${item.name}</h4>
      <p>${item.price}<br>${item.city}</p>
    `;
    container.appendChild(card);
  });
}
