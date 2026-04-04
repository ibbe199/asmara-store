function applyLanguage(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  document.body.className = `lang-${lang}`;

  const map = {
    tagline: t.tagline,
    homeIntro: t.homeIntro,
    aboutTitle: t.aboutTitle,
    aboutText: t.aboutText,
    privacyTitle: t.privacyTitle,
    privacyText: t.privacyText,
    cookieText: t.cookieText,
    cookieAcceptBtn: t.cookieAccept,
    navHome: t.navHome,
    navFlight: t.navFlight,
    navRealEstate: t.navRealEstate,
    navElectronics: t.navElectronics,
    navCars: t.navCars,
    navJobs: t.navJobs,
    navBlog: t.navBlog,
    navAbout: t.navAbout,
    navPrivacy: t.navPrivacy,
    blogPageTitle: t.blogPageTitle,
    blogPageIntro: t.blogPageIntro,
    backHomeLink: t.backHomeLink,
    internalLink: t.internalLink,
    internalTagline: t.internalTagline,
    internalBackHome: t.internalBackHome,
    internalBlogLink: t.internalBlogLink
  };

  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = map[id];
  });

  const aboutWhatsapp = document.getElementById("aboutWhatsapp");
  const privacyWhatsapp = document.getElementById("privacyWhatsapp");
  const floatingWhatsapp = document.getElementById("floatingWhatsapp");
  const floatingAgent = document.getElementById("floatingAgent");

  if (aboutWhatsapp) aboutWhatsapp.textContent = t.whatsapp;
  if (privacyWhatsapp) privacyWhatsapp.textContent = t.whatsapp;
  if (floatingWhatsapp) floatingWhatsapp.textContent = t.whatsapp;
  if (floatingAgent) floatingAgent.textContent = t.agent;

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
