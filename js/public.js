// ========================================
// Asmara.Store - Public Main Script
// نسخة مستقرة وكاملة
// ========================================

let currentLang = 'ar';

// ===== بيانات الرحلات =====
const FLIGHTS_DATA = {
    "DXB-ASM": [
        { airline: "FlyDubai", price: "$450", time: "08:00", duration: "3h 30m" },
        { airline: "Ethiopian", price: "$520", time: "14:20", duration: "4h 00m" }
    ],
    "JED-ASM": [
        { airline: "Ethiopian", price: "$380", time: "09:15", duration: "2h 45m" }
    ],
    "CAI-ASM": [
        { airline: "EgyptAir", price: "$490", time: "10:00", duration: "3h 15m" }
    ],
    "ADD-ASM": [
        { airline: "Ethiopian", price: "$210", time: "07:30", duration: "1h 30m" },
        { airline: "Eritrean Airlines", price: "$195", time: "13:45", duration: "1h 30m" }
    ]
};

// ===== صور احتياطية =====
const FALLBACK_IMAGES = {
    realestate: "https://placehold.co/400x250/1e3a5f/white?text=عقار",
    electronics: "https://placehold.co/400x250/2c5282/white?text=جهاز",
    cars: "https://placehold.co/400x250/3a5a40/white?text=سيارة",
    jobs: "https://placehold.co/400x250/6d597b/white?text=وظيفة"
};

// ===== دالة التحقق من تحميل الصور =====
function ensureImageLoad(imgElement, fallbackUrl) {
    if (!imgElement.complete || imgElement.naturalWidth === 0) {
        imgElement.src = fallbackUrl;
    }
}

// ===== دالة تحديث الصور بعد التحميل =====
function fixAllImages() {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', function() {
            const category = this.closest('.gallery-item')?.dataset.category;
            const fallbackUrl = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.realestate;
            this.src = fallbackUrl;
        });
    });
}

// ===== دالة البحث عن الرحلات =====
function searchFlights() {
    const from = document.getElementById('flightFrom')?.value;
    const date = document.getElementById('flightDate')?.value;
    const flights = FLIGHTS_DATA[`${from}-ASM`] || [];
    const resultsDiv = document.getElementById('flightResults');
    
    if (!resultsDiv) return;
    
    if (flights.length === 0) {
        resultsDiv.innerHTML = currentLang === 'ar' ? 
            '❌ لا توجد رحلات متاحة لهذا المسار' : 
            (currentLang === 'en' ? '❌ No flights available' : '❌ በረራ የለን');
        return;
    }
    
    let html = `<strong>${currentLang === 'ar' ? 'نتائج البحث' : (currentLang === 'en' ? 'Search Results' : 'ውጤት ምድላይ')} ${date ? `(${date})` : ''}:</strong><br><br>`;
    
    flights.forEach(flight => {
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
                <div>
                    <strong>✈️ ${flight.airline}</strong><br>
                    <small>${flight.time} | ${flight.duration}</small>
                </div>
                <div>
                    <strong style="color:#c7a12b">${flight.price}</strong>
                </div>
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
}

// ===== دالة عرض الرحلات في الصفحة الرئيسية =====
function renderHomeFlights() {
    const container = document.getElementById('homeFlightsPreview');
    if (!container) return;
    
    let html = '<div style="display:flex; flex-direction:column; gap:0.5rem">';
    for (const [key, flights] of Object.entries(FLIGHTS_DATA)) {
        const [from, to] = key.split('-');
        flights.forEach(flight => {
            html += `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px; background:#f8f9fa; border-radius:8px;">
                    <div>
                        <strong>${from} → ${to}</strong><br>
                        <small>${flight.airline}</small>
                    </div>
                    <div>
                        <strong style="color:#c7a12b">${flight.price}</strong>
                    </div>
                </div>
            `;
        });
    }
    html += '</div>';
    container.innerHTML = html;
}

// ===== دالة عرض المقالات في الصفحة الرئيسية =====
function renderHomeBlog() {
    const container = document.getElementById('homeBlogPreview');
    if (!container) return;
    
    const posts = [
        { title: "كيف تختار رحلة مناسبة إلى أسمرة", summary: "نصائح سريعة للمغترب الإريتري عند مقارنة أسعار الرحلات واختيار الوقت المناسب." },
        { title: "الاستثمار العقاري في أسمرة", summary: "نظرة مبسطة على الفرص العقارية الأكثر طلبًا داخل العاصمة." },
        { title: "لماذا منصة متعددة اللغات مهمة؟", summary: "اللغة تبني الثقة، خاصة عندما تخاطب جمهورًا في الداخل والمهجر." }
    ];
    
    let html = '';
    posts.forEach(post => {
        html += `
            <div style="margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid #eee">
                <h4 style="color:#1e3a5f; margin-bottom:0.3rem">${post.title}</h4>
                <p style="font-size:0.8rem; color:#666">${post.summary}</p>
                <a href="#" style="color:#c7a12b; font-size:0.75rem; text-decoration:none">${currentLang === 'ar' ? 'قراءة المزيد ←' : (currentLang === 'en' ? 'Read More →' : 'ዝያዳ ኣንብብ →')}</a>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ===== دالة تبديل التبويبات =====
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active-pane');
    });
    
    const activePane = document.getElementById(`${tabId}Pane`);
    if (activePane) {
        activePane.classList.add('active-pane');
    } else {
        const homePane = document.getElementById('homePane');
        if (homePane) homePane.classList.add('active-pane');
        tabId = 'home';
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.tab === tabId) {
            link.classList.add('active');
        }
    });
    
    // حفظ التبويب النشط
    localStorage.setItem('activeTab', tabId);
}

// ===== دالة تحديث اللغة =====
function updateLanguage(lang) {
    currentLang = lang;
    const t = TRANSLATIONS?.[lang] || {
        tagline: "منصة تحترم عاداتنا وتقاليدنا",
        homeIntro: "منصة موثوقة للخدمات",
        homeFlightsTitle: "✈️ أحدث الرحلات",
        homeBlogTitle: "📰 آخر المقالات",
        flightTitle: "✈️ البحث عن رحلة",
        realestateTitle: "🏠 العقارات",
        electronicsTitle: "📱 الإلكترونيات",
        carsTitle: "🚗 السيارات",
        jobsTitle: "💼 الوظائف",
        aboutTitle: "🇪🇷 من نحن",
        aboutText: "Asmara.Store منصة رقمية تربط الإريتريين بخدمات موثوقة.",
        privacyTitle: "🔒 سياسة الخصوصية",
        privacyText: "نحترم خصوصيتك ونحمي بياناتك.",
        cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
        cookieAccept: "موافق",
        searchBtn: "🔍 بحث",
        whatsappText: "📱 واتساب",
        agentText: "🛡️ الوكيل"
    };
    
    // تحديث النصوص
    const elements = {
        tagline: t.tagline,
        homeIntro: t.homeIntro,
        homeFlightsTitle: t.homeFlightsTitle,
        homeBlogTitle: t.homeBlogTitle,
        flightTitle: t.flightTitle,
        realestateTitle: t.realestateTitle,
        electronicsTitle: t.electronicsTitle,
        carsTitle: t.carsTitle,
        jobsTitle: t.jobsTitle,
        aboutTitle: t.aboutTitle,
        aboutText: t.aboutText,
        privacyTitle: t.privacyTitle,
        privacyText: t.privacyText,
        cookieText: t.cookieText
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }
    
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    if (acceptBtn) acceptBtn.innerText = t.cookieAccept;
    
    const searchBtn = document.getElementById('searchFlightBtn');
    if (searchBtn) searchBtn.innerHTML = t.searchBtn;
    
    const aboutWhatsapp = document.getElementById('aboutWhatsapp');
    if (aboutWhatsapp) aboutWhatsapp.innerHTML = t.whatsappText;
    
    const privacyWhatsapp = document.getElementById('privacyWhatsapp');
    if (privacyWhatsapp) privacyWhatsapp.innerHTML = t.whatsappText;
    
    // تحديث اتجاه الصفحة
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    
    // تحديث أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // حفظ اللغة
    localStorage.setItem('preferredLang', lang);
    if (typeof setCookie === 'function') setCookie('lang', lang, 30);
    
    // إعادة عرض المحتوى الديناميكي
    renderHomeFlights();
    renderHomeBlog();
}

// ===== تهيئة الروابط =====
function initLinks() {
    const whatsappUrl = "https://wa.me/29170000000";
    
    const whatsappFloat = document.getElementById('floatingWhatsapp');
    if (whatsappFloat) {
        whatsappFloat.href = whatsappUrl;
        whatsappFloat.innerHTML = "📱";
    }
    
    const agentLink = document.getElementById('floatingAgent');
    if (agentLink) {
        agentLink.innerHTML = "🛡️";
    }
    
    const aboutWhatsapp = document.getElementById('aboutWhatsapp');
    if (aboutWhatsapp) aboutWhatsapp.href = whatsappUrl;
    
    const privacyWhatsapp = document.getElementById('privacyWhatsapp');
    if (privacyWhatsapp) privacyWhatsapp.href = whatsappUrl;
}

// ===== دالة عرض المعارض =====
function renderGallery(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = "";
    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.dataset.category = containerId.replace('Gallery', '').toLowerCase();
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='${FALLBACK_IMAGES[div.dataset.category] || FALLBACK_IMAGES.realestate}'">
            <h4>${item.name}</h4>
            <p>${item.price || item.salary} | 📍 ${item.city}</p>
        `;
        container.appendChild(div);
    });
}

// ===== تهيئة الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Asmara.Store is loading...');
    
    // تعيين التاريخ الافتراضي
    const dateInput = document.getElementById('flightDate');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // ربط أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
    });
    
    // ربط أزرار التنقل
    document.querySelectorAll('.nav-link[data-tab]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.tab);
        });
    });
    
    // ربط زر البحث
    const searchBtn = document.getElementById('searchFlightBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchFlights);
    }
    
    // ربط قبول الكوكيز
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    if (acceptBtn && typeof acceptCookies === 'function') {
        acceptBtn.addEventListener('click', acceptCookies);
    } else if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            const banner = document.getElementById('cookieBanner');
            if (banner) banner.style.display = 'none';
        });
    }
    
    // عرض المعارض
    if (typeof realEstateData !== 'undefined') {
        if (typeof renderGallery === 'function') {
            renderGallery('realEstateGallery', realEstateData);
            renderGallery('electronicsGallery', electronicsData);
            renderGallery('carsGallery', carsData);
            renderGallery('jobsGallery', jobsData);
        }
        console.log('✅ Galleries rendered');
    }
    
    // عرض تنبيه الكوكيز
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            banner.style.display = 'flex';
        } else {
            banner.style.display = 'none';
        }
    }
    
    // تهيئة الروابط
    initLinks();
    
    // استعادة اللغة المحفوظة
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    
    // استعادة التبويب المحفوظ
    const savedTab = localStorage.getItem('activeTab');
    
    // التهيئة النهائية
    updateLanguage(savedLang);
    
    if (savedTab && savedTab !== 'home') {
        switchTab(savedTab);
    } else {
        switchTab('home');
    }
    
    // إصلاح الصور بعد التحميل
    setTimeout(fixAllImages, 500);
    
    console.log('✅ Asmara.Store is ready!');
});
