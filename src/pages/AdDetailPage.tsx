import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MapPin, Tag, Share2, Heart, Flag, ShieldCheck, 
  MessageCircle, Phone, User, Calendar, Eye, Star,
  ChevronLeft, ChevronRight, ShoppingCart, Landmark, Truck, Cpu, Briefcase
} from 'lucide-react';
import { Language, translations } from '../translations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SocialMediaBox from '../components/SocialMediaBox';
import { supabase } from '../lib/supabase';
import { Ad } from '../types';

import { User as SupabaseUser } from '@supabase/supabase-js';

interface AdDetailPageProps {
  lang: Language;
  user: SupabaseUser | null;
  setLang: (lang: Language) => void;
  setUser: (user: SupabaseUser | null) => void;
}

const AdDetailPage = ({ lang, user, setLang, setUser }: AdDetailPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = translations[lang];
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function fetchAd() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq(id ? 'id' : '', id)
          .single();

        if (error) throw error;
        setAd(data);
      } catch (err) {
        console.error('Error fetching ad:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAd();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-[#1A5F7A] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-bold text-gray-500">جاري تحميل تفاصيل الإعلان...</p>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <Landmark size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-black text-gray-800 mb-2">عذراً، الإعلان غير موجود</h2>
        <p className="text-gray-500 mb-8">ربما تم حذف الإعلان أو أن الرابط غير صحيح.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#1A5F7A] text-white px-8 py-3 rounded-2xl font-bold"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  // Assuming ad.image_url might be an array or we just show the one we have for now
  // Real implementation would handle multiple images
  const images = [ad.image_url]; 

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'cars': return <Truck size={20} />;
      case 'property': return <Landmark size={20} />;
      case 'electronics': return <Cpu size={20} />;
      case 'jobs': return <Briefcase size={20} />;
      default: return <Tag size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <main className="max-w-6xl mx-auto py-8 px-4 md:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 font-bold hover:text-[#1A5F7A] transition-colors bg-white px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft size={18} className={lang === 'en' ? '' : 'rotate-180'} />
            <span>{t.backToStore}</span>
          </button>
          
          <div className="flex items-center gap-2">
             <button className="p-2.5 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm transition-all">
                <Heart size={20} />
             </button>
             <button className="p-2.5 bg-white text-gray-400 hover:text-blue-500 rounded-xl shadow-sm transition-all">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Media & Description */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 relative group aspect-video md:aspect-[16/9]">
               <img 
                 src={images[activeImageIndex]} 
                 alt={ad.title} 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
               
               {ad.is_featured && (
                 <div className="absolute top-6 right-6 bg-[#E11C32] text-white px-4 py-2 rounded-full font-black text-xs shadow-lg flex items-center gap-2">
                    <Star size={14} className="fill-white" /> مميز
                 </div>
               )}

               {images.length > 1 && (
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 rounded-full shadow-lg pointer-events-auto hover:bg-white"><ChevronRight size={24} className={lang === 'en' ? 'rotate-180' : ''}/></button>
                    <button className="p-2 bg-white/90 rounded-full shadow-lg pointer-events-auto hover:bg-white"><ChevronLeft size={24} className={lang === 'en' ? 'rotate-180' : ''}/></button>
                 </div>
               )}
            </div>

            {/* Ad Content */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
               <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-blue-50 text-[#1A5F7A] rounded-full text-xs font-black flex items-center gap-2">
                    {getCategoryIcon(ad.category)}
                    {ad.category}
                  </span>
                  <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                    <Calendar size={14} /> {new Date(ad.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                  </span>
                  <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                    <Eye size={14} /> {ad.id % 100} مشاهدة
                  </span>
               </div>

               <h1 className="text-2xl md:text-4xl font-black text-gray-800 mb-6 leading-tight">
                  {ad.title}
               </h1>

               <div className="prose prose-blue max-w-none mb-10">
                  <h3 className="text-lg font-black text-gray-800 mb-4">وصف الإعلان</h3>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {ad.description}
                  </p>
               </div>

               {/* Category Specific Details Table */}
               {ad.car_model || ad.property_rooms || ad.job_type || ad.condition ? (
                 <div className="bg-gray-50 rounded-3xl p-6 mb-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                    {ad.car_model && <DetailItem label="الموديل" value={ad.car_model} />}
                    {ad.car_year && <DetailItem label="سنة الصنع" value={ad.car_year} />}
                    {ad.car_mileage && <DetailItem label="المسافة المقطوعة" value={ad.car_mileage + ' كم'} />}
                    
                    {ad.property_rooms && <DetailItem label="الغرف" value={ad.property_rooms} />}
                    {ad.property_area && <DetailItem label="المساحة" value={ad.property_area + ' م²'} />}
                    {ad.property_furnished !== undefined && <DetailItem label="مفروش" value={ad.property_furnished ? 'نعم' : 'لا'} />}
                    
                    {ad.job_type && <DetailItem label="نوع الوظيفة" value={ad.job_type} />}
                    {ad.salary_range && <DetailItem label="الراتب" value={ad.salary_range} />}
                    
                    {ad.condition && <DetailItem label="الحالة" value={ad.condition === 'new' ? 'جديد' : 'مستعمل'} />}
                    {ad.brand && <DetailItem label="الماركة" value={ad.brand} />}
                 </div>
               ) : null}

               <div className="flex items-center gap-2 text-gray-400 text-xs font-bold pt-6 border-t border-gray-50">
                  <Flag size={14} />
                  <button className="hover:text-red-500 underline">الإبلاغ عن مخالفة</button>
               </div>
            </div>

          </div>

          {/* Right Column: Actions & Seller Info */}
          <div className="space-y-6">
            
            {/* Price Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 text-center">
               <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">السعر المطلوب</div>
               <div className="text-4xl font-black text-[#1A5F7A] mb-8">{ad.price}</div>
               
               <Link 
                 to={`/checkout?adId=${ad.id}`}
                 className="w-full bg-[#E11C32] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-900/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 active:scale-95"
               >
                  <ShoppingCart size={24} /> شراء الآن عبر أسمرة ستور
               </Link>
               
               <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3 text-right">
                  <ShieldCheck className="text-blue-500 shrink-0" size={20} />
                  <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
                    عملية الشراء مؤمنة بنسبة 100%. لا يتم تحويل الأموال للبائع إلا بعد استلامك للمنتج وتأكيد مطابقته للمواصفات.
                  </p>
               </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
               <h3 className="text-lg font-black text-gray-800 mb-6">معلومات المعلن</h3>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black">
                     {ad.user_id === 'mock-user' ? 'A' : 'U'}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800">أسمرة ستور</h4>
                    <p className="text-xs text-gray-400 font-bold">عضو منذ 2026</p>
                    <div className="flex items-center gap-1 mt-1">
                       {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-orange-400 fill-orange-400" />)}
                       <span className="text-[10px] text-gray-400 font-bold mr-1">(4.9)</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <button className="w-full bg-[#1A5F7A] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-md">
                     <Phone size={20} /> أظهر رقم الهاتف
                  </button>
                  <button className="w-full bg-gray-50 text-gray-700 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
                     <MessageCircle size={20} /> دردشة فورية
                  </button>
               </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-orange-50 border border-orange-100 rounded-[2rem] p-8">
               <h3 className="text-sm font-black text-orange-900 mb-4 flex items-center gap-2">
                 <ShieldCheck size={18} /> نصائح الأمان
               </h3>
               <ul className="space-y-3">
                  {['قابل البائع في مكان عام', 'افحص المنتج جيداً قبل الاستلام', 'لا ترسل أموالاً مسبقة خارج النظام'].map((tip, i) => (
                    <li key={i} className="text-xs text-orange-800/70 font-bold flex items-start gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 shrink-0"></span>
                       {tip}
                    </li>
                  ))}
               </ul>
            </div>

            <SocialMediaBox lang={lang} />

          </div>

        </div>

        {/* Related Ads Section */}
        <div className="mt-16 pt-16 border-t border-gray-100">
           <h2 className="text-2xl font-black text-gray-800 mb-8">إعلانات قد تهمك</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 group cursor-pointer"
                  onClick={() => navigate('/')}
                >
                   <div className="h-40 bg-gray-100 relative overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?auto=format&fit=crop&q=80&w=400`} 
                        alt="Related" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                      />
                   </div>
                   <div className="p-4">
                      <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">إعلان مشابه في {ad.category}</h4>
                      <p className="text-[#1A5F7A] font-black text-sm">{ad.price}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string, value: any }) => (
  <div className="space-y-1">
    <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{label}</div>
    <div className="text-sm font-black text-gray-800">{value}</div>
  </div>
);

export default AdDetailPage;
