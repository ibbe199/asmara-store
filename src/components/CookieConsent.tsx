import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Language } from '../translations';

interface CookieConsentProps {
  lang?: Language;
}

const CookieConsent = ({ lang = 'ar' }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  const t = {
    ar: {
      title: "ملفات تعريف الارتباط (Cookies)",
      desc: "نحن نستخدم ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة على موقعنا. من خلال الاستمرار في التصفح، فإنك توافق على استخدامنا لها.",
      accept: "أوافق",
      decline: "إغلاق"
    },
    en: {
      title: "Cookies Policy",
      desc: "We use cookies to ensure you get the best experience on our website. By continuing to browse, you agree to our use of cookies.",
      accept: "Accept",
      decline: "Close"
    },
    ti: {
      title: "ናይ ኩኪስ (Cookies) ፖሊሲ",
      desc: "ኣብ መርበብ ሓበሬታና ዝበለጸ ተመክሮ ንክትረክብ ኩኪስ ንጥቀም ኢና። ብምቕጻልካ ኣብ ኣጠቓቕማና ትሰማማዕ ኣለኻ።",
      accept: "እሰማማዕ",
      decline: "ዕጸው"
    }
  }[lang as 'ar' | 'en' | 'ti'];

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      dir={lang === 'en' ? 'ltr' : 'rtl'}
    >
      <div className="flex items-start gap-4">
        <div className="bg-orange-100 p-2 rounded-full text-orange-600">
          <Cookie size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">{t.title}</h3>
            <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {t.desc}
          </p>
          <div className="flex gap-3">
            <button 
              onClick={handleAccept}
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-orange-600 transition-colors text-sm"
            >
              {t.accept}
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
