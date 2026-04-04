document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCookie("lang") || "ar";
  applyLanguage(savedLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  const internalLoginBtn = document.getElementById("internalLoginBtn");
  if (internalLoginBtn) {
    internalLoginBtn.addEventListener("click", () => {
      const password = document.getElementById("internalPassword").value;
      const msg = document.getElementById("internalLoginMsg");

      if (password === APP_CONFIG.internalPassword) {
        document.getElementById("internalPanel").style.display = "block";
        msg.textContent = "";
        renderInternal();
      } else {
        msg.textContent = "كلمة المرور غير صحيحة";
      }
    });
  }
});

function renderInternal() {
  document.getElementById("statPending").textContent = pendingAds.length;
  document.getElementById("statApproved").textContent =
    realEstateAds.length + electronicsAds.length + carsAds.length + jobsAds.length;
  document.getElementById("statRejected").textContent = rejectedAds.length;
  document.getElementById("statReports").textContent = reportsList.length;

  const pendingAdsList = document.getElementById("pendingAdsList");
  pendingAdsList.innerHTML = pendingAds.length
    ? pendingAds.map(ad => `<div class="card">${ad.name}</div>`).join("")
    : "<p>لا توجد إعلانات تنتظر المراجعة</p>";

  const reportsBox = document.getElementById("reportsList");
  reportsBox.innerHTML = reportsList.length
    ? reportsList.map(r => `<div class="card">${r.reason}</div>`).join("")
    : "<p>لا توجد بلاغات</p>";

  const logBox = document.getElementById("agentLogList");
  logBox.innerHTML = agentLog.length
    ? agentLog.map(log => `<div class="card">${log.action} - ${log.ad}</div>`).join("")
    : "<p>لا توجد سجلات</p>";
}
