import React from 'react';
import { Newspaper, Calendar, Download, ExternalLink, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../translations';
import { ASMARA_LINKS } from '../constants';

interface EritreaPressProps {
  lang?: Language;
}

const EritreaPress = ({ lang = 'ar' }: EritreaPressProps) => {
  const newspapers = [
    { 
      id: 'ar-paper', 
      name: "إريتريا الحديثة", 
      langName: { ar: "العربية", ti: "ዓረብ", en: "Arabic" },
      color: "border-[#E11C32]", // أحمر
      description: {
        ar: "الصحيفة اليومية الرسمية باللغة العربية",
        ti: "መዓልታዊ ጋዜጣ ብቋንቋ ዓረብ",
        en: "Official daily newspaper in Arabic"
      },
      link: ASMARA_LINKS.GOVERNMENT.PRESS_AR 
    },
    { 
      id: 'ti-paper', 
      name: "ሓዳስ ኤርትራ", 
      langName: { ar: "تغرينية", ti: "ትግርኛ", en: "Tigrinya" },
      color: "border-[#2D8B49]", // أخضر
      description: {
        ar: "الصحيفة اليومية الرسمية بلغة التغرينية",
        ti: "መዓልታዊ ጋዜጣ ብቋንቋ ትግርኛ",
        en: "Official daily newspaper in Tigrinya"
      },
      link: ASMARA_LINKS.GOVERNMENT.PRESS_TI 
    },
    { 
      id: 'en-paper', 
      name: "Eritrea Profile", 
      langName: { ar: "إنجليزية", ti: "እንግሊዝ", en: "English" },
      color: "border-[#12ADEB]", // أزرق
      description: {
        ar: "الصحيفة الرسمية الصادرة مرتين أسبوعياً بالإنجليزية",
        ti: "ወግዓዊ ጋዜጣ ብቋንቋ እንግሊዝ",
        en: "Official bi-weekly English newspaper"
      },
      link: "https://www.shabait.com/category/english-newspaper/" 
    }
  ];

  const t = {
    ar: { title: "الصحافة الإريترية", browse: "تصفح العدد اليومي", agent: "الـ Agent: يتم تحديث الصحف يومياً من المصدر الرسمي." },
    ti: { title: "ፕረስ ኤርትራ", browse: "መዓልታዊ ሕታም ርአ", agent: "የኣስማራ ስቶር ወኪል፦ ጋዜጣታት መዓልታዊ ይሕደሱ እዮም" },
    en: { title: "Eritrean Press", browse: "Browse Daily Issue", agent: "Agent: Newspapers are updated daily from official sources." }
  }[lang as 'ar' | 'ti' | 'en'];

  const dateStr = new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'ti' ? 'en-GB' : 'en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="container mx-auto px-6">
        {/* رأس القسم بتصميم صحفي */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#E11C32] mb-2">
              <Newspaper size={24} />
              <span className="font-black tracking-widest uppercase text-sm">Official Press</span>
            </div>
            <h2 className="text-4xl font-black text-[#1A5F7A]">{t.title}</h2>
          </div>
          <div className="text-gray-400 text-sm font-bold flex items-center gap-2 italic">
            <Calendar size={16} /> {dateStr}
          </div>
        </div>

        {/* شبكة الصحف */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newspapers.map((paper) => (
            <motion.div 
              key={paper.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-white p-8 rounded-[2rem] border-t-8 ${paper.color} shadow-sm hover:shadow-xl transition-all flex flex-col`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  {paper.langName[lang as 'ar' | 'ti' | 'en']}
                </span>
                <Globe size={20} className="text-gray-300" />
              </div>
              
              <h3 className="text-2xl font-black text-[#1A5F7A] mb-3 leading-tight">
                {paper.name}
              </h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed mb-8">
                {paper.description[lang as 'ar' | 'ti' | 'en']}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <a 
                  href={paper.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#1A5F7A] font-black text-sm flex items-center gap-2 hover:underline"
                >
                  {t.browse} <ExternalLink size={14} />
                </a>
                <button 
                  className="p-2 bg-gray-50 text-[#1A5F7A] rounded-xl hover:bg-[#1A5F7A] hover:text-white transition-colors"
                  onClick={() => window.open(paper.link, '_blank')}
                >
                  <Download size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* تنبيه الـ Agent */}
        <div className="mt-12 bg-[#1A5F7A] p-4 rounded-2xl flex items-center justify-center gap-3 text-white text-xs font-bold">
           <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></span>
           {t.agent}
        </div>
      </div>
    </section>
  );
};

export default EritreaPress;
