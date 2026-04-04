/* ========================================
   Asmara.Store - Main JavaScript File
   منصة إريتريا المتكاملة
   الإصدار: 2.0
   تم التطوير: 2026
   ======================================== */

// ========== 1. البيانات الأساسية (Mock Data) ==========

// الإعلانات حسب الأقسام
let realEstateAds = [
    { id: 1, type: "شقة", name: "شقة فاخرة - تيرفولو", price: "$85,000", city: "أسمرة", seller: "علي حسن", sellerRating: 4.5, views: 45, image: "https://placehold.co/300x200/1e3a5f/white?text=شقة+فاخرة" },
    { id: 2, type: "فيلا", name: "فيلا - إدغا أريتي", price: "$250,000", city: "أسمرة", seller: "سارة محمد", sellerRating: 4.8, views: 32, image: "https://placehold.co/300x200/2c5282/white?text=فيلا" }
];

let electronicsAds = [
    { id: 1, type: "هاتف", name: "iPhone 14 Pro", price: "$899", city: "أسمرة", seller: "سامر تكنولوجي", sellerRating: 4.2, views: 120, image: "https://placehold.co/300x200/c7a12b/white?text=iPhone" },
    { id: 2, type: "لابتوب", name: "MacBook Air M2", price: "$1,299", city: "أسمرة", seller: "سامر تكنولوجي", sellerRating: 4.3, views: 78, image: "https://placehold.co/300x200/1e3a5f/white?text=MacBook" }
];

let carsAds = [
    { id: 1, type: "سيارة مستعملة", name: "تويوتا لاندكروزر 2020", price: "$45,000", city: "أسمرة", seller: "معرض السلام", sellerRating: 4.8, views: 67, image: "https://placehold.co/300x200/2c5a82/white?text=Land+Cruiser" },
    { id: 2, type: "سيارة جديدة", name: "هيونداي توسان 2025", price: "$32,000", city: "أسمرة", seller: "معرض السلام", sellerRating: 4.7, views: 45, image: "https://placehold.co/300x200/3a5a40/white?text=Tucson" }
];

let jobsAds = [
    { id: 1, type: "دوام كامل", name: "مهندس مدني", company: "شركة أسمرة", salary: "$1,200", city: "أسمرة", views: 89, image: "https://placehold.co/300x200/6d597b/white?text=مهندس+مدني" },
    { id: 2, type: "دوام جزئي", name: "محاسب", company: "مؤسسة المصوع", salary: "$800", city: "مصوع", views: 34, image: "https://placehold.co/300x200/4a627a/white?text=محاسب" }
];

let generalAds = [
    { id: 1, type: "خدمة", name: "شحن من دبي إلى أسمرة", price: "$299", city: "أسمرة", seller: "شحن سريع", sellerRating: 4.0, views: 34, image: "https://placehold.co/300x200/2c5a82/white?text=شحن" }
];

// ========== 2. نظام الوكيل والمراجعة ==========

let pendingAds = [];      // إعلانات تنتظر المراجعة
let rejectedAds = [];     // إعلانات مرفوضة
let violationsLog = [];   // سجل المخالفات
let agentLog = [];        // سجل إجراءات الوكيل
let reportsList = [];     // بلاغات المستخدمين
let reportsLog = [];      // سجل معالجة البلاغات

// الكلمات الممنوعة (جنس، عادات، دين، عنصرية)
let blockedWords = [
    "سكس", "جنس", "عاري", "عارية", "نيك", "زنا", "شذوذ", "porn", "sex", "naked",
    "مسيء", "شتيمة", "سب", "لعنة", "قبيلة", "عنصرية", "عرق", "طائفي", "شتم", "تحريض",
    "إهانة", "دين", "كفر", "رسول", "مسجد", "كنيسة", "عيب", "فاحشة", "فجور", "رذيلة",
    "خمر", "خنزير", "حرام", "عادات", "تقاليد"
];

// أنواع المخالفات
const violationTypes = {
    sexual: "محتوى جنسي غير لائق",
    traditions: "مخالفة للعادات والتقاليد",
    offensive: "لغة مسيئة",
    religious: "مساس بالدين",
    racist: "تحريض طائفي أو عنصري"
};

// ========== 3. الدوال الأساسية ==========

// فحص المخالفات
function checkCommunityViolations(text) {
    let violations = [];
    let lowerText = text.toLowerCase();
    
    blockedWords.forEach(word => {
        if (lowerText.includes(word.toLowerCase())) {
            let type = "traditions";
            if (word.includes("سكس") || word.includes("جنس") || word.includes("عاري") || word.includes("porn")) type = "sexual";
            else if (word.includes("دين") || word.includes("كفر") || word.includes("رسول")) type = "religious";
            else if (word.includes("قبيلة") || word.includes("عنصرية") || word.includes("عرق")) type = "racist";
            else if (word.includes("شتيمة") || word.includes("سب") || word.includes("لعنة")) type = "offensive";
            
            violations.push({ type: type, word: word, message: violationTypes[type] });
        }
    });
    return violations;
}

// إرسال إعلان للمراجعة
function submitForApproval(category, data, imageUrl) {
    let allText = `${data.name} ${data.desc || ''} ${data.price || ''}`;
    let violations = checkCommunityViolations(allText);
    
    let newAd = {
        id: Date.now(),
        category: category,
        ...data,
        image: imageUrl || "https://placehold.co/300x200/1e3a5f/white?text=قيد+المراجعة",
        status: violations.length > 0 ? "rejected" : "pending",
        violations: violations,
        submittedAt: new Date().toLocaleString(),
        seller: "مستخدم جديد",
        reports: 0
    };
    
    if (violations.length > 0) {
        newAd.status = "rejected";
        rejectedAds.unshift(newAd);
        violationsLog.unshift({ 
            ad: data.name, 
            violations: violations.map(v => v.word).join(", "), 
            type: violations[0]?.type, 
            date: new Date().toLocaleString() 
        });
        agentLog.unshift({ 
            action: "رفض تلقائي (مخالفة مجتمعية)", 
            ad: data.name, 
            reason: violations.map(v => v.message).join(", "), 
            date: new Date().toLocaleString() 
        });
        return { success: false, violations: violations, message: "تم رفض الإعلان بسبب مخالفة مجتمعية" };
    } else {
        pendingAds.unshift(newAd);
        agentLog.unshift({ action: "قيد المراجعة", ad: data.name, date: new Date().toLocaleString() });
        return { success: true, message: "تم إرسال الإعلان للمراجعة" };
    }
}

// قبول إعلان
function approveAd(adId) {
    let index = pendingAds.findIndex(ad => ad.id == adId);
    if (index !== -1) {
        let ad = pendingAds[index];
        ad.status = "approved";
        let targetArray = getCategoryArray(ad.category);
        if (targetArray) targetArray.unshift(ad);
        pendingAds.splice(index, 1);
        agentLog.unshift({ action: "موافقة", ad: ad.name, date: new Date().toLocaleString() });
        renderAll();
    }
}

// رفض إعلان
function rejectAd(adId, reason) {
    let index = pendingAds.findIndex(ad => ad.id == adId);
    if (index !== -1) {
        let ad = pendingAds[index];
        ad.status = "rejected";
        ad.rejectionReason = reason;
        rejectedAds.unshift(ad);
        pendingAds.splice(index, 1);
        agentLog.unshift({ action: "رفض", ad: ad.name, reason: reason, date: new Date().toLocaleString() });
        renderAll();
    }
}

// الإبلاغ عن إعلان
function reportAd(adId, reason, category) {
    let targetArray = getCategoryArray(category);
    let ad = targetArray?.find(a => a.id == adId);
    if (ad) {
        if (!ad.reports) ad.reports = 0;
        ad.reports++;
        reportsList.unshift({
            adId: adId,
            adName: ad.name,
            category: category,
            reason: reason,
            reporter: "مستخدم",
            date: new Date().toLocaleString(),
            status: "pending"
        });
        reportsLog.unshift({ action: "بلاغ جديد", ad: ad.name, reason: reason, date: new Date().toLocaleString() });
        
        if (ad.reports >= 3) {
            let index = targetArray.findIndex(a => a.id == adId);
            if (index !== -1) {
                targetArray.splice(index, 1);
                rejectedAds.unshift({ ...ad, status: "rejected", rejectionReason: "تعدد البلاغات" });
                agentLog.unshift({ action: "حظر تلقائي", ad: ad.name, reason: "تعدد البلاغات (" + ad.reports + ")", date: new Date().toLocaleString() });
            }
        }
        renderAll();
        return true;
    }
    return false;
}

// معالجة البلاغ
function resolveReport(reportIndex, action) {
    if (reportsList[reportIndex]) {
        let report = reportsList[reportIndex];
        report.status = action === "accept" ? "تم الحذف" : "تم الرفض";
        reportsLog.unshift({ action: action === "accept" ? "تم حذف الإعلان المخالف" : "تم رفض البلاغ", ad: report.adName, date: new Date().toLocaleString() });
        
        if (action === "accept") {
            let targetArray = getCategoryArray(report.category);
            let adIndex = targetArray?.findIndex(a => a.id == report.adId);
            if (adIndex !== -1 && adIndex !== undefined) {
                let removedAd = targetArray[adIndex];
                targetArray.splice(adIndex, 1);
                rejectedAds.unshift({ ...removedAd, status: "rejected", rejectionReason: report.reason });
            }
        }
        renderAll();
    }
}

// الحصول على مصفوفة حسب القسم
function getCategoryArray(category) {
    const map = { 
        "عقارات": realEstateAds, 
        "إلكترونيات": electronicsAds, 
        "سيارات": carsAds, 
        "وظائف": jobsAds, 
        "عام": generalAds 
    };
    return map[category] || generalAds;
}

// ========== 4. عرض البيانات (Rendering) ==========

// تحديث الإحصائيات
function updateStats() {
    let totalPending = pendingAds.length;
    let totalRejected = rejectedAds.length;
    let totalApproved = realEstateAds.length + electronicsAds.length + carsAds.length + jobsAds.length + generalAds.length;
    let totalViolations = violationsLog.length;
    let totalReports = reportsList.length;
    let totalViews = [...realEstateAds, ...electronicsAds, ...carsAds, ...jobsAds, ...generalAds].reduce((sum, ad) => sum + (ad.views || 0), 0);
    
    document.getElementById("statAds").innerText = totalPending + totalApproved + totalRejected;
    document.getElementById("statPending").innerText = totalPending;
    document.getElementById("statApproved").innerText = totalApproved;
    document.getElementById("statRejected").innerText = totalRejected;
    document.getElementById("statViolations").innerText = totalViolations;
    document.getElementById("statReports").innerText = totalReports;
    document.getElementById("statViews").innerText = totalViews + Math.floor(Math.random() * 50);
    document.getElementById("statUsers").innerText = Math.floor(Math.random() * 80) + 20;
    document.getElementById("statRevenue").innerText = `$${(Math.random() * 500).toFixed(0)}`;
}

// عرض الإعلانات في المعارض
function renderGalleries() {
    function renderGallery(containerId, data) {
        let container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";
        data.forEach(item => {
            let div = document.createElement("div");
            div.className = "gallery-item";
            let reportFlag = `<div class="report-flag" onclick="event.stopPropagation(); promptReport('${item.id}', '${getCategoryName(containerId)}')" title="الإبلاغ عن مخالفة">🚨</div>`;
            let ratingHtml = item.sellerRating ? `<div class="rating-stars">${"★".repeat(Math.floor(item.sellerRating))}${"☆".repeat(5 - Math.floor(item.sellerRating))}</div>` : "";
            div.innerHTML = reportFlag + `<img src="${item.image}" alt="${item.name}"><h4>${item.name}</h4><p>${item.price || item.salary || ""}<br>📍 ${item.city || ""}</p>${ratingHtml}<span class="badge">${item.type || item.category}</span>`;
            div.onclick = () => { if (item.seller) { currentContact = item.seller; loadChat(); switchTab('messaging'); } };
            container.appendChild(div);
        });
    }
    
    renderGallery("realEstateGallery", realEstateAds);
    renderGallery("electronicsGallery", electronicsAds);
    renderGallery("carsGallery", carsAds);
    renderGallery("jobsGallery", jobsAds);
    renderGallery("generalGallery", generalAds);
    
    // عرض أداء الإعلانات
    let allAds = [...realEstateAds.slice(0, 3), ...electronicsAds.slice(0, 2), ...carsAds.slice(0, 2)];
    let perfHtml = "";
    allAds.forEach(ad => {
        perfHtml += `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;"><span>${ad.name}</span><span>👁️ ${ad.views || 0}</span></div>`;
    });
    document.getElementById("adPerformanceList").innerHTML = perfHtml || "<p>لا توجد إعلانات معتمدة</p>";
}

// الحصول على اسم القسم من containerId
function getCategoryName(containerId) {
    const map = {
        "realEstateGallery": "عقارات",
        "electronicsGallery": "إلكترونيات",
        "carsGallery": "سيارات",
        "jobsGallery": "وظائف",
        "generalGallery": "عام"
    };
    return map[containerId] || "عام";
}

// عرض لوحة الوكيل
function renderAgentPanel() {
    // قائمة الإعلانات المنتظرة
    let pendingHtml = "";
    pendingAds.forEach(ad => {
        pendingHtml += `<div style="border:1px solid #eee; border-radius:14px; padding:0.6rem; margin-bottom:0.6rem;">
            <strong>${ad.name}</strong> - ${ad.category}<br>
            <small>💰 ${ad.price || "غير محدد"} | 📍 ${ad.city || "أسمرة"}</small>
            <div style="margin-top:0.4rem;">
                <button onclick="approveAd(${ad.id})" class="btn-sm" style="background:#28a745; color:white;">✅ قبول</button>
                <button onclick="rejectAd(${ad.id}, 'مخالفة مجتمعية')" class="btn-sm" style="background:#dc3545; color:white;">❌ رفض</button>
            </div>
        </div>`;
    });
    document.getElementById("pendingAdsList").innerHTML = pendingHtml || "<p>لا توجد إعلانات تنتظر المراجعة</p>";
    
    // قائمة المخالفات
    let violationsHtml = "";
    violationsLog.slice(0, 10).forEach(v => {
        violationsHtml += `<div class="violation-item">⚠️ <strong>${v.ad}</strong> - ${v.violations}<br><small>${v.date}</small></div>`;
    });
    document.getElementById("violationsList").innerHTML = violationsHtml || "<p>لا توجد مخالفات</p>";
    
    // سجل الوكيل
    let logHtml = "";
    agentLog.slice(0, 15).forEach(log => {
        logHtml += `<div style="padding:0.4rem; border-bottom:1px solid #eee;">🛡️ ${log.action}: ${log.ad} ${log.reason ? `- ${log.reason}` : ""}<br><small>${log.date}</small></div>`;
    });
    document.getElementById("agentLogList").innerHTML = logHtml || "<p>لا توجد سجلات</p>";
    
    // الكلمات الممنوعة
    let wordsHtml = "";
    blockedWords.forEach(word => {
        wordsHtml += `<span style="display:inline-block; background:#dc3545; color:white; padding:0.15rem 0.5rem; border-radius:16px; margin:0.2rem; font-size:0.65rem;">${word} ✖</span>`;
    });
    document.getElementById("blockedWordsList").innerHTML = wordsHtml;
}

// عرض البلاغات
function renderReportsPanel() {
    let reportsHtml = "";
    reportsList.forEach((report, idx) => {
        reportsHtml += `<div class="report-item">
            <strong>🚨 ${report.adName}</strong> - ${report.category}<br>
            سبب البلاغ: ${report.reason}<br>
            <small>${report.date}</small>
            <div style="margin-top:0.4rem;">
                <button onclick="resolveReport(${idx}, 'accept')" class="btn-sm" style="background:#dc3545; color:white;">🗑️ حذف الإعلان</button>
                <button onclick="resolveReport(${idx}, 'reject')" class="btn-sm" style="background:#28a745; color:white;">✅ تجاهل البلاغ</button>
            </div>
        </div>`;
    });
    document.getElementById("reportsList").innerHTML = reportsHtml || "<p>لا توجد بلاغات</p>";
    
    let reportsLogHtml = "";
    reportsLog.slice(0, 10).forEach(log => {
        reportsLogHtml += `<div style="padding:0.3rem; border-bottom:1px solid #eee;">📋 ${log.action}: ${log.ad}<br><small>${log.date}</small></div>`;
    });
    document.getElementById("reportsLogList").innerHTML = reportsLogHtml || "<p>لا توجد سجلات</p>";
}

// عرض جميع البيانات
function renderAll() {
    updateStats();
    renderGalleries();
    renderAgentPanel();
    renderReportsPanel();
}

// ========== 5. وظائف النشر (Publishing) ==========

function createPublishHandler(category, fields, msgId) {
    return () => {
        let values = fields.map(f => document.getElementById(f.id)?.value || "");
        if (!values[0]) {
            document.getElementById(msgId).innerText = "❌ املأ البيانات";
            return;
        }
        let data = {};
        fields.forEach((f, i) => { data[f.key] = values[i]; });
        data.city = data.city || "أسمرة";
        let result = submitForApproval(category, data, null);
        document.getElementById(msgId).innerHTML = result.success ? "✅ " + result.message : "❌ " + result.message + ": " + result.violations.map(v => v.word).join(", ");
        fields.forEach(f => { let el = document.getElementById(f.id); if (el) el.value = ""; });
        renderAll();
    };
}

// ========== 6. المراسلة ==========

let messages = [
    { id: 1, from: "علي حسن", to: "مشتري", text: "مرحباً، هل الشقة لا تزال متاحة؟", time: "10:30" }
];
let currentContact = "علي حسن";

function loadContacts() {
    let contactsList = document.getElementById("contactsList");
    if (!contactsList) return;
    contactsList.innerHTML = "";
    let uniqueSellers = new Set();
    [...realEstateAds, ...electronicsAds, ...carsAds, ...generalAds].forEach(ad => {
        if (ad.seller) uniqueSellers.add(ad.seller);
    });
    uniqueSellers.forEach(seller => {
        let div = document.createElement("div");
        div.className = "chat-message";
        div.style.cursor = "pointer";
        div.innerHTML = `<div><strong>${seller}</strong><div style="font-size:0.7rem;">${messages.find(m => m.from === seller)?.text || "مرحباً"}</div></div>`;
        div.onclick = () => { currentContact = seller; loadChat(); };
        contactsList.appendChild(div);
    });
}

function loadChat() {
    let chatDiv = document.getElementById("chatMessages");
    if (!chatDiv) return;
    let chatMessages = messages.filter(m => m.from === currentContact || m.to === currentContact);
    chatDiv.innerHTML = "";
    chatMessages.forEach(msg => {
        let div = document.createElement("div");
        div.className = "chat-message";
        div.innerHTML = `<div><strong>${msg.from}</strong><div>${msg.text}</div><div style="font-size:0.6rem;">${msg.time}</div></div>`;
        chatDiv.appendChild(div);
    });
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

// ========== 7. التقييمات ==========

let ratings = [
    { user: "أحمد محمود", rating: 5, comment: "منصة محترمة ومحافظة على العادات", date: "2026-04-01" }
];

function loadRatings() {
    let ratingsDiv = document.getElementById("ratingsList");
    if (!ratingsDiv) return;
    ratingsDiv.innerHTML = "";
    ratings.forEach(r => {
        let div = document.createElement("div");
        div.className = "chat-message";
        div.innerHTML = `<div><strong>${r.user}</strong><div class="rating-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div><div>${r.comment}</div><div style="font-size:0.6rem;">${r.date}</div></div>`;
        ratingsDiv.appendChild(div);
    });
}

// ========== 8. الدفع والمحفظة ==========

let balance = 0;
let transactions = [];

function updateWallet() {
    document.getElementById("balanceAmount").innerHTML = `$${balance}`;
    let html = "";
    transactions.slice(0, 10).forEach(t => {
        html += `<div style="padding:5px 0; border-bottom:1px solid #eee;">${t.date} - ${t.amount} - ${t.type}</div>`;
    });
    document.getElementById("transactionsList").innerHTML = html || "<p>لا توجد معاملات</p>";
}

// ========== 9. الطيران ==========

const flightsData = {
    "DXB-ASM": [{ airline: "FlyDubai", price: "$450" }, { airline: "Ethiopian", price: "$520" }],
    "JED-ASM": [{ airline: "Ethiopian", price: "$380" }],
    "CAI-ASM": [{ airline: "EgyptAir", price: "$490" }],
    "ADD-ASM": [{ airline: "Ethiopian", price: "$210" }, { airline: "Eritrean Airlines", price: "$195" }]
};

function searchFlights() {
    let from = document.getElementById("flightFrom")?.value;
    let date = document.getElementById("flightDate")?.value;
    let flights = flightsData[`${from}-ASM`] || [];
    let resultsDiv = document.getElementById("flightResults");
    if (!resultsDiv) return;
    if (flights.length === 0) {
        resultsDiv.innerHTML = "❌ لا توجد رحلات متاحة لهذا المسار";
        return;
    }
    let html = `<strong>نتائج البحث (${date}):</strong><br><br>`;
    flights.forEach(f => { html += `✈️ ${f.airline} | ${f.price}<br>`; });
    resultsDiv.innerHTML = html;
}

function confirmBooking() {
    let name = document.getElementById("passengerName")?.value;
    let msgDiv = document.getElementById("bookingMsg");
    if (!name) {
        if (msgDiv) msgDiv.innerText = "❌ يرجى إدخال الاسم";
        return;
    }
    if (msgDiv) msgDiv.innerText = `✅ تم تأكيد حجز ${name} - سيتم إرسال التذكرة إلى بريدك الإلكتروني`;
}

// ========== 10. تبديل التبويبات (Tabs) ==========

function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active-pane'));
    let pane = document.getElementById(`${tabId}Pane`);
    if (pane) pane.classList.add('active-pane');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    let tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (tabBtn) tabBtn.classList.add('active');
    
    document.querySelectorAll('.nav-tab-link').forEach(link => link.classList.remove('active'));
    let navLink = document.querySelector(`.nav-tab-link[data-tab="${tabId}"]`);
    if (navLink) navLink.classList.add('active');
    
    // تحديث البيانات حسب التبويب
    if (tabId === 'messaging') { loadContacts(); loadChat(); }
    if (tabId === 'ratings') loadRatings();
    if (tabId === 'agent' || tabId === 'reports' || tabId === 'dashboard') renderAll();
}

// ========== 11. الترجمة (Multilingual) ==========

const translations = {
    ar: {
        tagline: "منصة تحترم عاداتنا وتقاليدنا - بروح القانون الإريتري",
        footerText: "Asmara.Store — منصة تحترم قيم المجتمع الإريتري"
    },
    en: {
        tagline: "A platform that respects our customs and traditions - In the spirit of Eritrean law",
        footerText: "Asmara.Store — A platform that respects Eritrean community values"
    },
    ti: {
        tagline: "ልማዳትና ባህልና ዘከብር መድረኽ - ብመንፈስ ሕጊ ኤርትራ",
        footerText: "ኣስመራ.ስቶር — ኩነታት ማሕበረሰብ ኤርትራ ዘከብር መድረኽ"
    }
};

let currentLang = "ar";

function updateLanguage(lang) {
    currentLang = lang;
    let t = translations[lang];
    if (!t) return;
    document.getElementById("tagline").innerText = t.tagline;
    document.getElementById("footerText").innerText = t.footerText;
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// ========== 12. معاينة الصور ==========

function setupImagePreview(inputId, previewId) {
    let input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("change", function(e) {
        let preview = document.getElementById(previewId);
        if (preview) preview.innerHTML = "";
        let file = e.target.files[0];
        if (file && preview) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                let img = document.createElement("img");
                img.src = ev.target.result;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

// ========== 13. نافذة الإبلاغ ==========

function promptReport(adId, category) {
    let reason = prompt("سبب البلاغ (محتوى جنسي، مخالفة عادات، لغة مسيئة، إلخ):");
    if (reason && reason.trim()) {
        reportAd(adId, reason, category);
        alert("تم إرسال البلاغ إلى الوكيل للمراجعة");
    }
}

// ========== 14. تهيئة الصفحة (Initialization) ==========

document.addEventListener('DOMContentLoaded', function() {
    // ربط أزرار النشر
    document.getElementById("publishReBtn")?.addEventListener("click", createPublishHandler("عقارات", [
        { id: "reType", key: "type" }, { id: "reName", key: "name" },
        { id: "rePrice", key: "price" }, { id: "reDesc", key: "desc" }, { id: "reCity", key: "city" }
    ], "reMsg"));
    
    document.getElementById("publishElecBtn")?.addEventListener("click", createPublishHandler("إلكترونيات", [
        { id: "elecType", key: "type" }, { id: "elecName", key: "name" },
        { id: "elecPrice", key: "price" }, { id: "elecDesc", key: "desc" }, { id: "elecCity", key: "city" }
    ], "elecMsg"));
    
    document.getElementById("publishCarBtn")?.addEventListener("click", createPublishHandler("سيارات", [
        { id: "carType", key: "type" }, { id: "carName", key: "name" },
        { id: "carPrice", key: "price" }, { id: "carDesc", key: "desc" }, { id: "carCity", key: "city" }
    ], "carMsg"));
    
    document.getElementById("publishJobBtn")?.addEventListener("click", createPublishHandler("وظائف", [
        { id: "jobType", key: "type" }, { id: "jobTitle", key: "name" },
        { id: "jobCompany", key: "company" }, { id: "jobSalary", key: "salary" },
        { id: "jobDesc", key: "desc" }, { id: "jobCity", key: "city" }
    ], "jobMsg"));
    
    document.getElementById("publishGeneralBtn")?.addEventListener("click", createPublishHandler("عام", [
        { id: "adType", key: "type" }, { id: "adName", key: "name" },
        { id: "adPrice", key: "price" }, { id: "adDesc", key: "desc" }, { id: "adCity", key: "city" }
    ], "generalMsg"));
    
    // ربط أزرار الطيران
    document.getElementById("searchFlightBtn")?.addEventListener("click", searchFlights);
    document.getElementById("confirmBookingBtn")?.addEventListener("click", confirmBooking);
    
    // ربط أزرار المراسلة
    document.getElementById("sendMsgBtn")?.addEventListener("click", () => {
        let input = document.getElementById("chatInput");
        if (!input.value.trim()) return;
        messages.push({ from: "أنا", to: currentContact, text: input.value, time: new Date().toLocaleTimeString() });
        loadChat();
        input.value = "";
    });
    
    // ربط أزرار التقييمات
    document.getElementById("addRatingBtn")?.addEventListener("click", () => {
        let comment = document.getElementById("newRatingComment")?.value;
        let rating = document.getElementById("ratingStars")?.value;
        if (!comment) return;
        ratings.unshift({ user: "مستخدم جديد", rating: parseInt(rating), comment: comment, date: new Date().toLocaleDateString() });
        loadRatings();
        document.getElementById("newRatingComment").value = "";
    });
    
    // ربط أزرار الدفع
    document.getElementById("paypalBtn")?.addEventListener("click", () => {
        let msgDiv = document.getElementById("paymentMsg");
        if (msgDiv) msgDiv.innerText = "🟡 جاري التوجيه إلى PayPal...";
        setTimeout(() => {
            balance += 29;
            transactions.unshift({ date: new Date().toLocaleDateString(), amount: "+$29", type: "اشتراك Pro" });
            updateWallet();
            if (msgDiv) msgDiv.innerHTML = "✅ تم الدفع بنجاح!";
        }, 1500);
    });
    
    document.getElementById("addFundsBtn")?.addEventListener("click", () => {
        balance += 50;
        transactions.unshift({ date: new Date().toLocaleDateString(), amount: "+$50", type: "إيداع يدوي" });
        updateWallet();
    });
    
    // ربط إضافة كلمات ممنوعة
    document.getElementById("addBlockedWordBtn")?.addEventListener("click", () => {
        let newWord = document.getElementById("newBlockedWord")?.value;
        if (newWord && !blockedWords.includes(newWord)) {
            blockedWords.push(newWord);
            renderAll();
            document.getElementById("newBlockedWord").value = "";
        }
    });
    
    // ربط معاينة الصور
    setupImagePreview("reImage", "rePreview");
    setupImagePreview("elecImage", "elecPreview");
    setupImagePreview("carImage", "carPreview");
    setupImagePreview("adImage", "adPreview");
    
    // ربط أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
    });
    
    // ربط أزرار التبويبات
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    document.querySelectorAll('.nav-tab-link').forEach(link => {
        link.addEventListener('click', () => switchTab(link.dataset.tab));
    });
    
    // ربط معلومات المكتبة
    document.getElementById("libraryInfoBtn")?.addEventListener("click", () => {
        alert("📚 مكتبة أسمرة: مركز التوثيق الوطني - للاستفسار: وزارة المعلومات عبر Shabait.com");
    });
    
    // تعريف الدوال العامة
    window.approveAd = approveAd;
    window.rejectAd = rejectAd;
    window.reportAd = reportAd;
    window.resolveReport = resolveReport;
    window.promptReport = promptReport;
    
    // التهيئة الأولية
    updateLanguage('ar');
    renderAll();
    updateWallet();
    loadRatings();
    
    // فتح التبويب الافتراضي
    switchTab('dashboard');
});
