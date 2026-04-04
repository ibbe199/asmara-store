// ========================================
// Asmara.Store - Public Main Script (محدث)
// ========================================

let currentLang = 'ar';

// ===== بيانات الرحلات (محدثة) =====
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

// ===== دالة البحث عن الرحلات (محدثة) =====
function searchFlights() {
    const from = document.getElementById('flightFrom').value;
    const date = document.getElementById('flightDate').value;
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
                <div style="flex:2">
                    <strong>✈️ ${flight.airline}</strong><br>
                    <small>${flight.time} | ${flight.duration}</small>
                </div>
                <div style="flex:1; text-align:left">
                    <strong style="color:var(--secondary)">${flight.price}</strong>
                </div>
            </div>
        `;
    });
    
    // إضافة زر للحجز (تجريبي)
    html += `<br><button class="btn" style="width:auto; margin-top:10px" onclick="alert('${currentLang === 'ar' ? 'سيتم تفعيل الحجز قريباً' : (currentLang === 'en' ? 'Booking will be available soon' : 'ምዝገባ ቀረብ ክንጅምር ኢና')}')">${currentLang === 'ar' ? 'احجز الآن' : (currentLang === 'en' ? 'Book Now' : 'ሕጂ ተመዝገብ')}</button>`;
    
    resultsDiv.innerHTML = html;
}

// ===== دالة عرض الرحلات في الصفحة الرئيسية (محدثة) =====
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
                        <strong style="color:var(--secondary)">${flight.price}</strong>
                    </div>
                </div>
            `;
        });
    }
    html += '</div>';
    container.innerHTML = html;
}

// ===== دالة عرض المقالات في الصفحة الرئيسية (محدثة) =====
function renderHomeBlog() {
    const container = document.getElementById('homeBlogPreview');
    if (!container) return;
    
    let html = '';
    BLOG_POSTS.slice(0, 5).forEach(post => {
        html += `
            <div style="margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid #eee">
                <h4 style="color:var(--primary); margin-bottom:0.3rem">${post.title}</h4>
                <p style="font-size:0.8rem; color:#666">${post.summary}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem">
                    <span style="font-size:0.7rem; color:#999">📅 ${post.date}</span>
                    <a href="${post.link}" style="color:var(--secondary); font-size:0.75rem; text-decoration:none">${currentLang === 'ar' ? 'قراءة المزيد ←' : (currentLang === 'en' ? 'Read More →' : 'ዝያዳ ኣንብብ →')}</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ===== دالة تبديل التبويبات (محدثة) =====
function switchTab(tabId) {
    // إخفاء جميع الألواح
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active-pane');
    });
    
    // إظهار اللوح المطلوب
    const activePane = document.getElementById(`${tabId}Pane`);
    if (activePane) {
        activePane.classList.add('active-pane');
    } else {
        // إذا كان التبويب غير موجود، أظهر الصفحة الرئيسية
        document.getElementById('homePane')?.classList.add('active-pane');
        tabId = 'home';
    }
    
    // تحديث حالة الروابط النشطة
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.tab === tabId) {
            link.classList.add('active');
        }
    });
    
    // حفظ التبويب النشط في localStorage
    localStorage.setItem('activeTab', tabId);
}

// ===== دالة تحديث اللغة (محدثة) =====
function updateLanguage(lang) {
    currentLang = lang;
    const t = TRANSLATIONS[lang];
    if (!t) return;
    
    // تحديث النصوص الأساسية
    document.getElementById('tagline').innerText = t.tagline;
    document.getElementById('homeIntro').innerText = t.homeIntro;
    document.getElementById('homeFlightsTitle').innerHTML = t.homeFlightsTitle;
    document.getElementById('homeBlogTitle').innerHTML = t.homeBlogTitle;
    document.getElementById('flightTitle').innerHTML = t.flightTitle;
    document.getElementById('realestateTitle').innerHTML = t.realestateTitle;
    document.getElementById('electronicsTitle').innerHTML = t.electronicsTitle;
    document.getElementById('carsTitle').innerHTML = t.carsTitle;
    document.getElementById('jobsTitle').innerHTML = t.jobsTitle;
    document.getElementById('aboutTitle').innerHTML = t.aboutTitle;
    document.getElementById('aboutText').innerText = t.aboutText;
    document.getElementById('privacyTitle').innerHTML = t.privacyTitle;
    document.getElementById('privacyText').innerText = t.privacyText;
    document.getElementById('cookieText').innerText = t.cookieText;
    document.getElementById('cookieAcceptBtn').innerText = t.cookieAccept;
    
    const searchBtn = document.getElementById('searchFlightBtn');
    if (searchBtn) searchBtn.innerHTML = t.searchBtn;
    
    // تحديث أزرار التنقل
    const navTranslations = {
        navHome: lang === 'ar' ? 'الرئيسية' : (lang === 'en' ? 'Home' : 'ዓንዲ'),
        navFlight: lang === 'ar' ? 'الطيران' : (lang === 'en' ? 'Flights' : 'በረራ'),
        navRealEstate: lang === 'ar' ? 'العقارات' : (lang === 'en' ? 'Real Estate' : 'ንብረት'),
        navElectronics: lang === 'ar' ? 'الإلكترونيات' : (lang === 'en' ? 'Electronics' : 'ኤሌክትሮኒክስ'),
        navCars: lang === 'ar' ? 'السيارات' : (lang === 'en' ? 'Cars' : 'ማኪና'),
        navJobs: lang === 'ar' ? 'الوظائف' : (lang === 'en' ? 'Jobs' : 'ስራሕ'),
        navBlog: lang === 'ar' ? 'البلوق' : (lang === 'en' ? 'Blog' : 'ብሎግ'),
        navAbout: lang === 'ar' ? 'من نحن' : (lang === 'en' ? 'About' : 'ብዛዕባና'),
        navPrivacy: lang === 'ar' ? 'الخصوصية' : (lang === 'en' ? 'Privacy' : 'ምስጢር')
    };
    
    for (const [id, text] of Object.entries(navTranslations)) {
        const element = document.getElementById(id);
        if (element) element.innerText = text;
    }
    
    // تحديث اتجاه الصفحة
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    
    // تحديث حالة الأزرار النشطة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // حفظ اللغة في localStorage
    localStorage.setItem('preferredLang', lang);
    setCookie('lang', lang, 30);
    
    // إعادة عرض المحتوى الديناميكي
    renderHomeFlights();
    renderHomeBlog();
    initStaticLinks();
}

// ===== دالة تهيئة الروابط الثابتة (محدثة) =====
function initStaticLinks() {
    const whatsappNumber = "+29170000000";
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;
    
    // رابط الواتساب العائم
    const whatsappFloat = document.getElementById('floatingWhatsapp');
    if (whatsappFloat) {
        whatsappFloat.href = whatsappLink;
        whatsappFloat.innerHTML = '📱';
        whatsappFloat.title = whatsappNumber;
    }
    
    // رابط الوكيل
    const agentLink = document.getElementById('floatingAgent');
    if (agentLink) {
        agentLink.innerHTML = '🛡️';
        agentLink.title = currentLang === 'ar' ? 'لوحة الوكيل' : (currentLang === 'en' ? 'Agent Panel' : 'መደራደሪ ኤጀንት');
    }
    
    // روابط من نحن والخصوصية
    const aboutWhatsapp = document.getElementById('aboutWhatsapp');
    if (aboutWhatsapp) {
        aboutWhatsapp.href = whatsappLink;
        aboutWhatsapp.innerHTML = '📱 ' + (currentLang === 'ar' ? 'واتساب' : (currentLang === 'en' ? 'WhatsApp' : 'ዋትሳፕ'));
    }
    
    const privacyWhatsapp = document.getElementById('privacyWhatsapp');
    if (privacyWhatsapp) {
        privacyWhatsapp.href = whatsappLink;
        privacyWhatsapp.innerHTML = '📱 ' + (currentLang === 'ar' ? 'واتساب' : (currentLang === 'en' ? 'WhatsApp' : 'ዋትሳፕ'));
    }
}

// ===== دالة تهيئة الصفحة (محدثة) =====
function init() {
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
    
    // ربط زر البحث عن الرحلات
    const searchBtn = document.getElementById('searchFlightBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchFlights);
    }
    
    // ربط قبول الكوكيز
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
    
    // عرض تنبيه الكوكيز إذا لم يتم قبوله
    const banner = document.getElementById('cookieBanner');
    if (banner && !checkCookieConsent()) {
        banner.style.display = 'flex';
    } else if (banner) {
        banner.style.display = 'none';
    }
    
    // عرض البيانات في المعارض
    renderGallery('realEstateGallery', realEstateData);
    renderGallery('electronicsGallery', electronicsData);
    renderGallery('carsGallery', carsData);
    renderGallery('jobsGallery', jobsData);
    
    // استعادة اللغة المحفوظة
    const savedLang = localStorage.getItem('preferredLang') || getCookie('lang') || CONFIG?.defaultLang || 'ar';
    
    // استعادة التبويب المحفوظ
    const savedTab = localStorage.getItem('activeTab');
    
    // التهيئة النهائية
    updateLanguage(savedLang);
    
    if (savedTab && savedTab !== 'home') {
        switchTab(savedTab);
    } else {
        switchTab('home');
    }
}

// تشغيل التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', init);
