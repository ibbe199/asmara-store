import React, { useState, useEffect } from 'react';
import { 
  Camera, MapPin, Tag, Landmark, Truck, Briefcase, Hotel, 
  ChevronLeft, ChevronRight, UploadCloud, Cpu, CheckCircle2, Sparkles, Wand2, Loader2, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../translations';
import { useAsmaraAgent } from '../context/AgentContext';
import { ERITREA_REGIONS } from '../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const PostAdPage = ({ lang = 'ar', user, isEdit = false }: { lang?: Language, user: SupabaseUser | null, isEdit?: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { processNewAdWithAgent, generateAIImage } = useAsmaraAgent();
  
  // حالات الإدخال (Inputs State)
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  
  // Category specific states
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState('');
  
  const [propertyRooms, setPropertyRooms] = useState('');
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyFurnished, setPropertyFurnished] = useState(false);
  
  const [electronicsCondition, setElectronicsCondition] = useState('new');
  const [electronicsBrand, setElectronicsBrand] = useState('');
  
  const [jobType, setJobType] = useState('full-time');
  const [jobSalaryRange, setJobSalaryRange] = useState('');

  const [images, setImages] = useState<File[]>([]); // لحفظ ملفات الصور
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // لحفظ روابط العرض
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [proposedAiImage, setProposedAiImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [aiKeywords, setAiKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState<'idle' | 'uploading' | 'processed'>('idle'); // idle, uploading, processed
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      async function fetchAdForEdit() {
        try {
          const { data, error } = await supabase
            .from('ads')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          if (data) {
            // Check ownership
            if (data.user_id !== user?.id) {
              alert(lang === 'ar' ? 'ليس لديك صلاحية لتعديل هذا الإعلان' : 'You do not have permission to edit this ad');
              navigate('/dashboard');
              return;
            }

            setAdTitle(data.title);
            setAdDescription(data.description);
            setPrice(data.price);
            setLocation(data.location);
            setSelectedCategory(data.category);
            setPreviewUrls([data.image_url]);
            
            // Category fields
            if (data.car_model) setCarModel(data.car_model);
            if (data.car_year) setCarYear(data.car_year.toString());
            if (data.car_mileage) setCarMileage(data.car_mileage.toString());
            if (data.property_rooms) setPropertyRooms(data.property_rooms.toString());
            if (data.property_area) setPropertyArea(data.property_area.toString());
            if (data.property_furnished !== undefined) setPropertyFurnished(data.property_furnished);
            if (data.job_type) setJobType(data.job_type);
            if (data.salary_range) setJobSalaryRange(data.salary_range);
            if (data.condition) setElectronicsCondition(data.condition);
            if (data.brand) setElectronicsBrand(data.brand);
            
            setUploadingStatus('processed');
          }
        } catch (err) {
          console.error('Error fetching ad for edit:', err);
        }
      }
      fetchAdForEdit();
    }
  }, [isEdit, id]);

  const t = {
    ar: { 
      title: "نشر إعلان جديد", 
      step1: "الفئة والأساسيات", 
      step2: "الصور والتفاصيل", 
      step3: "المراجعة الذكية", 
      titlePlaceholder: "عنوان الإعلان (مثلاً: سيارة تويوتا للبيع)", 
      descPlaceholder: "اكتب تفاصيل الإعلان هنا...", 
      price: "السعر (نقفا إريتري)", 
      location: "الموقع في أسمرة", 
      photos: "إضافة صور (حتى 10)", 
      aiGenerate: "توليد صورة بالذكاء الاصطناعي",
      aiKeywordsPlaceholder: "أدخل كلمات مفتاحية للصورة (مثلاً: سيارة فارهة، موديل حديث)",
      generating: "جاري التوليد...",
      aiAccept: "قبول الصورة",
      aiRegenerate: "توليد مرة أخرى",
      aiDiscard: "إلغاء",
      agentCheck: "الـ Agent يقوم بفحص الصور الآن...", 
      publish: "نشر ومشاركة الإعلان", 
      back: "العودة",
      carModel: "موديل السيارة",
      carYear: "سنة الصنع",
      carMileage: "المسافة المقطوعة (كم)",
      propertyRooms: "عدد الغرف",
      propertyArea: "المساحة (م²)",
      propertyFurnished: "مفروش",
      electronicsCondition: "الحالة",
      electronicsBrand: "الماركة",
      jobType: "نوع الوظيفة",
      jobSalaryRange: "الراتب المتوقع",
      new: "جديد",
      used: "مستعمل",
      fullTime: "دوام كامل",
      partTime: "دوام جزئي"
    },
    ti: { 
      title: "ሓድሽ መላለዪ ጻሓፍ", 
      step1: "ዓይነትን መሰረታውያንን", 
      step2: "ስእልታትን ዝርዝርን", 
      step3: "ናይ ወكيል ፍተሻ", 
      titlePlaceholder: "ኣርእስቲ መላለዪ (ንኣብነት፦ መኪና ቶዮታ ንሽያጭ)", 
      descPlaceholder: "ዝርዝር መላለዪ ኣብዚ ጻሓፍ...", 
      price: "ዋጋ (ER-Nafa)", 
      location: "ቦታ ኣብ ኣስማራ", 
      photos: "ስእሊ ወስኽ (ክሳብ 10)", 
      aiGenerate: "ብናይ ስነ-ጥበብ ብልሒ ስእሊ ፍጠር",
      aiKeywordsPlaceholder: "ንእቲ ስእሊ ዝገልጹ ቃላት (ንኣብነት፦ ጽብቕቲ መኪና)",
      generating: "ይፍጠር ኣሎ...",
      aiAccept: "ስእሊ ተቐበል",
      aiRegenerate: "እንደገና ፍጠር",
      aiDiscard: "ሰርዝ",
      agentCheck: "ወኪል ንስእልታትካ ይፍትሽ ኣሎ...", 
      publish: "መላለዪ ዘርግብ", 
      back: "ተመለስ",
      carModel: "ሞዴል መኪና",
      carYear: "ዓመተ ምህረት",
      carMileage: "ዝተጓዓዘቶ ርሕቀት (ኪ.ሜ)",
      propertyRooms: "ብዝሒ ክፍልታት",
      propertyArea: "ስፍሓት (ሜ²)",
      propertyFurnished: "ቤት መሳርሒ ዘለዎ",
      electronicsCondition: "ኩነታት",
      electronicsBrand: "ማርካ",
      jobType: "ዓይነት ስራሕ",
      jobSalaryRange: "ትጽቢት ዝግበረሉ ደመወዝ",
      new: "ሓድሽ",
      used: "ጥቁም",
      fullTime: "ሙሉእ ግዜ",
      partTime: "ክፋል ግዜ"
    },
    en: { 
      title: "Post New Ad", 
      step1: "Category & Basics", 
      step2: "Photos & Details", 
      step3: "Agent Review", 
      titlePlaceholder: "Ad Title (e.g., Toyota Car for Sale)", 
      descPlaceholder: "Write ad details here...", 
      price: "Price (ERN)", 
      location: "Location in Asmara", 
      photos: "Add Photos (up to 10)", 
      aiGenerate: "Generate AI Image",
      aiKeywordsPlaceholder: "Enter keywords for image (e.g., luxury car, modern model)",
      generating: "Generating...",
      aiAccept: "Accept Image",
      aiRegenerate: "Regenerate",
      aiDiscard: "Discard",
      agentCheck: "Agent is reviewing photos now...", 
      publish: "Publish Ad", 
      back: "Back",
      carModel: "Car Model",
      carYear: "Manufacturing Year",
      carMileage: "Mileage (km)",
      propertyRooms: "Rooms Count",
      propertyArea: "Area (sq.m)",
      propertyFurnished: "Furnished",
      electronicsCondition: "Condition",
      electronicsBrand: "Brand",
      jobType: "Job Type",
      jobSalaryRange: "Expected Salary",
      new: "New",
      used: "Used",
      fullTime: "Full Time",
      partTime: "Part Time"
    }
  }[lang as 'ar' | 'ti' | 'en'];

  const categories = [
    { id: 'cars', label: { ar: 'سيارات', ti: 'መካይን', en: 'Cars' }, icon: <Truck /> },
    { id: 'property', label: { ar: 'عقارات', ti: 'ኣባይቲ', en: 'Property' }, icon: <Landmark /> },
    { id: 'electronics', label: { ar: 'إلكترونيات', ti: 'ኤለክትሮኒክስ', en: 'Electronics' }, icon: <Cpu /> },
    { id: 'jobs', label: { ar: 'وظائف', ti: 'ስራሕ', en: 'Jobs' }, icon: <Briefcase /> },
    { id: 'hotels', label: { ar: 'فنادق', ti: 'ሆተላት', en: 'Hotels' }, icon: <Hotel /> }
  ];

  // محاكاة رفع الصور وفحص الـ Agent
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: File[] = [];
    
    if ('files' in e.target && e.target.files) {
      files = Array.from(e.target.files) as File[];
    } else if ('dataTransfer' in e) {
      files = Array.from(e.dataTransfer.files) as File[];
    }

    if (files.length > 0) {
      const remainingSlots = 10 - images.length;
      if (remainingSlots <= 0) {
        alert(lang === 'ar' ? 'لقد وصلت للحد الأقصى (10 صور)' : 'Maximum 10 photos reached');
        return;
      }

      const nextFiles = files.slice(0, remainingSlots);
      setImages(prev => [...prev, ...nextFiles]);
      
      const newUrls = nextFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => {
        const updated = [...prev, ...newUrls];
        setActiveImageIndex(updated.length - 1);
        return updated;
      });

      // محاكاة الفحص الذكي
      setUploadingStatus('uploading');
      setTimeout(() => {
        setUploadingStatus('processed');
      }, 2000); // 2 ثانية للفحص
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]);
      const filtered = newUrls.filter((_, i) => i !== index);
      if (activeImageIndex >= filtered.length && filtered.length > 0) {
        setActiveImageIndex(filtered.length - 1);
      } else if (filtered.length === 0) {
        setActiveImageIndex(0);
      }
      return filtered;
    });
    if (previewUrls.length <= 1) setUploadingStatus('idle');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handlePhotoUpload(e);
  };

  const handleGenerateAIImage = async () => {
    if (!aiKeywords) {
      alert(lang === 'ar' ? 'يرجى إدخال كلمات مفتاحية' : 'Please enter keywords');
      return;
    }

    setIsGenerating(true);
    setProposedAiImage(null);
    try {
      const imageUrl = await generateAIImage(aiKeywords);
      if (imageUrl) {
        setProposedAiImage(imageUrl);
      } else {
        alert(lang === 'ar' ? 'فشل توليد الصورة' : 'Failed to generate image');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptAiImage = () => {
    if (proposedAiImage) {
      if (previewUrls.length >= 10) {
        alert(lang === 'ar' ? 'لقد وصلت للحد الأقصى (10 صور)' : 'Maximum 10 photos reached');
        setProposedAiImage(null);
        return;
      }
      setPreviewUrls(prev => {
        const updated = [...prev, proposedAiImage];
        setActiveImageIndex(updated.length - 1);
        return updated;
      });
      setProposedAiImage(null);
      setUploadingStatus('processed');
    }
  };

  const handlePublish = async () => {
    if (!adTitle || !selectedCategory) {
      alert(lang === 'ar' ? 'يرجى إكمال البيانات الأساسية' : 'Please complete basic info');
      return;
    }

    setUploadingStatus('uploading');
    
    // Collect category-specific details
    const categoryDetails: any = {};
    if (selectedCategory === 'cars') {
      categoryDetails.car_model = carModel;
      categoryDetails.car_year = carYear;
      categoryDetails.car_mileage = carMileage;
    } else if (selectedCategory === 'property') {
      categoryDetails.property_rooms = propertyRooms;
      categoryDetails.property_area = propertyArea;
      categoryDetails.property_furnished = propertyFurnished;
    } else if (selectedCategory === 'electronics') {
      categoryDetails.condition = electronicsCondition;
      categoryDetails.brand = electronicsBrand;
    } else if (selectedCategory === 'jobs') {
      categoryDetails.job_type = jobType;
      categoryDetails.salary_range = jobSalaryRange;
    }

    const adData = {
      title: adTitle,
      description: adDescription,
      price: price,
      location: location,
      category: selectedCategory,
      user_id: user?.id || 'mock-user-id',
      ...categoryDetails,
      image_url: previewUrls[0] || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800'
    };

    if (isEdit && id) {
       // Manual Update if Editing
       try {
         const { error } = await supabase
          .from('ads')
          .update(adData)
          .eq('id', id);
         
         if (error) throw error;
         alert(lang === 'ar' ? 'تم تحديث الإعلان بنجاح!' : 'Ad updated successfully!');
         navigate('/dashboard');
         return;
       } catch (err: any) {
         alert(err.message || 'فشل تحديث الإعلان');
         setUploadingStatus('idle');
         return;
       }
    }

    const result = await processNewAdWithAgent(adData);

    if (result && result.status !== 'rejected') {
      alert(lang === 'ar' ? 'تم النشر بنجاح!' : 'Published successfully!');
      navigate('/');
    } else if (result && result.status === 'rejected') {
      alert(result.reason);
      setUploadingStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <header className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-black text-[#1A5F7A]">{isEdit ? (lang === 'ar' ? 'تعديل الإعلان' : 'Edit Ad') : t.title}</h1>
          <p className="text-gray-400 text-sm mt-1 italic">ኣስማራ ስቶር - ቀጥታ ናብ ዓዲ ዘራኽብ</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#1A5F7A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md flex items-center gap-2"
        >
          {t.back} <ChevronRight size={16} className={lang !== 'en' ? 'rotate-180' : ''} />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* أ. لوحة التفاصيل الرئيسية (Details Panel) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. اختيار الفئة */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
             <h3 className="text-lg font-black text-[#1A5F7A] mb-4 underline decoration-[#E11C32]">{t.step1}</h3>
             <div className="grid grid-cols-3 gap-4">
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${
                      selectedCategory === cat.id ? 'bg-[#1A5F7A] text-white border-[#1A5F7A]' : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className={`${selectedCategory === cat.id ? 'text-white' : 'text-[#12ADEB]'} opacity-80`}>{cat.icon}</div>
                    <span className="font-bold text-sm">{cat.label[lang as 'ar' | 'ti' | 'en']}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* 1.5. Category Specific Fields */}
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4"
              >
                <h3 className="text-lg font-black text-[#1A5F7A] mb-2">{lang === 'en' ? 'More Details' : 'تفاصيل إضافية'}</h3>
                
                {selectedCategory === 'cars' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder={t.carModel} 
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                    <input 
                      type="number" 
                      placeholder={t.carYear} 
                      value={carYear}
                      onChange={(e) => setCarYear(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                    <input 
                      type="number" 
                      placeholder={t.carMileage} 
                      value={carMileage}
                      onChange={(e) => setCarMileage(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                  </div>
                )}

                {selectedCategory === 'property' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      placeholder={t.propertyRooms} 
                      value={propertyRooms}
                      onChange={(e) => setPropertyRooms(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                    <input 
                      type="number" 
                      placeholder={t.propertyArea} 
                      value={propertyArea}
                      onChange={(e) => setPropertyArea(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                    <label className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold md:col-span-2">
                       <input 
                         type="checkbox" 
                         checked={propertyFurnished}
                         onChange={(e) => setPropertyFurnished(e.target.checked)}
                         className="w-5 h-5 rounded accent-[#1A5F7A]"
                       />
                       <span>{t.propertyFurnished}</span>
                    </label>
                  </div>
                )}

                {selectedCategory === 'jobs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select 
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    >
                      <option value="full-time">{t.fullTime}</option>
                      <option value="part-time">{t.partTime}</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder={t.jobSalaryRange} 
                      value={jobSalaryRange}
                      onChange={(e) => setJobSalaryRange(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                  </div>
                )}

                {selectedCategory === 'electronics' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select 
                      value={electronicsCondition}
                      onChange={(e) => setElectronicsCondition(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    >
                      <option value="new">{t.new}</option>
                      <option value="used">{t.used}</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder={t.electronicsBrand} 
                      value={electronicsBrand}
                      onChange={(e) => setElectronicsBrand(e.target.value)}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. عنوان ووصف الإعلان */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
             <h3 className="text-lg font-black text-[#1A5F7A] mb-4 underline decoration-[#E11C32]">{t.step2}</h3>
             <input 
               type="text" 
               value={adTitle}
               onChange={(e) => setAdTitle(e.target.value)}
               placeholder={t.titlePlaceholder} 
               className="w-full p-4 mb-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-lg outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
             />
             <textarea 
               value={adDescription}
               onChange={(e) => setAdDescription(e.target.value)}
               placeholder={t.descPlaceholder} 
               rows={6}
               className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-[#1A5F7A]/20"
             ></textarea>
          </div>
        </div>

        {/* ب. لوحة الرفع والفحص الذكي (Upload & Agent Panel) */}
        <div className="space-y-8">
          
          {/* 1. السعر والموقع */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
             <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
               <Tag className="text-gray-400 ml-2" />
               <input 
                 type="text" 
                 placeholder={t.price} 
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                 className="bg-transparent font-black w-full outline-none" 
               />
             </div>
             <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
               <MapPin className="text-gray-400 ml-2" size={20} />
               <select 
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
                 className="bg-transparent font-bold w-full outline-none appearance-none cursor-pointer" 
               >
                 <option value="" disabled>{t.location}</option>
                 {ERITREA_REGIONS.map(region => (
                   <option key={region.id} value={region.name[lang as 'ar' | 'ti' | 'en']}>
                     {region.name[lang as 'ar' | 'ti' | 'en']}
                   </option>
                 ))}
                 <option value="International">{lang === 'en' ? 'International / Diaspora' : (lang === 'ar' ? 'دولي / مغتربين' : 'ዓለምለኸ / ዲያስፖራ')}</option>
               </select>
             </div>
          </div>

          {/* 2. منطقة رفع الصور الذكية */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-black text-[#1A5F7A] mb-4">{t.photos} ({images.length}/10)</h3>
             
             <div 
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               className={`relative flex flex-col items-center justify-center gap-3 p-10 bg-gray-50 rounded-3xl border-2 border-dashed transition-all cursor-pointer ${
                 isDragging ? 'border-[#1A5F7A] bg-[#1A5F7A]/5 scale-[0.99]' : 'border-gray-200 hover:border-[#1A5F7A]'
               }`}
             >
               <label className="absolute inset-0 cursor-pointer">
                 <input type="file" multiple onChange={handlePhotoUpload} className="hidden" accept="image/*" />
               </label>
               <UploadCloud size={32} className={isDragging ? 'text-[#1A5F7A] animate-bounce' : 'text-[#1A5F7A]'} />
               <span className="text-sm font-bold text-gray-400 text-center">
                 {lang === 'ar' ? 'اسحب الصور هنا أو انقر للإضافة' : 'Drag photos here or click to add'}
               </span>
             </div>

             {/* Carousel Display */}
             {previewUrls.length > 0 && (
               <div className="mt-6 relative group overflow-hidden rounded-3xl border border-gray-100 shadow-sm bg-gray-50 aspect-square">
                 <AnimatePresence mode="wait">
                   <motion.img
                     key={activeImageIndex}
                     src={previewUrls[activeImageIndex]}
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -50 }}
                     transition={{ type: "spring", damping: 20, stiffness: 100 }}
                     className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                     drag="x"
                     dragConstraints={{ left: 0, right: 0 }}
                     onDragEnd={(_, info) => {
                       if (info.offset.x < -50 && activeImageIndex < previewUrls.length - 1) {
                         setActiveImageIndex(prev => prev + 1);
                       } else if (info.offset.x > 50 && activeImageIndex > 0) {
                         setActiveImageIndex(prev => prev - 1);
                       }
                     }}
                   />
                 </AnimatePresence>

                 {/* Delete Button */}
                 <button 
                   onClick={() => handleRemoveImage(activeImageIndex)}
                   className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full text-red-500 shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
                 >
                   <X size={20} strokeWidth={3} />
                 </button>

                 {/* Navigation Arrows */}
                 {previewUrls.length > 1 && (
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                      <button 
                        onClick={() => setActiveImageIndex(prev => Math.max(0, prev - 1))}
                        className={`pointer-events-auto p-2 bg-white/90 rounded-full shadow-lg transition-all hover:bg-white active:scale-90 ${activeImageIndex === 0 ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
                        dir="ltr"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => Math.min(previewUrls.length - 1, prev + 1))}
                        className={`pointer-events-auto p-2 bg-white/90 rounded-full shadow-lg transition-all hover:bg-white active:scale-90 ${activeImageIndex === previewUrls.length - 1 ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
                        dir="ltr"
                      >
                        <ChevronRight size={24} />
                      </button>
                   </div>
                 )}

                 {/* Indicators */}
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-full shadow-inner">
                    {previewUrls.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImageIndex ? 'bg-white w-6 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-white/40'}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                 </div>

                 {/* Counter */}
                 <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white font-black text-xs">
                    {activeImageIndex + 1} / {previewUrls.length}
                 </div>
               </div>
             )}

             {/* AI Image Generation Section */}
             <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                   <div className="p-2 bg-gradient-to-br from-[#1A5F7A] to-[#12ADEB] rounded-lg shadow-md text-white">
                      <Sparkles size={18} />
                   </div>
                   <h3 className="text-lg font-black text-[#1A5F7A]">{t.aiGenerate}</h3>
                </div>
                
                <div className="space-y-3">
                   <div className="relative">
                      <input 
                        type="text" 
                        value={aiKeywords}
                        onChange={(e) => setAiKeywords(e.target.value)}
                        placeholder={t.aiKeywordsPlaceholder}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-[#12ADEB]/20 pr-12"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                         <Wand2 size={20} />
                      </div>
                   </div>

                   <button 
                     onClick={handleGenerateAIImage}
                     disabled={isGenerating || !aiKeywords}
                     className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                       isGenerating 
                       ? 'bg-gray-100 text-gray-400' 
                       : 'bg-gradient-to-r from-[#1A5F7A] to-[#12ADEB] text-white hover:opacity-90 active:scale-95'
                     }`}
                   >
                     {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                     {isGenerating ? t.generating : t.aiGenerate}
                   </button>
                </div>

                {/* Proposed AI Image Review */}
                <AnimatePresence>
                  {proposedAiImage && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-4 overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                         <img src={proposedAiImage} alt="AI Generated" className="w-full h-full object-cover" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <button 
                           onClick={handleAcceptAiImage}
                           className="py-3 bg-green-500 text-white rounded-xl font-bold text-sm shadow-md hover:bg-green-600 transition-colors"
                         >
                            {t.aiAccept}
                         </button>
                         <button 
                           onClick={handleGenerateAIImage}
                           className="py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                         >
                            <Sparkles size={14} /> {t.aiRegenerate}
                         </button>
                      </div>
                      <button 
                        onClick={() => setProposedAiImage(null)}
                        className="w-full text-xs text-gray-400 font-bold hover:text-red-500 transition-colors"
                      >
                         {t.aiDiscard}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             
             {/* مؤشر حالة فحص الـ Agent */}
             <AnimatePresence>
               {uploadingStatus !== 'idle' && images.length > 0 && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 ${
                     uploadingStatus === 'uploading' ? 'bg-blue-50 border-blue-100' : 'bg-green-50 border-green-100'
                   }`}
                 >
                   <Cpu className={uploadingStatus === 'uploading' ? 'text-blue-500 animate-spin' : 'text-green-500'} />
                   <div>
                     <p className={`text-xs font-bold ${uploadingStatus === 'uploading' ? 'text-blue-700' : 'text-green-700'}`}>
                        {uploadingStatus === 'uploading' ? t.agentCheck : (lang === 'ar' ? 'الـ Agent وافق على الصور! ✅' : 'Agent approved photos! ✅')}
                     </p>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>

          </div>

          {/* 3. زر النشر والمشاركة */}
          <button 
            onClick={handlePublish}
            disabled={uploadingStatus === 'uploading'}
            className="w-full bg-[#E11C32] text-white p-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl hover:bg-[#c1172a] hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
          >
             {isEdit ? (lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes') : t.publish} <CheckCircle2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAdPage;
