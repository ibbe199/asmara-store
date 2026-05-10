import React from 'react';
import Logo from './Logo';
import { Facebook, Instagram, Send, ShieldAlert, Globe, ChevronDown } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang];
  
  const disclaimer = {
    ar: "إخلاء مسؤولية: الموقع هو منصة إعلانية فقط ولا نتحمل مسؤولية الاتفاقات المالية بين الأطراف.",
    ti: "ናይ ሓላፍነት ደረት፦ እዚ ሳይት መላለዪ ጥራይ እዩ፡ ኣብ መንጎ ተጠቀምቲ ንዝግበር ውዕላት ሓላፍነት ኣይንወስድን።",
    en: "Disclaimer: This is an advertising platform. We are not responsible for financial agreements between parties."
  };

  return (
    <footer className="mt-20 bg-[#232f3e] text-white pt-10" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* Back to top */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white py-4 text-xs font-bold transition-all mb-10"
      >
        {lang === 'en' ? 'Back to top' : 'العودة للأعلى'}
      </button>

      <div className="container mx-auto px-4 md:px-20">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          <div>
            <h4 className="font-bold mb-4">{lang === 'en' ? 'Get to Know Us' : 'تعرف علينا'}</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">About Asmara Store</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Ministry of Trade</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{lang === 'en' ? 'Partner with Us' : 'كن شريكاً معنا'}</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Asmara Store</li>
              <li className="hover:underline cursor-pointer">Local Agents</li>
              <li className="hover:underline cursor-pointer">Diaspora Shipping</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{lang === 'en' ? 'Let Us Help You' : 'المساعدة'}</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Fees & Pricing</li>
              <li className="hover:underline cursor-pointer">Track Orders</li>
              <li className="hover:underline cursor-pointer">Contact Agent</li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <Logo align={lang === 'en' ? 'start' : 'start'} className="scale-75 md:scale-90 origin-left mb-4" />
            <div className="flex gap-4 text-gray-400">
               <a href="#" className="hover:text-[#F3CE82] transition-all"><Facebook size={18} /></a>
               <a href="#" className="hover:text-[#F3CE82] transition-all"><Instagram size={18} /></a>
               <a href="#" className="hover:text-[#F3CE82] transition-all"><Send size={18} /></a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Legal */}
        <div className="py-10 flex flex-col items-center gap-6">
           <div className="max-w-3xl bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <ShieldAlert className="text-[#F3CE82] shrink-0" size={24} />
              <p className="text-gray-400 text-xs leading-relaxed">
                {disclaimer[lang] || disclaimer.en}
              </p>
           </div>
           
           <div className="text-center">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-4">
                 <a href="#" className="hover:underline">Conditions of Use</a>
                 <a href="#" className="hover:underline">Privacy Notice</a>
                 <a href="#" className="hover:underline">Cookies</a>
              </div>
              <p className="text-[10px] text-gray-500">
                © 2026 Asmara.store • Eritrea • Ethiopia • Sudan • Diaspora
              </p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
