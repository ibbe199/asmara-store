// ========================================
// Asmara.Store - Data Models
// ========================================

// بيانات العقارات
const realEstateData = [
    { id: 1, name: "شقة في أسمرة", price: "$80,000", city: "أسمرة", image: "https://placehold.co/300x200/1e3a5f/white?text=شقة" },
    { id: 2, name: "فيلا - إدغا أريتي", price: "$250,000", city: "أسمرة", image: "https://placehold.co/300x200/2c5282/white?text=فيلا" }
];

// بيانات الإلكترونيات
const electronicsData = [
    { id: 1, name: "iPhone 14", price: "$700", city: "أسمرة", image: "https://placehold.co/300x200/c7a12b/white?text=iPhone" },
    { id: 2, name: "MacBook Air", price: "$1,200", city: "أسمرة", image: "https://placehold.co/300x200/1e3a5f/white?text=MacBook" }
];

// بيانات السيارات
const carsData = [
    { id: 1, name: "Toyota Corolla", price: "$9,000", city: "مصوع", image: "https://placehold.co/300x200/2c5a82/white?text=Toyota" }
];

// بيانات الوظائف
const jobsData = [
    { id: 1, name: "محاسب", salary: "$500", city: "أسمرة", company: "شركة أسمرة", image: "https://placehold.co/300x200/6d597b/white?text=محاسب" }
];

// دالة عرض المعارض
function renderGallery(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = "";
    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.price || item.salary} | 📍 ${item.city}</p>
        `;
        container.appendChild(div);
    });
}
