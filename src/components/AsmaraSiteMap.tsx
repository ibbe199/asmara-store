import React from 'react';
import { Map, Home, Plane, Landmark, Book, Shield, Mail, Globe } from 'lucide-react';
import { Language } from '../translations';

interface AsmaraSiteMapProps {
  lang?: Language;
}

const AsmaraSiteMap = ({ lang = 'ar' }: AsmaraSiteMapProps) => {
  const sections = [
    {
      title: { ar: "العقارات والاستثمار", ti: "ቤትታትን ወፈርን", en: "Real Estate & Investment" },
      icon: <Home className="text-[#E11C32]" />,
      links: [
        { name: { ar: "بيوت للبيع", en: "Houses for Sale" }, path: "/real-estate/sale" },
        { name: { ar: "أراضي سكنية", en: "Residential Lands" }, path: "/real-estate/lands" },
        { name: { ar: "فرص استثمارية", en: "Investment Ops" }, path: "/real-estate/invest" }
      ]
    },
    {
      title: { ar: "المركز الثقافي", ti: "ባህላዊ ማእከል", en: "Cultural Center" },
      icon: <Book className="text-[#2D8B49]" />,
      links: [
        { name: { ar: "مكتبة أسمرة", en: "Asmara Library" }, path: "/library" },
        { name: { ar: "الصحافة اليومية", en: "Daily Press" }, path: "/press" },
        { name: { ar: "تاريخ أسمرة", en: "History" }, path: "/history" }
      ]
    },
    {
      title: { ar: "بوابة الوزارة", ti: "ቤት ጽሕፈት ሚኒስትሪ", en: "Ministry Portal" },
      icon: <Landmark className="text-[#1A5F7A]" />,
      links: [
        { name: { ar: "قوانين التجارة", en: "Trade Laws" }, path: "/gov/laws" },
        { name: { ar: "السجل التجاري", en: "Business Reg" }, path: "/gov/registration" },
        { name: { ar: "الجمارك", en: "Customs" }, path: "/gov/customs" }
      ]
    }
  ];

  const t = {
    ar: { head: "خريطة موقع سوق أسمرة", privacy: "سياسة الخصوصية", contact: "اتصل بالـ Agent", location: "إريتريا - أسمرة" },
    ti: { head: "ሳይትማፕ ኣስማራ ስቶር", privacy: "ፖሊሲ ምስጢራውነት", contact: "ንወኪል ኣዘራርብ", location: "ኤርትራ - ኣስማራ" },
    en: { head: "Asmara Store Site Map", privacy: "Privacy Policy", contact: "Contact Agent", location: "Eritrea - Asmara" }
  }[lang as 'ar' | 'ti' | 'en'];

  return (
    <div className="py-16 bg-white px-6" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="max-w-7xl mx-auto">
        {/* هيدر الخريطة */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 text-[#1A5F7A]">
            <Map size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black text-[#1A5F7A]">{t.head}</h1>
          <p className="text-gray-400 font-bold mt-2 italic">Asmara Store Digital Map • ሳይትማፕ</p>
        </div>

        {/* شبكة الخريطة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-50 rounded-lg">{section.icon}</div>
                <h3 className="font-black text-[#1A5F7A] text-lg">{section.title[lang as 'ar' | 'ti' | 'en']}</h3>
              </div>
              <ul className={`space-y-4 ${lang === 'en' ? 'border-l-2 pl-4' : 'border-r-2 pr-4'} border-gray-100`}>
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.path} className="text-gray-500 hover:text-[#E11C32] font-bold text-sm transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                      {link.name[lang as 'ar' | 'ti' | 'en'] || link.name.en}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* تذييل الخريطة (روابط الدعم) */}
        <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-black text-gray-400">
            <Shield size={16} /> {t.privacy}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-black text-gray-400">
            <Mail size={16} /> {t.contact}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-black text-gray-400">
            <Globe size={16} /> {t.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsmaraSiteMap;
