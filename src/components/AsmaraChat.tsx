import React, { useState } from 'react';
import { MessageCircle, X, Send, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../translations';

interface AsmaraChatProps {
  lang: Language;
}

const AsmaraChat = ({ lang }: AsmaraChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const t = {
    ar: { title: "دردشة أسمرة", welcome: "مرحباً! كيف يمكننا مساعدتك؟", placeholder: "اكتب رسالتك هنا...", bot: "بوت أسمرة" },
    ti: { title: "ዕላል ኣስማራ", welcome: "ሰላም! ከመይ ክንሕግዘካ ንኽእል፧", placeholder: "ኣብዚ ጸሓፍ...", bot: "ኣስማራ ቦት" },
    en: { title: "Asmara Chat", welcome: "Hello! How can we help you?", placeholder: "Type your message...", bot: "Asmara Bot" }
  }[lang];

  return (
    <div className="fixed bottom-6 left-6 z-[1001]" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* 1. زر فتح الشات العائم */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1A5F7A] text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative border-2 border-white"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11C32] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E11C32]"></span>
          </span>
        )}
      </motion.button>

      {/* 2. نافذة الدردشة المنبثقة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-[320px] md:w-[380px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-100"
          >
            {/* رأس النافذة */}
            <div className="bg-[#1A5F7A] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-black text-sm">{t.title}</h4>
                  <div className="flex items-center gap-1 text-[10px] opacity-80">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    متصل الآن • ሕጂ ኣሎ
                  </div>
                </div>
              </div>
            </div>

            {/* منطقة الرسائل */}
            <div className="h-[300px] p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {/* رسالة الترحيب من البوت */}
              <div className="flex flex-col items-start max-w-[80%]">
                <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-sm border border-gray-100 text-sm text-gray-700 font-medium">
                  {t.welcome}
                </div>
                <span className="text-[9px] text-gray-400 mt-1 flex items-center gap-1">
                  <ShieldCheck size={10} className="text-[#2D8B49]" /> {t.bot}
                </span>
              </div>
            </div>

            {/* منطقة الإدخال */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2 gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.placeholder}
                  className="bg-transparent w-full outline-none text-sm py-2"
                />
                <button className="text-[#1A5F7A] hover:scale-110 transition-transform">
                  <Send size={20} className={lang !== 'en' ? 'rotate-180' : ''} />
                </button>
              </div>
              <p className="text-[9px] text-center text-gray-400 mt-3 italic">
                ኢሜይል ወይ ቁጽሪ ቴሌፎን ኣይትሃቡ | لا تشارك بياناتك البنكية هنا
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AsmaraChat;
