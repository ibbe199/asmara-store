// ========================================
// Asmara.Store - Main Application
// ========================================

let currentLang = 'ar';
let currentUser = null;
let isAgentMode = false;
let selectedRating = 5;
let searchQuery = { city: '' };

// ===== دوال العرض =====
function renderProductCard(item, section) {
    const price = item.price || item.salary;
    return `
        <div class="product-card" onclick="showProductDetails(${item.id}, '${section}')">
            <div class="product-image-container">
                <img src="${item.image}" class="product-image" alt="${item.name}" loading="lazy">
                <div class="image-zoom">🔍 تكبير</div>
            </div>
            <div class="product-info">
                <h4 class="product-title">${item.name}</h4>
                <div class="product-price">$${price}</div>
                <div class="product-meta">
                    <span class="badge">${item.type}</span>
                    <span class="product-views">👁️ ${item.views || 0}</span>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart({id:${item.id}, name:'${item.name}', price:${price}, image:'${item.image}'})">➕ أضف</button>
                </div>
            </div>
        </div>
    `;
}

function renderGallery(containerId, data, section) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.slice(0, 6).map(item => renderProductCard(item, section)).join('');
}

function renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;
    container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-avatar">${t.avatar}</div>
            <div class="testimonial-text">"${t.text}"</div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-title">${t.title}</div>
            <div class="testimonial-stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
        </div>
    `).join('');
}

function renderHomePage() {
    renderGallery('homeRealEstate', realEstateAds, 'realestate');
    renderGallery('homeElectronics', electronicsAds, 'electronics');
    renderGallery('homeCars', carsAds, 'cars');
    renderGallery('homeJobs', jobsAds, 'jobs');
    renderGallery('homeServices', generalAds, 'general');
    renderTestimonials();
    const bc = document.getElementById('homeBlogPreview');
    if (bc) {
        bc.innerHTML = blogPosts.slice(0, 3).map(p => `
            <div style="margin-bottom:1rem; cursor:pointer" onclick="showBlogPost(${p.id})">
                <span class="blog-category">${p.category}</span>
                <h4 style="color:#1e3a5f">${p.title}</h4>
                <p style="font-size:0.8rem; color:#666">${p.summary}</p>
            </div>
        `).join('');
    }
}

function renderAllFlights() {
    const c = document.getElementById('allFlightsList');
    if (c) {
        c.innerHTML = allFlights.map(f => `
            <div class="flight-card">
                <div class="flight-route">✈️ ${f.fromName} → ${f.toName}</div>
                <div class="flight-details">
                    <div>${f.airline} ${f.flightNo}</div>
                    <div>🕐 ${f.time}</div>
                    <div>${f.price}</div>
                </div>
            </div>
        `).join('');
    }
}

function renderBlog() {
    const c = document.getElementById('blogGrid');
    if (c) {
        c.innerHTML = blogPosts.map(p => `
            <div class="blog-card" onclick="showBlogPost(${p.id})">
                <div class="blog-image">${p.image}</div>
                <div class="blog-content">
                    <span class="blog-category">${p.category}</span>
                    <h3 class="blog-title">${p.title}</h3>
                    <p class="blog-summary">${p.summary}</p>
                    <div class="blog-meta">
                        <span>📅 ${p.date}</span>
                        <span>✍️ ${p.author}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function showBlogPost(id) {
    const p = blogPosts.find(p => p.id === id);
    if (p) {
        document.getElementById('policyModalTitle').innerHTML = `${p.image} ${p.title}`;
        document.getElementById('policyModalBody').innerHTML = p.content;
        document.getElementById('policyModal').style.display = 'flex';
    }
}

function renderFilteredRealEstate() {
    let filtered = realEstateAds;
    if (searchQuery.city) filtered = filtered.filter(ad => ad.city === searchQuery.city);
    renderGallery('realEstateGallery', filtered, 'realestate');
}

function filterByCity(city) {
    searchQuery.city = city;
    showNotification(`تم التصفية حسب مدينة ${city || 'الكل'} (Example)`, 'info');
    renderFilteredRealEstate();
}

// ===== دوال سلة التسوق =====
function addToCart(item) {
    cart.push(item);
    updateCartUI();
    showNotification(`Example: تم إضافة ${item.name} إلى السلة`, 'success');
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartItemsDiv = document.getElementById('cartItems');
    let total = 0;
    cartItemsDiv.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `<div class="cart-item"><div class="cart-item-details"><div>${item.name}</div><div>$${item.price}</div></div><button onclick="removeFromCart(${index})">🗑️</button></div>`;
    }).join('');
    document.getElementById('cartTotal').innerHTML = `المجموع: $${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) { showNotification('Example: السلة فارغة', 'warning'); return; }
    alert(`Example: تم إتمام الشراء! المجموع: $${cart.reduce((t, i) => t + i.price, 0)}`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// ===== دوال البحث =====
function performSearch() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const city = document.getElementById('searchCity').value;
    const minPrice = parseFloat(document.getElementById('priceMin').value) || 0;
    const maxPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;
    const category = document.getElementById('searchCategory').value;
    
    let results = [];
    if (!category || category === 'realestate') results.push(...realEstateAds.filter(i => (!keyword || i.name.toLowerCase().includes(keyword)) && (!city || i.city === city) && i.price >= minPrice && i.price <= maxPrice));
    if (!category || category === 'electronics') results.push(...electronicsAds.filter(i => (!keyword || i.name.toLowerCase().includes(keyword)) && (!city || i.city === city) && i.price >= minPrice && i.price <= maxPrice));
    if (!category || category === 'cars') results.push(...carsAds.filter(i => (!keyword || i.name.toLowerCase().includes(keyword)) && (!city || i.city === city) && i.price >= minPrice && i.price <= maxPrice));
    if (!category || category === 'jobs') results.push(...jobsAds.filter(i => (!keyword || i.name.toLowerCase().includes(keyword)) && (!city || i.city === city) && i.salary >= minPrice && i.salary <= maxPrice));
    if (!category || category === 'general') results.push(...generalAds.filter(i => (!keyword || i.name.toLowerCase().includes(keyword)) && (!city || i.city === city) && i.price >= minPrice && i.price <= maxPrice));
    
    showNotification(results.length ? `Example: تم العثور على ${results.length} نتيجة` : 'Example: لا توجد نتائج', results.length ? 'success' : 'info');
}

// ===== دوال المستخدم =====
function loginUser() {
    const u = document.getElementById('loginUsername').value;
    const p = document.getElementById('loginPassword').value;
    if (u && p) {
        currentUser = u;
        setCookie('username', u, 30);
        setCookie('isAgent', p === 'agent123' ? 'true' : 'false', 30);
        document.getElementById('userName').innerText = u;
        document.getElementById('userDisplay').style.display = 'flex';
        document.getElementById('loginModalBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        closeLoginModal();
        showNotification(`Example: مرحباً ${u}`, 'success');
        if (p === 'agent123') showAgentPanel();
    } else showNotification('Example: أدخل البيانات', 'error');
}

function logoutUser() {
    currentUser = null;
    setCookie('username', '', -1);
    setCookie('isAgent', '', -1);
    document.getElementById('userDisplay').style.display = 'none';
    document.getElementById('loginModalBtn').style.display = 'inline-block';
    document.getElementById('logoutBtn').style.display = 'none';
    showNotification('Example: تم تسجيل الخروج', 'info');
}

function registerUser() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const pass = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    if (!name || !email || !phone || !pass) { showNotification('Example: املأ جميع الحقول', 'error'); return; }
    if (pass !== confirm) { showNotification('Example: كلمة المرور غير متطابقة', 'error'); return; }
    showNotification('Example: تم إنشاء الحساب بنجاح', 'success');
    closeRegisterModal();
    openLoginModal();
}

function showRegister() { closeLoginModal(); document.getElementById('registerModal').style.display = 'flex'; }
function closeRegisterModal() { document.getElementById('registerModal').style.display = 'none'; }
function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('loginModal').style.display = 'none'; }
function toggleUserDashboard() { document.getElementById('userDashboard').classList.toggle('active'); }
function showMyOrders() { alert('Example: لا توجد طلبات سابقة'); }
function showWishlist() { alert('Example: قائمة المفضلة فارغة'); }
function showMyAds() { alert('Example: لا توجد إعلانات مضافة'); }

// ===== دوال الوكيل =====
function showAgentPanel() {
    if (!isAgentMode) {
        isAgentMode = true;
        const tabs = document.querySelector('.tabs');
        ['dashboard', 'agent', 'reports', 'institutions', 'policies'].forEach(tab => {
            if (!document.querySelector(`.tab-btn[data-tab="${tab}"]`)) {
                const btn = document.createElement('button');
                btn.className = 'tab-btn';
                btn.setAttribute('data-tab', tab);
                const names = { dashboard: "📊 إحصائيات", agent: "🛡️ الوكيل", reports: "🚨 بلاغات", institutions: "🏛️ مؤسسات", policies: "📜 سياسات" };
                btn.innerText = names[tab];
                btn.onclick = () => switchTab(tab);
                tabs.appendChild(btn);
            }
        });
    }
}

function updateUserDashboard() {
    document.getElementById('dashboardUserName').innerText = currentUser || 'زائر';
    document.getElementById('userAdsCount').innerText = "0";
    document.getElementById('userMessagesCount').innerText = messages.filter(m => m.to === currentUser).length;
    document.getElementById('userBalance').innerHTML = `$${balance}`;
}

// ===== دوال الطيران =====
function searchFlights() {
    const from = document.getElementById("flightFrom").value;
    const date = document.getElementById("flightDate").value;
    const flights = allFlights.filter(f => f.from === from);
    const rd = document.getElementById("flightResults");
    if (flights.length === 0) { rd.innerHTML = "❌ Example: لا توجد رحلات"; return; }
    rd.innerHTML = `<strong>Example: نتائج (${date}):</strong><br>` + flights.map(f => `<div>✈️ ${f.airline} | ${f.price} | 🕐 ${f.time}</div>`).join('');
}

// ===== دوال المراسلة والتقييم =====
function loadChat() {
    const c = document.getElementById('chatMessages');
    if (c) c.innerHTML = messages.map(m => `<div class="chat-message"><strong>${m.from}</strong><div>${m.text}</div><small>${m.time}</small></div>`).join('');
}

function loadRatings() {
    const r = document.getElementById('ratingsList');
    if (r) r.innerHTML = ratings.map(r => `<div class="chat-message"><strong>${r.user}</strong><div class="rating-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div><div>${r.comment}</div><small>${r.date}</small></div>`).join('');
}

function initRatingStars() {
    document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value);
            document.querySelectorAll('.rating-star').forEach(s => s.classList.remove('active'));
            for (let i = 0; i < selectedRating; i++) document.querySelectorAll('.rating-star')[i]?.classList.add('active');
        });
    });
}

// ===== دوال إضافية =====
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    answer.classList.toggle('show');
    element.querySelector('i').classList.toggle('fa-chevron-down');
    element.querySelector('i').classList.toggle('fa-chevron-up');
}

function sendContactMessage() {
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const msg = document.getElementById('contactMessage')?.value;
    if (name && email && msg) {
        showNotification('Example: تم إرسال رسالتك', 'success');
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    } else showNotification('Example: املأ جميع الحقول', 'error');
}

function updateWallet() {
    document.getElementById('balanceAmount').innerHTML = `$${balance}`;
    document.getElementById('transactionsList').innerHTML = transactions.map(t => `<div>${t.date} - ${t.amount} - ${t.type}</div>`).join('') || "<p>Example: لا توجد معاملات</p>";
}

function showProductDetails(id, section) {
    let product;
    if (section === 'realestate') product = realEstateAds.find(p => p.id === id);
    else if (section === 'electronics') product = electronicsAds.find(p => p.id === id);
    else if (section === 'cars') product = carsAds.find(p => p.id === id);
    else if (section === 'jobs') product = jobsAds.find(p => p.id === id);
    else product = generalAds.find(p => p.id === id);
    if (product) {
        const price = product.price || product.salary;
        document.getElementById('policyModalTitle').innerHTML = product.name;
        document.getElementById('policyModalBody').innerHTML = `<img src="${product.image}" style="width:100%; border-radius:16px;"><p><strong>💰 السعر:</strong> $${price}</p><p><strong>📍 المدينة:</strong> ${product.city}</p><p><strong>📝 الوصف:</strong> ${product.description}</p><button class="btn" onclick="addToCart({id:${product.id}, name:'${product.name}', price:${price}, image:'${product.image}'}); closePolicyModal();">🛒 أضف</button>`;
        document.getElementById('policyModal').style.display = 'flex';
        product.views = (product.views || 0) + 1;
        renderHomePage();
    }
}

function showPolicy(type) {
    const p = policies[type];
    if (p) {
        document.getElementById('policyModalTitle').innerHTML = p.title;
        document.getElementById('policyModalBody').innerHTML = p.content;
        document.getElementById('policyModal').style.display = 'flex';
    }
}

function closePolicyModal() { document.getElementById('policyModal').style.display = 'none'; }

// ===== دوال الترجمة =====
const TRANSLATIONS = {
    ar: { tagline: "Example: منصة تحترم عاداتنا", homeIntro: "Example: منصة موثوقة" },
    en: { tagline: "Example: A platform that respects our customs", homeIntro: "Example: Trusted platform" },
    ti: { tagline: "Example: ልማዳትና ባህልና ዘከብር መድረኽ", homeIntro: "Example: እሙን መድረኽ" }
};

function updateLanguage(lang) {
    currentLang = lang;
    const t = TRANSLATIONS[lang];
    if (t) {
        document.getElementById("tagline").innerText = t.tagline;
        document.getElementById("homeIntro").innerText = t.homeIntro;
    }
    document.body.className = `lang-${lang}`;
    document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    localStorage.setItem('preferredLang', lang);
    setCookie('lang', lang, 30);
}

// ===== تبديل التبويبات =====
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
    const pane = document.getElementById(`${tabId}Pane`);
    if (pane) pane.classList.add('active-pane');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    if (tabId === 'blog') renderBlog();
    if (tabId === 'messaging') loadChat();
    if (tabId === 'ratings') loadRatings();
    if (tabId === 'home') renderHomePage();
}

// ===== رفع السيرة الذاتية =====
document.getElementById('resumeFile')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        resumes.push({ name: file.name, date: new Date().toLocaleDateString() });
        showNotification(`Example: تم رفع ${file.name}`, 'success');
        document.getElementById('resumeList').innerHTML = resumes.map(r => `<div class="resume-item">📄 ${r.name} <small>${r.date}</small></div>`).join('');
    }
});

// ===== ربط الأحداث =====
function bindEvents() {
    document.getElementById("loginModalBtn").onclick = openLoginModal;
    document.getElementById("searchFlightBtn").onclick = searchFlights;
    document.getElementById("confirmBookingBtn").onclick = () => {
        const n = document.getElementById("passengerName")?.value;
        showNotification(n ? `Example: تم تأكيد حجز ${n}` : "Example: أدخل الاسم", n ? 'success' : 'error');
    };
    document.getElementById("sendMsgBtn").onclick = () => {
        const i = document.getElementById("chatInput");
        if (i.value.trim()) {
            messages.push({ from: currentUser || "زائر Example", text: i.value, time: new Date().toLocaleTimeString() });
            loadChat();
            i.value = "";
            showNotification("Example: تم إرسال الرسالة", 'success');
        }
    };
    document.getElementById("addRatingBtn").onclick = () => {
        const c = document.getElementById("newRatingComment")?.value;
        if (c) {
            ratings.unshift({ user: currentUser || "مستخدم Example", rating: selectedRating, comment: c, date: new Date().toLocaleDateString() });
            loadRatings();
            document.getElementById("newRatingComment").value = "";
            showNotification("Example: تم إضافة تقييمك", 'success');
        } else showNotification("Example: اكتب تعليقك", 'error');
    };
    document.getElementById("paypalBtn").onclick = () => {
        setTimeout(() => { balance += 29; transactions.unshift({ date: new Date().toLocaleDateString(), amount: "+$29", type: "اشتراك Pro Example" }); updateWallet(); showNotification("Example: تم الدفع!", 'success'); }, 500);
    };
    document.getElementById("addFundsBtn").onclick = () => { balance += 50; transactions.unshift({ date: new Date().toLocaleDateString(), amount: "+$50", type: "إيداع Example" }); updateWallet(); showNotification("Example: تم إيداع $50", 'success'); };
    
    document.getElementById("privacyPolicyLink").onclick = (e) => { e.preventDefault(); showPolicy('privacy'); };
    document.getElementById("securityPolicyLink").onclick = (e) => { e.preventDefault(); showPolicy('security'); };
    document.getElementById("returnsPolicyLink").onclick = (e) => { e.preventDefault(); showPolicy('returns'); };
    document.getElementById("agentPanelLink").onclick = (e) => { e.preventDefault(); showAgentPanel(); };
    document.getElementById("libraryInfoBtn").onclick = () => { document.getElementById('policyModalTitle').innerHTML = "📚 Example: مكتبة أسمرة"; document.getElementById('policyModalBody').innerHTML = "<p>Example: مركز التوثيق الوطني</p>"; document.getElementById('policyModal').style.display = 'flex'; };
    
    document.querySelectorAll('.lang-btn').forEach(btn => btn.onclick = () => updateLanguage(btn.dataset.lang));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.onclick = () => switchTab(btn.dataset.tab));
    document.querySelectorAll('.nav-tab-link').forEach(link => link.onclick = (e) => { e.preventDefault(); switchTab(link.dataset.tab); });
    document.querySelectorAll('.footer-link').forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); switchTab(link.dataset.tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
}

// ===== التهيئة الرئيسية =====
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = getCookie('username');
    const isAgent = getCookie('isAgent') === 'true';
    if (savedUser) {
        currentUser = savedUser;
        document.getElementById('userName').innerText = savedUser;
        document.getElementById('userDisplay').style.display = 'flex';
        document.getElementById('loginModalBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        updateUserDashboard();
        if (isAgent) showAgentPanel();
    }
    
    const savedLang = localStorage.getItem('preferredLang') || getCookie('lang') || 'ar';
    updateLanguage(savedLang);
    
    bindEvents();
    renderAllFlights();
    renderHomePage();
    renderFilteredRealEstate();
    renderGallery('electronicsGallery', electronicsAds, 'electronics');
    renderGallery('carsGallery', carsAds, 'cars');
    renderGallery('jobsGallery', jobsAds, 'jobs');
    renderGallery('generalGallery', generalAds, 'general');
    renderBlog();
    loadRatings();
    loadChat();
    updateWallet();
    initRatingStars();
    
    switchTab('home');
});

// تعريف الدوال العامة
window.showBlogPost = showBlogPost;
window.closePolicyModal = closePolicyModal;
window.filterByCity = filterByCity;
window.toggleFaq = toggleFaq;
window.sendContactMessage = sendContactMessage;
window.toggleUserDashboard = toggleUserDashboard;
window.showMyOrders = showMyOrders;
window.showWishlist = showWishlist;
window.showMyAds = showMyAds;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.closeLoginModal = closeLoginModal;
window.showRegister = showRegister;
window.closeRegisterModal = closeRegisterModal;
window.registerUser = registerUser;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.performSearch = performSearch;
window.showProductDetails = showProductDetails;
