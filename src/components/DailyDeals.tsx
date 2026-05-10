import React, { useState, useEffect } from 'react';
import { Flame, Clock, ChevronRight } from 'lucide-react';
import { Language } from '../translations';
import { ASMARA_LINKS } from '../constants';
import { useNavigate } from 'react-router-dom';

interface DailyDealsProps {
  lang?: Language;
}

const DailyDeals = ({ lang = 'ar' }: DailyDealsProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({ hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const t = {
    ar: {
      title: "🔥 عروض اليوم",
      ending: `ينتهي خلال ${timeLeft.hours} ساعة`,
      viewAll: "شاهد الكل",
      viewDetails: "عرض التفاصيل",
      categories: {
        realestate: "🏠 عقارات",
        media: "📰 إعلام"
      }
    },
    en: {
      title: "🔥 Daily Deals",
      ending: `Ends in ${timeLeft.hours} hours`,
      viewAll: "See all",
      viewDetails: "View Details",
      categories: {
        realestate: "🏠 Real Estate",
        media: "📰 Media"
      }
    },
    ti: {
      title: "🔥 ናይ ሎሚ ቅናሽ",
      ending: `ኣብ ውሽጢ ${timeLeft.hours} ሰዓታት ዝውዳእ`,
      viewAll: "ኩሉ ርአ",
      viewDetails: "ዝርዝር ርአ",
      categories: {
        realestate: "🏠 ህንጻ",
        media: "📰 ዜና"
      }
    }
  }[lang as 'ar' | 'en' | 'ti'];

  const deals = [
    {
      id: 2,
      title: { ar: "فيلا في تيرفولو", ti: "ቪላ ኣብ ቲራቮሎ", en: "Villa in Tiravolo" },
      price: "$85,000",
      category: t.categories.realestate,
      badge: { ar: "فرصة استثمار", ti: "ናይ ኢንቨስትመንት ዕድል", en: "Investment Opportunity" },
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400"
    },
    {
      id: 3,
      title: { ar: "تحميل صحيفة إريتريا الحديثة", ti: "ጋዜጣ ሓዳስ ኤርትራ ኣውርድ", en: "Download Eritrea Modern Newspaper" },
      price: { ar: "مجاناً", ti: "ብነጻ", en: "FREE" },
      category: t.categories.media,
      badge: { ar: "جديد", ti: "ሓድሽ", en: "NEW" },
      img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400"
    },
    {
      id: 4,
      title: { ar: "بطاقة هدايا أسمرة ستور", ti: "ናይ ኣስማራ ስቶር ህያብ ካርድ", en: "Asmara Store Gift Card" },
      price: `$${ASMARA_LINKS.CONFIG?.PROMOTION_PRICE || "50"}`,
      category: t.categories.realestate, // Using realestate as a generic category for now or I can add a new one
      badge: { ar: "عرض خاص", ti: "ፍሉይ ቅናሽ", en: "PROMOTION" },
      img: "https://images.unsplash.com/photo-1549463591-24c18d2bdaa2?q=80&w=400"
    },
    {
      id: 5,
      title: { ar: "بسكويت إريتري تقليدي (كعك)", ti: "ባኒ ኤርትራ (ካዕካዕ)", en: "Traditional Eritrean Cookies" },
      price: "$12",
      category: t.categories.media, // Using media as a generic category for now or I can add a new one
      badge: { ar: "الأكثر مبيعاً", ti: "ብሉጽ ዝተሸጠ", en: "BEST SELLER" },
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400"
    }
  ];

  return (
    <section id="daily-deals" className="max-w-7xl mx-auto my-8 px-4" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
            <span className="text-xs text-gray-500 font-medium">{t.ending}</span>
          </div>
          <a href="#" className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1">
            {t.viewAll} <ChevronRight size={16} className={lang === 'en' ? '' : 'rotate-180'} />
          </a>
        </div>

        <div id="deals-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {deals.map((deal) => (
            <div key={deal.id} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-gray-50 flex flex-col">
              <img 
                src={deal.img} 
                className="w-full h-40 object-cover" 
                alt={deal.title[lang as 'ar' | 'en' | 'ti']} 
                referrerPolicy="no-referrer"
              />
              
              <div className="p-3 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    {deal.badge[lang as 'ar' | 'en' | 'ti']}
                  </span>
                  <span className="text-xs text-gray-500">{deal.category}</span>
                </div>

                <h3 className="font-semibold text-sm mb-1 text-gray-800 line-clamp-1">
                  {deal.title[lang as 'ar' | 'en' | 'ti']}
                </h3>
                <p className="text-orange-600 font-bold">
                  {typeof deal.price === 'string' ? deal.price : deal.price[lang as 'ar' | 'en' | 'ti']}
                </p>

                <button 
                  onClick={() => navigate(`/ad/${deal.id}`)}
                  className="mt-3 w-full bg-orange-500 text-white py-1 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDeals;
