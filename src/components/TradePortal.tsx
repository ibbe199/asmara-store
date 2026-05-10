import React from 'react';
import { Landmark, FileText, Scale, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../translations';
import { ASMARA_LINKS } from '../constants';

interface TradePortalProps {
  lang?: Language;
}

const TradePortal = ({ lang = 'ar' }: TradePortalProps) => {
  const tradeLinks = [
    { 
      id: 'inv-law', 
      title: { ar: "قانون الاستثمار الإريتري", ti: "ሕጊ ወፍሪ ኤርትራ", en: "Eritrean Investment Law" },
      icon: <Scale className="text-[#2D8B49]" />,
      desc: {
        ar: "الإطار القانوني والحوافز للمستثمرين الأجانب والمغتربين.",
        ti: "ሕጋዊ ቅርጽን ንወጻኢን ደቀባት ወፈርትን ዝወሃብ የተባብዕን።",
        en: "Legal framework and incentives for foreign and diaspora investors."
      }
    },
    { 
      id: 'biz-reg', 
      title: { ar: "دليل السجل التجاري", ti: "መምርሒ ንግዳዊ ምዝገባ", en: "Business Registration Guide" },
      icon: <FileText className="text-[#E11C32]" />,
      desc: {
        ar: "خطوات الحصول على ترخيص تجاري في أسمرة ومصوع.",
        ti: "ኣብ ኣስማራን ምጽዋዕን ንግዳዊ ፍቓድ ንምርካብ ዝውሰዱ ስጉምትታት።",
        en: "Steps to obtain a business license in Asmara and Massawa."
      }
    },
    { 
      id: 'customs', 
      title: { ar: "اللوائح الجمركية", ti: "ሕግታት ጉምሩክ", en: "Customs Regulations" },
      icon: <Landmark className="text-[#12ADEB]" />,
      desc: {
        ar: "قوانين الاستيراد والتصدير والرسوم الجمركية المحدثة.",
        ti: "ሕግታት ምእታውን ምውጻእን ንብረትን ዝተሓደሰ ናይ ጉምሩክ ክፍሊትን።",
        en: "Import/export laws and updated customs duties."
      }
    }
  ];

  const t = {
    ar: { 
      head: "وزارة التجارة والصناعة", 
      sub: "اللوائح والقوانين الرسمية", 
      agent: "الـ Agent: هذه المعلومات مستمدة من المصادر الحكومية الرسمية.",
      download: "تحميل الوثيقة الرسمية",
      visit: "زيارة موقع الوزارة الرسمي"
    },
    ti: { 
      head: "ሚኒስትሪ ንግድን ኢንዱስትሪን", 
      sub: "ወግዓዊ ሕግታትን መምርሒታትን", 
      agent: "ወኪል ኣስማራ ስቶር፦ እዚ ሓበሬታ እዚ ካብ ወግዓዊ ምንጪ ዝተረኽበ እዩ።",
      download: "ወግዓዊ ሰነድ ኣውርድ",
      visit: "ወግዓዊ መርበብ ሓበሬታ ሚኒስትሪ ርአ"
    },
    en: { 
      head: "Ministry of Trade & Industry", 
      sub: "Official Regulations & Guides", 
      agent: "Agent: This information is sourced from official government documents.",
      download: "Download Official Document",
      visit: "Visit Official Ministry Website"
    }
  }[lang as 'ar' | 'ti' | 'en'];

  return (
    <section className="py-16 bg-[#F8FAFC]" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="container mx-auto px-6">
        
        {/* رأس القسم بتصميم مؤسسي فخم */}
        <div className={`flex items-center gap-6 mb-12 border-[#1A5F7A] ${lang === 'en' ? 'border-l-8 pl-6' : 'border-r-8 pr-6'}`}>
          <div className="bg-[#1A5F7A] p-4 rounded-2xl text-white shadow-xl">
            <Landmark size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#1A5F7A] uppercase tracking-tighter">{t.head}</h2>
            <p className="text-[#E11C32] font-bold text-sm italic">{t.sub}</p>
          </div>
        </div>

        {/* شبكة الروابط القانونية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tradeLinks.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all"
            >
              <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-[#1A5F7A] mb-3 leading-tight">
                {item.title[lang as 'ar' | 'ti' | 'en']}
              </h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed mb-8">
                {item.desc[lang as 'ar' | 'ti' | 'en']}
              </p>
              <button className="mt-auto flex items-center gap-2 text-[#1A5F7A] font-black text-xs hover:text-[#E11C32] transition-colors uppercase">
                {t.download} <ArrowUpRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* شريط توثيق الـ Agent */}
        <div className="mt-12 bg-white border-2 border-dashed border-[#2D8B49] p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
          <div className="bg-[#2D8B49]/10 p-3 rounded-full">
            <ShieldCheck className="text-[#2D8B49]" size={30} />
          </div>
          <div className="flex-1 text-center md:text-right">
            <p className="text-[#1A5F7A] font-bold text-sm leading-relaxed italic">
              {t.agent}
            </p>
          </div>
          <button 
            className="bg-[#1A5F7A] text-white px-8 py-3 rounded-xl font-black text-xs shadow-lg hover:bg-[#12ADEB] transition-all flex items-center gap-2"
            onClick={() => window.open(ASMARA_LINKS.GOVERNMENT.MINISTRY_TRADE, '_blank')}
          >
             {t.visit} <Globe size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TradePortal;
