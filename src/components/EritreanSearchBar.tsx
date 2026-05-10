import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

import { translations, Language } from '../translations';
import { ERITREA_REGIONS } from '../constants';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  lang: Language;
}

const EritreanSearchBar = ({ value, onChange, selectedLocation, onLocationChange, lang }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const t = translations[lang];

  return (
    <div id="search" className="max-w-4xl mx-auto mt-12 relative" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className={`flex bg-white rounded-3xl shadow-2xl overflow-hidden border-2 transition-all ${isFocused ? 'border-[#FFC107]' : 'border-transparent'}`}>
        <div className="p-5 bg-[#2D8B49] text-white hidden md:block">
          <Search size={24} />
        </div>
        <input 
          type="text" 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.search.placeholder}
          className="flex-1 p-5 outline-none text-lg font-medium"
        />
        <div className="hidden lg:flex items-center px-4 border-r border-l border-gray-100 bg-gray-50/50">
           <MapPin size={18} className="text-gray-400 mr-2" />
           <select 
             value={selectedLocation}
             onChange={(e) => onLocationChange(e.target.value)}
             className="bg-transparent font-bold text-sm outline-none cursor-pointer text-gray-600"
           >
              <option value="">{lang === 'ar' ? 'كل إرتريا' : (lang === 'en' ? 'All Eritrea' : 'ኩሉ ኤርትራ')}</option>
              {ERITREA_REGIONS.map(reg => (
                <option key={reg.id} value={reg.name[lang as 'ar' | 'ti' | 'en']}>
                  {reg.name[lang as 'ar' | 'ti' | 'en']}
                </option>
              ))}
           </select>
        </div>
        <button className="bg-[#E11C32] text-white px-10 py-5 font-black hover:bg-[#c1172a]">
          {t.search.btn}
        </button>
      </div>
    </div>
  );
};

export default EritreanSearchBar;
