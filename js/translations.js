// ========================================
// Asmara.Store - Single Unified File
// English Default + Arabic + Tigrinya
// Data + Translations + Helpers + Search + Filters + Language Tools
// Internal page anchors preserved
// ========================================

// ========================================
// 1) General Settings
// ========================================

export const APP_NAME = "Asmara.Store";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "ar", "ti"];

export const LANGUAGE_DIRECTIONS = {
  en: "ltr",
  ar: "rtl",
  ti: "ltr"
};

export const FALLBACK_IMAGE =
  "https://placehold.co/800x500/1e3a5f/ffffff?text=Image+Not+Available";

// ========================================
// 2) Image Helpers
// ========================================

export function img(url, width = 800, height = 500) {
  if (!url || typeof url !== "string") return FALLBACK_IMAGE;

  if (url.includes("pexels.com")) {
    const cleanUrl = url.split("?")[0];
    return `${cleanUrl}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }

  return url;
}

export function safeImage(url) {
  return url && typeof url === "string" ? url : FALLBACK_IMAGE;
}

export function handleImageError(event) {
  if (event?.target) {
    event.target.src = FALLBACK_IMAGE;
  }
}

if (typeof window !== "undefined") {
  window.handleImageError = handleImageError;
}

// ========================================
// 3) Translations
// ========================================

export const TRANSLATIONS = {
  en: {
    languageName: "English",
    tagline: "A platform that respects our customs and traditions - In the spirit of Eritrean law",
    homeIntro: "A trusted platform for flights, real estate, services, and official content.",
    homeFlightsTitle: "✈️ Latest Flights",
    homeBlogTitle: "📰 Latest Articles",
    flightTitle: "✈️ Search Flights",
    realestateTitle: "🏠 Real Estate",
    electronicsTitle: "📱 Electronics",
    carsTitle: "🚗 Cars",
    jobsTitle: "💼 Jobs",
    servicesTitle: "🛠️ Services",
    aboutTitle: "🇪🇷 About Us",
    aboutText: "Asmara.Store is a digital platform connecting Eritreans with trusted services at home and abroad.",
    privacyTitle: "🔒 Privacy Policy",
    privacyText: "We respect your privacy and protect your data. We do not sell data to third parties.",
    cookieText: "We use cookies to improve your experience.",
    cookieAccept: "Accept",
    searchBtn: "🔍 Search",
    whatsappText: "📱 WhatsApp",
    agentText: "🛡️ Agent",
    readMore: "Read More",
    latestAds: "📢 Latest Ads",
    featuredAds: "⭐ Featured Ads",
    viewDetails: "View Details",
    price: "Price",
    city: "City",
    type: "Type",
    company: "Company",
    salary: "Salary",
    condition: "Condition",
    bedrooms: "Bedrooms",
    area: "Area",
    views: "Views",
    noResults: "No results found",
    all: "All",
    contact: "Contact",
    flights: "Flights",
    blog: "Blog",
    testimonials: "Testimonials",
    searchPlaceholder: "Search here..."
  },

  ar: {
    languageName: "العربية",
    tagline: "منصة تحترم عاداتنا وتقاليدنا - بروح القانون الإريتري",
    homeIntro: "منصة موثوقة للطيران والعقارات والخدمات والمحتوى الرسمي.",
    homeFlightsTitle: "✈️ أحدث الرحلات",
    homeBlogTitle: "📰 آخر المقالات",
    flightTitle: "✈️ البحث عن رحلة",
    realestateTitle: "🏠 العقارات",
    electronicsTitle: "📱 الإلكترونيات",
    carsTitle: "🚗 السيارات",
    jobsTitle: "💼 الوظائف",
    servicesTitle: "🛠️ الخدمات",
    aboutTitle: "🇪🇷 من نحن",
    aboutText: "Asmara.Store منصة رقمية تربط الإريتريين بخدمات موثوقة داخل الوطن وخارجه.",
    privacyTitle: "🔒 سياسة الخصوصية",
    privacyText: "نحترم خصوصيتك ونحمي بياناتك، ولا نبيع البيانات لأي طرف ثالث.",
    cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
    cookieAccept: "موافق",
    searchBtn: "🔍 بحث",
    whatsappText: "📱 واتساب",
    agentText: "🛡️ الوكيل",
    readMore: "قراءة المزيد",
    latestAds: "📢 أحدث الإعلانات",
    featuredAds: "⭐ الإعلانات المميزة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    city: "المدينة",
    type: "النوع",
    company: "الشركة",
    salary: "الراتب",
    condition: "الحالة",
    bedrooms: "غرف النوم",
    area: "المساحة",
    views: "المشاهدات",
    noResults: "لا توجد نتائج",
    all: "الكل",
    contact: "تواصل",
    flights: "رحلات",
    blog: "مدونة",
    testimonials: "آراء العملاء",
    searchPlaceholder: "ابحث هنا..."
  },

  ti: {
    languageName: "ትግርኛ",
    tagline: "ልማዳትና ባህልና ዘከብር መድረኽ - ብመንፈስ ሕጊ ኤርትራ",
    homeIntro: "ንበረራ፣ ንብረት፣ ኣገልግሎታትን ወግዓዊ ዜናን እሙን መድረኽ።",
    homeFlightsTitle: "✈️ ሓደሽቲ በረራታት",
    homeBlogTitle: "📰 ሓደሽቲ ዜናታት",
    flightTitle: "✈️ ምድላይ በረራ",
    realestateTitle: "🏠 ንብረት",
    electronicsTitle: "📱 ኤሌክትሮኒክስ",
    carsTitle: "🚗 ማኪናታት",
    jobsTitle: "💼 ስራሕታት",
    servicesTitle: "🛠️ ኣገልግሎታት",
    aboutTitle: "🇪🇷 ብዛዕባና",
    aboutText: "ኣስመራ.ስቶር ንኤርትራውያን ምስ እሙናት ኣገልግሎታት ዘእሰር ዲጂታል መድረኽ እዩ።",
    privacyTitle: "🔒 ሕጊ ምስጢር",
    privacyText: "ምስጢርካ ንከብርን ንካልእ ዘይንሸጥን ኢና።",
    cookieText: "ተሞክሮኻ ንምምሕያሽ ኩኪታት ንጥቀም።",
    cookieAccept: "ተቐበልኩ",
    searchBtn: "🔍 ድለይ",
    whatsappText: "📱 ዋትሳፕ",
    agentText: "🛡️ ኤጀንት",
    readMore: "ዝያዳ ኣንብብ",
    latestAds: "📢 ሓደሽቲ ምልክታት",
    featuredAds: "⭐ ፍሉያት ምልክታት",
    viewDetails: "ዝርዝር ርአ",
    price: "ዋጋ",
    city: "ከተማ",
    type: "ዓይነት",
    company: "ትካል",
    salary: "ደሞዝ",
    condition: "ኩነታት",
    bedrooms: "ክፍልታት ድቃስ",
    area: "ስፍሓት",
    views: "ርእይቶታት",
    noResults: "ውጽኢት የለን",
    all: "ኩሉ",
    contact: "ርክብ",
    flights: "በረራታት",
    blog: "ብሎግ",
    testimonials: "ርእይቶ ዓማዊል",
    searchPlaceholder: "ኣብዚ ድለይ..."
  }
};

// ========================================
// 4) Language Helpers
// ========================================

export function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function normalizeLanguage(lang) {
  return isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
}

export function getLanguageDirection(lang = DEFAULT_LANGUAGE) {
  const safeLang = normalizeLanguage(lang);
  return LANGUAGE_DIRECTIONS[safeLang] || "ltr";
}

export function getTranslations(lang = DEFAULT_LANGUAGE) {
  return TRANSLATIONS[normalizeLanguage(lang)] || TRANSLATIONS[DEFAULT_LANGUAGE];
}

export function t(key, lang = DEFAULT_LANGUAGE) {
  const safeLang = normalizeLanguage(lang);
  const currentPack = TRANSLATIONS[safeLang] || {};
  const fallbackPack = TRANSLATIONS[DEFAULT_LANGUAGE] || {};
  return currentPack[key] || fallbackPack[key] || key;
}

export function applyLanguageToDocument(lang = DEFAULT_LANGUAGE) {
  const safeLang = normalizeLanguage(lang);
  const dir = getLanguageDirection(safeLang);

  if (typeof document !== "undefined") {
    document.documentElement.lang = safeLang;
    document.documentElement.dir = dir;
  }

  return { lang: safeLang, dir };
}

export function saveLanguage(lang = DEFAULT_LANGUAGE) {
  const safeLang = normalizeLanguage(lang);

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("asmara_store_lang", safeLang);
  }

  return safeLang;
}

export function loadLanguage() {
  if (typeof localStorage !== "undefined") {
    const savedLang = localStorage.getItem("asmara_store_lang");
    return normalizeLanguage(savedLang);
  }
  return DEFAULT_LANGUAGE;
}

export function setLanguage(lang = DEFAULT_LANGUAGE) {
  const safeLang = normalizeLanguage(lang);
  saveLanguage(safeLang);
  applyLanguageToDocument(safeLang);
  return safeLang;
}

// مهم: هذه الدالة تترجم النصوص فقط
// ولا تغيّر href أو id أو الروابط الداخلية
export function translatePage(lang = DEFAULT_LANGUAGE) {
  const safeLang = normalizeLanguage(lang);
  applyLanguageToDocument(safeLang);

  if (typeof document === "undefined") return;

  const textNodes = document.querySelectorAll("[data-i18n]");
  textNodes.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key) {
      element.textContent = t(key, safeLang);
    }
  });

  const placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderNodes.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (key) {
      element.setAttribute("placeholder", t(key, safeLang));
    }
  });

  const titleNodes = document.querySelectorAll("[data-i18n-title]");
  titleNodes.forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    if (key) {
      element.setAttribute("title", t(key, safeLang));
    }
  });

  const ariaNodes = document.querySelectorAll("[data-i18n-aria]");
  ariaNodes.forEach((element) => {
    const key = element.getAttribute("data-i18n-aria");
    if (key) {
      element.setAttribute("aria-label", t(key, safeLang));
    }
  });
}

// ========================================
// 5) Images
// ========================================

export const realEstateImages = [
  img("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"),
  img("https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg"),
  img("https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"),
  img("https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"),
  img("https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"),
  img("https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg")
];

export const electronicsImages = [
  img("https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"),
  img("https://images.pexels.com/photos/18105/pexels-photo.jpg"),
  img("https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg"),
  img("https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg"),
  img("https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg"),
  img("https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg")
];

export const carsImages = [
  img("https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg"),
  img("https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg"),
  img("https://images.pexels.com/photos/2761842/pexels-photo-2761842.jpeg"),
  img("https://images.pexels.com/photos/115465/pexels-photo-115465.jpeg"),
  img("https://images.pexels.com/photos/163931/pexels-photo-163931.jpeg"),
  img("https://images.pexels.com/photos/157091/pexels-photo-157091.jpeg")
];

export const jobsImages = [
  img("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"),
  img("https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg"),
  img("https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"),
  img("https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg"),
  img("https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg"),
  img("https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg")
];

export const servicesImages = [
  img("https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg"),
  img("https://images.pexels.com/photos/4107283/pexels-photo-4107283.jpeg"),
  img("https://images.pexels.com/photos/210721/pexels-photo-210721.jpeg"),
  img("https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg")
];

// ========================================
// 6) Data
// ========================================

export const realEstateAds = [
  {
    id: "re-1",
    category: "real-estate",
    name: "Luxury Apartment - Tiravolo",
    price: 85000,
    currency: "USD",
    city: "Asmara",
    type: "Apartment",
    bedrooms: 3,
    area: "150m²",
    finishing: "Luxury",
    views: 45,
    image: realEstateImages[0],
    description: "Luxury apartment in one of Asmara's finest areas. Great view, integrated services, and close to schools and hospitals."
  },
  {
    id: "re-2",
    category: "real-estate",
    name: "Villa - Edaga Arbi",
    price: 250000,
    currency: "USD",
    city: "Asmara",
    type: "Villa",
    bedrooms: 5,
    area: "400m²",
    finishing: "Super Deluxe",
    views: 32,
    image: realEstateImages[1],
    description: "Independent villa with private garden and parking. Modern design, spacious layout, privacy, and quiet surroundings."
  },
  {
    id: "re-3",
    category: "real-estate",
    name: "Apartment - Central Asmara",
    price: 65000,
    currency: "USD",
    city: "Asmara",
    type: "Apartment",
    bedrooms: 2,
    area: "95m²",
    finishing: "Standard",
    views: 28,
    image: realEstateImages[2],
    description: "Apartment in an excellent location close to all services. Suitable for small families."
  },
  {
    id: "re-4",
    category: "real-estate",
    name: "Land for Sale - Massawa",
    price: 45000,
    currency: "USD",
    city: "Massawa",
    type: "Land",
    area: "600m²",
    finishing: "-",
    views: 15,
    image: realEstateImages[3],
    description: "Prime land for sale in the coastal city of Massawa. Close to the sea and suitable for residential or commercial development."
  },
  {
    id: "re-5",
    category: "real-estate",
    name: "Commercial Office - Asmara",
    price: 120000,
    currency: "USD",
    city: "Asmara",
    type: "Office",
    area: "120m²",
    finishing: "Super Deluxe",
    views: 20,
    image: realEstateImages[4],
    description: "Fully equipped commercial office in a strategic central Asmara location. Ideal for companies and institutions."
  },
  {
    id: "re-6",
    category: "real-estate",
    name: "Apartment - Keren",
    price: 55000,
    currency: "USD",
    city: "Keren",
    type: "Apartment",
    bedrooms: 2,
    area: "100m²",
    finishing: "Good",
    views: 18,
    image: realEstateImages[5],
    description: "Apartment in the calm city of Keren. Close to essential services."
  }
];

export const electronicsAds = [
  {
    id: "el-1",
    category: "electronics",
    name: "iPhone 14 Pro",
    price: 899,
    currency: "USD",
    city: "Asmara",
    type: "Phone",
    brand: "Apple",
    storage: "256GB",
    color: "Black",
    condition: "New",
    views: 120,
    image: electronicsImages[0],
    description: "iPhone 14 Pro with 6.1-inch Super Retina XDR display, 48MP pro camera, A16 Bionic chip, and long battery life."
  },
  {
    id: "el-2",
    category: "electronics",
    name: "MacBook Air M2",
    price: 1299,
    currency: "USD",
    city: "Asmara",
    type: "Laptop",
    brand: "Apple",
    storage: "512GB",
    color: "Silver",
    condition: "New",
    views: 78,
    image: electronicsImages[1],
    description: "MacBook Air with M2 chip, 13.6-inch Liquid Retina display, up to 18 hours battery life, slim and lightweight design."
  },
  {
    id: "el-3",
    category: "electronics",
    name: "Samsung Galaxy S23",
    price: 699,
    currency: "USD",
    city: "Asmara",
    type: "Phone",
    brand: "Samsung",
    storage: "128GB",
    color: "Green",
    condition: "New",
    views: 56,
    image: electronicsImages[2],
    description: "Samsung Galaxy S23 with 6.1-inch Dynamic AMOLED display, 50MP camera, and Snapdragon 8 Gen 2 processor."
  },
  {
    id: "el-4",
    category: "electronics",
    name: "iPad Pro 11",
    price: 799,
    currency: "USD",
    city: "Massawa",
    type: "Tablet",
    brand: "Apple",
    storage: "256GB",
    color: "Silver",
    condition: "Used - Excellent",
    views: 45,
    image: electronicsImages[3],
    description: "iPad Pro with 11-inch Liquid Retina display, M2 chip, Apple Pencil support. Great for drawing and productivity."
  },
  {
    id: "el-5",
    category: "electronics",
    name: "Sony WH-1000XM5",
    price: 349,
    currency: "USD",
    city: "Asmara",
    type: "Headphones",
    brand: "Sony",
    color: "Black",
    condition: "New",
    views: 34,
    image: electronicsImages[4],
    description: "Wireless Sony headphones with premium noise cancellation, high sound quality, and up to 30 hours battery life."
  },
  {
    id: "el-6",
    category: "electronics",
    name: "Dell XPS 15",
    price: 1599,
    currency: "USD",
    city: "Asmara",
    type: "Laptop",
    brand: "Dell",
    storage: "1TB",
    color: "Platinum",
    condition: "New",
    views: 28,
    image: electronicsImages[5],
    description: "Dell XPS 15 with 15.6-inch 4K InfinityEdge display, Intel Core i9 processor, and NVIDIA RTX graphics."
  }
];

export const carsAds = [
  {
    id: "car-1",
    category: "cars",
    name: "Toyota Corolla 2020",
    price: 9000,
    currency: "USD",
    city: "Massawa",
    type: "Car",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    mileage: "85,000 km",
    transmission: "Automatic",
    color: "White",
    views: 67,
    image: carsImages[0],
    description: "Toyota Corolla 2020 in excellent condition, air-conditioned, advanced audio system, and fuel efficient."
  },
  {
    id: "car-2",
    category: "cars",
    name: "Hyundai Tucson 2022",
    price: 18000,
    currency: "USD",
    city: "Asmara",
    type: "Car",
    brand: "Hyundai",
    model: "Tucson",
    year: 2022,
    mileage: "45,000 km",
    transmission: "Automatic",
    color: "Black",
    views: 45,
    image: carsImages[1],
    description: "Hyundai Tucson 2022, SUV, sunroof, rear camera, parking sensors, and luxury leather interior."
  },
  {
    id: "car-3",
    category: "cars",
    name: "Kia Sportage 2021",
    price: 16000,
    currency: "USD",
    city: "Asmara",
    type: "Car",
    brand: "Kia",
    model: "Sportage",
    year: 2021,
    mileage: "60,000 km",
    transmission: "Automatic",
    color: "Silver",
    views: 34,
    image: carsImages[2],
    description: "Kia Sportage 2021 in good condition, agency-serviced regularly, and fitted with new tires."
  },
  {
    id: "car-4",
    category: "cars",
    name: "Nissan Patrol 2019",
    price: 35000,
    currency: "USD",
    city: "Asmara",
    type: "Car",
    brand: "Nissan",
    model: "Patrol",
    year: 2019,
    mileage: "95,000 km",
    transmission: "Automatic",
    color: "Gold",
    views: 23,
    image: carsImages[3],
    description: "Nissan Patrol 2019, V8, 4WD, sunroof, large display, ideal for rough roads."
  },
  {
    id: "car-5",
    category: "cars",
    name: "Toyota Hilux 2021",
    price: 28000,
    currency: "USD",
    city: "Massawa",
    type: "Pickup",
    brand: "Toyota",
    model: "Hilux",
    year: 2021,
    mileage: "50,000 km",
    transmission: "Automatic",
    color: "White",
    views: 19,
    image: carsImages[4],
    description: "Toyota Hilux 2021, 4WD, large rear bed, and strong diesel engine."
  },
  {
    id: "car-6",
    category: "cars",
    name: "Honda Civic 2019",
    price: 12000,
    currency: "USD",
    city: "Asmara",
    type: "Car",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    mileage: "75,000 km",
    transmission: "Automatic",
    color: "Blue",
    views: 31,
    image: carsImages[5],
    description: "Honda Civic 2019, fuel efficient, air-conditioned, excellent sound system, suitable for daily use."
  }
];

export const jobsAds = [
  {
    id: "job-1",
    category: "jobs",
    name: "Accountant",
    salary: 500,
    currency: "USD",
    city: "Asmara",
    company: "Asmara Company",
    type: "Full Time",
    experience: "2 Years",
    qualification: "Bachelor's",
    views: 89,
    image: jobsImages[0],
    description: "Accountant required with 2 years experience for work in Asmara Company. Proficiency in accounting software. Competitive salary + health insurance."
  },
  {
    id: "job-2",
    category: "jobs",
    name: "Civil Engineer",
    salary: 800,
    currency: "USD",
    city: "Asmara",
    company: "Brothers Contracting",
    type: "Full Time",
    experience: "3-5 Years",
    qualification: "Bachelor's",
    views: 56,
    image: jobsImages[1],
    description: "Civil engineer required to supervise projects. Experience in design and supervision. AutoCAD proficiency needed."
  },
  {
    id: "job-3",
    category: "jobs",
    name: "Web Developer",
    salary: 1200,
    currency: "USD",
    city: "Remote",
    company: "Tech Company",
    type: "Remote",
    experience: "1 Year",
    qualification: "Bachelor's",
    views: 34,
    image: jobsImages[2],
    description: "Web developer required for remote work. Strong HTML/CSS/JavaScript and React skills. Website development experience required."
  },
  {
    id: "job-4",
    category: "jobs",
    name: "Digital Marketer",
    salary: 700,
    currency: "USD",
    city: "Asmara",
    company: "Marketing Agency",
    type: "Part Time",
    experience: "1 Year",
    qualification: "Diploma",
    views: 45,
    image: jobsImages[3],
    description: "Digital marketer required to manage social media accounts. Experience with SEO and Google Ads."
  },
  {
    id: "job-5",
    category: "jobs",
    name: "Delivery Driver",
    salary: 400,
    currency: "USD",
    city: "Massawa",
    company: "Delivery Company",
    type: "Full Time",
    experience: "No Experience",
    qualification: "Driving License",
    views: 67,
    image: jobsImages[4],
    description: "Delivery driver required with valid driving license. Salary plus commission per order."
  },
  {
    id: "job-6",
    category: "jobs",
    name: "Sales Representative",
    salary: 600,
    currency: "USD",
    city: "Asmara",
    company: "Trading Company",
    type: "Full Time",
    experience: "1 Year",
    qualification: "Secondary School",
    views: 38,
    image: jobsImages[5],
    description: "Sales representative required with experience in sales. Excellent communication skills."
  }
];

export const generalAds = [
  {
    id: "srv-1",
    category: "services",
    name: "Shipping from Dubai to Asmara",
    price: 299,
    currency: "USD",
    city: "Asmara",
    type: "Shipping Service",
    views: 34,
    image: servicesImages[0],
    description: "Fast shipping service from Dubai to Asmara. Safe packaging and door-to-door delivery. Delivery time 5-7 days."
  },
  {
    id: "srv-2",
    category: "services",
    name: "Home Cleaning Service",
    price: 150,
    currency: "USD",
    city: "Asmara",
    type: "Cleaning Service",
    views: 28,
    image: servicesImages[1],
    description: "Home and office cleaning service. Trained team, modern equipment, and competitive prices."
  },
  {
    id: "srv-3",
    category: "services",
    name: "Home Appliance Repair",
    price: 50,
    currency: "USD",
    city: "Asmara",
    type: "Repair Service",
    views: 22,
    image: servicesImages[2],
    description: "Repair for all home appliances including refrigerators, washing machines, and AC units. Warranty on parts."
  },
  {
    id: "srv-4",
    category: "services",
    name: "Events & Catering Service",
    price: 200,
    currency: "USD",
    city: "Asmara",
    type: "Event Service",
    views: 19,
    image: servicesImages[3],
    description: "Catering for weddings and events. Delicious Eritrean and Arabic cuisine."
  }
];

export const testimonials = [
  {
    id: "ts-1",
    name: "Ahmed Mahmoud",
    title: "Real Estate Investor",
    text: "Great platform! It helped me find a suitable property in Asmara. The process was professional and fast.",
    rating: 5,
    avatar: "A",
    image: img("https://randomuser.me/api/portraits/men/1.jpg")
  },
  {
    id: "ts-2",
    name: "Sara Ibrahim",
    title: "Expat",
    text: "Excellent service. I managed to ship my items from Dubai to Asmara easily and safely. Highly recommended.",
    rating: 5,
    avatar: "S",
    image: img("https://randomuser.me/api/portraits/women/1.jpg")
  },
  {
    id: "ts-3",
    name: "Mohamed Ali",
    title: "Business Owner",
    text: "I hired the best talent through the platform. The recruitment process was easy and fast.",
    rating: 4,
    avatar: "M",
    image: img("https://randomuser.me/api/portraits/men/2.jpg")
  },
  {
    id: "ts-4",
    name: "Fatima Hassan",
    title: "Homemaker",
    text: "I bought an iPhone 14 Pro at a great price. The product was original and delivery was fast.",
    rating: 5,
    avatar: "F",
    image: img("https://randomuser.me/api/portraits/women/2.jpg")
  }
];

export const allFlights = [
  { id: "fl-1", from: "DXB", fromName: "Dubai", to: "ASM", toName: "Asmara", airline: "FlyDubai", flightNo: "FZ 849", price: "$450", time: "08:00", duration: "3h 30m" },
  { id: "fl-2", from: "DXB", fromName: "Dubai", to: "ASM", toName: "Asmara", airline: "Ethiopian", flightNo: "ET 601", price: "$520", time: "14:20", duration: "4h 00m" },
  { id: "fl-3", from: "JED", fromName: "Jeddah", to: "ASM", toName: "Asmara", airline: "Ethiopian", flightNo: "ET 603", price: "$380", time: "09:15", duration: "2h 45m" },
  { id: "fl-4", from: "CAI", fromName: "Cairo", to: "ASM", toName: "Asmara", airline: "EgyptAir", flightNo: "MS 851", price: "$490", time: "10:00", duration: "3h 15m" },
  { id: "fl-5", from: "ADD", fromName: "Addis Ababa", to: "ASM", toName: "Asmara", airline: "Ethiopian", flightNo: "ET 312", price: "$210", time: "07:30", duration: "1h 30m" },
  { id: "fl-6", from: "ADD", fromName: "Addis Ababa", to: "ASM", toName: "Asmara", airline: "Eritrean Airlines", flightNo: "ER 101", price: "$195", time: "13:45", duration: "1h 30m" }
];

export const blogPosts = [
  {
    id: "blog-1",
    title: "📘 Guide to Buying Property in Asmara",
    category: "Real Estate",
    summary: "Important steps and legal tips for safely buying property in the capital, Asmara.",
    content: "<h3>Steps to Buy Property in Asmara</h3><ul><li>Verify ownership through the land registry</li><li>Work with a licensed agent</li><li>Sign an official notarized contract</li><li>Register the contract in court</li></ul><h3>Important Tips</h3><ul><li>Do not pay an advance before verifying documents</li><li>Consult a qualified lawyer</li><li>Ensure there are no disputes over the property</li></ul>",
    date: "2026-04-01",
    image: img("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", 1200, 600),
    author: "Asmara.Store Team"
  },
  {
    id: "blog-2",
    title: "✈️ Tips for Booking the Cheapest Flight",
    category: "Travel",
    summary: "Best times and airline options to find affordable prices.",
    content: "<h3>Tips for Booking Cheap Flights</h3><ul><li>Book 6-8 weeks before travel</li><li>Compare prices between FlyDubai, Ethiopian, and EgyptAir</li><li>Travel midweek (Tuesday or Wednesday)</li><li>Avoid public holiday seasons</li><li>Use incognito mode when comparing fares</li></ul>",
    date: "2026-03-28",
    image: img("https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg", 1200, 600),
    author: "Asmara.Store Team"
  },
  {
    id: "blog-3",
    title: "💼 How to Find a Job in Eritrea",
    category: "Jobs",
    summary: "Best ways to find suitable job opportunities in both the public and private sectors.",
    content: "<h3>Ways to Search for a Job</h3><ul><li>Check job listings on our platform weekly</li><li>Contact companies directly by email</li><li>Prepare a professional CV in Arabic and English</li><li>Prepare for interviews</li><li>Benefit from job fairs</li></ul>",
    date: "2026-03-25",
    image: img("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", 1200, 600),
    author: "Asmara.Store Team"
  },
  {
    id: "blog-4",
    title: "🔒 Guide to Safe Online Transactions",
    category: "Security",
    summary: "Tips to protect your data and money when shopping online.",
    content: "<h3>Online Safety Tips</h3><ul><li>Do not share your passwords with anyone</li><li>Make sure the site is secure (HTTPS)</li><li>Use strong passwords</li><li>Enable two-factor authentication</li><li>Do not open suspicious links</li></ul>",
    date: "2026-03-20",
    image: img("https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg", 1200, 600),
    author: "Asmara.Store Team"
  },
  {
    id: "blog-5",
    title: "🚗 Guide to Buying a Used Car in Asmara",
    category: "Cars",
    summary: "Important points to inspect before buying a used car to avoid problems.",
    content: "<h3>Used Car Inspection Points</h3><ul><li>Ask for full service history</li><li>Inspect engine and body carefully</li><li>Test drive on the road</li><li>Check the official documents</li><li>Inspect tires and brakes</li><li>Consult a trusted mechanic</li></ul>",
    date: "2026-03-15",
    image: img("https://images.pexels.com/photos/113102/pexels-photo-113102.jpeg", 1200, 600),
    author: "Asmara.Store Team"
  }
];

// ========================================
// 7) Aggregation
// ========================================

export const allAds = [
  ...realEstateAds,
  ...electronicsAds,
  ...carsAds,
  ...jobsAds,
  ...generalAds
];

export const allData = {
  appName: APP_NAME,
  translations: TRANSLATIONS,
  realEstateAds,
  electronicsAds,
  carsAds,
  jobsAds,
  generalAds,
  testimonials,
  allFlights,
  blogPosts,
  allAds
};

// ========================================
// 8) Search & Filters
// ========================================

export function getAdsByCategory(category) {
  if (!category || category === "all") return allAds;
  return allAds.filter((ad) => ad.category === category);
}

export function getAdsByCity(city) {
  if (!city || city === "all") return allAds;
  return allAds.filter((ad) => ad.city === city);
}

export function getAdsByType(type) {
  if (!type || type === "all") return allAds;
  return allAds.filter((ad) => (ad.type || "").toLowerCase() === type.toLowerCase());
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
      ad.description,
      ad.area,
      ad.color
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(text);
  });
}

export function filterAds({
  category = "all",
  city = "all",
  minPrice = null,
  maxPrice = null,
  query = ""
} = {}) {
  let result = [...allAds];

  if (category !== "all") {
    result = result.filter((ad) => ad.category === category);
  }

  if (city !== "all") {
    result = result.filter((ad) => ad.city === city);
  }

  if (minPrice !== null && minPrice !== "" && !Number.isNaN(Number(minPrice))) {
    result = result.filter((ad) => (ad.price || ad.salary || 0) >= Number(minPrice));
  }

  if (maxPrice !== null && maxPrice !== "" && !Number.isNaN(Number(maxPrice))) {
    result = result.filter((ad) => (ad.price || ad.salary || 0) <= Number(maxPrice));
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter((ad) =>
      [
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
        .includes(q)
    );
  }

  return result;
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

export function getLatestFlights(limit = 4) {
  return allFlights.slice(0, limit);
}

export function getUniqueCities() {
  return [...new Set(allAds.map((ad) => ad.city).filter(Boolean))];
}

export function getUniqueCategories() {
  return [...new Set(allAds.map((ad) => ad.category).filter(Boolean))];
}

// ========================================
// 9) Formatters
// ========================================

export function formatPrice(value, currency = "USD", lang = DEFAULT_LANGUAGE) {
  if (value === null || value === undefined || value === "") return "-";

  try {
    return new Intl.NumberFormat(
      lang === "ar" ? "ar-EG" : "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 0
      }
    ).format(value);
  } catch {
    return `${value} ${currency}`;
  }
}

export function formatAdPrice(ad, lang = DEFAULT_LANGUAGE) {
  if ("salary" in ad) {
    return formatPrice(ad.salary, ad.currency || "USD", lang);
  }
  return formatPrice(ad.price, ad.currency || "USD", lang);
}

// ========================================
// 10) Init
// ========================================

export function initApp(lang = null) {
  const activeLang = normalizeLanguage(lang || loadLanguage() || DEFAULT_LANGUAGE);
  setLanguage(activeLang);
  translatePage(activeLang);
  return activeLang;
}

// ========================================
// 11) Browser Exposure
// ========================================

if (typeof window !== "undefined") {
  window.AsmaraStore = {
    APP_NAME,
    DEFAULT_LANGUAGE,
    SUPPORTED_LANGUAGES,
    FALLBACK_IMAGE,
    TRANSLATIONS,
    allData,
    allAds,
    allFlights,
    blogPosts,
    testimonials,
    t,
    setLanguage,
    loadLanguage,
    translatePage,
    initApp,
    searchAds,
    filterAds,
    getAdsByCategory,
    getAdsByCity,
    getAdsByType,
    getFeaturedAds,
    getLatestBlogPosts,
    getLatestFlights,
    getUniqueCities,
    getUniqueCategories,
    formatPrice,
    formatAdPrice,
    handleImageError
  };
}

// ========================================
// 12) Quick Test Logs
// ========================================

console.log("Asmara.Store Loaded");
console.log("Default Language:", DEFAULT_LANGUAGE);
console.log("All Ads:", allAds);
console.log("Featured Ads:", getFeaturedAds());
console.log("Latest Blog:", getLatestBlogPosts());
console.log("Search 'Asmara':", searchAds("Asmara"));
