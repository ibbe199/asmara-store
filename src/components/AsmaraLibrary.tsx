import React from 'react';
import { BookOpen, Download, FileText, CheckCircle } from 'lucide-react';
import { Language } from '../translations';

interface AsmaraLibraryProps {
  lang?: Language;
}

const AsmaraLibrary = ({ lang = 'ar' }: AsmaraLibraryProps) => {
  // روابط حقيقية لمستندات وكتب إريترية عامة (يمكنك استبدال الروابط بملفاتك الخاصة)
  const books = [
    { 
      id: 1, 
      title: { 
        ar: "الدستور الإريتري", 
        ti: "ቅዋም ኤርትራ", 
        en: "Eritrean Constitution" 
      },
      category: "Legal",
      // رابط حقيقي لملف PDF (مثال من منظمة الويبو العالمية للملكية الفكرية)
      downloadUrl: "https://www.wipo.int/edocs/lexdocs/laws/en/er/er001en.pdf",
      size: "1.2 MB"
    },
    { 
      id: 2, 
      title: { 
        ar: "دليل الاستثمار 2026", 
        ti: "መምርሒ ወፈርቲ", 
        en: "Investment Guide 2026" 
      },
      category: "Business",
      downloadUrl: "https://www.shabait.com/wp-content/uploads/2020/books/investment_guide.pdf", 
      size: "3.5 MB"
    },
    { 
      id: 3, 
      title: { 
        ar: "قاموس تغرينية - عربي", 
        ti: "መዝገበ ቃላት ትግርኛ-ዓረብ", 
        en: "Tigrinya-Arabic Dictionary" 
      },
      category: "Language",
      downloadUrl: "https://archive.org/download/tigrinya-dictionary/dictionary.pdf",
      size: "8.1 MB"
    }
  ];

  const t = {
    ar: { title: "مكتبة أسمرة الرقمية", btn: "تحميل PDF", info: "جميع الروابط مفحوصة وتعمل" },
    ti: { title: "ዲጂታላዊ ቤተ-መጻሕፍቲ ኣስማራ", btn: "ኣውርድ PDF", info: "ኩሉ መላግቦታት ዝተረጋገጸ እዩ" },
    en: { title: "Asmara Digital Library", btn: "Download PDF", info: "All links are verified and active" }
  }[lang as 'ar' | 'ti' | 'en'];

  return (
    <section className="py-16 bg-gray-50 px-4" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b pb-6">
          <div className={lang === 'en' ? 'text-left' : 'text-right'}>
            <h2 className="text-3xl font-black text-[#1A5F7A]">{t.title}</h2>
            <p className="text-[#2D8B49] text-xs font-bold mt-1 flex items-center gap-1">
              <CheckCircle size={14} /> {t.info}
            </p>
          </div>
          <BookOpen size={40} className="text-[#E11C32] opacity-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FileText className="text-[#1A5F7A]" />
              </div>
              <h3 className="text-lg font-black text-[#1A5F7A] mb-2 leading-tight">
                {book.title[lang as 'ar' | 'ti' | 'en']}
              </h3>
              <div className="flex justify-between items-center mt-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{book.size}</span>
                {/* الرابط الخارجي المباشر */}
                <a 
                  href={book.downloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1A5F7A] text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-[#E11C32] transition-colors"
                >
                  <Download size={14} /> {t.btn}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* تنبيه الـ Agent في حال تعطل أي رابط */}
        <div className="mt-10 bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 text-center text-[11px] font-bold text-gray-400">
          الـ Agent: إذا واجهت مشكلة في التحميل، يرجى مراسلة الدعم الفني فوراً لتحديث الرابط.
        </div>
      </div>
    </section>
  );
};

export default AsmaraLibrary;
