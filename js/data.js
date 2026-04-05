// ========================================
// Asmara.Store - Data File
// بيانات العقارات، السيارات، الإلكترونيات، الوظائف
// تحديث بالصور الحقيقية
// ========================================

// صورة افتراضية احتياطية (في حال فشل تحميل الصورة)
const FALLBACK_IMAGE = "https://placehold.co/600x400/1e3a5f/white?text=صورة+غير+متوفرة";

// ========================================
// 1. صور العقارات (Real Estate)
// ========================================
const realEstateImages = [
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?w=400&h=250&fit=crop"
];

let realEstateAds = [
    { 
        id: 1, 
        name: "شقة فاخرة - تيرفولو", 
        price: 85000, 
        city: "أسمرة", 
        type: "شقة", 
        bedrooms: 3, 
        area: "150م²", 
        finishing: "فاخر", 
        views: 45, 
        image: realEstateImages[0], 
        description: "شقة فاخرة في أرقى أحياء أسمرة. تتميز بإطلالة رائعة وخدمات متكاملة. قريبة من المدارس والمستشفيات." 
    },
    { 
        id: 2, 
        name: "فيلا - إدغا أريتي", 
        price: 250000, 
        city: "أسمرة", 
        type: "فيلا", 
        bedrooms: 5, 
        area: "400م²", 
        finishing: "سوبر لوكس", 
        views: 32, 
        image: realEstateImages[1], 
        description: "فيلا مستقلة بحديقة خاصة وموقف سيارات. تصميم عصري ومساحات واسعة. تتميز بالخصوصية والهدوء." 
    },
    { 
        id: 3, 
        name: "شقة - وسط أسمرة", 
        price: 65000, 
        city: "أسمرة", 
        type: "شقة", 
        bedrooms: 2, 
        area: "95م²", 
        finishing: "عادي", 
        views: 28, 
        image: realEstateImages[2], 
        description: "شقة في موقع ممتاز قريب من جميع الخدمات. مناسبة للعائلات الصغيرة." 
    },
    { 
        id: 4, 
        name: "أرض للبيع - مصوع", 
        price: 45000, 
        city: "مصوع", 
        type: "أرض", 
        area: "600م²", 
        finishing: "-", 
        views: 15, 
        image: realEstateImages[3], 
        description: "أرض مميزة للبيع في مدينة مصوع الساحلية. قريبة من البحر ومناسبة للبناء السكني أو التجاري." 
    },
    { 
        id: 5, 
        name: "مكتب تجاري - أسمرة", 
        price: 120000, 
        city: "أسمرة", 
        type: "مكتب", 
        area: "120م²", 
        finishing: "سوبر لوكس", 
        views: 20, 
        image: realEstateImages[4], 
        description: "مكتب تجاري مجهز بالكامل في موقع استراتيجي بوسط أسمرة. مناسب للشركات والمؤسسات." 
    },
    { 
        id: 6, 
        name: "شقة - كرن", 
        price: 55000, 
        city: "كرن", 
        type: "شقة", 
        bedrooms: 2, 
        area: "100м²", 
        finishing: "جيد", 
        views: 18, 
        image: realEstateImages[5], 
        description: "شقة في مدينة كرن الهادئة. قريبة من الخدمات الأساسية." 
    }
];

// ========================================
// 2. صور الإلكترونيات (Electronics)
// ========================================
const electronicsImages = [
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/18105/pexels-photo.jpg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?w=400&h=250&fit=crop"
];

let electronicsAds = [
    { 
        id: 1, 
        name: "iPhone 14 Pro", 
        price: 899, 
        city: "أسمرة", 
        type: "هاتف", 
        brand: "Apple", 
        storage: "256GB", 
        color: "أسود", 
        condition: "جديد", 
        views: 120, 
        image: electronicsImages[0], 
        description: "هاتف آيفون 14 Pro بشاشة 6.1 إنش Super Retina XDR، كاميرا احترافية 48 ميجابكسل، ومعالج A16 Bionic. بطارية تدوم طويلاً." 
    },
    { 
        id: 2, 
        name: "MacBook Air M2", 
        price: 1299, 
        city: "أسمرة", 
        type: "لابتوب", 
        brand: "Apple", 
        storage: "512GB", 
        color: "فضي", 
        condition: "جديد", 
        views: 78, 
        image: electronicsImages[1], 
        description: "لابتوب MacBook Air بشريحة M2، شاشة Liquid Retina 13.6 إنش، بطارية تدوم حتى 18 ساعة، تصميم نحيف وخفيف." 
    },
    { 
        id: 3, 
        name: "Samsung Galaxy S23", 
        price: 699, 
        city: "أسمرة", 
        type: "هاتف", 
        brand: "Samsung", 
        storage: "128GB", 
        color: "أخضر", 
        condition: "جديد", 
        views: 56, 
        image: electronicsImages[2], 
        description: "هاتف سامسونج جالاكسي S23 بشاشة Dynamic AMOLED 6.1 إنش، كاميرا 50 ميجابكسل، ومعالج Snapdragon 8 Gen 2." 
    },
    { 
        id: 4, 
        name: "iPad Pro 11", 
        price: 799, 
        city: "مصوع", 
        type: "جهاز لوحي", 
        brand: "Apple", 
        storage: "256GB", 
        color: "فضي", 
        condition: "مستعمل بحالة ممتازة", 
        views: 45, 
        image: electronicsImages[3], 
        description: "iPad Pro بشاشة Liquid Retina 11 إنش، معالج M2، يدعم Apple Pencil. مناسب للرسم والإنتاجية." 
    },
    { 
        id: 5, 
        name: "Sony WH-1000XM5", 
        price: 349, 
        city: "أسمرة", 
        type: "سماعات", 
        brand: "Sony", 
        color: "أسود", 
        condition: "جديد", 
        views: 34, 
        image: electronicsImages[4], 
        description: "سماعات Sony لاسلكية مع تقنية إلغاء الضوضاء الفائقة، جودة صوت عالية، وبطارية تدوم 30 ساعة." 
    },
    { 
        id: 6, 
        name: "Dell XPS 15", 
        price: 1599, 
        city: "أسمرة", 
        type: "لابتوب", 
        brand: "Dell", 
        storage: "1TB", 
        color: "بلاتيني", 
        condition: "جديد", 
        views: 28, 
        image: electronicsImages[5], 
        description: "لابتوب Dell XPS 15 بشاشة InfinityEdge 15.6 إنش 4K، معالج Intel Core i9، كارت شاشة NVIDIA RTX." 
    }
];

// ========================================
// 3. صور السيارات (Cars)
// ========================================
const carsImages = [
    "https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/2761842/pexels-photo-2761842.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/115465/pexels-photo-115465.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/163931/pexels-photo-163931.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/157091/pexels-photo-157091.jpeg?w=400&h=250&fit=crop"
];

let carsAds = [
    { 
        id: 1, 
        name: "Toyota Corolla 2020", 
        price: 9000, 
        city: "مصوع", 
        type: "سيارة", 
        brand: "Toyota", 
        model: "Corolla", 
        year: 2020, 
        mileage: "85,000 كم", 
        transmission: "أوتوماتيك", 
        color: "أبيض", 
        views: 67, 
        image: carsImages[0], 
        description: "تويوتا كورولا 2020 بحالة ممتازة، مكيفة، نظام صوت متطور، اقتصادية في استهلاك الوقود." 
    },
    { 
        id: 2, 
        name: "Hyundai Tucson 2022", 
        price: 18000, 
        city: "أسمرة", 
        type: "سيارة", 
        brand: "Hyundai", 
        model: "Tucson", 
        year: 2022, 
        mileage: "45,000 كم", 
        transmission: "أوتوماتيك", 
        color: "أسود", 
        views: 45, 
        image: carsImages[1], 
        description: "هيونداي توسان 2022 دفع رباعي، فتحة سقف، كاميرا خلفية، مستشعرات ركن، وجلود فاخرة." 
    },
    { 
        id: 3, 
        name: "Kia Sportage 2021", 
        price: 16000, 
        city: "أسمرة", 
        type: "سيارة", 
        brand: "Kia", 
        model: "Sportage", 
        year: 2021, 
        mileage: "60,000 كم", 
        transmission: "أوتوماتيك", 
        color: "فضي", 
        views: 34, 
        image: carsImages[2], 
        description: "كيا سبورتاج 2021 بحالة جيدة، صيانة دورية في الوكالة، إطارات جديدة." 
    },
    { 
        id: 4, 
        name: "Nissan Patrol 2019", 
        price: 35000, 
        city: "أسمرة", 
        type: "سيارة", 
        brand: "Nissan", 
        model: "Patrol", 
        year: 2019, 
        mileage: "95,000 كم", 
        transmission: "أوتوماتيك", 
        color: "ذهبي", 
        views: 23, 
        image: carsImages[3], 
        description: "نيسان باترول 2019، 8 سلندر، دفع رباعي، فتحة سقف، شاشة كبيرة، مثالية للطرق الوعرة." 
    },
    { 
        id: 5, 
        name: "Toyota Hilux 2021", 
        price: 28000, 
        city: "مصوع", 
        type: "بيك أب", 
        brand: "Toyota", 
        model: "Hilux", 
        year: 2021, 
        mileage: "50,000 كم", 
        transmission: "أوتوماتيك", 
        color: "أبيض", 
        views: 19, 
        image: carsImages[4], 
        description: "تويوتا هيلوكس 2021، دفع رباعي، صندوق خلفي كبير، محرك ديزل قوي." 
    },
    { 
        id: 6, 
        name: "Honda Civic 2019", 
        price: 12000, 
        city: "أسمرة", 
        type: "سيارة", 
        brand: "Honda", 
        model: "Civic", 
        year: 2019, 
        mileage: "75,000 كم", 
        transmission: "أوتوماتيك", 
        color: "أزرق", 
        views: 31, 
        image: carsImages[5], 
        description: "هوندا سيفيك 2019، موفرة للوقود، مكيفة، نظام صوتي ممتاز، مناسبة للاستخدام اليومي." 
    }
];

// ========================================
// 4. صور الوظائف (Jobs)
// ========================================
const jobsImages = [
    "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?w=400&h=250&fit=crop"
];

let jobsAds = [
    { 
        id: 1, 
        name: "محاسب", 
        salary: 500, 
        city: "أسمرة", 
        company: "شركة أسمرة", 
        type: "دوام كامل", 
        experience: "سنتان", 
        qualification: "بكالوريوس", 
        views: 89, 
        image: jobsImages[0], 
        description: "مطلوب محاسب خبرة سنتين للعمل في شركة أسمرة. إجادة استخدام برامج المحاسبة. راتب مجزي + تأمين صحي." 
    },
    { 
        id: 2, 
        name: "مهندس مدني", 
        salary: 800, 
        city: "أسمرة", 
        company: "مقاولات الإخوة", 
        type: "دوام كامل", 
        experience: "3-5 سنوات", 
        qualification: "بكالوريوس", 
        views: 56, 
        image: jobsImages[1], 
        description: "مطلوب مهندس مدني للإشراف على المشاريع. خبرة في التصميم والإشراف. إجادة استخدام برامج AutoCAD." 
    },
    { 
        id: 3, 
        name: "مبرمج ويب", 
        salary: 1200, 
        city: "عن بعد", 
        company: "شركة تقنية", 
        type: "عن بعد", 
        experience: "سنة", 
        qualification: "بكالوريوس", 
        views: 34, 
        image: jobsImages[2], 
        description: "مطلوب مبرمج ويب للعمل عن بعد. إجادة HTML/CSS/JavaScript وReact. خبرة في تطوير المواقع." 
    },
    { 
        id: 4, 
        name: "مسوق إلكتروني", 
        salary: 700, 
        city: "أسمرة", 
        company: "وكالة تسويق", 
        type: "دوام جزئي", 
        experience: "سنة", 
        qualification: "دبلوم", 
        views: 45, 
        image: jobsImages[3], 
        description: "مطلوب مسوق إلكتروني لإدارة حسابات التواصل الاجتماعي. خبرة في SEO وGoogle Ads." 
    },
    { 
        id: 5, 
        name: "سائق توصيل", 
        salary: 400, 
        city: "مصوع", 
        company: "شركة توصيل", 
        type: "دوام كامل", 
        experience: "بدون خبرة", 
        qualification: "رخصة قيادة", 
        views: 67, 
        image: jobsImages[4], 
        description: "مطلوب سائق توصيل برخصة قيادة سارية. راتب + عمولة على كل طلب." 
    },
    { 
        id: 6, 
        name: "مندوب مبيعات", 
        salary: 600, 
        city: "أسمرة", 
        company: "شركة تجارية", 
        type: "دوام كامل", 
        experience: "سنة", 
        qualification: "ثانوية", 
        views: 38, 
        image: jobsImages[5], 
        description: "مطلوب مندوب مبيعات ذو خبرة في مجال المبيعات. مهارات تواصل ممتازة." 
    }
];

// ========================================
// 5. صور الخدمات العامة (Services)
// ========================================
const servicesImages = [
    "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/4107283/pexels-photo-4107283.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/210721/pexels-photo-210721.jpeg?w=400&h=250&fit=crop",
    "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=250&fit=crop"
];

let generalAds = [
    { 
        id: 1, 
        name: "شحن من دبي إلى أسمرة", 
        price: 299, 
        city: "أسمرة", 
        type: "خدمة شحن", 
        views: 34, 
        image: servicesImages[0], 
        description: "خدمة شحن سريعة من دبي إلى أسمرة. تغليف آمن وتوصيل حتى الباب. وقت التوصيل 5-7 أيام." 
    },
    { 
        id: 2, 
        name: "خدمة تنظيف منازل", 
        price: 150, 
        city: "أسمرة", 
        type: "خدمة تنظيف", 
        views: 28, 
        image: servicesImages[1], 
        description: "خدمة تنظيف منازل ومكاتب. فريق مدرب ومعدات حديثة. أسعار تنافسية." 
    },
    { 
        id: 3, 
        name: "صيانة أجهزة منزلية", 
        price: 50, 
        city: "أسمرة", 
        type: "خدمة صيانة", 
        views: 22, 
        image: servicesImages[2], 
        description: "صيانة جميع الأجهزة المنزلية (ثلاجات، غسالات، مكيفات). ضمان على القطع." 
    },
    { 
        id: 4, 
        name: "تجهيز ولائم ومناسبات", 
        price: 200, 
        city: "أسمرة", 
        type: "خدمة مناسبات", 
        views: 19, 
        image: servicesImages[3], 
        description: "تجهيز ولائم الأفراح والمناسبات. أشهى المأكولات الإريترية والعربية." 
    }
];

// ========================================
// 6. شهادات العملاء (Testimonials)
// ========================================
const testimonials = [
    { 
        name: "أحمد محمود", 
        title: "مستثمر عقاري", 
        text: "منصة رائعة! ساعدتني في العثور على عقار مناسب في أسمرة. التعامل كان احترافياً وسريعاً.", 
        rating: 5, 
        avatar: "أ",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    { 
        name: "سارة إبراهيم", 
        title: "مغتربة", 
        text: "خدمة ممتازة. تمكنت من شحن أغراضي من دبي إلى أسمرة بكل سهولة وأمان. أنصح بها بشدة.", 
        rating: 5, 
        avatar: "س",
        image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    { 
        name: "محمد علي", 
        title: "صاحب شركة", 
        text: "وظفت أفضل الكفاءات من خلال المنصة. عملية التوظيف كانت سهلة وسريعة.", 
        rating: 4, 
        avatar: "م",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    { 
        name: "فاطمة حسن", 
        title: "ربة منزل", 
        text: "اشتريت هاتف iPhone 14 Pro بسعر ممتاز. المنتج أصلي والتوصيل سريع.", 
        rating: 5, 
        avatar: "ف",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
];

// ========================================
// 7. بيانات الرحلات (Flights)
// ========================================
const allFlights = [
    { from: "DXB", fromName: "دبي", to: "ASM", toName: "أسمرة", airline: "FlyDubai", flightNo: "FZ 849", price: "$450", time: "08:00", duration: "3h 30m" },
    { from: "DXB", fromName: "دبي", to: "ASM", toName: "أسمرة", airline: "Ethiopian", flightNo: "ET 601", price: "$520", time: "14:20", duration: "4h 00m" },
    { from: "JED", fromName: "جدة", to: "ASM", toName: "أسمرة", airline: "Ethiopian", flightNo: "ET 603", price: "$380", time: "09:15", duration: "2h 45m" },
    { from: "CAI", fromName: "القاهرة", to: "ASM", toName: "أسمرة", airline: "EgyptAir", flightNo: "MS 851", price: "$490", time: "10:00", duration: "3h 15m" },
    { from: "ADD", fromName: "أديس أبابا", to: "ASM", toName: "أسمرة", airline: "Ethiopian", flightNo: "ET 312", price: "$210", time: "07:30", duration: "1h 30m" },
    { from: "ADD", fromName: "أديس أبابا", to: "ASM", toName: "أسمرة", airline: "Eritrean Airlines", flightNo: "ER 101", price: "$195", time: "13:45", duration: "1h 30m" }
];

// ========================================
// 8. مقالات المدونة (Blog)
// ========================================
const blogPosts = [
    { 
        id: 1, 
        title: "📘 دليل شراء عقار في أسمرة", 
        category: "عقارات", 
        summary: "خطوات مهمة ونصائح قانونية لشراء العقارات بأمان في العاصمة أسمرة.", 
        content: "<h3>خطوات شراء عقار في أسمرة</h3><ul><li>التأكد من ملكية العقار عبر السجل العقاري</li><li>التعامل مع وكيل معتمد</li><li>توقيع عقد رسمي موثق</li><li>تسجيل العقد في المحكمة</li></ul><h3>نصائح مهمة</h3><ul><li>لا تدفع دفعة أولى قبل التأكد من المستندات</li><li>استشر محامياً مختصاً</li><li>تأكد من عدم وجود نزاعات على العقار</li></ul>", 
        date: "2026-04-01", 
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=800&h=400&fit=crop", 
        author: "فريق Asmara.Store" 
    },
    { 
        id: 2, 
        title: "✈️ نصائح لحجز أرخص رحلة", 
        category: "سفر", 
        summary: "أفضل الأوقات وشركات الطيران للحصول على أسعار مناسبة.", 
        content: "<h3>نصائح لحجز رحلة رخيصة</h3><ul><li>احجز قبل 6-8 أسابيع من السفر</li><li>قارن الأسعار بين FlyDubai و Ethiopian و EgyptAir</li><li>سافر في منتصف الأسبوع (الثلاثاء أو الأربعاء)</li><li>تجنب مواسم العطلات الرسمية</li><li>استخدم وضع التصفح المتخفي للمقارنة</li></ul>", 
        date: "2026-03-28", 
        image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?w=800&h=400&fit=crop", 
        author: "فريق Asmara.Store" 
    },
    { 
        id: 3, 
        title: "💼 كيفية البحث عن وظيفة في إريتريا", 
        category: "وظائف", 
        summary: "أفضل الطرق للعثور على فرص عمل مناسبة في القطاعين العام والخاص.", 
        content: "<h3>طرق البحث عن وظيفة</h3><ul><li>تابع إعلانات الوظائف على منصتنا أسبوعياً</li><li>تواصل مع الشركات مباشرة عبر البريد الإلكتروني</li><li>حضر سيرة ذاتية احترافية باللغتين العربية والإنجليزية</li><li>استعد للمقابلات الشخصية</li><li>استفد من معارض التوظيف</li></ul>", 
        date: "2026-03-25", 
        image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=800&h=400&fit=crop", 
        author: "فريق Asmara.Store" 
    },
    { 
        id: 4, 
        title: "🔒 دليل الأمان في التعاملات الإلكترونية", 
        category: "أمان", 
        summary: "نصائح لحماية بياناتك وأموالك عند التسوق عبر الإنترنت.", 
        content: "<h3>نصائح للأمان الإلكتروني</h3><ul><li>لا تشارك كلمات المرور مع أي شخص</li><li>تأكد من أن الموقع آمن (HTTPS)</li><li>استخدم كلمات مرور قوية</li><li>فعّل المصادقة الثنائية</li><li>لا تفتح روابط مشبوهة</li></ul>", 
        date: "2026-03-20", 
        image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?w=800&h=400&fit=crop", 
        author: "فريق Asmara.Store" 
    },
    { 
        id: 5, 
        title: "🚗 دليل شراء سيارة مستعملة في أسمرة", 
        category: "سيارات", 
        summary: "نقاط مهمة يجب فحصها قبل شراء سيارة مستعملة لتجنب المشاكل.", 
        content: "<h3>نقاط فحص السيارة المستعملة</h3><ul><li>اطلب تاريخ الصيانة الكامل</li><li>افحص المحرك والهيكل جيداً</li><li>اختبر القيادة على الطريق</li><li>تأكد من الأوراق الرسمية</li><li>افحص الإطارات والفرامل</li><li>استشر ميكانيكي موثوق</li></ul>", 
        date: "2026-03-15", 
        image: "https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg?w=800&h=400&fit=crop", 
        author: "فريق Asmara.Store" 
    }
];
