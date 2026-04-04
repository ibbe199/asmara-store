// ========================================
// Asmara.Store - Configuration File
// ========================================

const CONFIG = {
    siteName: "Asmara.Store",
    whatsappNumber: "+29170000000",
    whatsappLink: "https://wa.me/29170000000",
    agentPage: "internal.html",
    cookieExpiryDays: 30,
    defaultLang: "ar"
};

// بيانات شركات الطيران
const FLIGHTS_DATA = {
    "DXB-ASM": [
        { airline: "FlyDubai", price: "$450", time: "08:00" },
        { airline: "Ethiopian", price: "$520", time: "14:20" }
    ],
    "JED-ASM": [
        { airline: "Ethiopian", price: "$380", time: "09:15" }
    ],
    "CAI-ASM": [
        { airline: "EgyptAir", price: "$490", time: "10:00" }
    ],
    "ADD-ASM": [
        { airline: "Ethiopian", price: "$210", time: "07:30" },
        { airline: "Eritrean", price: "$195", time: "13:45" }
    ]
};

// بيانات المنشورات (Blog)
const BLOG_POSTS = [
    {
        id: 1,
        title: "كيف تختار رحلة مناسبة إلى أسمرة",
        summary: "نصائح سريعة للمغترب الإريتري عند مقارنة أسعار الرحلات واختيار الوقت المناسب.",
        link: "blog.html?id=1"
    },
    {
        id: 2,
        title: "الاستثمار العقاري في أسمرة",
        summary: "نظرة مبسطة على الفرص العقارية الأكثر طلبًا داخل العاصمة.",
        link: "blog.html?id=2"
    },
    {
        id: 3,
        title: "لماذا منصة متعددة اللغات مهمة؟",
        summary: "اللغة تبني الثقة، خاصة عندما تخاطب جمهورًا في الداخل والمهجر.",
        link: "blog.html?id=3"
    }
];
