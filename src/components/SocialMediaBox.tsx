import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Send, MessageCircle, ExternalLink, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../translations';

interface SocialMediaBoxProps {
  lang?: Language;
}

const SocialMediaBox = ({ lang = 'ar' }: SocialMediaBoxProps) => {
  const t = {
    ar: {
      title: "تواصل معنا",
      subtitle: "انضم إلى مجتمع أسمرة ستور",
      members: "أكثر من 50,000 عضو",
      join: "انضم الآن",
      follow: "متابعة"
    },
    en: {
      title: "Connect With Us",
      subtitle: "Join Asmara Store community",
      members: "Over 50,000 members",
      join: "Join Now",
      follow: "Follow"
    },
    ti: {
      title: "ተወከሱና",
      subtitle: "ኣብ ኣስማራ ስቶር ማሕበረሰብ ተጸንበሩ",
      members: "ልዕሊ 50,000 ኣባላት",
      join: "ሕጂ ተጸንበሩ",
      follow: "ስዓቡ"
    }
  };

  const currentT = t[lang] || t.ar;

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook size={20} />, 
      color: 'bg-[#1877F2]', 
      count: '25K',
      link: 'https://facebook.com/asmarastore'
    },
    { 
      name: 'Telegram', 
      icon: <Send size={20} />, 
      color: 'bg-[#0088cc]', 
      count: '18K',
      link: 'https://t.me/asmarastore'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={20} />, 
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', 
      count: '12K',
      link: 'https://instagram.com/asmarastore'
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle size={20} />, 
      color: 'bg-[#25D366]', 
      count: 'Groups',
      link: 'https://wa.me/asmarastore'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden relative" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Users size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#1A5F7A]/10 rounded-xl flex items-center justify-center text-[#1A5F7A]">
             <Users size={20} />
          </div>
          <div>
            <h3 className="font-black text-gray-800 leading-none">{currentT.title}</h3>
            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{currentT.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className={`flex items-center gap-3 p-3 rounded-2xl text-white ${social.color} transition-all shadow-md shadow-black/5 group`}
            >
              <div className="shrink-0 group-hover:scale-110 transition-transform">
                {social.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black leading-none opacity-80 uppercase">{social.name}</p>
                <p className="text-xs font-black mt-1">{social.count}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
           <div className="flex -space-x-2 rtl:space-x-reverse">
              {[1,2,3,4].map(n => (
                <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${n + 10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#1A5F7A] flex items-center justify-center text-[10px] text-white font-bold">
                +50k
              </div>
           </div>
           <p className="text-[10px] text-gray-500 font-bold">{currentT.members}</p>
        </div>

        <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black transition-all">
          {currentT.join} <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

export default SocialMediaBox;
