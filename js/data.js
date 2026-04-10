// ========================================
// Asmara.Store - Unified Data File
// ملف بيانات موحد ومحسن
// العقارات + الإلكترونيات + السيارات + الوظائف + الخدمات + الشهادات + الرحلات + المدونة
// ========================================

// ========================================
// 1) إعدادات عامة
// ========================================

// صورة احتياطية عند فشل تحميل أي صورة
export const FALLBACK_IMAGE =
  "https://placehold.co/800x500/1e3a5f/ffffff?text=Image+Not+Available";

// روابط صور محسنة
function img(url, width = 800, height = 500) {
  if (!url || typeof url !== "string") return FALLBACK_IMAGE;

  // إذا كان الرابط من Pexels نضيف له تحسينات عرض
  if (url.includes("pexels.com")) {
    const cleanUrl = url.split("?")[0];
    return `${cleanUrl}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }

  return url;
}

// حماية عامة للصورة
export function safeImage(url) {
  return url && typeof url === "string" ? url : FALLBACK_IMAGE;
}

// دالة لاستخدامها في الواجهة عند فشل تحميل الصورة
export function handleImageError(event) {
  if (event?.target) {
    event.target.src = FALLBACK_IMAGE;
  }
}

// إذا كنت تستخدمها مباشرة في HTML
if (typeof window !== "undefined") {
  window.handleImageError = handleImageError;
}

// ========================================
// 2) صور العقارات
// ========================================
export const realEstateImages = [
  img("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"),
  img("https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg"),
  img("https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"),
  img("https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"),
  img("https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"),
  img("https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg")
];

export const realEstateAds = [
  {
    id: "re-1",
    category: "real-estate",
    name: "شقة فاخرة - تيرفولو",
    price: 85000,
    currency: "USD",
    city: "أسمرة",
    type: "شقة",
    bedrooms: 3,
    area: "150م²",
    finishing: "فاخر",
    views: 45,
    image: realEstateImages[0],
    description:
      "شقة فاخرة في أرقى أحياء أسمرة. تتميز بإطلالة رائعة وخدمات متكاملة. قريبة من المدارس والمستشفيات."
  },
  {
    id: "re-2",
    category: "real-estate",
    name: "فيلا - إدغا أريتي",
    price: 250000,
    currency: "USD",
    city: "أسمرة",
    type: "فيلا",
    bedrooms: 5,
    area: "400م²",
    finishing: "سوبر لوكس",
    views: 32,
    image: realEstateImages[1],
    description:
      "فيلا مستقلة بحديقة خاصة وموقف سيارات. تصميم عصري ومساحات واسعة. تتميز بالخصوصية والهدوء."
  },
  {
    id: "re-3",
    category: "real-estate",
    name: "شقة - وسط أسمرة",
    price: 65000,
    currency: "USD",
    city: "أسمرة",
    type: "شقة",
    bedrooms: 2,
    area: "95م²",
    finishing: "عادي",
    views: 28,
    image: realEstateImages[2],
    description:
      "شقة في موقع ممتاز قريب من جميع الخدمات. مناسبة للعائلات الصغيرة."
  },
  {
    id: "re-4",
    category: "real-estate",
    name: "أرض للبيع - مصوع",
    price: 45000,
    currency: "USD",
    city: "مصوع",
    type: "أرض",
    area: "600م²",
    finishing: "-",
    views: 15,
    image: realEstateImages[3],
    description:
      "أرض مميزة للبيع في مدينة مصوع الساحلية. قريبة من البحر ومناسبة للبناء السكني أو التجاري."
  },
  {
    id: "re-5",
    category: "real-estate",
    name: "مكتب تجاري - أسمرة",
    price: 120000,
    currency: "USD",
    city: "أسمرة",
    type: "مكتب",
    area: "120م²",
    finishing: "سوبر لوكس",
    views: 20,
    image: realEstateImages[4],
    description:
      "مكتب تجاري مجهز بالكامل في موقع استراتيجي بوسط أسمرة. مناسب للشركات والمؤسسات."
  },
  {
    id: "re-6",
    category: "real-estate",
    name: "شقة - كرن",
    price: 55000,
    currency: "USD",
    city: "كرن",
    type: "شقة",
    bedrooms: 2,
    area: "100م²",
    finishing: "جيد",
    views: 18,
    image: realEstateImages[5],
    description:
      "شقة في مدينة كرن الهادئة. قريبة من الخدمات الأساسية."
  }
];

// ========================================
// 3) صور الإلكترونيات
// ========================================
export const electronicsImages = [
  img("https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"),
  img("https://images.pexels.com/photos/18105/pexels-photo.jpg"),
  img("https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg"),
  img("https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg"),
  img("https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg"),
  img("https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg")
];

export const electronicsAds = [
  {
    id: "el-1",
    category: "electronics",
    name: "iPhone 14 Pro",
    price: 899,
    currency: "USD",
    city: "أسمرة",
    type: "هاتف",
    brand: "Apple",
    storage: "256GB",
    color: "أسود",
    condition: "جديد",
    views: 120,
    image: electronicsImages[0],
    description:
      "هاتف آيفون 14 Pro بشاشة 6.1 إنش Super Retina XDR، كاميرا احترافية 48 ميجابكسل، ومعالج A16 Bionic. بطارية تدوم طويلاً."
  },
  {
    id: "el-2",
    category: "electronics",
    name: "MacBook Air M2",
    price: 1299,
    currency: "USD",
    city: "أسمرة",
    type: "لابتوب",
    brand: "Apple",
    storage: "512GB",
    color: "فضي",
    condition: "جديد",
    views: 78,
    image: electronicsImages[1],
    description:
      "لابتوب MacBook Air بشريحة M2، شاشة Liquid Retina 13.6 إنش، بطارية تدوم حتى 18 ساعة، تصميم نحيف وخفيف."
  },
  {
    id: "el-3",
    category: "electronics",
    name: "Samsung Galaxy S23",
    price: 699,
    currency: "USD",
    city: "أسمرة",
    type: "هاتف",
    brand: "Samsung",
    storage: "128GB",
    color: "أخضر",
    condition: "جديد",
    views: 56,
    image: electronicsImages[2],
    description:
      "هاتف سامسونج جالاكسي S23 بشاشة Dynamic AMOLED 6.1 إنش، كاميرا 50 ميجابكسل، ومعالج Snapdragon 8 Gen 2."
  },
  {
    id: "el-4",
    category: "electronics",
    name: "iPad Pro 11",
    price: 799,
    currency: "USD",
    city: "مصوع",
    type: "جهاز لوحي",
    brand: "Apple",
    storage: "256GB",
    color: "فضي",
    condition: "مستعمل بحالة ممتازة",
    views: 45,
    image: electronicsImages[3],
    description:
      "iPad Pro بشاشة Liquid Retina 11 إنش، معالج M2، يدعم Apple Pencil. مناسب للرسم والإنتاجية."
  },
  {
    id: "el-5",
    category: "electronics",
    name: "Sony WH-1000XM5",
    price: 349,
    currency: "USD",
    city: "أسمرة",
    type: "سماعات",
    brand: "Sony",
    color: "أسود",
    condition: "جديد",
    views: 34,
    image: electronicsImages[4],
    description:
      "سماعات Sony لاسلكية مع تقنية إلغاء الضوضاء الفائقة، جودة صوت عالية، وبطارية تدوم 30 ساعة."
  },
  {
    id: "el-6",
    category: "electronics",
    name: "Dell XPS 15",
    price: 1599,
    currency: "USD",
    city: "أسمرة",
    type: "لابتوب",
    brand: "Dell",
    storage: "1TB",
    color: "بلاتيني",
    condition: "جديد",
    views: 28,
    image: electronicsImages[5],
    description:
      "لابتوب Dell XPS 15 بشاشة InfinityEdge 15.6 إنش 4K، معالج Intel Core i9، كارت شاشة NVIDIA RTX."
  }
];

// ========================================
// 4) صور السيارات
// ========================================
export const carsImages = [
  img("https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg"),
  img("https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg"),
  img("https://images.pexels.com/photos/2761842/pexels-photo-2761842.jpeg"),
  img("https://images.pexels.com/photos/115465/pexels-photo-115465.jpeg"),
  img("https://images.pexels.com/photos/163931/pexels-photo-163931.jpeg"),
  img("https://images.pexels.com/photos/157091/pexels-photo-157091.jpeg")
];

export const carsAds = [
  {
    id: "car-1",
    category: "cars",
    name: "Toyota Corolla 2020",
    price: 9000,
    currency: "USD",
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
    description:
      "تويوتا كورولا 2020 بحالة ممتازة، مكيفة، نظام صوت متطور، اقتصادية في استهلاك الوقود."
  },
  {
    id: "car-2",
    category: "cars",
    name: "Hyundai Tucson 2022",
    price: 18000,
    currency: "USD",
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
    description:
      "هيونداي توسان 2022 دفع رباعي، فتحة سقف، كاميرا خلفية، مستشعرات ركن، وجلود فاخرة."
  },
  {
    id: "car-3",
    category: "cars",
    name: "Kia Sportage 2021",
    price: 16000,
    currency: "USD",
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
    description:
      "كيا سبورتاج 2021 بحالة جيدة، صيانة دورية في الوكالة، إطارات جديدة."
  },
  {
    id: "car-4",
    category: "cars",
    name: "Nissan Patrol 2019",
    price: 35000,
    currency: "USD",
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
    description:
      "نيسان باترول 2019، 8 سلندر، دفع رباعي، فتحة سقف، شاشة كبيرة، مثالية للطرق الوعرة."
  },
  {
    id: "car-5",
    category: "cars",
    name: "Toyota Hilux 2021",
    price: 28000,
    currency: "USD",
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
    description:
      "تويوتا هيلوكس 2021، دفع رباعي، صندوق خلفي كبير، محرك ديزل قوي."
  },
  {
    id: "car-6",
    category: "cars",
    name: "Honda Civic 2019",
    price: 12000,
    currency: "USD",
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
    description:
      "هوندا سيفيك 2019، موفرة للوقود، مكيفة، نظام صوتي ممتاز، مناسبة للاستخدام اليومي."
  }
];

// ========================================
// 5) صور الوظائف
// ========================================
export const jobsImages = [
  img("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"),
  img("https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg"),
  img("https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"),
  img("https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg"),
  img("https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg"),
  img("https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg")
];

export const jobsAds = [
  {
    id: "job-1",
    category: "jobs",
    name: "محاسب",
    salary: 500,
    currency: "USD",
    city: "أسمرة",
    company: "شركة أسمرة",
    type: "دوام كامل",
    experience: "سنتان",
    qualification: "بكالوريوس",
    views: 89,
    image: jobsImages[0],
    description:
      "مطلوب محاسب خبرة سنتين للعمل في شركة أسمرة. إجادة استخدام برامج المحاسبة. راتب مجزي + تأمين صحي."
  },
  {
    id: "job-2",
    category: "jobs",
    name: "مهندس مدني",
    salary: 800,
    currency: "USD",
    city: "أسمرة",
    company: "مقاولات الإخوة",
    type: "دوام كامل",
    experience: "3-5 سنوات",
    qualification: "بكالوريوس",
    views: 56,
    image: jobsImages[1],
    description:
      "مطلوب مهندس مدني للإشراف على المشاريع. خبرة في التصميم والإشراف. إجادة استخدام برامج AutoCAD."
  },
  {
    id: "job-3",
    category: "jobs",
    name: "مبرمج ويب",
    salary: 1200,
    currency: "USD",
    city: "عن بعد",
    company: "شركة تقنية",
    type: "عن بعد",
    experience: "سنة",
    qualification: "بكالوريوس",
    views: 34,
    image: jobsImages[2],
    description:
      "مطلوب مبرمج ويب للعمل عن بعد. إجادة HTML/CSS/JavaScript وReact. خبرة في تطوير المواقع."
  },
  {
    id: "job-4",
    category: "jobs",
    name: "مسوق إلكتروني",
    salary: 700,
    currency: "USD",
    city: "أسمرة",
    company: "وكالة تسويق",
    type: "دوام جزئي",
    experience: "سنة",
    qualification: "دبلوم",
    views: 45,
    image: jobsImages[3],
    description:
      "مطلوب مسوق إلكتروني لإدارة حسابات التواصل الاجتماعي. خبرة في SEO وGoogle Ads."
  },
  {
    id: "job-5",
    category: "jobs",
    name: "سائق توصيل",
    salary: 400,
    currency: "USD",
    city: "مصوع",
    company: "شركة توصيل",
    type: "دوام كامل",
    experience: "بدون خبرة",
    qualification: "رخصة قيادة",
    views: 67,
    image: jobsImages[4],
    description:
      "مطلوب سائق توصيل برخصة قيادة سارية. راتب + عمولة على كل طلب."
  },
  {
    id: "job-6",
    category: "jobs",
    name: "مندوب مبيعات",
    salary: 600,
    currency: "USD",
    city: "أسمرة",
    company: "شركة تجارية",
    type: "دوام كامل",
    experience: "سنة",
    qualification: "ثانوية",
    views: 38,
    image: jobsImages[5],
    description:
      "مطلوب مندوب مبيعات ذو خبرة في مجال المبيعات. مهارات تواصل ممتازة."
  }
];

// ========================================
// 6) صور الخدمات
// ========================================
export const servicesImages = [
  img("https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg"),
  img("https://images.pexels.com/photos/4107283/pexels-photo-4107283.jpeg"),
  img("https://images.pexels.com/photos/210721/pexels-photo-210721.jpeg"),
  img("https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg")
];

export const generalAds = [
  {
    id: "srv-1",
    category: "services",
    name: "شحن من دبي إلى أسمرة",
    price: 299,
    currency: "USD",
    city: "أسمرة",
    type: "خدمة شحن",
    views: 34,
    image: servicesImages[0],
    description:
      "خدمة شحن سريعة من دبي إلى أسمرة. تغليف آمن وتوصيل حتى الباب. وقت التوصيل 5-7 أيام."
  },
  {
    id: "srv-2",
    category: "services",
    name: "خدمة تنظيف منازل",
    price: 150,
    currency: "USD",
    city: "أسمرة",
    type: "خدمة تنظيف",
    views: 28,
    image: servicesImages[1],
    description:
      "خدمة تنظيف منازل ومكاتب. فريق مدرب ومعدات حديثة. أسعار تنافسية."
  },
  {
    id: "srv-3",
    category: "services",
    name: "صيانة أجهزة منزلية",
    price: 50,
    currency: "USD",
    city: "أسمرة",
    type: "خدمة صيانة",
    views: 22,
    image: servicesImages[2],
    description:
      "صيانة جميع الأجهزة المنزلية (ثلاجات، غسالات، مكيفات). ضمان على القطع."
  },
  {
    id: "srv-4",
    category: "services",
    name: "تجهيز ولائم ومناسبات",
    price: 200,
    currency: "USD",
    city: "أسمرة",
    type: "خدمة مناسبات",
    views: 19,
    image: servicesImages[3],
    description:
      "تجهيز ولائم الأفراح والمناسبات. أشهى المأكولات الإريترية والعربية."
  }
];

// ========================================
// 7) شهادات العملاء
// ========================================
export const testimonials = [
  {
    id: "ts-1",
    name: "أحمد محمود",
    title: "مستثمر عقاري",
    text: "منصة رائعة! ساعدتني في العثور على عقار مناسب في أسمرة. التعامل كان احترافياً وسريعاً.",
    rating: 5,
    avatar: "أ",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "ts-2",
    name: "سارة إبراهيم",
    title: "مغتربة",
    text: "خدمة ممتازة. تمكنت من شحن أغراضي من دبي إلى أسمرة بكل سهولة وأمان. أنصح بها بشدة.",
    rating: 5,
    avatar: "س",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: "ts-3",
    name: "محمد علي",
    title: "صاحب شركة",
    text: "وظفت أفضل الكفاءات من خلال المنصة. عملية التوظيف كانت سهلة وسريعة.",
    rating: 4,
    avatar: "م",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: "ts-4",
    name: "فاطمة حسن",
    title: "ربة منزل",
    text: "اشتريت هاتف iPhone 14 Pro بسعر ممتاز. المنتج أصلي والتوصيل سريع.",
    rating: 5,
    avatar: "ف",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

// ========================================
// 8) بيانات الرحلات
// ========================================
export const allFlights = [
  {
    id: "fl-1",
    from: "DXB",
    fromName: "دبي",
    to: "ASM",
    toName: "أسمرة",
    airline: "FlyDubai",
    flightNo: "FZ 849",
    price: "$450",
    time: "08:00",
    duration: "3h 30m"
  },
  {
    id: "fl-2",
    from: "DXB",
    fromName: "دبي",
    to: "ASM",
    toName: "أسمرة",
    airline: "Ethiopian",
    flightNo: "ET 601",
    price: "$520",
    time: "14:20",
    duration: "4h 00m"
  },
  {
    id: "fl-3",
    from: "JED",
    fromName: "جدة",
    to: "ASM",
    toName: "أسمرة",
    airline: "Ethiopian",
    flightNo: "ET 603",
    price: "$380",
    time: "09:15",
    duration: "2h 45m"
  },
  {
    id: "fl-4",
    from: "CAI",
    fromName: "القاهرة",
    to: "ASM",
    toName: "أسمرة",
    airline: "EgyptAir",
    flightNo: "MS 851",
    price: "$490",
    time: "10:00",
    duration: "3h 15m"
  },
  {
    id: "fl-5",
    from: "ADD",
    fromName: "أديس أبابا",
    to: "ASM",
    toName: "أسمرة",
    airline: "Ethiopian",
    flightNo: "ET 312",
    price: "$210",
    time: "07:30",
    duration: "1h 30m"
  },
  {
    id: "fl-6",
    from: "ADD",
    fromName: "أديس أبابا",
    to: "ASM",
    toName: "أسمرة",
    airline: "Eritrean Airlines",
    flightNo: "ER 101",
    price: "$195",
    time: "13:45",
    duration: "1h 30m"
  }
];

// ========================================
// 9) مقالات المدونة
// ========================================
export const blogPosts = [
  {
    id: "blog-1",
    title: "📘 دليل شراء عقار في أسمرة",
    category: "عقارات",
    summary: "خطوات مهمة ونصائح قانونية لشراء العقارات بأمان في العاصمة أسمرة.",
    content:
      "<h3>خطوات شراء عقار في أسمرة</h3><ul><li>التأكد من ملكية العقار عبر السجل العقاري</li><li>التعامل مع وكيل معتمد</li><li>توقيع عقد رسمي موثق</li><li>تسجيل العقد في المحكمة</li></ul><h3>نصائح مهمة</h3><ul><li>لا تدفع دفعة أولى قبل التأكد من المستندات</li><li>استشر محامياً مختصاً</li><li>تأكد من عدم وجود نزاعات على العقار</li></ul>",
    date: "2026-04-01",
    image: img("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", 1200, 600),
    author: "فريق Asmara.Store"
  },
  {
    id: "blog-2",
    title: "✈️ نصائح لحجز أرخص رحلة",
    category: "سفر",
    summary: "أفضل الأوقات وشركات الطيران للحصول على أسعار مناسبة.",
    content:
      "<h3>نصائح لحجز رحلة رخيصة</h3><ul><li>احجز قبل 6-8 أسابيع من السفر</li><li>قارن الأسعار بين FlyDubai و Ethiopian و EgyptAir</li><li>سافر في منتصف الأسبوع (الثلاثاء أو الأربعاء)</li><li>تجنب مواسم العطلات الرسمية</li><li>استخدم وضع التصفح المتخفي للمقارنة</li></ul>",
    date: "2026-03-28",
    image: img("https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg", 1200, 600),
    author: "فريق Asmara.Store"
  },
  {
    id: "blog-3",
    title: "💼 كيفية البحث عن وظيفة في إريتريا",
    category: "وظائف",
    summary: "أفضل الطرق للعثور على فرص عمل مناسبة في القطاعين العام والخاص.",
    content:
      "<h3>طرق البحث عن وظيفة</h3><ul><li>تابع إعلانات الوظائف على منصتنا أسبوعياً</li><li>تواصل مع الشركات مباشرة عبر البريد الإلكتروني</li><li>حضر سيرة ذاتية احترافية باللغتين العربية والإنجليزية</li><li>استعد للمقابلات الشخصية</li><li>استفد من معارض التوظيف</li></ul>",
    date: "2026-03-25",
    image: img("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", 1200, 600),
    author: "فريق Asmara.Store"
  },
  {
    id: "blog-4",
    title: "🔒 دليل الأمان في التعاملات الإلكترونية",
    category: "أمان",
    summary: "نصائح لحماية بياناتك وأموالك عند التسوق عبر الإنترنت.",
    content:
      "<h3>نصائح للأمان الإلكتروني</h3><ul><li>لا تشارك كلمات المرور مع أي شخص</li><li>تأكد من أن الموقع آمن (HTTPS)</li><li>استخدم كلمات مرور قوية</li><li>فعّل المصادقة الثنائية</li><li>لا تفتح روابط مشبوهة</li></ul>",
    date: "2026-03-20",
    image: img("https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg", 1200, 600),
    author: "فريق Asmara.Store"
  },
  {
    id: "blog-5",
    title: "🚗 دليل شراء سيارة مستعملة في أسمرة",
    category: "سيارات",
    summary: "نقاط مهمة يجب فحصها قبل شراء سيارة مستعملة لتجنب المشاكل.",
    content:
      "<h3>نقاط فحص السيارة المستعملة</h3><ul><li>اطلب تاريخ الصيانة الكامل</li><li>افحص المحرك والهيكل جيداً</li><li>اختبر القيادة على الطريق</li><li>تأكد من الأوراق الرسمية</li><li>افحص الإطارات والفرامل</li><li>استشر ميكانيكي موثوق</li></ul>",
    date: "2026-03-15",
    image: img("https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg", 1200, 600),
    author: "فريق Asmara.Store"
  }
];

// ========================================
// 10) تجميع كل الإعلانات في مصفوفة واحدة
// ========================================
export const allAds = [
  ...realEstateAds,
  ...electronicsAds,
  ...carsAds,
  ...jobsAds,
  ...generalAds
];

// ========================================
// 11) أدوات مساعدة للبحث والتصفية
// ========================================
export function getAdsByCategory(category) {
  if (!category || category === "all") return allAds;
  return allAds.filter((ad) => ad.category === category);
}

export function getAdsByCity(city) {
  if (!city || city === "all") return allAds;
  return allAds.filter((ad) => ad.city === city);
}

export function searchAds(query = "") {
  const text = query.trim().toLowerCase();
  if (!text) return allAds;

  return allAds.filter((ad) => {
    return [
      ad.name,
      ad.city,
      ad.type,
      ad.brand,
      ad.model,
      ad.company,
      ad.description
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(text);
  });
}

export function getFeaturedAds(limit = 6) {
  return [...allAds]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export function getLatestBlogPosts(limit = 3) {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

// ========================================
// 12) مثال اختبار
// ========================================
console.log("Fallback:", FALLBACK_IMAGE);
console.log("All Ads:", allAds);
console.log("Featured Ads:", getFeaturedAds());
console.log("Search for 'أسمرة':", searchAds("أسمرة"));
