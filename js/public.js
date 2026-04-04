// ========================================
// Asmara.Store - Public Main Script
// ========================================

let currentLang = 'ar';

// دالة تحديث اللغة
function updateLanguage(lang) {
    currentLang = lang;
    const t = TRANSLATIONS[lang];
    if (!t) return;
    
    // تحديث النصوص
    document.getElementById('tagline').innerText = t.tagline;
    document.getElementById('homeIntro').innerText = t.homeIntro;
    document.getElementById('homeFlightsTitle').innerText = t.homeFlightsTitle;
    document.getElementById('homeBlogTitle').innerText = t.homeBlogTitle;
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
    document.getElementById('searchFlightBtn').innerHTML = t.searchBtn;
    
    // تحديث أزرار التنقل
    document.getElementById('navHome').innerText = lang === 'ar' ? 'الرئيسية' : (lang === 'en' ? 'Home' : 'ዓንዲ');
    document.getElementById('navFlight').innerText = lang === 'ar' ? 'الطيران' : (lang === 'en' ? 'Flights' : 'በረራ');
    document.getElementById('navRealEstate').innerText = lang === 'ar' ? 'العقارات' : (lang === 'en' ? 'Real Estate' : 'ንብረት');
    document.getElementById('navElectronics').innerText = lang === 'ar' ? 'الإلكترونيات' : (lang === 'en' ? 'Electronics' : 'ኤሌክትሮኒክስ');
    document.getElementById('navCars').innerText = lang === 'ar' ? 'السيارات' : (lang === 'en' ? 'Cars' : 'ማኪና');
    document.getElementById('navJobs').innerText = lang === 'ar' ? 'الوظائف' : (lang === 'en' ? 'Jobs' : 'ስራሕ');
    document.getElementById('navBlog').innerText = lang === 'ar' ? 'البلوق' : (lang === 'en' ? 'Blog' : 'ብሎግ');
    document.getElementById('navAbout').innerText = lang === 'ar' ? 'من نحن' : (lang === 'en' ? 'About' : 'ብዛዕባና');
    document.getElementById('navPrivacy').innerText = lang === 'ar' ? 'الخصوصية' : (lang === 'en' ? 'Privacy' : 'ምስጢር');
    
    // تحديث اتجاه الصفحة
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    
    // تحديث حالة الأزرار النشطة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // إعادة عرض المحتوى الديناميكي
    renderHomeFlights();
    renderHomeBlog();
    initStaticLinks();
}

// دالة تهيئة الصفحة
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
    
    // التهيئة النهائية
    const savedLang = getCookie('lang') || CONFIG.defaultLang;
    updateLanguage(savedLang);
    switchTab('home');
}

// تشغيل التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', init);
