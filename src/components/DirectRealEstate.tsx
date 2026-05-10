import React from 'react';
import { Home, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../translations';

interface DirectRealEstateProps {
  lang?: Language;
}

const DirectRealEstate = ({ lang = 'ar' }: DirectRealEstateProps) => {
  // بيانات العقارات المباشرة (تُسحب لاحقاً من الـ Agent)
  const listings = [
    {
      id: 1,
      title: { ar: "فيلا فخمة في حي تيرفولو", ti: "ቅንጡ ቪላ ኣብ ቲራቮሎ", en: "Luxury Villa in Tiravolo" },
      location: { ar: "أسمرة - حي تيرفولو", ti: "ኣስማራ - ቲራቮሎ", en: "Asmara - Tiravolo" },
      price: "450,000",
      img: "https://images.unsplash.com/photo-1580587771525-78b9bed3b924?q=80&w=600",
      tag: { ar: "لقطة", ti: "ፍሉይ", en: "Hot Deal" }
    },
    {
      id: 2,
      title: { ar: "شقة سكنية قريبة من الكاتدرائية", ti: "መንበሪ ሽቓ ጥቓ ካቴድራል", en: "Apartment near Cathedral" },
      location: { ar: "وسط المدينة", ti: "ማእከል ከተማ", en: "City Center" },
      price: "120,000",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600",
      tag: { ar: "جديد", ti: "ሓድሽ", en: "New" }
    },
    {
      id: 3,
      title: { ar: "أرض استثمارية في طريق مطار أسمرة", ti: "መሬት ወፈር ኣብ መንገዲ መዕርፎ ነፈርቲ", en: "Investment Land near Airport Rd" },
      location: { ar: "جنوب أسمرة", ti: "ደቡብ ኣስማራ", en: "South Asmara" },
      price: "85,000",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600",
      tag: { ar: "فرصة", ti: "ዕድል", en: "Opportunity" }
    },
    {
      id: 4,
      title: { ar: "منزل تقليدي مجدد في حي جيزا برهانو", ti: "ባህላዊ ገዛ ኣብ ጊዛ ብርሃኑ", en: "Renovated House in Geza Berhanu" },
      location: { ar: "حي جيزا برهانو", ti: "ጊዛ ብርሃኑ", en: "Geza Berhanu" },
      price: "95,000",
      img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600",
      tag: { ar: "مطلوب", ti: "ዝድለ", en: "Wanted" }
    }
  ];

  const t = {
    ar: { title: "أحدث العقارات المتاحة في أسمرة", viewAll: "مشاهدة كافة العقارات", price: "السعر", currency: "دولار" },
    ti: { title: "ኣብ ኣስማራ ዝርከቡ ሓደስቲ ቤትታት", viewAll: "ኩሉ ቤትታት ርአ", price: "ዋጋ", currency: "ዶላር" },
    en: { title: "Latest Properties in Asmara", viewAll: "View all properties", price: "Price", currency: "USD" }
  }[lang as 'ar' | 'ti' | 'en'];

  return (
    <section className="max-w-7xl mx-auto my-12 px-4" id="estate" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* هيدر القسم - نمط أمازون */}
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#131921] flex items-center gap-2">
            <Home className="text-[#E11C32]" /> {t.title}
          </h2>
        </div>
        <a href="#" className="text-sm font-bold text-[#007185] hover:text-[#C45500] hover:underline flex items-center">
          {t.viewAll} <ChevronRight size={16} className={lang === 'en' ? '' : 'rotate-180'} />
        </a>
      </div>

      {/* شبكة العرض المباشر (4 بطاقات) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {listings.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-transparent hover:border-gray-200">
            {/* الصورة */}
            <div className="h-48 overflow-hidden relative mb-3 bg-gray-100 rounded-sm">
              <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title[lang as 'ar' | 'ti' | 'en']} />
              <div className="absolute top-2 left-2 bg-[#E11C32] text-white text-[10px] font-black px-2 py-1 rounded-sm shadow-sm uppercase">
                {item.tag[lang as 'ar' | 'ti' | 'en']}
              </div>
            </div>

            {/* التفاصيل */}
            <h3 className="text-sm font-black text-[#131921] mb-1 h-10 overflow-hidden leading-tight">
              {item.title[lang as 'ar' | 'ti' | 'en']}
            </h3>
            
            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold mb-3">
              <MapPin size={12} className="text-[#007185]" />
              {item.location[lang as 'ar' | 'ti' | 'en']}
            </div>

            <div className="flex items-baseline gap-1 mt-auto border-t pt-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase">{t.price}:</span>
              <span className="text-lg font-black text-[#B12704]">${item.price}</span>
              <span className="text-[10px] font-bold text-gray-500">{t.currency}</span>
            </div>

            {/* علامة التوثيق */}
            <div className="mt-2 flex items-center gap-1 text-[9px] text-[#2D8B49] font-black italic">
              <CheckCircle2 size={12} /> المالك موثق من الـ Agent
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DirectRealEstate;
