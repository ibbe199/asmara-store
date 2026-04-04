// ========================================
// Asmara.Store - Utilities
// ========================================

// دالة تبديل التبويبات
function switchTab(tabId) {
    // إخفاء جميع الألواح
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active-pane');
    });
    
    // إظهار اللوح المطلوب
    const activePane = document.getElementById(`${tabId}Pane`);
    if (activePane) activePane.classList.add('active-pane');
    
    // تحديث حالة الروابط النشطة
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.tab === tabId) {
            link.classList.add('active');
        }
    });
}

// دالة عرض الرحلات في الصفحة الرئيسية
function renderHomeFlights() {
    const container = document.getElementById('homeFlightsPreview');
    if (!container) return;
    
    let html = '<ul style="list-style:none">';
    for (const [key, flights] of Object.entries(FLIGHTS_DATA)) {
        const [from, to] = key.split('-');
        flights.forEach(flight => {
            html += `<li style="margin-bottom:0.5rem">✈️ ${from} → ${to} | ${flight.airline} | ${flight.price}</li>`;
        });
    }
    html += '</ul>';
    container.innerHTML = html;
}

// دالة عرض المقالات في الصفحة الرئيسية
function renderHomeBlog() {
    const container = document.getElementById('homeBlogPreview');
    if (!container) return;
    
    let html = '';
    BLOG_POSTS.slice(0, 3).forEach(post => {
        html += `
            <div style="margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid #eee">
                <h4>${post.title}</h4>
                <p style="font-size:0.8rem; color:#666">${post.summary}</p>
                <a href="${post.link}" style="color:var(--secondary); font-size:0.75rem">${currentLang === 'ar' ? 'قراءة المزيد' : (currentLang === 'en' ? 'Read More' : 'ዝያዳ ኣንብብ')} →</a>
            </div>
        `;
    });
    container.innerHTML = html;
}

// دالة البحث عن الرحلات
function searchFlights() {
    const from = document.getElementById('flightFrom').value;
    const date = document.getElementById('flightDate').value;
    const flights = FLIGHTS_DATA[`${from}-ASM`] || [];
    const resultsDiv = document.getElementById('flightResults');
    
    if (flights.length === 0) {
        resultsDiv.innerHTML = currentLang === 'ar' ? '❌ لا توجد رحلات' : (currentLang === 'en' ? '❌ No flights' : '❌ በረራ የለን');
        return;
    }
    
    let html = `<strong>${currentLang === 'ar' ? 'نتائج البحث' : (currentLang === 'en' ? 'Search Results' : 'ውጤት ምድላይ')} (${date || ''}):</strong><br><br>`;
    flights.forEach(f => {
        html += `✈️ ${f.airline} | ${f.price} | ${f.time}<br>`;
    });
    resultsDiv.innerHTML = html;
}

// دالة تهيئة الروابط الثابتة
function initStaticLinks() {
    // رابط الواتساب
    const whatsappLink = document.getElementById('floatingWhatsapp');
    if (whatsappLink) {
        whatsappLink.href = CONFIG.whatsappLink;
        whatsappLink.innerHTML = '📱';
        whatsappLink.title = CONFIG.whatsappNumber;
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
        aboutWhatsapp.href = CONFIG.whatsappLink;
        aboutWhatsapp.innerHTML = '📱 ' + (currentLang === 'ar' ? 'واتساب' : (currentLang === 'en' ? 'WhatsApp' : 'ዋትሳፕ'));
    }
    
    const privacyWhatsapp = document.getElementById('privacyWhatsapp');
    if (privacyWhatsapp) {
        privacyWhatsapp.href = CONFIG.whatsappLink;
        privacyWhatsapp.innerHTML = '📱 ' + (currentLang === 'ar' ? 'واتساب' : (currentLang === 'en' ? 'WhatsApp' : 'ዋትሳፕ'));
    }
}
