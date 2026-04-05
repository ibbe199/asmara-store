// ========================================
// Asmara.Store - Data (مع صور Example)
// ========================================

// Example Image - صور توضيحية فقط
const EXAMPLE_IMG = "https://placehold.co/600x400/1e3a5f/white?text=📸+Example:+صورة+توضيحية";

// بيانات العقارات - Example
let realEstateAds = [
    { id: 1, name: "شقة فاخرة - تيرفولو (Example)", price: 85000, city: "أسمرة", type: "شقة", bedrooms: 3, area: "150م²", finishing: "فاخر", views: 45, image: EXAMPLE_IMG, description: "Example: شقة فاخرة في أرقى أحياء أسمرة" },
    { id: 2, name: "فيلا - إدغا أريتي (Example)", price: 250000, city: "أسمرة", type: "فيلا", bedrooms: 5, area: "400م²", finishing: "سوبر لوكس", views: 32, image: EXAMPLE_IMG, description: "Example: فيلا مستقلة بحديقة خاصة" },
    { id: 3, name: "شقة - وسط أسمرة (Example)", price: 65000, city: "أسمرة", type: "شقة", bedrooms: 2, area: "95م²", finishing: "عادي", views: 28, image: EXAMPLE_IMG, description: "Example: شقة في موقع ممتاز" }
];

// بيانات الإلكترونيات - Example
let electronicsAds = [
    { id: 1, name: "iPhone 14 Pro (Example)", price: 899, city: "أسمرة", type: "هاتف", brand: "Apple", storage: "256GB", color: "أسود", condition: "جديد", views: 120, image: EXAMPLE_IMG, description: "Example: هاتف آيفون 14 برو" },
    { id: 2, name: "MacBook Air M2 (Example)", price: 1299, city: "أسمرة", type: "لابتوب", brand: "Apple", storage: "512GB", color: "فضي", condition: "جديد", views: 78, image: EXAMPLE_IMG, description: "Example: لابتوب MacBook Air M2" },
    { id: 3, name: "Samsung Galaxy S23 (Example)", price: 699, city: "أسمرة", type: "هاتف", brand: "Samsung", storage: "128GB", color: "أخضر", condition: "جديد", views: 56, image: EXAMPLE_IMG, description: "Example: هاتف سامسونج جالاكسي S23" }
];

// بيانات السيارات - Example
let carsAds = [
    { id: 1, name: "Toyota Corolla 2020 (Example)", price: 9000, city: "مصوع", type: "سيارة", brand: "Toyota", model: "Corolla", year: 2020, mileage: "85,000 كم", transmission: "أوتوماتيك", color: "أبيض", views: 67, image: EXAMPLE_IMG, description: "Example: تويوتا كورولا 2020" },
    { id: 2, name: "Hyundai Tucson 2022 (Example)", price: 18000, city: "أسمرة", type: "سيارة", brand: "Hyundai", model: "Tucson", year: 2022, mileage: "45,000 كم", transmission: "أوتوماتيك", color: "أسود", views: 45, image: EXAMPLE_IMG, description: "Example: هيونداي توسان 2022" },
    { id: 3, name: "Kia Sportage 2021 (Example)", price: 16000, city: "أسمرة", type: "سيارة", brand: "Kia", model: "Sportage", year: 2021, mileage: "60,000 كم", transmission: "أوتوماتيك", color: "فضي", views: 34, image: EXAMPLE_IMG, description: "Example: كيا سبورتاج 2021" }
];

// بيانات الوظائف - Example
let jobsAds = [
    { id: 1, name: "محاسب (Example)", salary: 500, city: "أسمرة", company: "شركة أسمرة", type: "دوام كامل", experience: "سنتان", qualification: "بكالوريوس", views: 89, image: EXAMPLE_IMG, description: "Example: مطلوب محاسب للعمل في شركة أسمرة" },
    { id: 2, name: "مهندس مدني (Example)", salary: 800, city: "أسمرة", company: "مقاولات الإخوة", type: "دوام كامل", experience: "3-5 سنوات", qualification: "بكالوريوس", views: 56, image: EXAMPLE_IMG, description: "Example: مطلوب مهندس مدني للإشراف على المشاريع" },
    { id: 3, name: "مبرمج ويب (Example)", salary: 1200, city: "عن بعد", company: "شركة تقنية", type: "عن بعد", experience: "سنة", qualification: "بكالوريوس", views: 34, image: EXAMPLE_IMG, description: "Example: مطلوب مبرمج ويب للعمل عن بعد" }
];

// بيانات الخدمات العامة - Example
let generalAds = [
    { id: 1, name: "شحن من دبي إلى أسمرة (Example)", price: 299, city: "أسمرة", type: "خدمة شحن", views: 34, image: EXAMPLE_IMG, description: "Example: خدمة شحن سريعة من دبي إلى أسمرة" },
    { id: 2, name: "مكتب للايجار (Example)", price: 500, city: "أسمرة", type: "عقار تجاري", views: 23, image: EXAMPLE_IMG, description: "Example: مكتب مجهز للإيجار في وسط أسمرة" }
];

// شهادات العملاء - Example
const testimonials = [
    { name: "أحمد محمود (Example)", title: "مستثمر عقاري", text: "Example: منصة رائعة! ساعدتني في العثور على عقار مناسب.", rating: 5, avatar: "أ" },
    { name: "سارة إبراهيم (Example)", title: "مغتربة", text: "Example: خدمة ممتازة. أنصح بها بشدة.", rating: 5, avatar: "س" },
    { name: "محمد علي (Example)", title: "صاحب شركة", text: "Example: وظفت أفضل الكفاءات من خلال المنصة.", rating: 4, avatar: "م" }
];

// بيانات الرحلات - Example
const allFlights = [
    { from: "DXB", fromName: "دبي", to: "ASM", toName: "أسمرة", airline: "FlyDubai (Example)", flightNo: "FZ 849", price: "$450", time: "08:00", duration: "3h 30m" },
    { from: "DXB", fromName: "دبي", to: "ASM", toName: "أسمرة", airline: "Ethiopian (Example)", flightNo: "ET 601", price: "$520", time: "14:20", duration: "4h 00m" },
    { from: "JED", fromName: "جدة", to: "ASM", toName: "أسمرة", airline: "Ethiopian (Example)", flightNo: "ET 603", price: "$380", time: "09:15", duration: "2h 45m" }
];

// مقالات المدونة - Example
const blogPosts = [
    { id: 1, title: "📘 Example: دليل شراء عقار في أسمرة", category: "عقارات", summary: "Example: خطوات مهمة ونصائح قانونية", content: "<h3>Example: محتوى المقال</h3><p>هذا مثال توضيحي لمحتوى المقال.</p>", date: "2026-04-01", image: "🏠", author: "Example" },
    { id: 2, title: "✈️ Example: نصائح لحجز أرخص رحلة", category: "سفر", summary: "Example: أفضل الأوقات وشركات الطيران", content: "<h3>Example: نصائح للسفر</h3><p>هذا مثال توضيحي.</p>", date: "2026-03-28", image: "✈️", author: "Example" },
    { id: 3, title: "💼 Example: كيفية البحث عن وظيفة", category: "وظائف", summary: "Example: أفضل الطرق للعثور على فرص عمل", content: "<h3>Example: نصائح للبحث عن وظيفة</h3><p>هذا مثال توضيحي.</p>", date: "2026-03-25", image: "💼", author: "Example" }
];
