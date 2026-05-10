import React from 'react';
import { motion } from 'motion/react';
import { Language, translations } from '../translations';

const MultilingualHero = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section className="relative h-[450px] md:h-[550px] flex items-center justify-center text-center px-4 overflow-hidden mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=2000')] bg-cover bg-center"
        aria-hidden="true"
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1A5F7A]/75 backdrop-blur-[1px]"></div>

      {/* Content */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="relative z-10 text-white max-w-4xl"
      >
        <h1 className="text-4xl md:text-7xl font-black mb-2 leading-tight tracking-tight">
          {t.hero.h1}
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold opacity-90 mb-4">
          {t.hero.h2}
        </h2>
        <h3 className="text-lg md:text-2xl font-medium text-gray-200 tracking-[0.2em] uppercase">
          {t.hero.h3}
        </h3>
        
        <div className="flex justify-center gap-2 mt-10">
          <div className="h-2 w-16 bg-[#2D8B49] rounded-full shadow-lg"></div>
          <div className="h-2 w-16 bg-[#E11C32] rounded-full shadow-lg"></div>
          <div className="h-2 w-16 bg-[#12ADEB] rounded-full shadow-lg"></div>
        </div>

        <p className="mt-8 text-gray-100 text-xs md:text-sm font-medium opacity-80">
          ኣብ ኤርትራን ወጻእን ንዘለዉ መላወጥቲ ዝዓበየ መአከቢ | أكبر تجمع للمعلنين في إريتريا وخارجها
        </p>
      </motion.div>
    </section>
  );
};

export default MultilingualHero;
