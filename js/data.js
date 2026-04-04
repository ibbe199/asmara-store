const flightsData = {
  "DXB-ASM": [{ airline: "FlyDubai", price: "$450" }],
  "JED-ASM": [{ airline: "Ethiopian", price: "$380" }],
  "CAI-ASM": [{ airline: "EgyptAir", price: "$490" }],
  "ADD-ASM": [{ airline: "Ethiopian", price: "$210" }]
};

let realEstateAds = [
  { id: 1, name: "شقة في أسمرة", price: "$80,000", city: "أسمرة", image: "https://placehold.co/300x200", category: "عقارات" }
];

let electronicsAds = [
  { id: 2, name: "iPhone 14", price: "$700", city: "أسمرة", image: "https://placehold.co/300x200", category: "إلكترونيات" }
];

let carsAds = [
  { id: 3, name: "Toyota Corolla", price: "$9,000", city: "مصوع", image: "https://placehold.co/300x200", category: "سيارات" }
];

let jobsAds = [
  { id: 4, name: "محاسب", price: "$500", city: "أسمرة", image: "https://placehold.co/300x200", category: "وظائف" }
];

let blogPosts = [
  {
    id: 1,
    title: "كيف تختار رحلة مناسبة إلى أسمرة",
    excerpt: "نصائح سريعة للمغترب الإريتري عند مقارنة أسعار الرحلات واختيار الوقت المناسب.",
    link: "#"
  },
  {
    id: 2,
    title: "الاستثمار العقاري في أسمرة",
    excerpt: "نظرة مبسطة على الفرص العقارية الأكثر طلبًا داخل العاصمة.",
    link: "#"
  },
  {
    id: 3,
    title: "لماذا منصة متعددة اللغات مهمة؟",
    excerpt: "اللغة تبني الثقة، خاصة عندما تخاطب جمهورًا في الداخل والمهجر.",
    link: "#"
  }
];

let pendingAds = [];
let rejectedAds = [];
let reportsList = [];
let agentLog = [];
