function setLang(lang) {
  const t = LANG[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;

  document.getElementById("about-title")?.textContent = t.aboutTitle;
  document.getElementById("about-text")?.textContent = t.aboutText;
  document.getElementById("privacy-title")?.textContent = t.privacyTitle;
  document.getElementById("privacy-text")?.textContent = t.privacyText;
  document.getElementById("whatsapp-label")?.textContent = t.whatsapp;
  document.getElementById("agent-btn")?.textContent = t.contactAgent;

  // هنا نحفظ في Cookie بدل localStorage
  setCookie("lang", lang, 365);
}

// تحميل اللغة من Cookie
const savedLang = getCookie("lang") || "ar";
setLang(savedLang);
