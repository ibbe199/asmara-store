import React from 'react';
import { Newspaper, Landmark, Download, FileText, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import { Language } from '../translations';

interface DirectPressAndGovProps {
  lang?: Language;
}

const DirectPressAndGov = ({ lang = 'ar' }: DirectPressAndGovProps) => {
  // بيانات الصحافة والوزارة (تُحدث يومياً من الـ Agent)
  const pressData = [
    { 
      id: 1, 
      title: { ar: "جريدة إريتريا الحديثة", ti: "ጋዜጣ ሓዳስ ኤርትራ", en: "Eritrea Al-Haditha Newspaper" },
      date: "2026-04-03", 
      type: "PDF",
      link: "#" 
    },
    { 
      id: 2, 
      title: { ar: "نشرة وزارة التجارة الأسبوعية", ti: "ሰሙናዊ መግለጺ ሚኒስትሪ ንግዲ", en: "Ministry of Trade Weekly Bulletin" },
      date: "2026-04-01", 
      type: "Official",
      link: "#" 
    }
  ];

  const govDocs = [
    { id: 1, title: { ar: "دليل الاستثمار الصناعي", ti: "መምርሒ ኢንዱስትሪያዊ ወፍሪ", en: "Industrial Investment Guide" } },
    { id: 2, title: { ar: "تحديثات الجمارك للمغتربين", ti: "ሓድሽ መምርሒ ጉምሩክ ንደገ ዝነብሩ", en: "Customs Updates for Diaspora" } }
  ];

  const t = {
    ar: { press: "الصحافة اليومية", gov: "وثائق وزارة التجارة", download: "تحميل الآن", view: "عرض التفاصيل", latest: "أحدث المنشورات" },
    ti: { press: "መዓልታዊ ጋዜጣታት", gov: "ሰነዳት ሚኒስትሪ ንግዲ", download: "ሕጂ ኣውርድ", view: "ዝርዝር ርአ", latest: "ሓደስቲ ጽሑፋት" },
    en: { press: "Daily Press", gov: "Ministry of Trade Docs", download: "Download Now", view: "View Details", latest: "Latest Publications" }
  }[lang as 'ar' | 'ti' | 'en'];

  return (
    <section className="max-w-7xl mx-auto my-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      
      {/* القسم الأول: أحدث الصحف (Amazon List Style) */}
      <div className="lg:col-span-2 bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <Newspaper className="text-[#E11C32]" size={24} />
          <h2 className="text-xl font-black text-[#131921]">{t.press}</h2>
          <span className="mr-auto text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold animate-pulse uppercase tracking-tighter">Live PDF</span>
        </div>

        <div className="space-y-4">
          {pressData.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <FileText className="text-[#1A5F7A]" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#131921] group-hover:text-[#007185] transition-colors">{item.title[lang as 'ar' | 'ti' | 'en']}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-bold">
                    <Calendar size={12} /> {item.date}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-[11px] font-black hover:bg-gray-50 shadow-sm transition-all uppercase tracking-tighter">
                <Download size={14} className="text-[#E11C32]" /> {t.download}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* القسم الثاني: وثائق الوزارة (Amazon Sidebar Style) */}
      <div className="bg-[#F3F3F3] p-6 border border-gray-200 rounded-sm">
        <div className="flex items-center gap-2 mb-6">
          <Landmark className="text-[#1A5F7A]" size={22} />
          <h2 className="text-lg font-black text-[#131921]">{t.gov}</h2>
        </div>
        
        <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase tracking-widest">{t.latest}:</p>
        
        <ul className="space-y-4">
          {govDocs.map((doc) => (
            <li key={doc.id} className="group cursor-pointer">
              <div className="flex items-start gap-2">
                <ChevronRight size={14} className={`mt-1 text-[#febd69] ${lang === 'en' ? '' : 'rotate-180'}`} />
                <span className="text-xs font-bold text-[#007185] group-hover:text-[#C45500] group-hover:underline">
                  {doc.title[lang as 'ar' | 'ti' | 'en']}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <button className="w-full mt-8 bg-[#1A5F7A] text-white py-3 rounded-lg text-xs font-black flex items-center justify-center gap-2 hover:bg-[#134358] transition-all shadow-md">
          {t.view} <ExternalLink size={14} />
        </button>

        <div className="mt-6 p-3 bg-white/50 rounded-lg border border-dashed border-gray-300">
           <p className="text-[9px] font-bold text-gray-400 italic leading-relaxed text-center">
             የኣስማራ ስቶር ወኪል፦ ኩሎም ሰነዳት ብቐጥታ ካብ ሚኒስትሪ ዝተረኽቡ እዮም። <br/>
             (الـ Agent: جميع الوثائق رسمية ومحدثة لعام 2026)
           </p>
        </div>
      </div>
    </section>
  );
};

export default DirectPressAndGov;
