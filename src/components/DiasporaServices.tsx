import React from 'react';
import { Home, Truck, CreditCard, Plane, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language, translations } from '../translations';

interface DiasporaServicesProps {
  lang: Language;
}

const DiasporaServices = ({ lang }: DiasporaServicesProps) => {
  const t = translations[lang];

  const services = [
    { id: "property", icon: <Home className="text-[#2D8B49]" />, key: "s1" },
    { id: "shipping", icon: <Truck className="text-[#12ADEB]" />, key: "s2" },
    { id: "gifts", icon: <CreditCard className="text-[#E11C32]" />, key: "s3" }
  ];

  return (
    <section id="diaspora" className="py-20 max-w-6xl mx-auto px-4">
      <div className={`mb-12 text-center ${lang === 'en' ? 'md:text-left' : 'md:text-right'}`}>
        <span className="text-[#2D8B49] font-black tracking-widest uppercase text-sm">{t.diaspora.tag}</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#1A5F7A] mt-2">{t.diaspora.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div 
            whileHover={{ y: -10 }}
            key={service.id} 
            className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-50 transition-all text-start"
          >
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-black text-[#1A5F7A] mb-2">{(t.diaspora as any)[service.key].t}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{(t.diaspora as any)[service.key].d}</p>
            <Link to={`/service/${service.id}`} className="inline-flex items-center gap-2 font-bold text-[#E11C32] hover:underline">
              {t.diaspora.details} <Plane size={16} className={lang === 'en' ? 'rotate-45' : 'rotate-[-45deg]'} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DiasporaServices;
