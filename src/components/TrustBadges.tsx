import React from 'react';
import { Star, ShieldCheck, Globe } from 'lucide-react';
import { Language } from '../translations';

interface TrustBadgesProps {
  lang: Language;
}

const TrustBadges = ({ lang }: TrustBadgesProps) => {
  const content = {
    ar: [
      { icon: <ShieldCheck className="text-[#FFC107]" />, text: "دفع آمن عبر PayPal" },
      { icon: <Star className="text-[#FFC107]" />, text: "تقييمات حقيقية للمعلنين" },
      { icon: <Globe className="text-[#FFC107]" />, text: "دعم لغات (العربية/التغرينية/الإنجليزية)" }
    ],
    ti: [
      { icon: <ShieldCheck className="text-[#FFC107]" />, text: "ብPayPal ውሑስ ክፍሊት" },
      { icon: <Star className="text-[#FFC107]" />, text: "ንመላወጥቲ ዝወሃብ ናይ ሓቂ ገምጋም" },
      { icon: <Globe className="text-[#FFC107]" />, text: "ደገፍ ቋንቋታት (ዓረብ/ትግርኛ/እንግሊዝ)" }
    ],
    en: [
      { icon: <ShieldCheck className="text-[#FFC107]" />, text: "Secure payment via PayPal" },
      { icon: <Star className="text-[#FFC107]" />, text: "Real advertiser ratings" },
      { icon: <Globe className="text-[#FFC107]" />, text: "Multilingual support (AR/TI/EN)" }
    ]
  };

  return (
    <section className="bg-[#1A5F7A] py-10">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-10 px-4">
        {content[lang].map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-white">
            {item.icon}
            <span className="font-bold">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
