import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Home, Truck, CreditCard, ShieldCheck, Star, Globe, Phone, MessageCircle, User } from 'lucide-react';
import { Language, translations } from '../translations';
import Navbar from './Navbar';
import Footer from './Footer';

import { User as SupabaseUser } from '@supabase/supabase-js';

interface ServiceDetailProps {
  lang: Language;
  user: SupabaseUser | null;
  onViewChange: (view: any) => void;
  setLang: (lang: Language) => void;
  setUser: (user: SupabaseUser | null) => void;
}

const ServiceDetail = ({ lang, user, onViewChange, setLang, setUser }: ServiceDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = translations[lang];

  const services = [
    { 
      id: "property",
      title: "بناء وإدارة العقارات", 
      titleTi: "ህንጸን ምሕደራን ኣባይቲ", 
      titleEn: "Property Construction & Management",
      icon: <Home className="text-[#2D8B49]" size={48} />, 
      image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=1200",
      desc: {
        ar: "نحن نوفر لك راحة البال التامة. من شراء الأرض إلى تسليم المفتاح، نقوم بالإشراف على كل خطوة في بناء منزلك في إريتريا. نوفر لك تقارير دورية، صوراً مباشرة، وفيديوهات لمراحل البناء لضمان الجودة والالتزام بالمواعيد.",
        ti: "ምሉእ ዕረፍቲ ንህበካ። ካብ መሬት ምዕዳግ ጀሚርካ ክሳብ መፍትሕ ምርካብ፡ ኣብ ኤርትራ ኣብ ዝካየድ ህንጸት ገዛኻ ነፍሲ ወከፍ ስጉምቲ ንከታተል። ንጽሬትን ንግዜን ንምርግጋጽ ስሩዕ ጸብጻባት፡ ቀጥታዊ ስእልታትን ቪድዮታትን ናይ ህንጸት ደረጃታት ነቕርብ።",
        en: "We provide you with complete peace of mind. From land purchase to key delivery, we supervise every step of building your home in Eritrea. We provide you with regular reports, live photos, and videos of construction stages to ensure quality and adherence to deadlines."
      }
    },
    { 
      id: "shipping",
      title: "شحن سيارات وأمتعة", 
      titleTi: "መካይንን ኣቑሑትን ምልኣኽ", 
      titleEn: "Car & Luggage Shipping",
      icon: <Truck className="text-[#12ADEB]" size={48} />, 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
      desc: {
        ar: "خدمة شحن موثوقة وسريعة من جميع أنحاء العالم إلى إريتريا. نتولى كافة الإجراءات الجمركية والتخليص في ميناء مصوع لضمان وصول ممتلكاتك بأمان وبأقل التكاليف.",
        ti: "ካብ መላእ ዓለም ናብ ኤርትራ ዝወሃብ እሙንን ቅልጡፍን ናይ ጽዕነት ኣገልግሎት። ንብረትካ ብሰላምን ብውሑድ ወጻኢታትን ንኽበጽሕ፡ ኩሉ ናይ ጉምሩክ ስነስርዓታትን ኣብ ወደብ ምጽዋዕ ዝካየድ ምጽራይን ንከታተል።",
        en: "Reliable and fast shipping service from all over the world to Eritrea. We handle all customs procedures and clearance at Massawa port to ensure your belongings arrive safely and at the lowest costs."
      }
    },
    { 
      id: "gifts",
      title: "هدايا وقسائم شراء", 
      titleTi: "ውህቦታትን ናይ መግዝኢ ወረቐትን", 
      titleEn: "Gifts & Shopping Vouchers",
      icon: <CreditCard className="text-[#E11C32]" size={48} />, 
      image: "https://images.unsplash.com/photo-1549463591-24c1876d7acd?auto=format&fit=crop&q=80&w=1200",
      desc: {
        ar: "اجعل أهلك يشعرون بوجودك بجانبهم. يمكنك الآن شراء قسائم تسوق من أكبر المتاجر في أسمرة، أو طلب سلال غذائية متكاملة يتم تسليمها لباب المنزل فوراً بعد الدفع الإلكتروني.",
        ti: "ቤተሰብካ ኣብ ጥቓኦም ከምዘለኻ ንኽስምዖም ግበር። ሕጂ ካብቶም ኣብ ኣስመራ ዘለዉ ዓበይቲ ድኳናት ናይ መግዝኢ ወረቐት ክትገዝእ ትኽእል ኢኻ፡ ወይ ድማ ብኤሌክትሮኒካዊ መንገዲ ምስ ከፈልካ ብቕጽበት ናብ ገዛ ዝበጽሕ ምሉእ ናይ መግቢ ሰክላታት ክትእዝዝ ትኽእል ኢኻ።",
        en: "Make your family feel your presence beside them. You can now buy shopping vouchers from the largest stores in Asmara, or order complete food baskets delivered to the doorstep immediately after electronic payment."
      }
    }
  ];

  const service = services.find(s => s.id === id) || services[0];
  const serviceKey = service.id === 'property' ? 's1' : service.id === 'shipping' ? 's2' : 's3';
  const serviceTitle = (translations[lang].diaspora as any)[serviceKey].t;
  const serviceTitleTi = (translations['ti'].diaspora as any)[serviceKey].t;

  return (
    <div className="min-h-screen bg-gray-50" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <main className="max-w-4xl mx-auto py-12 px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#1A5F7A] font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={20} className={lang === 'en' ? '' : 'rotate-180'} />
          <span>{t.backToStore}</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5"
        >
          <div className="h-64 md:h-96 relative">
            <img 
              src={service.image} 
              alt={serviceTitle} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl font-black mb-2">
                  {serviceTitle}
                </h1>
                <p className="text-white/80 font-bold">{serviceTitleTi}</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A5F7A]">{t.storeName} - {t.dashboard}</h3>
                  <p className="text-gray-400 text-sm">خدمة موثوقة ومعتمدة</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/advertiser/asmara-store')}
                className="flex items-center gap-2 text-[#1A5F7A] font-bold bg-gray-50 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
              >
                <User size={20} />
                <span>{lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}</span>
              </button>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {service.desc[lang]}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl text-[#2D8B49]">
                <ShieldCheck size={24} />
                <span className="font-bold text-sm">ضمان الجودة</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl text-[#12ADEB]">
                <Star size={24} />
                <span className="font-bold text-sm">خدمة ممتازة</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl text-[#E11C32]">
                <Globe size={24} />
                <span className="font-bold text-sm">تغطية شاملة</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#1A5F7A] text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-lg shadow-blue-900/20">
                <Phone size={24} /> {lang === 'en' ? 'Call Us Now' : lang === 'ti' ? 'ሕጂ ደውሉልና' : 'اتصل بنا الآن'}
              </button>
              <button className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-lg shadow-green-900/20">
                <MessageCircle size={24} /> {lang === 'en' ? 'WhatsApp Us' : lang === 'ti' ? 'ብዋትሳፕ ኣዘራርቡና' : 'تواصل عبر واتساب'}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default ServiceDetail;
