/**
 * ============================================
 * Asmara.Store - Main Application File
 * المنصة الرقمية المتكاملة لإريتريا
 * ============================================
 * Version: 2.0.0
 * Author: Asmara.Store Team
 * License: MIT
 * Description: المنصة الأولى من نوعها في إريتريا
 * ============================================
 */

// ============================================
// DATA STORAGE (Mock Data - يمكن استبدالها بـ API)
// ============================================

// قائمة الكلمات الممنوعة (جنس + عادات وتقاليد)
const BLOCKED_WORDS = [
    // كلمات جنسية صريحة
    "سكس", "جنس", "عاري", "عارية", "نيك", "زنا", "شذوذ", "porn", "sex", "naked", "xxx",
    // مخالفة العادات والتقاليد
    "مسيء", "شتيمة", "سب", "لعنة", "قبيلة", "عنصرية", "عرق", "طائفي", "شتم", "تحريض",
    "إهانة", "دين", "كفر", "رسول", "مسجد", "كنيسة", "عيب", "فاحشة", "فجور", "رذيلة",
    "خمر", "خنزير", "حرام", "عادات", "تقاليد", "إريتري", "ثقافة", "ملابس", "فساتين"
];

// أنواع المخالفات
const VIOLATION_TYPES = {
    sexual: "محتوى جنسي غير لائق",
    religious: "مساس بالدين أو المعتقدات",
    racist: "تحريض طائفي أو عنصري",
    offensive: "لغة مسيئة أو شتائم",
    traditions: "مخالفة للعادات والتقاليد المجتمعية"
};

// البيانات الرئيسية
let pendingAds = [];
let rejectedAds = [];
let violationsLog = [];
let agentLog = [];
let reportsList = [];
let reportsLog = [];

// إعلانات الأقسام
let realEstateAds = [];
let electronicsAds = [];
let carsAds = [];
let jobsAds = [];
let generalAds = [];

// المراسلة والتقييمات
let messages = [];
let ratings = [];
let balance = 0;
let transactions = [];
let currentContact = "";

// متغيرات الجلسة
let currentLang = "ar";
let currentUser = null;
let isAgent = true; // مؤقتاً - سيتم ربطه بتسجيل الدخول لاحقاً

// بيانات الرحلات الجوية
const FLIGHTS_DATA = {
    "DXB-ASM": [{ airline: "FlyDubai", price: "$450", departure: "08:00", arrival: "11:30" }],
    "JED-ASM": [{ airline: "Ethiopian Airlines", price: "$380", departure: "09:15", arrival: "12:45" }],
    "CAI-ASM": [{ airline: "EgyptAir", price: "$490", departure: "10:00", arrival: "14:30" }],
    "ADD-ASM": [{ airline: "Ethiopian Airlines", price: "$210", departure: "07:30", arrival: "09:00" }]
};

// الترجمات
const TRANSLATIONS = {
    ar: {
        tagline: "منصة تحترم عاداتنا وتقاليدنا - بروح القانون الإريتري",
        statAdsLabel: "الإعلانات",
        statPendingLabel: "قيد المراجعة",
        statApprovedLabel: "مقبولة",
        statRejectedLabel: "مرفوضة",
        statViolationsLabel: "مخالفات",
        statReportsLabel: "بلاغات",
        footerText: "Asmara.Store — منصة تحترم قيم المجتمع الإريتري",
        // ... باقي الترجمات
    },
    en: {
        tagline: "A platform that respects our customs and traditions - In the spirit of Eritrean law",
        statAdsLabel: "Ads",
        statPendingLabel: "Pending",
        statApprovedLabel: "Approved",
        statRejectedLabel: "Rejected",
        statViolationsLabel: "Violations",
        statReportsLabel: "Reports",
        footerText: "Asmara.Store — A platform that respects Eritrean community values",
        // ... باقي الترجمات
    },
    ti: {
        tagline: "ልማዳትና ባህልና ዘከብር መድረኽ - ብመንፈስ ሕጊ ኤርትራ",
        statAdsLabel: "ማስታወቂያ",
        statPendingLabel: "ክምርመር ዘሎ",
        statApprovedLabel: "ተቀባልነት",
        statRejectedLabel: "ተኣቃዊ",
        statViolationsLabel: "ጥሰታት",
        statReportsLabel: "ሕጸጋታት",
        footerText: "ኣስመራ.ስቶር — ኩነታት ማሕበረሰብ ኤርትራ ዘከብር መድረኽ",
        // ... باقي الترجمات
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * فحص المخالفات المجتمعية في النص
 * @param {string} text - النص المراد فحصه
 * @returns {Array} - قائمة المخالفات المكتشفة
 */
function checkCommunityViolations(text) {
    const violations = [];
    const lowerText = text.toLowerCase();
    
    BLOCKED_WORDS.forEach(word => {
        if (lowerText.includes(word.toLowerCase())) {
            let violationType = "traditions";
            
            if (word.includes("سكس") || word.includes("جنس") || word.includes("عاري") || 
                word.includes("porn") || word.includes("sex")) {
                violationType = "sexual";
            } else if (word.includes("دين") || word.includes("كفر") || word.includes("رسول") || 
                       word.includes("مسجد") || word.includes("كنيسة")) {
                violationType = "religious";
            } else if (word.includes("قبيلة") || word.includes("عنصرية") || word.includes("عرق") || 
                       word.includes("طائفي")) {
                violationType = "racist";
            } else if (word.includes("شتيمة") || word.includes("سب") || word.includes("لعنة") || 
                       word.includes("إهانة")) {
                violationType = "offensive";
            }
            
            violations.push({
                type: violationType,
                word: word,
                message: VIOLATION_TYPES[violationType] || VIOLATION_TYPES.traditions
            });
        }
    });
    
    // فحص أنماط إضافية
    if (/(\d{1,2})\s*(سنة|عام)/.test(text) && text.includes("زواج")) {
        violations.push({ type: "traditions", word: "زواج مبكر", message: "مخالفة للعادات" });
    }
    
    if (/(ملابس|لباس)\s*(عاري|شفاف|قصير)/i.test(text)) {
        violations.push({ type: "sexual", word: "ملابس غير لائقة", message: VIOLATION_TYPES.sexual });
    }
    
    return violations;
}

/**
 * إرسال إعلان للمراجعة
 * @param {string} category - قسم الإعلان
 * @param {Object} data - بيانات الإعلان
 * @param {string} imageUrl - رابط الصورة
 * @returns {Object} - نتيجة الإرسال
 */
function submitForApproval(category, data, imageUrl = null) {
    const allText = `${data.name} ${data.desc || ''} ${data.price || ''}`;
    const violations = checkCommunityViolations(allText);
    
    const newAd = {
        id: Date.now(),
        category: category,
        ...data,
        image: imageUrl || "https://placehold.co/300x200/1e3a5f/white?text=قيد+المراجعة",
        status: violations.length > 0 ? "rejected" : "pending",
        violations: violations,
        submittedAt: new Date().toLocaleString(),
        seller: currentUser || "مستخدم جديد",
        reports: 0,
        views: 0
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
        agentLog.unshift({
            action: "قيد المراجعة",
            ad: data.name,
            date: new Date().toLocaleString()
        });
        return { success: true, message: "تم إرسال الإعلان للمراجعة" };
    }
}

/**
 * قبول الإعلان من قبل الوكيل
 * @param {number} adId - معرف الإعلان
 */
function approveAd(adId) {
    const index = pendingAds.findIndex(ad => ad.id == adId);
    if (index !== -1) {
        const ad = pendingAds[index];
        ad.status = "approved";
        
        const targetArray = getCategoryArray(ad.category);
        if (targetArray) targetArray.unshift(ad);
        
        pendingAds.splice(index, 1);
        agentLog.unshift({
            action: "موافقة",
            ad: ad.name,
            date: new Date().toLocaleString()
        });
        renderAll();
    }
}

/**
 * رفض الإعلان من قبل الوكيل
 * @param {number} adId - معرف الإعلان
 * @param {string} reason - سبب الرفض
 */
function rejectAd(adId, reason) {
    const index = pendingAds.findIndex(ad => ad.id == adId);
    if (index !== -1) {
        const ad = pendingAds[index];
        ad.status = "rejected";
        ad.rejectionReason = reason;
        rejectedAds.unshift(ad);
        pendingAds.splice(index, 1);
        agentLog.unshift({
            action: "رفض",
            ad: ad.name,
            reason: reason,
            date: new Date().toLocaleString()
        });
        renderAll();
    }
}

/**
 * الحصول على مصفوفة الإعلانات حسب القسم
 * @param {string} category - قسم الإعلان
 * @returns {Array} - مصفوفة الإعلانات
 */
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

/**
 * الإبلاغ عن إعلان مخالف
 * @param {number} adId - معرف الإعلان
 * @param {string} reason - سبب الإبلاغ
 * @param {string} category - قسم الإعلان
 * @returns {boolean} - نجاح العملية
 */
function reportAd(adId, reason, category) {
    const targetArray = getCategoryArray(category);
    const ad = targetArray?.find(a => a.id == adId);
    
    if (ad) {
        ad.reports = (ad.reports || 0) + 1;
        reportsList.unshift({
            adId: adId,
            adName: ad.name,
            category: category,
            reason: reason,
            reporter: "مستخدم",
            date: new Date().toLocaleString(),
            status: "pending"
        });
        reportsLog.unshift({
            action: "بلاغ جديد",
            ad: ad.name,
            reason: reason,
            date: new Date().toLocaleString()
        });
        
        // حظر تلقائي عند وصول البلاغات إلى 3
        if (ad.reports >= 3) {
            const index = targetArray.findIndex(a => a.id == adId);
            if (index !== -1) {
                const removedAd = targetArray[index];
                targetArray.splice(index, 1);
                rejectedAds.unshift({
                    ...removedAd,
                    status: "rejected",
                    rejectionReason: `تعدد البلاغات (${ad.reports})`
                });
                agentLog.unshift({
                    action: "حظر تلقائي",
                    ad: ad.name,
                    reason: `تعدد البلاغات (${ad.reports})`,
                    date: new Date().toLocaleString()
                });
            }
        }
        renderAll();
        return true;
    }
    return false;
}

/**
 * معالجة البلاغ من قبل الوكيل
 * @param {number} reportIndex - مؤشر البلاغ
 * @param {string} action - الإجراء (accept/reject)
 */
function resolveReport(reportIndex, action) {
    if (reportsList[reportIndex]) {
        const report = reportsList[reportIndex];
        report.status = action === "accept" ? "تم الحذف" : "تم الرفض";
        reportsLog.unshift({
            action: action === "accept" ? "تم حذف الإعلان المخالف" : "تم رفض البلاغ",
            ad: report.adName,
            date: new Date().toLocaleString()
        });
        
        if (action === "accept") {
            const targetArray = getCategoryArray(report.category);
            const adIndex = targetArray?.findIndex(a => a.id == report.adId);
            if (adIndex !== -1 && adIndex !== undefined) {
                const removedAd = targetArray[adIndex];
                targetArray.splice(adIndex, 1);
                rejectedAds.unshift({
                    ...removedAd,
                    status: "rejected",
                    rejectionReason: report.reason
                });
            }
        }
        renderAll();
    }
}

/**
 * إنشاء معالج نشر الإعلانات
 * @param {string} category - قسم الإعلان
 * @param {Array} fields - حقول النموذج
 * @param {string} msgId - معرف رسالة الحالة
 * @returns {Function} - معالج النشر
 */
function createPublishHandler(category, fields, msgId) {
    return () => {
        const values = fields.map(f => document.getElementById(f.id)?.value || "");
        if (!values[0]) {
            document.getElementById(msgId).innerText = "❌ املأ البيانات";
            return;
        }
        
        const data = {};
        fields.forEach((f, i) => { data[f.key] = values[i]; });
        data.city = data.city || "أسمرة";
        
        const result = submitForApproval(category, data, null);
        const msgElement = document.getElementById(msgId);
        
        if (msgElement) {
            if (result.success) {
                msgElement.innerHTML = "✅ " + result.message;
            } else {
                msgElement.innerHTML = "❌ " + result.message + ": " + result.violations.map(v => v.word).join(", ");
            }
        }
        
        fields.forEach(f => {
            const el = document.getElementById(f.id);
            if (el) el.value = "";
        });
        
        renderAll();
    };
}

/**
 * تحديث الإحصائيات والعرض
 */
function updateStats() {
    const totalPending = pendingAds.length;
    const totalRejected = rejectedAds.length;
    const totalApproved = realEstateAds.length + electronicsAds.length + carsAds.length + jobsAds.length + generalAds.length;
    const totalViolations = violationsLog.length;
    const totalReports = reportsList.length;
    const totalAds = totalPending + totalApproved + totalRejected;
    const totalViews = [...realEstateAds, ...electronicsAds, ...carsAds, ...jobsAds, ...generalAds]
        .reduce((sum, ad) => sum + (ad.views || 0), 0);
    
    const statElements = {
        statAds: totalAds,
        statPending: totalPending,
        statApproved: totalApproved,
        statRejected: totalRejected,
        statViolations: totalViolations,
        statReports: totalReports,
        statViews: totalViews,
        statUsers: Math.floor(Math.random() * 80) + 20,
        statRevenue: balance + Math.floor(Math.random() * 500)
    };
    
    Object.keys(statElements).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (key === 'statRevenue') {
                element.innerText = `$${statElements[key].toFixed(0)}`;
            } else {
                element.innerText = statElements[key];
            }
        }
    });
    
    // أداء الإعلانات
    const allAds = [...realEstateAds.slice(0, 3), ...electronicsAds.slice(0, 2), ...carsAds.slice(0, 2)];
    const perfHtml = allAds.map(ad => `
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;">
            <span>${ad.name}</span>
            <span>👁️ ${ad.views || 0} مشاهدة</span>
        </div>
    `).join("");
    
    const performanceList = document.getElementById("adPerformanceList");
    if (performanceList) {
        performanceList.innerHTML = perfHtml || "<p>لا توجد إعلانات معتمدة</p>";
    }
}

/**
 * عرض قائمة الإعلانات المعلقة
 */
function renderPendingAds() {
    const container = document.getElementById("pendingAdsList");
    if (!container) return;
    
    const html = pendingAds.map(ad => `
        <div style="border:1px solid #eee; border-radius:14px; padding:0.8rem; margin-bottom:0.8rem; font-size:0.85rem;">
            <strong>${ad.name}</strong> - ${ad.category}<br>
            <small>💰 ${ad.price || "غير محدد"} | 📍 ${ad.city || "أسمرة"}</small>
            <div style="margin-top:0.5rem;">
                <button onclick="window.approveAd(${ad.id})" class="btn-sm" style="background:#28a745; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer;">✅ قبول</button>
                <button onclick="window.rejectAd(${ad.id}, 'مخالفة مجتمعية')" class="btn-sm" style="background:#dc3545; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer; margin-right:0.5rem;">❌ رفض</button>
            </div>
        </div>
    `).join("");
    
    container.innerHTML = html || "<p style='font-size:0.85rem;'>لا توجد إعلانات تنتظر المراجعة</p>";
}

/**
 * عرض المخالفات
 */
function renderViolations() {
    const container = document.getElementById("violationsList");
    if (!container) return;
    
    const html = violationsLog.slice(0, 10).map(v => {
        const typeIcon = v.type === "sexual" ? "🔞" : (v.type === "religious" ? "☪️" : "⚠️");
        return `
            <div class="violation-item" style="background:#fff3cd; border-right:4px solid #ffc107; padding:0.6rem; margin:0.5rem 0; border-radius:12px;">
                ${typeIcon} <strong>${v.ad}</strong> - ${v.violations}<br>
                <small>${v.date}</small>
            </div>
        `;
    }).join("");
    
    container.innerHTML = html || "<p>لا توجد مخالفات</p>";
}

/**
 * عرض سجل الوكيل
 */
function renderAgentLog() {
    const container = document.getElementById("agentLogList");
    if (!container) return;
    
    const html = agentLog.slice(0, 15).map(log => `
        <div style="padding:0.5rem; border-bottom:1px solid #eee; font-size:0.8rem;">
            🛡️ ${log.action}: ${log.ad} ${log.reason ? `- ${log.reason}` : ""}<br>
            <small>${log.date}</small>
        </div>
    `).join("");
    
    container.innerHTML = html || "<p>لا توجد سجلات</p>";
}

/**
 * عرض البلاغات
 */
function renderReports() {
    const container = document.getElementById("reportsList");
    if (!container) return;
    
    const html = reportsList.map((report, idx) => `
        <div class="report-item" style="background:#f8d7da; border-right:4px solid #dc3545; padding:0.6rem; margin:0.5rem 0; border-radius:12px;">
            <strong>🚨 ${report.adName}</strong> - ${report.category}<br>
            سبب البلاغ: ${report.reason}<br>
            <small>${report.date}</small>
            <div style="margin-top:0.5rem;">
                <button onclick="window.resolveReport(${idx}, 'accept')" class="btn-sm" style="background:#dc3545; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer;">🗑️ حذف الإعلان</button>
                <button onclick="window.resolveReport(${idx}, 'reject')" class="btn-sm" style="background:#28a745; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer; margin-right:0.5rem;">✅ تجاهل البلاغ</button>
            </div>
        </div>
    `).join("");
    
    container.innerHTML = html || "<p>لا توجد بلاغات</p>";
}

/**
 * عرض الكلمات الممنوعة
 */
function renderBlockedWords() {
    const container = document.getElementById("blockedWordsList");
    if (!container) return;
    
    const html = BLOCKED_WORDS.map(word => `
        <span style="display:inline-block; background:#dc3545; color:white; padding:0.2rem 0.6rem; border-radius:20px; margin:0.2rem; font-size:0.7rem;">
            ${word} ✖
        </span>
    `).join("");
    
    container.innerHTML = html;
}

/**
 * عرض المعارض
 * @param {string} containerId - معرف الحاوية
 * @param {Array} data - بيانات الإعلانات
 */
function renderGallery(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const html = data.map(item => {
        const reportFlag = `
            <div class="report-flag" onclick="event.stopPropagation(); promptReport(${item.id}, '${getCategoryFromContainer(containerId)}')" 
                 style="position:absolute; top:5px; right:5px; background:#dc3545; color:white; border-radius:50%; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; cursor:pointer;">
                🚨
            </div>
        `;
        
        return `
            <div class="gallery-item" style="position:relative; background:#fafcff; border-radius:18px; padding:0.6rem; border:1px solid #eef2f8; cursor:pointer;" 
                 onclick="window.selectContact('${item.seller || ''}')">
                ${reportFlag}
                <img src="${item.image}" style="width:100%; height:100px; object-fit:cover; border-radius:14px;">
                <h4 style="font-size:0.85rem; margin:0.4rem 0;">${item.name}</h4>
                <p style="font-size:0.7rem; color:#4a627a;">${item.price || ""}<br>📍 ${item.city || ""}</p>
                <span class="badge" style="display:inline-block; background:#c7a12b; color:#1e3a5f; padding:0.15rem 0.4rem; border-radius:16px; font-size:0.6rem;">${item.type || item.category}</span>
            </div>
        `;
    }).join("");
    
    container.innerHTML = html || "<p>لا توجد إعلانات</p>";
}

/**
 * الحصول على القسم من معرف الحاوية
 * @param {string} containerId - معرف الحاوية
 * @returns {string} - اسم القسم
 */
function getCategoryFromContainer(containerId) {
    const map = {
        "realEstateGallery": "عقارات",
        "electronicsGallery": "إلكترونيات",
        "carsGallery": "سيارات",
        "jobsGallery": "وظائف",
        "generalGallery": "عام"
    };
    return map[containerId] || "عام";
}

/**
 * عرض جميع المعارض
 */
function renderAllGalleries() {
    renderGallery("realEstateGallery", realEstateAds);
    renderGallery("electronicsGallery", electronicsAds);
    renderGallery("carsGallery", carsAds);
    renderGallery("jobsGallery", jobsAds);
    renderGallery("generalGallery", generalAds);
}

/**
 * تحديث المحفظة
 */
function updateWallet() {
    const balanceElement = document.getElementById("balanceAmount");
    if (balanceElement) balanceElement.innerHTML = `$${balance}`;
    
    const transactionsElement = document.getElementById("transactionsList");
    if (transactionsElement) {
        const html = transactions.slice(0, 10).map(t => `
            <div style="padding:6px 0; border-bottom:1px solid #eee; font-size:0.8rem;">
                ${t.date} - ${t.amount} - ${t.type}
            </div>
        `).join("");
        transactionsElement.innerHTML = html || "<p>لا توجد معاملات</p>";
    }
}

/**
 * عرض التقييمات
 */
function renderRatings() {
    const container = document.getElementById("ratingsList");
    if (!container) return;
    
    const html = ratings.map(r => `
        <div class="chat-message" style="padding:0.6rem; border-bottom:1px solid #eef2f8;">
            <div>
                <strong>${r.user}</strong>
                <div class="rating-stars" style="color:#c7a12b; font-size:0.75rem;">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
                <div style="font-size:0.8rem;">${r.comment}</div>
                <div style="font-size:0.65rem; color:#aaa;">${r.date}</div>
            </div>
        </div>
    `).join("");
    
    container.innerHTML = html || "<p>لا توجد تقييمات</p>";
}

/**
 * عرض جهات الاتصال للمراسلة
 */
function renderContacts() {
    const container = document.getElementById("contactsList");
    if (!container) return;
    
    const uniqueSellers = new Set();
    [...realEstateAds, ...electronicsAds, ...carsAds, ...generalAds].forEach(ad => {
        if (ad.seller) uniqueSellers.add(ad.seller);
    });
    
    const html = Array.from(uniqueSellers).map(seller => `
        <div class="chat-message" style="padding:0.6rem; border-bottom:1px solid #eef2f8; cursor:pointer;" onclick="window.selectContact('${seller}')">
            <div>
                <strong>${seller}</strong>
                <div style="font-size:0.75rem;">${messages.find(m => m.from === seller)?.text || "مرحباً"}</div>
            </div>
        </div>
    `).join("");
    
    container.innerHTML = html || "<p>لا توجد محادثات</p>";
}

/**
 * عرض رسائل المحادثة
 */
function renderChatMessages() {
    const container = document.getElementById("chatMessages");
    if (!container) return;
    
    const chatMessages = messages.filter(m => m.from === currentContact || m.to === currentContact);
    const html = chatMessages.map(msg => `
        <div class="chat-message" style="padding:0.5rem; border-bottom:1px solid #eef2f8;">
            <div>
                <strong>${msg.from}</strong>
                <div>${msg.text}</div>
                <div style="font-size:0.6rem; color:#aaa;">${msg.time}</div>
            </div>
        </div>
    `).join("");
    
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

/**
 * إرسال رسالة
 */
function sendMessage() {
    const input = document.getElementById("chatInput");
    if (!input || !input.value.trim()) return;
    
    messages.push({
        from: currentUser || "أنا",
        to: currentContact,
        text: input.value,
        time: new Date().toLocaleTimeString()
    });
    
    renderChatMessages();
    input.value = "";
}

/**
 * اختيار جهة اتصال
 * @param {string} contact - اسم جهة الاتصال
 */
function selectContact(contact) {
    currentContact = contact;
    renderChatMessages();
}

/**
 * إضافة تقييم جديد
 */
function addRating() {
    const comment = document.getElementById("newRatingComment")?.value;
    const rating = document.getElementById("ratingStars")?.value;
    
    if (!comment) return;
    
    ratings.unshift({
        user: currentUser || "مستخدم جديد",
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString()
    });
    
    renderRatings();
    if (document.getElementById("newRatingComment")) {
        document.getElementById("newRatingComment").value = "";
    }
}

/**
 * إضافة كلمة ممنوعة جديدة
 */
function addBlockedWord() {
    const input = document.getElementById("newBlockedWord");
    const newWord = input?.value.trim();
    
    if (newWord && !BLOCKED_WORDS.includes(newWord)) {
        BLOCKED_WORDS.push(newWord);
        renderBlockedWords();
        if (input) input.value = "";
    }
}

/**
 * البحث عن رحلات الطيران
 */
function searchFlights() {
    const from = document.getElementById("flightFrom")?.value;
    const date = document.getElementById("flightDate")?.value;
    const flights = FLIGHTS_DATA[`${from}-ASM`] || [];
    const resultsDiv = document.getElementById("flightResults");
    
    if (!resultsDiv) return;
    
    if (flights.length === 0) {
        resultsDiv.innerHTML = "❌ لا توجد رحلات متاحة لهذا المسار";
        return;
    }
    
    const html = `
        <strong>نتائج البحث (${date}):</strong><br>
        ${flights.map(f => `✈️ ${f.airline} | ${f.price} | ${f.departure} → ${f.arrival}<br>`).join("")}
    `;
    resultsDiv.innerHTML = html;
}

/**
 * تأكيد حجز الرحلة
 */
function confirmBooking() {
    const name = document.getElementById("passengerName")?.value;
    const msgElement = document.getElementById("bookingMsg");
    
    if (!msgElement) return;
    
    if (!name) {
        msgElement.innerText = "❌ يرجى إدخال الاسم الكامل";
        return;
    }
    
    msgElement.innerText = `✅ تم تأكيد حجز ${name} - سيتم إرسال التذكرة إلى بريدك الإلكتروني`;
}

/**
 * معالجة الدفع عبر PayPal
 */
function processPayPalPayment() {
    const msgElement = document.getElementById("paymentMsg");
    if (!msgElement) return;
    
    msgElement.innerText = "🟡 جاري التوجيه إلى PayPal...";
    
    setTimeout(() => {
        balance += 29;
        transactions.unshift({
            date: new Date().toLocaleDateString(),
            amount: "+$29",
            type: "اشتراك Pro"
        });
        updateWallet();
        msgElement.innerHTML = "✅ تم الدفع بنجاح! تمت إضافة $29 إلى رصيدك";
    }, 1500);
}

/**
 * إيداع رصيد تجريبي
 */
function addFunds() {
    balance += 50;
    transactions.unshift({
        date: new Date().toLocaleDateString(),
        amount: "+$50",
        type: "إيداع يدوي"
    });
    updateWallet();
}

/**
 * عرض نموذج الإبلاغ
 * @param {number} adId - معرف الإعلان
 * @param {string} category - قسم الإعلان
 */
function promptReport(adId, category) {
    const reason = prompt("سبب البلاغ (محتوى جنسي، مخالفة عادات، لغة مسيئة، إلخ):");
    if (reason && reason.trim()) {
        reportAd(adId, reason, category);
        alert("تم إرسال البلاغ إلى الوكيل للمراجعة");
    }
}

/**
 * تحديث اللغة
 * @param {string} lang - رمز اللغة (ar/en/ti)
 */
function updateLanguage(lang) {
    currentLang = lang;
    const t = TRANSLATIONS[lang];
    if (!t) return;
    
    // تحديث النصوص في الصفحة
    const elements = {
        "tagline": t.tagline,
        "statAdsLabel": t.statAdsLabel,
        "statPendingLabel": t.statPendingLabel,
        "statApprovedLabel": t.statApprovedLabel,
        "statRejectedLabel": t.statRejectedLabel,
        "statViolationsLabel": t.statViolationsLabel,
        "statReportsLabel": t.statReportsLabel,
        "footerText": t.footerText
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.innerText = elements[id];
    });
    
    // تحديث اتجاه الصفحة
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    
    // تحديث الأزرار النشطة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * تبديل التبويب
 * @param {string} tabId - معرف التبويب
 */
function switchTab(tabId) {
    // إخفاء جميع الألواح
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active-pane');
    });
    
    // إظهار اللوح المطلوب
    const pane = document.getElementById(`${tabId}Pane`);
    if (pane) pane.classList.add('active-pane');
    
    // تحديث الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (tabBtn) tabBtn.classList.add('active');
    
    document.querySelectorAll('.nav-tab-link').forEach(link => {
        link.classList.remove('active');
    });
    const navLink = document.querySelector(`.nav-tab-link[data-tab="${tabId}"]`);
    if (navLink) navLink.classList.add('active');
    
    // تحديث المحتوى حسب التبويب
    if (tabId === 'dashboard') updateStats();
    if (tabId === 'agent') {
        renderPendingAds();
        renderViolations();
        renderAgentLog();
        renderBlockedWords();
    }
    if (tabId === 'reports') {
        renderReports();
    }
    if (tabId === 'messaging') {
        renderContacts();
        renderChatMessages();
    }
    if (tabId === 'ratings') renderRatings();
}

/**
 * عرض جميع البيانات
 */
function renderAll() {
    updateStats();
    renderAllGalleries();
    renderPendingAds();
    renderViolations();
    renderAgentLog();
    renderReports();
    renderBlockedWords();
    renderRatings();
    renderContacts();
    updateWallet();
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * تهيئة التطبيق
 */
function init() {
    // تهيئة البيانات التجريبية
    realEstateAds = [
        {
            id: 1,
            type: "شقة",
            name: "شقة فاخرة - تيرفولو",
            price: "$85,000",
            city: "أسمرة",
            seller: "علي حسن",
            views: 45,
            image: "https://placehold.co/300x200/1e3a5f/white?text=Apartment"
        }
    ];
    
    electronicsAds = [
        {
            id: 1,
            type: "هاتف",
            name: "iPhone 14 Pro",
            price: "$899",
            city: "أسمرة",
            seller: "سامر تكنولوجي",
            views: 120,
            image: "https://placehold.co/300x200/c7a12b/white?text=iPhone"
        }
    ];
    
    carsAds = [
        {
            id: 1,
            type: "سيارة مستعملة",
            name: "تويوتا لاندكروزر 2020",
            price: "$45,000",
            city: "أسمرة",
            seller: "معرض السلام",
            views: 67,
            image: "https://placehold.co/300x200/2c5a82/white?text=Land+Cruiser"
        }
    ];
    
    jobsAds = [
        {
            id: 1,
            type: "دوام كامل",
            name: "مهندس مدني",
            company: "شركة أسمرة",
            salary: "$1,200",
            city: "أسمرة",
            views: 89,
            image: "https://placehold.co/300x200/1e3a5f/white?text=Job"
        }
    ];
    
    generalAds = [
        {
            id: 1,
            type: "خدمة",
            name: "شحن من دبي إلى أسمرة",
            price: "$299",
            city: "أسمرة",
            seller: "شحن سريع",
            views: 34,
            image: "https://placehold.co/300x200/2c5a82/white?text=Shipping"
        }
    ];
    
    messages = [
        {
            id: 1,
            from: "علي حسن",
            to: "مشتري",
            text: "مرحباً، هل الشقة لا تزال متاحة؟",
            time: "10:30"
        }
    ];
    
    ratings = [
        {
            user: "أحمد محمود",
            rating: 5,
            comment: "منصة رائعة ومحترمة، تعامل ممتاز",
            date: "2026-04-01"
        }
    ];
    
    balance = 0;
    transactions = [];
    currentContact = "علي حسن";
    
    // ربط الأحداث
    bindEvents();
    
    // عرض البيانات
    renderAll();
}

/**
 * ربط الأحداث
 */
function bindEvents() {
    // أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
    });
    
    // أزرار التبويب
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    document.querySelectorAll('.nav-tab-link').forEach(link => {
        link.addEventListener('click', () => switchTab(link.dataset.tab));
    });
    
    // أزرار النشر
    const publishReBtn = document.getElementById("publishReBtn");
    if (publishReBtn) {
        publishReBtn.addEventListener("click", createPublishHandler("عقارات", [
            { id: "reType", key: "type" },
            { id: "reName", key: "name" },
            { id: "rePrice", key: "price" },
            { id: "reDesc", key: "desc" },
            { id: "reCity", key: "city" }
        ], "reMsg"));
    }
    
    const publishElecBtn = document.getElementById("publishElecBtn");
    if (publishElecBtn) {
        publishElecBtn.addEventListener("click", createPublishHandler("إلكترونيات", [
            { id: "elecType", key: "type" },
            { id: "elecName", key: "name" },
            { id: "elecPrice", key: "price" },
            { id: "elecDesc", key: "desc" },
            { id: "elecCity", key: "city" }
        ], "elecMsg"));
    }
    
    const publishCarBtn = document.getElementById("publishCarBtn");
    if (publishCarBtn) {
        publishCarBtn.addEventListener("click", createPublishHandler("سيارات", [
            { id: "carType", key: "type" },
            { id: "carName", key: "name" },
            { id: "carPrice", key: "price" },
            { id: "carDesc", key: "desc" },
            { id: "carCity", key: "city" }
        ], "carMsg"));
    }
    
    const publishJobBtn = document.getElementById("publishJobBtn");
    if (publishJobBtn) {
        publishJobBtn.addEventListener("click", createPublishHandler("وظائف", [
            { id: "jobType", key: "type" },
            { id: "jobTitle", key: "name" },
            { id: "jobCompany", key: "company" },
            { id: "jobSalary", key: "salary" },
            { id: "jobDesc", key: "desc" },
            { id: "jobCity", key: "city" }
        ], "jobMsg"));
    }
    
    const publishGeneralBtn = document.getElementById("publishGeneralBtn");
    if (publishGeneralBtn) {
        publishGeneralBtn.addEventListener("click", createPublishHandler("عام", [
            { id: "adType", key: "type" },
            { id: "adName", key: "name" },
            { id: "adPrice", key: "price" },
            { id: "adDesc", key: "desc" },
            { id: "adCity", key: "city" }
        ], "generalMsg"));
    }
    
    // معاينة الصور
    setupImagePreview("reImage", "rePreview");
    setupImagePreview("elecImage", "elecPreview");
    setupImagePreview("carImage", "carPreview");
    setupImagePreview("adImage", "adPreview");
    
    // رحلات الطيران
    const searchFlightBtn = document.getElementById("searchFlightBtn");
    if (searchFlightBtn) searchFlightBtn.addEventListener("click", searchFlights);
    
    const confirmBookingBtn = document.getElementById("confirmBookingBtn");
    if (confirmBookingBtn) confirmBookingBtn.addEventListener("click", confirmBooking);
    
    // معلومات المكتبة
    const libraryInfoBtn = document.getElementById("libraryInfoBtn");
    if (libraryInfoBtn) {
        libraryInfoBtn.addEventListener("click", () => {
            alert("📚 مكتبة أسمرة: مركز التوثيق الوطني - للاستفسار: وزارة المعلومات عبر Shabait.com");
        });
    }
    
    // المراسلة
    const sendMsgBtn = document.getElementById("sendMsgBtn");
    if (sendMsgBtn) sendMsgBtn.addEventListener("click", sendMessage);
    
    // التقييمات
    const addRatingBtn = document.getElementById("addRatingBtn");
    if (addRatingBtn) addRatingBtn.addEventListener("click", addRating);
    
    // الدفع
    const paypalBtn = document.getElementById("paypalBtn");
    if (paypalBtn) paypalBtn.addEventListener("click", processPayPalPayment);
    
    const addFundsBtn = document.getElementById("addFundsBtn");
    if (addFundsBtn) addFundsBtn.addEventListener("click", addFunds);
    
    // الكلمات الممنوعة
    const addBlockedWordBtn = document.getElementById("addBlockedWordBtn");
    if (addBlockedWordBtn) addBlockedWordBtn.addEventListener("click", addBlockedWord);
}

/**
 * إعداد معاينة الصور
 * @param {string} inputId - معرف حقل رفع الصورة
 * @param {string} previewId - معرف حاوية المعاينة
 */
function setupImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (!input || !preview) return;
    
    input.addEventListener("change", function(e) {
        preview.innerHTML = "";
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.createElement("img");
                img.src = ev.target.result;
                img.style.width = "60px";
                img.style.height = "60px";
                img.style.objectFit = "cover";
                img.style.borderRadius = "12px";
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

// تصدير الدوال للنطاق العام
window.approveAd = approveAd;
window.rejectAd = rejectAd;
window.reportAd = reportAd;
window.resolveReport = resolveReport;
window.promptReport = promptReport;
window.selectContact = selectContact;
window.switchTab = switchTab;

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', init);
