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

let pendingAds = [];
let rejectedAds = [];
let reportsList = [];
let agentLog = [];
