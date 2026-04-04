// ========================================
// Asmara.Store - Data Models (بالصور الحقيقية)
// ========================================

// ===== بيانات العقارات (بصور حقيقية) =====
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
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=250&fit=crop"
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
        image: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?w=400&h=250&fit=crop"
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
        image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?w=400&h=250&fit=crop"
    },
    { 
        id: 4, 
        name: "أرض للبيع - مصوع", 
        price: "$45,000", 
        city: "مصوع", 
        type: "أرض",
        area: "600m²",
        image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?w=400&h=250&fit=crop"
    },
    { 
        id: 5, 
        name: "مكتب تجاري - أسمرة", 
        price: "$120,000", 
        city: "أسمرة", 
        type: "مكتب",
        area: "120m²",
        image: "https://images.pexels.com/photos/289777/pexels-photo-289777.jpeg?w=400&h=250&fit=crop"
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
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?w=400&h=250&fit=crop"
    }
];

// ===== بيانات الإلكترونيات (بصور حقيقية) =====
const electronicsData = [
    { id: 1, name: "iPhone 14 Pro", price: "$899", city: "أسمرة", condition: "جديد", image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?w=400&h=250&fit=crop" },
    { id: 2, name: "MacBook Air M2", price: "$1,299", city: "أسمرة", condition: "جديد", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?w=400&h=250&fit=crop" },
    { id: 3, name: "Samsung Galaxy S23", price: "$699", city: "أسمرة", condition: "جديد", image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?w=400&h=250&fit=crop" },
    { id: 4, name: "iPad Pro 11", price: "$799", city: "مصوع", condition: "مستعمل", image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?w=400&h=250&fit=crop" },
    { id: 5, name: "Sony Headphones", price: "$349", city: "أسمرة", condition: "جديد", image: "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?w=400&h=250&fit=crop" },
    { id: 6, name: "Dell XPS 15", price: "$1,599", city: "أسمرة", condition: "جديد", image: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?w=400&h=250&fit=crop" }
];

// ===== بيانات السيارات (بصور حقيقية) =====
const carsData = [
    { id: 1, name: "Toyota Corolla 2020", price: "$9,000", city: "مصوع", year: 2020, mileage: "85,000 كم", image: "https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg?w=400&h=250&fit=crop" },
    { id: 2, name: "Hyundai Tucson 2022", price: "$18,000", city: "أسمرة", year: 2022, mileage: "45,000 كم", image: "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?w=400&h=250&fit=crop" },
    { id: 3, name: "Kia Sportage 2021", price: "$16,000", city: "أسمرة", year: 2021, mileage: "60,000 كم", image: "https://images.pexels.com/photos/2761842/pexels-photo-2761842.jpeg?w=400&h=250&fit=crop" },
    { id: 4, name: "Nissan Patrol 2019", price: "$35,000", city: "أسمرة", year: 2019, mileage: "95,000 كم", image: "https://images.pexels.com/photos/115465/pexels-photo-115465.jpeg?w=400&h=250&fit=crop" },
    { id: 5, name: "Toyota Hilux 2021", price: "$28,000", city: "مصوع", year: 2021, mileage: "50,000 كم", image: "https://images.pexels.com/photos/163931/pexels-photo-163931.jpeg?w=400&h=250&fit=crop" },
    { id: 6, name: "Honda Civic 2019", price: "$12,000", city: "أسمرة", year: 2019, mileage: "75,000 كم", image: "https://images.pexels.com/photos/157091/pexels-photo-157091.jpeg?w=400&h=250&fit=crop" }
];

// ===== بيانات الوظائف (بصور حقيقية) =====
const jobsData = [
    { id: 1, name: "محاسب", salary: "$500", city: "أسمرة", company: "شركة أسمرة", type: "دوام كامل", image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=400&h=250&fit=crop" },
    { id: 2, name: "مهندس مدني", salary: "$800", city: "أسمرة", company: "مقاولات الإخوة", type: "دوام كامل", image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?w=400&h=250&fit=crop" },
    { id: 3, name: "مبرمج ويب", salary: "$1,200", city: "عن بعد", company: "شركة تقنية", type: "عن بعد", image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=400&h=250&fit=crop" },
    { id: 4, name: "مسوق إلكتروني", salary: "$700", city: "أسمرة", company: "وكالة تسويق", type: "دوام جزئي", image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=400&h=250&fit=crop" },
    { id: 5, name: "سائق توصيل", salary: "$400", city: "مصوع", company: "شركة توصيل", type: "دوام كامل", image: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?w=400&h=250&fit=crop" },
    { id: 6, name: "مبيعات", salary: "$600", city: "أسمرة", company: "شركة تجارية", type: "دوام كامل", image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?w=400&h=250&fit=crop" }
];

// ===== صور إضافية للمنصة =====
const platformImages = {
    logo: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=200&h=80&fit=crop",
    hero: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?w=1200&h=400&fit=crop",
    asmara: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?w=800&h=400&fit=crop",
    massawa: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?w=800&h=400&fit=crop"
};

// دالة عرض المعارض
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
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://placehold.co/400x250/1e3a5f/white?text=صورة'">
            <h4>${item.name}</h4>
            <p>${item.price || item.salary} | 📍 ${item.city}</p>
            ${details ? `<small style="font-size:0.7rem; color:#666">${details}</small>` : ''}
        `;
        container.appendChild(div);
    });
}
