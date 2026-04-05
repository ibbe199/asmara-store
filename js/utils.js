// ========================================
// Asmara.Store - Utilities
// ========================================

// سياسات الخصوصية - Example
const policies = {
    privacy: { title: "🔒 سياسة الخصوصية (Example)", content: "Example: نحن نلتزم بحماية خصوصية بياناتك." },
    security: { title: "🛡️ سياسة الأمان (Example)", content: "Example: نستخدم أحدث تقنيات التشفير." },
    returns: { title: "🔄 سياسة الاسترجاع (Example)", content: "Example: يمكنك استرجاع المنتج خلال 14 يوماً." },
    shipping: { title: "🚚 سياسة الشحن (Example)", content: "Example: نوفر الشحن لجميع مدن إريتريا." }
};

// بيانات وهمية للوكيل
let pendingAds = [];
let rejectedAds = [];
let blockedWords = ["سكس", "جنس", "عاري", "خمر", "حرام", "سب", "شتيمة"];

// بيانات المراسلة والتقييم
let messages = [{ id: 1, from: "علي حسن (Example)", to: "مشتري", text: "Example: مرحباً", time: "10:30" }];
let ratings = [{ user: "أحمد (Example)", rating: 5, comment: "Example: منصة ممتازة", date: "2026-04-01" }];

// متغيرات عامة
let cart = [];
let balance = 0;
let transactions = [];
let resumes = [];

// دوال مساعدة
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : (type === 'error' ? 'exclamation-circle' : 'info-circle')}"></i> ${message} (Example)`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
