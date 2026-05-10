import { useMemo, useState } from 'react';
import { 
  Search, ShoppingCart, MapPin, Menu, ChevronDown, 
  Plane, Home as HomeIcon, BookOpen, Newspaper, Landmark, 
  Globe, ShieldCheck, Loader2, User, Phone, MessageCircle, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Ad, Category } from '../types';
import { translations, Language } from '../translations';
import { ERITREA_REGIONS } from '../constants';

// Existing components for sections
import DiasporaAdsSection from '../components/DiasporaAdsSection';
import AsmaraLibrary from '../components/AsmaraLibrary';
import EritreaPress from '../components/EritreaPress';
import TradePortal from '../components/TradePortal';
import EritreaTradeOfficial from '../components/EritreaTradeOfficial';
import DirectRealEstate from '../components/DirectRealEstate';
import HotelsSection from '../components/HotelsSection';
import DirectPressAndGov from '../components/DirectPressAndGov';
import DailyDeals from '../components/DailyDeals';
import TrustBadges from '../components/TrustBadges';
import Logo from '../components/Logo';
import SocialMediaBox from '../components/SocialMediaBox';

interface HomeProps {
  ads: Ad[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  categories: Category[];
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
}

export default function Home({ 
  ads, 
  loading, 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory, 
  lang, 
  setLang,
  categories,
  selectedLocation,
  setSelectedLocation
}: HomeProps) {
  const t_orig = translations[lang];
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Unified Language Content
  const content = {
    ar: {
      searchPlaceholder: "ابحث عن منزل، أو مرجع تاريخي...",
      delivery: "توصيل إلى",
      city: "أسمرة، إريتريا",
      portal: "بوابة المغتربين",
      categories: ["الكل", "عقارات", "وثائق", "فنادق"],
      nav: ["الرئيسية", "العقارات", "المكتبة", "الصحافة"],
      banner: "نظام لغات سوق أسمرة الموحد 2026",
      all: "الكل"
    },
    en: {
      searchPlaceholder: "Search for a house, or historical reference...",
      delivery: "Deliver to",
      city: "Asmara, Eritrea",
      portal: "Diaspora Portal",
      categories: ["All", "Real Estate", "Documents", "Hotels"],
      nav: ["Home", "Real Estate", "Library", "Press"],
      banner: "Asmara Store Unified Language System 2026",
      all: "All"
    },
    ti: {
      searchPlaceholder: "ገዛ፡ ወይ ታሪኻዊ መወከሲ ድለ...",
      delivery: "ዝለኣኸሉ ቦታ",
      city: "ኣስማራ፡ ኤርትራ",
      portal: "ደገ ዝነብሩ ኤርትራውያን",
      categories: ["ኩሉ", "ቤትታትን ወፈርን", "ሰነዳት", "ሆተላት"],
      nav: ["መበገسي", "ቤትታትን ወፈርን", "ቤተ-መጻሕፍቲ", "ጋዜጣታት"],
      banner: "ዝተወሃሃደ ስርዓት ቋንቋ ኣስማራ ስቶር 2026",
      all: "ኩሉ"
    }
  };

  const t = {
    ...translations[lang],
    ...content[lang]
  };

  const navTargets = ['hero', 'real-estate', 'library', 'press'];

  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            ad.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || ad.category === activeCategory;
      const matchesLocation = !selectedLocation || 
                            ad.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                            selectedLocation.toLowerCase().includes(ad.location.toLowerCase());
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchTerm, activeCategory, selectedLocation, ads]);

  return (
    <div className="bg-[#EAEDED] min-h-screen font-sans text-[#131921]" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      
      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: lang === 'en' ? -350 : 350 }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'en' ? -350 : 350 }}
              className="fixed top-0 bottom-0 w-[320px] bg-white z-[101] shadow-2xl overflow-y-auto"
              style={{ [lang === 'en' ? 'left' : 'right']: 0 }}
            >
              {/* User Header */}
              <div className="bg-[#232f3e] text-white p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200/20 flex items-center justify-center border border-white/20">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-black text-lg leading-none">
                    {lang === 'ar' ? 'أهلاً، سجل دخولك' : (lang === 'en' ? 'Hello, Sign in' : 'ሰላም፡ ተመዝገብ')}
                  </p>
                  <p className="text-[10px] text-gray-300 font-bold mt-1 uppercase tracking-widest cursor-pointer hover:underline">
                    {lang === 'ar' ? 'حسابي الشخصي' : 'Manage Account'}
                  </p>
                </div>
              </div>

              <div className="pb-8">
                {/* Section: Global View */}
                <div className="p-5 border-b border-gray-100">
                  <button 
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                      setSelectedLocation('');
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${activeCategory === 'all' ? 'bg-[#E11C32]/5 text-[#E11C32] border border-[#E11C32]/10' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeCategory === 'all' ? 'bg-[#E11C32] text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Globe size={18} />
                      </div>
                      <span className="font-black text-sm uppercase tracking-tighter">
                        {lang === 'ar' ? 'جميع الأقسام (الكل)' : (lang === 'en' ? 'All Departments' : 'ኩሉ መደባት')}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Section: Shop by Department */}
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em] px-2">
                    {lang === 'ar' ? 'تسوق حسب القسم' : (lang === 'en' ? 'Shop by Department' : 'ብመደብ ድለ')}
                  </h3>
                  <div className="space-y-1">
                    {categories.filter(c => c.id !== 'all').map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center justify-between w-full p-3 rounded-xl transition-all group ${activeCategory === cat.id ? 'bg-[#1A5F7A]/5 text-[#1A5F7A] border border-[#1A5F7A]/10' : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                          <span className="font-bold text-sm">
                            {(t.categories as any)[cat.id] || cat.label}
                          </span>
                        </div>
                        <ChevronDown size={14} className={`text-gray-300 group-hover:text-gray-900 transition-colors ${lang === 'en' ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section: Asmara Portals */}
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em] px-2">
                    {lang === 'ar' ? 'بوابات وخدمات أسمرة' : (lang === 'en' ? 'Asmara Portals' : 'ፖርታል ኣስማራ')}
                  </h3>
                  <div className="space-y-1">
                     {[
                       { id: 'library', name: lang === 'ar' ? 'المكتبة الرقمية' : 'Digital Library', icon: <BookOpen size={18} /> },
                       { id: 'trade', name: lang === 'ar' ? 'بوابة التجارة' : 'Trade Portal', icon: <Landmark size={18} /> },
                       { id: 'press', name: lang === 'ar' ? 'الصحافة الرسمية' : 'Official Press', icon: <Newspaper size={18} /> },
                       { id: 'diaspora', name: lang === 'ar' ? 'بوابة المغتربين' : 'Diaspora Portal', icon: <Plane size={18} /> }
                     ].map((portal) => (
                       <button 
                        key={portal.id}
                        onClick={() => {
                          const el = document.getElementById(portal.id);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-4 w-full p-3 hover:bg-gray-50 text-gray-700 rounded-xl transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#1A5F7A] group-hover:bg-white transition-all shadow-sm">
                          {portal.icon}
                        </div>
                        <span className="font-bold text-sm">{portal.name}</span>
                      </button>
                     ))}
                  </div>
                </div>

                {/* Section: Help & Settings */}
                <div className="p-5">
                   <h3 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em] px-2">
                    {lang === 'ar' ? 'الإعدادات والمساعدة' : (lang === 'en' ? 'Help & Settings' : 'ቅጥታታት')}
                  </h3>
                  <div className="space-y-1">
                    <button className="flex items-center gap-4 w-full p-3 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm">
                       <Phone size={18} className="text-gray-400" />
                       {lang === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
                    </button>
                    <button className="flex items-center gap-4 w-full p-3 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm">
                       <MessageCircle size={18} className="text-gray-400" />
                       {lang === 'ar' ? 'تواصل مع الوكيل' : 'Contact Agent'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. Header (Streamlined Amazon Style Header) */}
      <header id="search" className="bg-[#131921] text-white p-3 flex items-center gap-4 sticky top-0 z-50 shadow-2xl">
        
        {/* 1. Logo */}
        <div 
          className="p-2 cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
          onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
        >
          <Logo className="scale-75 md:scale-90" />
        </div>

        {/* 2. Delivery Info */}
        <div className="hidden lg:flex items-center p-2 text-[11px] group relative cursor-pointer min-w-[130px]">
          <MapPin size={18} className="ml-1 text-[#febd69]" />
          <div>
            <p className="text-gray-400 font-bold">{t.delivery}</p>
            <p className="font-black text-sm flex items-center gap-1">
              {selectedLocation || t.city} <ChevronDown size={10} />
            </p>
          </div>
          {/* Location Dropdown */}
          <div className="absolute top-full right-0 bg-white text-[#131921] shadow-2xl rounded-md py-2 hidden group-hover:block min-w-[180px] z-[60]">
             <button 
               onClick={() => setSelectedLocation('')}
               className="block w-full px-4 py-2 text-right hover:bg-gray-100 font-bold text-xs"
             >
               {lang === 'ar' ? 'عرض كل إرتريا' : (lang === 'en' ? 'Show All Eritrea' : 'ኩሉ ኤርትራ ኣርእይ')}
             </button>
             {ERITREA_REGIONS.map(reg => (
               <button 
                 key={reg.id}
                 onClick={() => setSelectedLocation(reg.name[lang as 'ar' | 'ti' | 'en'])}
                 className={`block w-full px-4 py-2 text-right hover:bg-gray-100 font-bold text-xs ${selectedLocation === reg.name[lang as 'ar' | 'ti' | 'en'] ? 'bg-orange-50 text-orange-600' : ''}`}
               >
                 {reg.name[lang as 'ar' | 'ti' | 'en']}
               </button>
             ))}
          </div>
        </div>

        {/* 3. Giant Search Bar */}
        <div className="flex-1 flex h-11 rounded-md overflow-hidden bg-white items-center">
          <select 
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="bg-gray-100 text-black text-[10px] h-full px-3 border-none outline-none font-black uppercase max-w-[80px] sm:max-w-none"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {(t.categories as any)[cat.id] || cat.label}
              </option>
            ))}
          </select>
          <div className="h-2/3 w-[1px] bg-gray-300 hidden sm:block"></div>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="hidden md:block bg-white text-black text-[10px] h-full px-3 border-none outline-none font-black truncate max-w-[120px]"
          >
            <option value="">{lang === 'ar' ? 'كل إرتريا' : (lang === 'en' ? 'All Eritrea' : 'ኩሉ ኤርትራ')}</option>
            {ERITREA_REGIONS.map(reg => (
              <option key={reg.id} value={reg.name[lang as 'ar' | 'ti' | 'en']}>
                {reg.name[lang as 'ar' | 'ti' | 'en']}
              </option>
            ))}
          </select>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 text-black text-sm font-bold outline-none h-full"
            placeholder={t.searchPlaceholder}
          />
          <button className="bg-[#febd69] hover:bg-[#f3a847] px-6 text-[#131921] h-full">
            <Search size={22} strokeWidth={3} />
          </button>
        </div>

        {/* 4. Basic Controls (Language & Portal) */}
        <div className="flex items-center gap-4 px-4 shrink-0">
           
           {/* Language Switcher */}
           <div className="relative group">
             <button 
               className="flex items-center gap-1 text-xs font-black hover:text-[#febd69]"
             >
               <Globe size={16} /> {lang.toUpperCase()} <ChevronDown size={12} />
             </button>
             <div className="absolute top-full right-0 bg-white text-[#131921] shadow-xl rounded-md py-2 hidden group-hover:block min-w-[120px] z-50">
               <button onClick={() => setLang('ti')} className="block w-full px-4 py-2 text-right hover:bg-gray-100 font-bold">ትግርኛ</button>
               <button onClick={() => setLang('ar')} className="block w-full px-4 py-2 text-right hover:bg-gray-100 font-bold">العربية</button>
               <button onClick={() => setLang('en')} className="block w-full px-4 py-2 text-right hover:bg-gray-100 font-bold">English</button>
             </div>
           </div>

           {/* Diaspora Portal */}
           <div 
             className="border border-transparent hover:border-white p-2 cursor-pointer text-right group"
             onClick={() => {const el = document.getElementById('diaspora'); el?.scrollIntoView({behavior:'smooth'});}}
           >
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Portal</p>
              <p className="text-sm font-black mt-1 leading-none uppercase tracking-tight">
                {t.portal}
              </p>
           </div>

        </div>
      </header>

      {/* 2. Nav-Bottom (Categories Strip) */}
      <nav className="bg-[#232f3e] text-white py-1 px-4 flex items-center gap-6 text-xs font-black">
        <div 
          className="flex items-center gap-1 cursor-pointer p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={18} /> {t.all}
        </div>
        {t.nav.map((item, i) => (
          <a key={i} href={`#${navTargets[i] || 'hero'}`} className="hover:border-b-2 border-white p-1 transition-all">{item}</a>
        ))}
      </nav>

      {/* 3. Unified Language Banner */}
      <div className="bg-[#febd69] p-2 text-center text-[10px] font-black text-[#131921] uppercase tracking-widest">
        {t.banner}
      </div>

      {/* 4. Hero Banner */}
      <div id="hero" className="relative w-full h-[300px] md:h-[450px]">
        <img 
          src="https://images.unsplash.com/photo-1543968332-f99478b1ebdc?q=80&w=2000" 
          className="w-full h-full object-cover object-center" 
          alt="Asmara Architecture"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#EAEDED] to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-6xl font-black text-center drop-shadow-2xl px-4"
          >
            {lang === 'en' ? 'Welcome to Asmara Store' : 'مرحباً بكم في سوق أسمرة'}
          </motion.h2>
        </div>
      </div>

      {/* 4. Main Content Grid */}
      <main className="container mx-auto px-4 -mt-24 md:-mt-48 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          
          {/* Card: Real Estate */}
          <AmazonCard 
            title={lang === 'en' ? "Real Estate & Investment" : "العقارات والاستثمار"} 
            img="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500" 
            link={lang === 'en' ? "Explore properties" : "استكشف عقارات أسمرة"}
            onClick={() => setActiveCategory('property')}
          />

          <AmazonCard 
            title={lang === 'en' ? "Luxury Hotels" : "الفنادق والسياحة"} 
            img="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500" 
            link={lang === 'en' ? "Book your stay" : "احجز إقامتك في أسمرة"}
            onClick={() => setActiveCategory('hotels')}
          />

          {/* Card: Digital Library */}
          <AmazonCard 
            title={lang === 'en' ? "Digital Library" : "مكتبة أسمرة الرقمية"} 
            img="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500" 
            link={lang === 'en' ? "Download PDF books" : "تحميل الكتب التاريخية"}
            onClick={() => {const el = document.getElementById('library'); el?.scrollIntoView({behavior:'smooth'});}}
          />

          {/* Card: Sign In / Ad */}
          <div className="bg-white p-5 flex flex-col justify-between shadow-sm border-t-4 border-[#febd69]">
            <div>
              <h3 className="text-xl font-bold mb-4 italic">{lang === 'en' ? 'First Month Free!' : 'أول شهر مجاني!'}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {lang === 'en' ? 'Register now and post your property ads for free.' : 'سجل الآن وارفع إعلاناتك العقارية مجاناً بمناسبة الإطلاق.'}
              </p>
              <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-lg text-sm shadow-sm font-bold">
                {lang === 'en' ? 'Sign in securely' : 'تسجيل الدخول بأمان'}
              </button>
            </div>
            <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={20} />
              <span className="text-[10px] font-bold">{lang === 'en' ? 'Verified by Ministry' : 'موثق من قبل وزارة التجارة'}</span>
            </div>
          </div>
        </div>

        {/* Direct Real Estate Section */}
        <div id="real-estate">
          <DirectRealEstate lang={lang} />
        </div>

        {/* Direct Press and Gov Section */}
        <DirectPressAndGov lang={lang} />

        {/* Daily Deals Section */}
        <DailyDeals lang={lang} />

        {/* Ads List (The Search Results) */}
        <div className="bg-white p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
            {activeCategory === 'all' ? t.latestAds : `${t.resultsFor} ${(t.categories as any)[activeCategory] || categories.find(c => c.id === activeCategory)?.label}`}
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#1A5F7A]">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold">{t.loadingAds}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredAds.length > 0 ? (
                  filteredAds.map((ad) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={ad.id}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => navigate(`/ad/${ad.id}`)}
                  >
                    <div className="h-48 bg-gray-100 relative overflow-hidden mb-3">
                      <img 
                        src={ad.image_url} 
                        alt={ad.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-[#1A5F7A] uppercase">
                        {(t.categories as any)[ad.category] || categories.find(c => c.id === ad.category)?.label}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#007185] hover:text-[#C45500] hover:underline line-clamp-2 mb-1">{ad.title}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-[#f3a847] fill-[#f3a847]" />)}
                      <span className="text-xs text-gray-500">(12)</span>
                    </div>
                    <div className="text-lg font-bold text-[#B12704] mb-1">{ad.price}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={12} /> {ad.location}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400">
                  <p className="text-lg">{t.noResults}</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                    className="text-[#007185] font-bold mt-4 underline"
                  >
                    {t.showAllAds}
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
          )}
        </div>

        {/* Specialized Sections */}
        <div className="mb-8">
          <HotelsSection lang={lang} />
        </div>

        <div id="diaspora" className="mb-8">
          <DiasporaAdsSection lang={lang} />
        </div>

        <div id="library" className="mb-8">
          <AsmaraLibrary lang={lang} />
        </div>

        <div id="press" className="mb-8">
          <EritreaPress lang={lang} />
        </div>

        <div id="trade" className="mb-8">
          <TradePortal lang={lang} />
          <EritreaTradeOfficial lang={lang} />
        </div>

        <div className="mb-8">
          <SocialMediaBox lang={lang} />
        </div>

        <TrustBadges lang={lang} />
      </main>
    </div>
  );
}

// Component: Amazon-style Card
const AmazonCard = ({ title, img, link, onClick }: { title: string; img: string; link: string; onClick: () => void }) => (
  <div className="bg-white p-5 shadow-sm hover:shadow-md flex flex-col group transition-all cursor-pointer" onClick={onClick}>
    <h3 className="text-xl font-bold mb-3 h-14 overflow-hidden leading-tight">{title}</h3>
    <div className="h-[250px] overflow-hidden mb-4 bg-gray-100">
      <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={title} />
    </div>
    <span className="text-xs text-[#007185] font-bold hover:underline hover:text-[#C45500] mt-auto">
      {link}
    </span>
  </div>
);
