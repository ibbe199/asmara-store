import React from 'react';
import { motion } from 'motion/react';

const AsmaraPerfectHeader = () => {
  return (
    // 1. حاوية الهيدر الرئيسية (The Header Container)
    <section 
      className="relative w-full overflow-hidden bg-[#1A5F7A]" 
      // تحديد ارتفاع مناسب ومريح للهيدر على شاشة اللابتوب (min-h-[600px] أو h-[80vh])
      style={{ minHeight: '600px', height: '80vh' }} 
    >
      
      {/* 2. طبقة الصورة الخلفية (The Background Image Layer) */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat transition-all duration-500"
        style={{ 
          // استبدل هذا الرابط برابط صورة أسمرة الخاصة بك
          backgroundImage: "url('https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=2000')", 
          
          // --- الخواص السحرية لحل المشكلة ---
          backgroundSize: 'cover',   // أهم خاصية: تجعل الصورة تغطي كامل الحاوية دون تمطيط
          backgroundPosition: 'center', // تمركز الصورة في المنتصف لضمان ظهور أهم الأجزاء
        }}
      ></div>

      {/* 3. طبقة التعتيم والحماية (The Overlay Layer) */}
      {/* طبقة زرقاء داكنة شفافة لضمان بروز النصوص البيضاء فوق تفاصيل الصورة */}
      <div className="absolute inset-0 bg-[#1A5F7A] opacity-65 z-10"></div>

      {/* 4. المحتوى النصي المرفوع على واجهة المعمار (The Content Layer) */}
      <div className="container mx-auto text-center relative z-20 px-6 h-full flex flex-col items-center justify-center gap-6">
        
        {/* العلامة العلوية الوطنية */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#2D8B49] text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3 inline-block shadow-lg"
        >
          سوق إريتريا الرقمي
        </motion.span>

        {/* العنوان الرئيسي بالتغرينية والعربية */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-2 leading-tight tracking-tight text-white shadow-sm">
            ሹቕ ኣስማራ ኣብ ኢድካ
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white opacity-95">
            سوق أسمرة بين يديك
          </h2>
        </motion.div>

        {/* خطوط فاصلة تمثل العلم الوطني */}
        <div className="flex justify-center gap-1.5 my-6">
          <div className="h-1.5 w-16 bg-[#2D8B49] rounded-full shadow-md"></div> {/* أخضر */}
          <div className="h-1.5 w-16 bg-[#E11C32] rounded-full shadow-md"></div> {/* أحمر */}
          <div className="h-1.5 w-16 bg-[#12ADEB] rounded-full shadow-md"></div> {/* أزرق */}
        </div>

        {/* العنوان الفرعي بـ 3 لغات والإنجليزية */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-100 text-sm md:text-base font-medium max-w-3xl mx-auto leading-relaxed"
        >
          <span className="font-black text-white">العقارات، السيارات، والخدمات الموصلة للوطن</span>
          <br />
          <span className="text-xs md:text-sm text-gray-200 opacity-80 font-normal">
             ኣባይቲ، مካይን، ናብ ዓዲ ዘራኽቡ ኣገልግሎታት | Properties, Vehicles, Connections to Home
          </span>
        </motion.p>

        {/* زر الإجراء الرئيسي */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-10 bg-[#E11C32] text-white px-12 py-4 rounded-2xl font-black text-lg shadow-2xl hover:bg-[#c1172a] transition-all"
          onClick={() => {
            const el = document.getElementById('search');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          استكشف المعروض
        </motion.button>
      </div>
    </section>
  );
};

export default AsmaraPerfectHeader;
