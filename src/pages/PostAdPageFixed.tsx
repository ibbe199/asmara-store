import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ArrowRight, Briefcase, Cpu, Hotel, Landmark, Loader2, MapPin, Tag, Truck, UploadCloud, X } from 'lucide-react';
import { Language } from '../translations';
import { ERITREA_REGIONS } from '../constants';
import { supabase, uploadImage } from '../lib/supabase';
import { useAsmaraAgent } from '../context/AgentContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800';

type Props = {
  lang?: Language;
  user: SupabaseUser | null;
  isEdit?: boolean;
};

export default function PostAdPageFixed({ lang = 'ar', user, isEdit = false }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { processNewAdWithAgent } = useAsmaraAgent();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [propertyRooms, setPropertyRooms] = useState('');
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyFurnished, setPropertyFurnished] = useState(false);
  const [electronicsCondition, setElectronicsCondition] = useState<'new' | 'used'>('new');
  const [electronicsBrand, setElectronicsBrand] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [jobSalaryRange, setJobSalaryRange] = useState('');

  const categories = [
    { id: 'cars', label: { ar: 'سيارات', ti: 'መካይን', en: 'Cars' }, icon: <Truck size={24} /> },
    { id: 'property', label: { ar: 'عقارات', ti: 'ኣባይቲ', en: 'Property' }, icon: <Landmark size={24} /> },
    { id: 'electronics', label: { ar: 'إلكترونيات', ti: 'ኤለክትሮኒክስ', en: 'Electronics' }, icon: <Cpu size={24} /> },
    { id: 'jobs', label: { ar: 'وظائف', ti: 'ስራሕ', en: 'Jobs' }, icon: <Briefcase size={24} /> },
    { id: 'hotels', label: { ar: 'فنادق', ti: 'ሆተላት', en: 'Hotels' }, icon: <Hotel size={24} /> },
  ];

  const text = {
    ar: {
      title: isEdit ? 'تعديل الإعلان' : 'نشر إعلان جديد',
      titlePlaceholder: 'عنوان الإعلان',
      descriptionPlaceholder: 'اكتب تفاصيل الإعلان بدقة',
      price: 'السعر',
      location: 'الموقع',
      category: 'اختر الفئة',
      images: 'صور الإعلان',
      publish: isEdit ? 'حفظ التعديلات' : 'نشر الإعلان',
      required: 'يرجى إدخال العنوان والفئة والسعر والموقع',
      success: isEdit ? 'تم تحديث الإعلان بنجاح' : 'تم إرسال الإعلان بنجاح',
      pending: 'تم حفظ الإعلان للمراجعة اليدوية',
      back: 'العودة',
    },
    ti: {
      title: isEdit ? 'መላለዪ ኣዐሪ' : 'ሓድሽ መላለዪ ጻሓፍ',
      titlePlaceholder: 'ኣርእስቲ መላለዪ',
      descriptionPlaceholder: 'ዝርዝር መላለዪ ጻሓፍ',
      price: 'ዋጋ',
      location: 'ቦታ',
      category: 'ዓይነት ምረጽ',
      images: 'ስእልታት',
      publish: isEdit ? 'ለውጢ ዓቅብ' : 'መላለዪ ዘርግሕ',
      required: 'ኣርእስቲ፣ ዓይነት፣ ዋጋን ቦታን የድሊ',
      success: isEdit ? 'መላለዪ ተሓዲሱ' : 'መላለዪ ተላኢኹ',
      pending: 'መላለዪ ንሰብ ፍተሻ ተቐሚጡ',
      back: 'ተመለስ',
    },
    en: {
      title: isEdit ? 'Edit Ad' : 'Post New Ad',
      titlePlaceholder: 'Ad title',
      descriptionPlaceholder: 'Write accurate ad details',
      price: 'Price',
      location: 'Location',
      category: 'Choose category',
      images: 'Ad images',
      publish: isEdit ? 'Save Changes' : 'Publish Ad',
      required: 'Please enter title, category, price, and location',
      success: isEdit ? 'Ad updated successfully' : 'Ad submitted successfully',
      pending: 'Ad saved for manual review',
      back: 'Back',
    },
  }[lang as 'ar' | 'ti' | 'en'];

  useEffect(() => {
    if (!isEdit || !id) return;

    async function fetchAd() {
      const { data, error } = await supabase.from('ads').select('*').eq('id', id).single();
      if (error || !data) return;

      if (data.user_id !== user?.id) {
        alert(lang === 'ar' ? 'ليس لديك صلاحية لتعديل هذا الإعلان' : 'You do not have permission to edit this ad');
        navigate('/dashboard');
        return;
      }

      setAdTitle(data.title || '');
      setAdDescription(data.description || '');
      setPrice(data.price || '');
      setLocation(data.location || '');
      setSelectedCategory(data.category || '');
      setExistingImageUrl(data.image_url || '');
      if (data.image_url) setPreviewUrls([data.image_url]);

      setCarModel(data.car_model || '');
      setCarYear(data.car_year?.toString() || '');
      setCarMileage(data.car_mileage?.toString() || '');
      setPropertyRooms(data.property_rooms?.toString() || '');
      setPropertyArea(data.property_area?.toString() || '');
      setPropertyFurnished(Boolean(data.property_furnished));
      setElectronicsCondition(data.condition || 'new');
      setElectronicsBrand(data.brand || '');
      setJobType(data.job_type || 'full-time');
      setJobSalaryRange(data.salary_range || '');
    }

    fetchAd();
  }, [id, isEdit, user?.id, lang, navigate]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const nextFiles = Array.from(files).slice(0, Math.max(0, 10 - images.length));
    setImages((current) => [...current, ...nextFiles]);
    setPreviewUrls((current) => [...current, ...nextFiles.map((file) => URL.createObjectURL(file))]);
  };

  const removeImage = (index: number) => {
    const url = previewUrls[index];
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    setPreviewUrls((current) => current.filter((_, i) => i !== index));
    setImages((current) => current.filter((_, i) => i !== index));
    if (index === 0) setExistingImageUrl('');
  };

  const buildCategoryDetails = () => {
    if (selectedCategory === 'cars') {
      return {
        car_model: carModel || null,
        car_year: carYear ? Number(carYear) : null,
        car_mileage: carMileage ? Number(carMileage) : null,
      };
    }

    if (selectedCategory === 'property') {
      return {
        property_rooms: propertyRooms ? Number(propertyRooms) : null,
        property_area: propertyArea ? Number(propertyArea) : null,
        property_furnished: propertyFurnished,
      };
    }

    if (selectedCategory === 'electronics') {
      return {
        condition: electronicsCondition,
        brand: electronicsBrand || null,
      };
    }

    if (selectedCategory === 'jobs') {
      return {
        job_type: jobType,
        salary_range: jobSalaryRange || null,
      };
    }

    return {};
  };

  const handlePublish = async () => {
    if (!user?.id) {
      navigate('/auth');
      return;
    }

    if (!adTitle.trim() || !selectedCategory || !price.trim() || !location.trim()) {
      alert(text.required);
      return;
    }

    setSubmitting(true);

    try {
      let finalImageUrl = existingImageUrl || previewUrls.find((url) => !url.startsWith('blob:')) || DEFAULT_IMAGE;

      if (images.length > 0) {
        const uploaded = await uploadImage(images[0], user.id);
        finalImageUrl = uploaded.publicUrl;
      }

      const adData = {
        title: adTitle.trim(),
        description: adDescription.trim(),
        price: price.trim(),
        location,
        category: selectedCategory,
        user_id: user.id,
        image_url: finalImageUrl,
        ...buildCategoryDetails(),
      };

      if (isEdit && id) {
        const { error } = await supabase.from('ads').update(adData).eq('id', id).eq('user_id', user.id);
        if (error) throw error;
        alert(text.success);
        navigate('/dashboard');
        return;
      }

      const result = await processNewAdWithAgent(adData);

      if (result?.status === 'rejected') {
        alert(result.reason || 'Rejected');
        return;
      }

      alert(result?.status === 'pending_review' ? text.pending : text.success);
      navigate(result?.status === 'pending_review' ? '/dashboard' : '/');
    } catch (error: any) {
      alert(error.message || (lang === 'ar' ? 'فشل نشر الإعلان' : 'Failed to submit ad'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#1A5F7A]">{text.title}</h1>
            <p className="mt-2 text-sm font-bold text-gray-400">Asmara Store - Eritrean marketplace</p>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-[#1A5F7A] shadow-sm">
            <ArrowRight size={18} className={lang === 'en' ? 'rotate-180' : ''} />
            {text.back}
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-black text-[#1A5F7A]">{text.category}</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-2xl border-2 p-4 text-center font-bold transition ${selectedCategory === category.id ? 'border-[#1A5F7A] bg-[#1A5F7A] text-white' : 'border-gray-100 bg-gray-50 text-gray-700'}`}
                  >
                    <div className="mb-2 flex justify-center">{category.icon}</div>
                    {category.label[lang as 'ar' | 'ti' | 'en']}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <input value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder={text.titlePlaceholder} className="mb-4 w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 font-bold outline-none" />
              <textarea value={adDescription} onChange={(e) => setAdDescription(e.target.value)} placeholder={text.descriptionPlaceholder} rows={6} className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 font-medium outline-none" />
            </div>

            {selectedCategory && (
              <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-[#1A5F7A]">{lang === 'en' ? 'Category Details' : 'تفاصيل الفئة'}</h2>
                {selectedCategory === 'cars' && <div className="grid gap-3 md:grid-cols-3"><input value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder="Model" className="rounded-xl bg-gray-50 p-3" /><input type="number" value={carYear} onChange={(e) => setCarYear(e.target.value)} placeholder="Year" className="rounded-xl bg-gray-50 p-3" /><input type="number" value={carMileage} onChange={(e) => setCarMileage(e.target.value)} placeholder="Mileage" className="rounded-xl bg-gray-50 p-3" /></div>}
                {selectedCategory === 'property' && <div className="grid gap-3 md:grid-cols-3"><input type="number" value={propertyRooms} onChange={(e) => setPropertyRooms(e.target.value)} placeholder="Rooms" className="rounded-xl bg-gray-50 p-3" /><input type="number" value={propertyArea} onChange={(e) => setPropertyArea(e.target.value)} placeholder="Area" className="rounded-xl bg-gray-50 p-3" /><label className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 font-bold"><input type="checkbox" checked={propertyFurnished} onChange={(e) => setPropertyFurnished(e.target.checked)} /> Furnished</label></div>}
                {selectedCategory === 'electronics' && <div className="grid gap-3 md:grid-cols-2"><select value={electronicsCondition} onChange={(e) => setElectronicsCondition(e.target.value as 'new' | 'used')} className="rounded-xl bg-gray-50 p-3"><option value="new">New</option><option value="used">Used</option></select><input value={electronicsBrand} onChange={(e) => setElectronicsBrand(e.target.value)} placeholder="Brand" className="rounded-xl bg-gray-50 p-3" /></div>}
                {selectedCategory === 'jobs' && <div className="grid gap-3 md:grid-cols-2"><select value={jobType} onChange={(e) => setJobType(e.target.value)} className="rounded-xl bg-gray-50 p-3"><option value="full-time">Full time</option><option value="part-time">Part time</option></select><input value={jobSalaryRange} onChange={(e) => setJobSalaryRange(e.target.value)} placeholder="Salary range" className="rounded-xl bg-gray-50 p-3" /></div>}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 rounded-2xl bg-gray-50 p-3"><Tag size={18} className="text-gray-400" /><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder={text.price} className="w-full bg-transparent font-bold outline-none" /></div>
              <div className="flex items-center gap-2 rounded-2xl bg-gray-50 p-3"><MapPin size={18} className="text-gray-400" /><select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent font-bold outline-none"><option value="">{text.location}</option>{ERITREA_REGIONS.map((region) => <option key={region.id} value={region.name[lang as 'ar' | 'ti' | 'en']}>{region.name[lang as 'ar' | 'ti' | 'en']}</option>)}<option value="International">International / Diaspora</option></select></div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-black text-[#1A5F7A]">{text.images}</h2>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center font-bold text-gray-500">
                <UploadCloud className="mb-3" />
                Upload images
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              </label>

              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {previewUrls.map((url, index) => (
                    <div key={`${url}-${index}`} className="relative overflow-hidden rounded-xl bg-gray-100">
                      <img src={url} alt="Preview" className="h-28 w-full object-cover" />
                      <button onClick={() => removeImage(index)} className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white"><X size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handlePublish} disabled={submitting} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#E11C32] py-5 font-black text-white shadow-lg disabled:opacity-60">
              {submitting && <Loader2 className="animate-spin" />}
              {text.publish}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
