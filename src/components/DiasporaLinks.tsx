import React from 'react';
import { Truck, Gift, HardHat, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../translations';

interface DiasporaLinksProps {
  lang: Language;
  searchTerm?: string;
}

const DiasporaLinks = ({ lang, searchTerm = '' }: DiasporaLinksProps) => {
  const allServices = [
    { 
      id: 'construction', 
      title: { ar: 'بناء وإدارة العقارات', ti: 'ህንጸን ምሕደራ ኣባይቲ', en: 'Construction & Property' },
      icon: <HardHat className="text-[#2D8B49]" />,
      path: '/services/construction'
    },
    { 
      id: 'shipping', 
      title: { ar: 'شحن لوجستي ودولي', ti: 'ናይ መጓዓዝያን ሎጂስቲክስን', en: 'Shipping & Logistics' },
      icon: <Truck className="text-[#12ADEB]" />,
      path: '/services/shipping'
    },
    { 
      id: 'family-support', 
      title: { ar: 'خدمات دعم العائلات', ti: 'ኣገልግሎት ደገፍ ስድራቤት', en: 'Family Support Services' },
      icon: <Gift className="text-[#E11C32]" />,
      path: '/services/family'
    }
  ];

  const filteredServices = allServices.filter(s => 
    s.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.title.ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {filteredServices.map((service) => (
        <Link 
          key={service.id} 
          to={service.path}
          className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          {/* أيقونة الخدمة */}
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1A5F7A] group-hover:text-white transition-colors">
            {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
          </div>

          {/* نصوص الخدمة بـ 3 لغات */}
          <h3 className="text-xl font-black text-[#1A5F7A] mb-2 leading-tight">
            {service.title[lang]}
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {lang === 'ar' ? 'تواصل مع خبراء أسمرة' : 'Connect with Experts'}
          </p>

          {/* زر الانتقال الصغير */}
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
             <ArrowRight className="text-[#E11C32]" size={20} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DiasporaLinks;
