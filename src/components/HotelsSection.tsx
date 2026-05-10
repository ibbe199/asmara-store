import React from 'react';
import { Star, MapPin, Phone, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../translations';

interface HotelsSectionProps {
  lang?: Language;
}

const HotelsSection = ({ lang = 'ar' }: HotelsSectionProps) => {
  const t = {
    ar: {
      title: "أفضل الفنادق في أسمرة",
      subtitle: "إقامة فاخرة وخدمات مميزة",
      book: "احجز الآن",
      details: "التفاصيل",
      category: "فنادق أسمرة",
      rating: "تقييم السياح"
    },
    en: {
      title: "Best Hotels in Asmara",
      subtitle: "Luxury stay and premium services",
      book: "Book Now",
      details: "Details",
      category: "Asmara Hotels",
      rating: "Tourist Rating"
    },
    ti: {
      title: "ብሉጻት ሆተላት ኣብ ኣስማራ",
      subtitle: "ቅሳነት ዘለዎ ቦታን ብሉጽ ኣገልግሎትን",
      book: "ሕጂ ወክስ",
      details: "ዝርዝር",
      category: "ሆተላት ኣስማራ",
      rating: "ናይ በጻሕቲ ገምጋም"
    }
  };

  const currentT = t[lang] || t.ar;

  const hotels = [
    {
      id: 1,
      name: { ar: "فندق أسمرة بالاس", en: "Asmara Palace Hotel", ti: "ኣስማራ ፓላስ ሆተል" },
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
      price: "150$",
      stars: 5,
      location: { ar: "شارع المطار، أسمرة", en: "Airport Road, Asmara", ti: "መገዲ መዓርፎ ነፈርቲ፡ ኣስማራ" },
      reviews: 1240
    },
    {
      id: 2,
      name: { ar: "فندق فيكتوريا", en: "Hotel Victoria", ti: "ሆተል ቪክቶርያ" },
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
      price: "85$",
      stars: 4,
      location: { ar: "وسط المدينة، أسمرة", en: "City Center, Asmara", ti: "ማእከል ከተማ፡ ኣስማራ" },
      reviews: 856
    },
    {
      id: 3,
      name: { ar: "فندق ألبيرغو إيطاليا", en: "Albergo Italia", ti: "ኣልበርጎ ኢጣልያ" },
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800",
      price: "110$",
      stars: 4,
      location: { ar: "المنطقة التاريخية، أسمرة", en: "Historical District, Asmara", ti: "ታሪኻዊ ቦታ፡ ኣስማራ" },
      reviews: 642
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#E11C32] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Hotels</span>
            <div className="h-[1px] w-12 bg-gray-200"></div>
          </div>
          <h2 className="text-3xl font-black text-gray-900">{currentT.title}</h2>
          <p className="text-gray-500 font-bold mt-1">{currentT.subtitle}</p>
        </div>
        <button className="text-[#1A5F7A] font-black text-sm flex items-center gap-1 hover:underline">
           {lang === 'ar' ? 'عرض جميع الفنادق' : 'View all hotels'} →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <motion.div 
            key={hotel.id}
            whileHover={{ y: -5 }}
            className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl hover:shadow-gray-200/50"
          >
            <div className="h-56 relative overflow-hidden">
              <img 
                src={hotel.image} 
                alt={hotel.name[lang as 'ar' | 'en' | 'ti']} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-gray-900 shadow-sm">
                {hotel.price} <span className="text-[10px] text-gray-500 font-bold">/ night</span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#f3a847] fill-[#f3a847]" />
                ))}
                <span className="text-[10px] text-gray-400 font-bold mr-1">{hotel.reviews} {currentT.rating}</span>
              </div>
              
              <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-[#1A5F7A] transition-colors">
                {hotel.name[lang as 'ar' | 'en' | 'ti']}
              </h3>
              
              <div className="flex items-center gap-1 text-gray-500 text-xs font-bold mb-4">
                <MapPin size={14} className="text-gray-400" />
                {hotel.location[lang as 'ar' | 'en' | 'ti']}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-[#131921] text-white py-3 rounded-xl font-black text-xs hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <Calendar size={14} /> {currentT.book}
                </button>
                <button className="bg-white text-[#131921] border border-gray-200 py-3 rounded-xl font-black text-xs hover:bg-gray-50 transition-colors">
                  {currentT.details}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-[#1A5F7A]/5 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1A5F7A] shadow-sm">
           <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-xs font-black text-gray-900">
            {lang === 'ar' ? 'حجز آمن ومضمون من خلال أسمرة ستور' : 'Safe and guaranteed booking through Asmara Store'}
          </p>
          <p className="text-[10px] text-gray-500 font-bold mt-0.5">
            {lang === 'ar' ? 'نحن نضمن لك أفضل الأسعار وتوافر الغرف' : 'We guarantee you the best prices and room availability'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelsSection;
