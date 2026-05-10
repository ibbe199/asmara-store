import React, { useState } from 'react';
import { Home, Truck, CreditCard, ArrowUpRight, Megaphone, Search as SearchIcon } from 'lucide-react';
import { Language, translations } from '../translations';

import DiasporaLinks from './DiasporaLinks';

interface DiasporaAdsSectionProps {
  lang: Language;
}

const DiasporaAdsSection = ({ lang }: DiasporaAdsSectionProps) => {
  const t = translations[lang];
  const [diasporaSearch, setDiasporaSearch] = useState('');

  return (
    <section id="diaspora" className="py-20 bg-white border-y border-gray-100" dir={t.dir}>
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="py-12 text-center mb-6">
          {/* العلامة العلوية الصغيرة */}
          <span className="text-[#2D8B49] font-bold text-sm tracking-widest uppercase mb-2 block">
            {t.diaspora.tag}
          </span>

          {/* العنوان الرئيسي المحدث */}
          <h2 className="text-3xl md:text-5xl font-black text-[#1A5F7A] mb-4">
            {t.diaspora.title}
          </h2>

          {/* خطوط ألوان العلم الإريتري كفاصل صغير */}
          <div className="flex justify-center gap-1 mb-6">
            <div className="h-1 w-8 bg-[#2D8B49] rounded-full"></div>
            <div className="h-1 w-8 bg-[#E11C32] rounded-full"></div>
            <div className="h-1 w-8 bg-[#12ADEB] rounded-full"></div>
          </div>

          <p className="text-gray-500 max-w-xl mx-auto px-4">
            {t.diaspora.desc}
          </p>
        </div>

        {/* Diaspora Specific Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 px-4">
           <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none group-focus-within:text-[#1A5F7A] transition-colors">
                <SearchIcon size={24} className="text-gray-300" />
              </div>
              <input 
                type="text"
                value={diasporaSearch}
                onChange={(e) => setDiasporaSearch(e.target.value)}
                placeholder={lang === 'ar' ? "ابحث في الخدمات المختارة للمغتربين..." : lang === 'ti' ? "ኣብ ደገ ንዘለዉ ዝተመርጹ ኣገልግሎታት ድለ..." : "Search diaspora services..."}
                className="w-full py-6 pr-16 pl-8 bg-gray-50 border-2 border-gray-100 rounded-[2.5rem] font-bold text-lg outline-none focus:border-[#1A5F7A] focus:bg-white shadow-xl shadow-gray-100 transition-all text-right"
                style={{ textAlign: lang === 'en' ? 'left' : 'right' }}
              />
              {/* Optional: Add clear button if needed */}
           </div>
        </div>

        <div className="flex justify-center mb-12">
            <button className="bg-[#1A5F7A] text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:bg-[#144a5f] transition-all flex items-center gap-3 active:scale-95">
              {lang === 'ar' ? "أعلن عن خدمتك هنا" : lang === 'ti' ? "ኣገልግሎትካ ኣብዚ ኣላልይ" : "Post Your Service"} 
              <ArrowUpRight size={20} />
            </button>
        </div>

        {/* Services Links Grid */}
        <DiasporaLinks lang={lang} searchTerm={diasporaSearch} />
      </div>
    </section>
  );
};

export default DiasporaAdsSection;
