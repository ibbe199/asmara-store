function setLang(lang) {
  const t = LANG[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;

  // تحديث النصوص
  document.getElementById("about-title")?.textContent = t.aboutTitle;
  document.getElementById("about-text")?.textContent = t.aboutText;
  document.getElementById("privacy-title")?.textContent = t.privacyTitle;
  document.getElementById("privacy-text")?.textContent = t.privacyText;
  document.getElementById("whatsapp-label")?.textContent = t.whatsapp;
  document.getElementById("agent-btn")?.textContent = t.contactAgent;

  localStorage.setItem("lang", lang);
}

// تحميل اللغة
const savedLang = localStorage.getItem("lang") || "ar";
setLang(savedLang);
