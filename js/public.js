// ========================================
// Asmara.Store - Public Main Script (نسخة مستقرة)
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

// ===== الترجمات الأساسية (مضمنة للطوارئ) =====
const FALLBACK_TRANSLATIONS = {
    ar: {
        tagline: "منصة تحترم عاداتنا وتقاليدنا - بروح القانون الإريتري",
        homeIntro: "منصة موثوقة للطيران والعقارات والخدمات والمحتوى الرسمي.",
        homeFlightsTitle: "✈️ أحدث الرحلات",
        homeBlogTitle: "📰 آخر المقالات",
        flightTitle: "✈️ البحث عن رحلة",
        realestateTitle: "🏠 العقارات",
        electronicsTitle: "📱 الإلكترونيات",
        carsTitle: "🚗 السيارات",
        jobsTitle: "💼 الوظائف",
        aboutTitle: "🇪🇷 من نحن",
        aboutText: "Asmara.Store منصة رقمية تربط الإريتريين بخدمات موثوقة داخل الوطن وخارجه.",
        privacyTitle: "🔒 سياسة الخصوصية",
        privacyText: "نحترم خصوصيتك ونحمي بياناتك، ولا نبيع البيانات لأي طرف ثالث.",
        cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
        cookieAccept: "موافق",
        searchBtn: "🔍 بحث"
    },
    en: {
        tagline: "A platform that respects our customs and traditions",
        homeIntro: "A trusted platform for flights, real estate, services, and official content.",
        homeFlightsTitle: "✈️ Latest Flights",
        homeBlogTitle: "📰 Latest Articles",
        flightTitle: "✈️ Search Flights",
        realestateTitle: "🏠 Real Estate",
        electronicsTitle: "📱 Electronics",
        carsTitle: "🚗 Cars",
        jobsTitle: "💼 Jobs",
        aboutTitle: "🇪🇷 About Us",
        aboutText: "Asmara.Store is a digital platform connecting Eritreans with trusted services.",
        privacyTitle: "🔒 Privacy Policy",
        privacyText: "We respect your privacy and protect your data.",
        cookieText: "We use cookies to improve your experience.",
        cookieAccept: "Accept",
        searchBtn: "🔍 Search"
    },
    ti: {
        tagline: "ልማዳትና ባህልና ዘከብር መድረኽ",
        homeIntro: "ንበረራ፣ ንብረት፣ ኣገልግሎታትን እሙን መድረኽ።",
        homeFlightsTitle: "✈️ ሓደሽቲ በረራታት",
        homeBlogTitle: "📰 ሓደሽቲ ዜናታት",
        flightTitle: "✈️ ምድላይ በረራ",
        realestateTitle: "🏠 ንብረት",
        electronicsTitle: "📱 ኤሌክትሮኒክስ",
        carsTitle: "🚗 ማኪናታት",
        jobsTitle: "💼 ስራሕታት",
        aboutTitle: "🇪🇷 ብዛዕባና",
        aboutText: "ኣስመራ.ስቶር ንኤርትራውያን እሙን ኣገልግሎታት ዘእሰር መድረኽ እዩ።",
        privacyTitle: "🔒 ሕጊ ምስጢር",
        privacyText: "ምስጢርካ ንከብር ኢና።",
        cookieText: "ተሞክሮኻ ንምምሕያሽ ኩኪታት ንጥቀም።",
        cookieAccept: "ተቐበልኩ",
        searchBtn: "🔍 ድለይ"
    }
};

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

// ===== دالة عرض الرحلات في الرئيسية =====
function renderHomeFlights() {
    const container = document.getElementById('homeFlightsPreview');
    if (!container) return;
    
    let html = '<div style="display:flex; flex-direction:column; gap:0.5rem">';
    for (const [key, flights] of Object.entries(FLIGHTS_DATA)) {
        const [from, to] = key.split('-');
        flights.forEach(flight => {
            html += `
                <div style="display:flex; justify-content:space-between; padding:8px; background:#f8f9fa; border-radius:8px;">
                    <div><strong>${from} → ${to}</strong><br><small>${flight.airline}</small></div>
                    <div><strong style="color:#c7a12b">${flight.price}</strong></div>
                </div>
            `;
        });
    }
    html += '</div>';
    container.innerHTML = html;
}

// ===== دالة عرض المقالات في الرئيسية =====
function renderHomeBlog() {
    const container = document.getElementById('homeBlogPreview');
    if (!container) return;
    
    const posts = [
        { title: "كيف تختار رحلة مناسبة إلى أسمرة", summary: "نصائح سريعة للمغترب الإريتري عند مقارنة أسعار الرحلات." },
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

// ===== دالة تحديث اللغة =====
function updateLanguage(lang) {
    currentLang = lang;
    const t = FALLBACK_TRANSLATIONS[lang] || FALLBACK_TRANSLATIONS.ar;
    
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
        cookieText: t.cookieText,
        cookieAcceptBtn: t.cookieAccept
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }
    
    const searchBtn = document.getElementById('searchFlightBtn');
    if (searchBtn) searchBtn.innerHTML = t.searchBtn;
    
    // تحديث اتجاه الصفحة
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    
    // تحديث أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // إعادة عرض المحتوى
    renderHomeFlights();
    renderHomeBlog();
}

// ===== دالة تبديل التبويبات =====
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active-pane');
    });
    
    const activePane = document.getElementById(`${tabId}Pane`);
    if (activePane) activePane.classList.add('active-pane');
    else document.getElementById('homePane')?.classList.add('active-pane');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.tab === tabId) link.classList.add('active');
    });
}

// ===== تهيئة الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // تعيين التاريخ الافتراضي
    const dateInput = document.getElementById('flightDate');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    
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
    if (searchBtn) searchBtn.addEventListener('click', searchFlights);
    
    // ربط قبول الكوكيز
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    if (acceptBtn) acceptBtn.addEventListener('click', function() {
        document.getElementById('cookieBanner').style.display = 'none';
    });
    
    // عرض المعارض إذا كانت البيانات موجودة
    if (typeof realEstateData !== 'undefined' && realEstateData.length) {
        renderGallery('realEstateGallery', realEstateData, 'realestate');
        renderGallery('electronicsGallery', electronicsData, 'electronics');
        renderGallery('carsGallery', carsData, 'cars');
        renderGallery('jobsGallery', jobsData, 'jobs');
    }
    
    // التهيئة
    updateLanguage('ar');
    switchTab('home');
});
