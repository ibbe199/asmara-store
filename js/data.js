// ========================================
// Asmara.Store - Data Models (محدث)
// ========================================

// ===== بيانات العقارات (مضافة) =====
const realEstateData = [
    { 
        id: 1, 
        name: "شقة فاخرة - تيرفولو", 
        price: "$85,000", 
        city: "أسمرة", 
        type: "شقة",
        bedrooms: 3,
        bathrooms: 2,
        area: "150m²",
        image: "https://placehold.co/300x200/1e3a5f/white?text=شقة+فاخرة"
    },
    { 
        id: 2, 
        name: "فيلا - إدغا أريتي", 
        price: "$250,000", 
        city: "أسمرة", 
        type: "فيلا",
        bedrooms: 5,
        bathrooms: 4,
        area: "400m²",
        image: "https://placehold.co/300x200/2c5282/white?text=فيلا"
    },
    { 
        id: 3, 
        name: "شقة - وسط أسمرة", 
        price: "$65,000", 
        city: "أسمرة", 
        type: "شقة",
        bedrooms: 2,
        bathrooms: 1,
        area: "95m²",
        image: "https://placehold.co/300x200/3a6b92/white?text=شقة+وسط"
    },
    { 
        id: 4, 
        name: "أرض للبيع - مصوع", 
        price: "$45,000", 
        city: "مصوع", 
        type: "أرض",
        area: "600m²",
        image: "https://placehold.co/300x200/1e3a5f/white?text=أرض"
    },
    { 
        id: 5, 
        name: "مكتب تجاري - أسمرة", 
        price: "$120,000", 
        city: "أسمرة", 
        type: "مكتب",
        area: "120m²",
        image: "https://placehold.co/300x200/2c5282/white?text=مكتب"
    },
    { 
        id: 6, 
        name: "شقة - كرن", 
        price: "$55,000", 
        city: "كرن", 
        type: "شقة",
        bedrooms: 2,
        bathrooms: 1,
        area: "100m²",
        image: "https://placehold.co/300x200/3a6b92/white?text=شقة+كرن"
    }
];

// ===== بيانات الإلكترونيات (مضافة) =====
const electronicsData = [
    { id: 1, name: "iPhone 14 Pro", price: "$899", city: "أسمرة", condition: "جديد", image: "https://placehold.co/300x200/c7a12b/white?text=iPhone+14" },
    { id: 2, name: "MacBook Air M2", price: "$1,299", city: "أسمرة", condition: "جديد", image: "https://placehold.co/300x200/1e3a5f/white?text=MacBook" },
    { id: 3, name: "Samsung Galaxy S23", price: "$699", city: "أسمرة", condition: "جديد", image: "https://placehold.co/300x200/2c5282/white?text=Galaxy+S23" },
    { id: 4, name: "iPad Pro 11", price: "$799", city: "مصوع", condition: "مستعمل", image: "https://placehold.co/300x200/c7a12b/white?text=iPad+Pro" },
    { id: 5, name: "Sony Headphones WH-1000XM5", price: "$349", city: "أسمرة", condition: "جديد", image: "https://placehold.co/300x200/1e3a5f/white?text=Sony" },
    { id: 6, name: "Dell XPS 15", price: "$1,599", city: "أسمرة", condition: "جديد", image: "https://placehold.co/300x200/2c5282/white?text=Dell+XPS" }
];

// ===== بيانات السيارات (مضافة) =====
const carsData = [
    { id: 1, name: "Toyota Corolla 2020", price: "$9,000", city: "مصوع", year: 2020, mileage: "85,000 كم", image: "https://placehold.co/300x200/2c5a82/white?text=Toyota+Corolla" },
    { id: 2, name: "Hyundai Tucson 2022", price: "$18,000", city: "أسمرة", year: 2022, mileage: "45,000 كم", image: "https://placehold.co/300x200/1e3a5f/white?text=Hyundai+Tucson" },
    { id: 3, name: "Kia Sportage 2021", price: "$16,000", city: "أسمرة", year: 2021, mileage: "60,000 كم", image: "https://placehold.co/300x200/2c5282/white?text=Kia+Sportage" },
    { id: 4, name: "Nissan Patrol 2019", price: "$35,000", city: "أسمرة", year: 2019, mileage: "95,000 كم", image: "https://placehold.co/300x200/3a5a40/white?text=Nissan+Patrol" },
    { id: 5, name: "Toyota Hilux 2021", price: "$28,000", city: "مصوع", year: 2021, mileage: "50,000 كم", image: "https://placehold.co/300x200/2c5a82/white?text=Toyota+Hilux" },
    { id: 6, name: "Honda Civic 2019", price: "$12,000", city: "أسمرة", year: 2019, mileage: "75,000 كم", image: "https://placehold.co/300x200/1e3a5f/white?text=Honda+Civic" }
];

// ===== بيانات الوظائف (مضافة) =====
const jobsData = [
    { id: 1, name: "محاسب", salary: "$500", city: "أسمرة", company: "شركة أسمرة", type: "دوام كامل", image: "https://placehold.co/300x200/6d597b/white?text=محاسب" },
    { id: 2, name: "مهندس مدني", salary: "$800", city: "أسمرة", company: "مقاولات الإخوة", type: "دوام كامل", image: "https://placehold.co/300x200/4a627a/white?text=مهندس" },
    { id: 3, name: "مبرمج ويب", salary: "$1,200", city: "عن بعد", company: "شركة تقنية", type: "عن بعد", image: "https://placehold.co/300x200/6d597b/white?text=مبرمج" },
    { id: 4, name: "مسوق إلكتروني", salary: "$700", city: "أسمرة", company: "وكالة تسويق", type: "دوام جزئي", image: "https://placehold.co/300x200/4a627a/white?text=مسوق" },
    { id: 5, name: "سائق توصيل", salary: "$400", city: "مصوع", company: "شركة توصيل", type: "دوام كامل", image: "https://placehold.co/300x200/6d597b/white?text=سائق" },
    { id: 6, name: "مبيعات", salary: "$600", city: "أسمرة", company: "شركة تجارية", type: "دوام كامل", image: "https://placehold.co/300x200/4a627a/white?text=مبيعات" }
];

// ===== بيانات المقالات (مضافة) =====
const BLOG_POSTS = [
    {
        id: 1,
        title: "كيف تختار رحلة مناسبة إلى أسمرة",
        summary: "نصائح سريعة للمغترب الإريتري عند مقارنة أسعار الرحلات واختيار الوقت المناسب.",
        content: "محتوى المقال الكامل هنا...",
        date: "2026-04-01",
        link: "blog.html?id=1"
    },
    {
        id: 2,
        title: "الاستثمار العقاري في أسمرة",
        summary: "نظرة مبسطة على الفرص العقارية الأكثر طلبًا داخل العاصمة.",
        content: "محتوى المقال الكامل هنا...",
        date: "2026-03-28",
        link: "blog.html?id=2"
    },
    {
        id: 3,
        title: "لماذا منصة متعددة اللغات مهمة؟",
        summary: "اللغة تبني الثقة، خاصة عندما تخاطب جمهورًا في الداخل والمهجر.",
        content: "محتوى المقال الكامل هنا...",
        date: "2026-03-25",
        link: "blog.html?id=3"
    },
    {
        id: 4,
        title: "أفضل مناطق الاستثمار في أسمرة",
        summary: "تعرف على المناطق الواعدة للاستثمار العقاري في العاصمة.",
        content: "محتوى المقال الكامل هنا...",
        date: "2026-03-20",
        link: "blog.html?id=4"
    },
    {
        id: 5,
        title: "نصائح لبدء مشروع تجاري في إريتريا",
        summary: "دليل مبسط للراغبين في تأسيس أعمالهم.",
        content: "محتوى المقال الكامل هنا...",
        date: "2026-03-15",
        link: "blog.html?id=5"
    }
];

// دالة عرض المعارض (محدثة)
function renderGallery(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = "";
    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        
        let details = "";
        if (item.bedrooms) details = `${item.bedrooms} غرف | ${item.area}`;
        else if (item.year) details = `${item.year} | ${item.mileage}`;
        else if (item.condition) details = item.condition;
        else if (item.company) details = `${item.company} | ${item.type}`;
        
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <h4>${item.name}</h4>
            <p>${item.price || item.salary} | 📍 ${item.city}</p>
            ${details ? `<small style="font-size:0.7rem; color:#666">${details}</small>` : ''}
        `;
        container.appendChild(div);
    });
}
