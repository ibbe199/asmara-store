import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, HardHat, Truck, Gift, Search } from 'lucide-react';
import { Language, translations } from '../translations';
import { useAsmaraAgent } from '../context/AgentContext';

const ServicePage = ({ lang }: { lang: Language }) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const t = translations[lang];
  const { trackOrder } = useAsmaraAgent();
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = () => {
    if (!trackingId) return;
    setIsTracking(true);
    alert(lang === 'ar' ? 'جاري تفعيل تتبع العميل الذكي...' : 'Activating Agent Tracking...');
    
    // Example usage of trackOrder
    const subscription = trackOrder(trackingId, (newStatus) => {
      console.log('Order Updated:', newStatus);
      alert(`Order Status Updated: ${newStatus.status}`);
    });

    // Cleanup after 30 seconds for demo
    setTimeout(() => {
      subscription.unsubscribe();
      setIsTracking(false);
    }, 30000);
  };

  const serviceInfo = {
    construction: {
      title: { ar: 'بناء وإدارة العقارات', ti: 'ህንጸን ምሕደራ ኣባይቲ', en: 'Construction & Property' },
      icon: <HardHat size={48} className="text-[#2D8B49]" />,
      desc: { 
        ar: 'نحن نساعدك في بناء وإدارة عقاراتك في إريتريا بأعلى معايير الجودة.',
        ti: 'ኣብ ኤርትራ ዘለኩም ኣባይቲ ብብቑዕ መገዲ ንምህናጽን ንምምሕዳርን ንሕግዘኩም።',
        en: 'We help you build and manage your properties in Eritrea with the highest standards.'
      }
    },
    shipping: {
      title: { ar: 'شحن لوجستي ودولي', ti: 'ናይ መጓዓዝያን ሎጂስቲክስን', en: 'Shipping & Logistics' },
      icon: <Truck size={48} className="text-[#12ADEB]" />,
      desc: { 
        ar: 'خدمات شحن آمنة وسريعة من جميع أنحاء العالم إلى إريتريا.',
        ti: 'ካብ ኩሉ ኩርናዓት ዓለም ናብ ኤርትራ ዝግበር ውሑስን ቅልጡፍን ናይ ጽዕነት ኣገልግሎት።',
        en: 'Safe and fast shipping services from all over the world to Eritrea.'
      }
    },
    family: {
      title: { ar: 'خدمات دعم العائلات', ti: 'ኣገልግሎት ደገፍ ስድራቤት', en: 'Family Support Services' },
      icon: <Gift size={48} className="text-[#E11C32]" />,
      desc: { 
        ar: 'دعم عائلتك في الوطن من خلال توفير الاحتياجات الأساسية والهدايا.',
        ti: 'ንቤተሰብካ ኣብ ሃገር ዘድልዮም መሰረታዊ ነገራትን ውህቦታትን ብምቕራብ ደገፍ ንገብር።',
        en: 'Support your family back home by providing essentials and gifts.'
      }
    }
  };

  const info = serviceInfo[type as keyof typeof serviceInfo];

  if (!info) return <div className="p-20 text-center">Service not found</div>;

  return (
    <div className="min-h-screen bg-white py-20 px-4" dir={t.dir}>
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#1A5F7A] font-bold mb-10 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} className={t.dir === 'rtl' ? 'rotate-180' : ''} />
          {t.backToStore}
        </button>

        <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 text-center">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
            {info.icon}
          </div>
          <h1 className="text-4xl font-black text-[#1A5F7A] mb-6 tracking-tight">
            {info.title[lang]}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
            {info.desc[lang]}
          </p>

          <div className="mt-12 flex flex-col gap-6">
            <div className="flex gap-4">
              <button 
                className="flex-1 bg-[#1A5F7A] text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:bg-[#144a5f] transition-all active:scale-95"
                onClick={() => alert('Coming Soon: Expert Consultation')}
              >
                {lang === 'ar' ? 'تحدث مع خبير' : lang === 'ti' ? 'ምስ ክኢላ ተዛረብ' : 'Talk to an Expert'}
              </button>
            </div>

            {/* Agent Tracking Section */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-4">
              <h3 className="text-[#1A5F7A] font-black text-sm mb-4 uppercase tracking-tighter flex items-center justify-center gap-2">
                <Search size={16} /> {lang === 'ar' ? 'تتبع طلبك عبر العميل الذكي' : 'Track Order via Smart Agent'}
              </h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={lang === 'ar' ? 'أدخل رقم الطلب...' : 'Enter Order ID...'}
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                />
                <button 
                  onClick={handleTrack}
                  disabled={isTracking}
                  className="bg-[#E11C32] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {isTracking ? (lang === 'ar' ? 'جاري التتبع...' : 'Tracking...') : (lang === 'ar' ? 'تتبع' : 'Track')}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 italic">
                {lang === 'ar' ? 'سيقوم العميل الذكي بتنبيهك فور حدوث أي تحديث في حالة طلبك.' : 'The smart agent will notify you as soon as there is an update on your order status.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
