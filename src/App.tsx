import React, { useState } from 'react';
import { Search, Globe, MapPin, Menu, Plane, Home, Newspaper, ArrowUpRight, ShieldCheck } from 'lucide-react';

const App = () => {
  const [lang, setLang] = useState('ar');

  const t = {
    ar: {
      search: "ابحث عن منزل، تذكرة طيران، أو مرجع تاريخي...",
      nav: ["الرئيسية", "الرحلات", "العقارات", "الصحافة"],
      flightTitle: "رحلات الطيران المباشرة إلى أسمرة",
      book: "حجز الآن",
      status: "منضبطة",
      carrier: "ناقل أساسي"
    },
    en: {
      search: "Search for a house, flight, or historical reference...",
      nav: ["Home", "Flights", "Real Estate", "Press"],
      flightTitle: "Direct Flights to Asmara",
      book: "Book Now",
      status: "On Schedule",
      carrier: "Main Carrier"
    },
    ti: {
      search: "ገዛ፡ ቲኬት ነፋሪት ወይ ታሪኻዊ መወከሲ ድለ...",
      nav: ["መበገሲ", "ጉዕዞታት", "ቤትታትን ወፈርን", "ጋዜጣታት"],
      flightTitle: "ናይ ነፋሪት ጉዕዞ ናብ ኣስማራ",
      book: "ሕጂ ባልዮ",
      status: "ከምቲ ዝተባህሎ",
      carrier: "ቀንዲ መጓዓዝያ"
    }
  }[lang];

  return (
    <div className="bg-slate-50 min-h-screen font-sans" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* Header */}
      <header className="bg-[#131921] text-white p-3 flex items-center gap-4 sticky top-0 z-50">
        <div className="font-black italic text-xl px-2">asmara<span className="text-[#febd69]">.store</span></div>
        <div className="flex-1 flex bg-white rounded-md overflow-hidden h-10">
          <input type="text" className="flex-1 px-4 text-black text-sm outline-none font-bold" placeholder={t.search} />
          <button className="bg-[#febd69] px-5 text-black"><Search size={20} strokeWidth={3}/></button>
        </div>
        <button onClick={() => setLang(lang === 'ar' ? 'en' : lang === 'en' ? 'ti' : 'ar')} className="flex items-center gap-1 text-xs font-bold border border-gray-500 px-3 py-1 rounded">
          <Globe size={16} /> {lang.toUpperCase()}
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1a365d] text-white py-16 px-6 text-center border-b-4 border-[#febd69]">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{t.flightTitle}</h1>
        <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-70">
           {t.nav.map((item, i) => <span key={i}>{item}</span>)}
        </div>
      </section>

      {/* Flights Content */}
      <main className="max-w-6xl mx-auto -mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 1, name: "Turkish Airlines", route: "IST ➜ ASM", price: "750", main: false },
          { id: 2, name: "Ethiopian Airlines", route: "ADD ➜ ASM", price: "290", main: true },
          { id: 3, name: "FlyDubai", route: "DXB ➜ ASM", price: "410", main: false }
        ].map((f) => (
          <div key={f.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:border-[#febd69] transition-all">
            <div className="flex justify-between mb-4">
              <Plane size={20} className={lang === 'en' ? '-rotate-45' : 'rotate-135 text-blue-600'} />
              {f.main && <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">{t.carrier}</span>}
            </div>
            <h3 className="text-lg font-black text-slate-800">{f.name}</h3>
            <p className="text-xs font-bold text-gray-400 mb-4">{f.route}</p>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1 text-[#2d8b49] text-[11px] font-black">
                <ShieldCheck size={14} /> {t.status}
              </div>
              <div className="text-xl font-black text-[#B12704]">${f.price}</div>
            </div>
            <button className="w-full bg-[#1a365d] text-white py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-[#febd69] hover:text-black transition-all">
              {t.book} <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </main>

      <footer className="py-10 text-center text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase">
        Verified Cloud Interface • 2026 • ASMARA STORE
      </footer>
    </div>
  );
};

export default App;
