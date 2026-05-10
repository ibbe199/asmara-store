import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAsmaraAgent } from '../context/AgentContext';
import { Camera, Loader2, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AgentStatusPanel from './AgentStatusPanel';

import { Language } from '../translations';
import { ERITREA_REGIONS } from '../constants';

export default function AddAdForm({ userId, lang, onComplete }: { userId: string, lang: Language, onComplete: () => void }) {
  const { agentStatus, processNewAdWithAgent, setAgentStatus } = useAsmaraAgent();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [moderationMessage, setModerationMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'property',
    location: ERITREA_REGIONS[0].name['ar'],
    description: ''
  });

  // معالجة اختيار الصورة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowWarning(false);

    try {
      let imageUrl = '';

      // 1. رفع الصورة إذا وجدت
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('ad-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        
        // الحصول على الرابط العام للصورة
        const { data } = supabase.storage.from('ad-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      // 2. معالجة الإعلان عبر العميل الذكي (فحص + حفظ + مشاركة)
      const result = await processNewAdWithAgent({
        user_id: userId,
        title: formData.title,
        price: formData.price,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        image_url: imageUrl
      });

      if (result.status === 'rejected') {
        setModerationMessage(result.reason || '');
        setShowWarning(true);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onComplete();
        setAgentStatus('idle');
      }, 3000); // العودة للمتجر بعد النجاح

    } catch (error) {
      alert('حدث خطأ أثناء النشر، حاول مرة أخرى');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-2xl shadow-sm">
      <CheckCircle size={60} className="text-green-500 mb-4" />
      <h2 className="text-2xl font-bold">تم نشر إعلانك بنجاح!</h2>
      <p className="text-gray-500 mb-6">سيظهر الآن لجميع المستخدمين في أسمرة ستور.</p>
      <div className="w-full max-w-sm">
        <AgentStatusPanel status="success" />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm" dir="rtl">
      <h2 className="text-2xl font-bold text-[#1A5F7A] mb-6">إضافة إعلان جديد</h2>

      <AnimatePresence>
        {agentStatus === 'processing' && (
          <div className="mb-6">
            <AgentStatusPanel status="processing" />
          </div>
        )}
      </AnimatePresence>

      {showWarning && (
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="bg-red-50 border-r-4 border-[#E11C32] p-4 my-4 flex items-center gap-3"
        >
          <div className="bg-[#E11C32] text-white p-2 rounded-full">
            <ShieldAlert size={20} />
          </div>
          <div>
            <p className="font-black text-[#1A5F7A] text-xs">ኣስማራ ቦት • ASMARA BOT</p>
            <p className="text-red-700 text-sm font-bold">{moderationMessage}</p>
          </div>
        </motion.div>
      )}

      {/* رفع الصورة */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">صورة المنتج/العقار</label>
        <div 
          onClick={() => document.getElementById('fileInput')?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <Camera size={40} className="text-gray-400 mb-2" />
              <span className="text-gray-400 text-sm">اضغط لإضافة صورة</span>
            </>
          )}
        </div>
        <input id="fileInput" type="file" hidden onChange={handleImageChange} accept="image/*" />
      </div>

      {/* حقول البيانات */}
      <div className="space-y-4">
        <input 
          type="text" placeholder="عنوان الإعلان (مثلاً: تويوتا كورولا للبيع)" 
          className="w-full p-3 border rounded-lg outline-none focus:border-[#1A5F7A]"
          required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
        />
        
        <div className="flex gap-4">
          <input 
            type="text" placeholder="السعر (بالنقفة)" 
            className="flex-1 p-3 border rounded-lg outline-none"
            required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
          />
          <select 
            className="flex-1 p-3 border rounded-lg outline-none"
            value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
          >
            <option value="property">عقارات</option>
            <option value="cars">سيارات</option>
            <option value="electronics">إلكترونيات</option>
            <option value="jobs">وظائف</option>
            <option value="hotels">فنادق</option>
            <option value="diaspora">مغتربين</option>
          </select>
        </div>

        <select 
          className="w-full p-3 border rounded-lg outline-none"
          value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
        >
          {ERITREA_REGIONS.map(reg => (
            <option key={reg.id} value={reg.name[lang as 'ar' | 'ti' | 'en']}>
              {reg.name[lang as 'ar' | 'ti' | 'en']}
            </option>
          ))}
          <option value="International">{lang === 'en' ? 'International / Diaspora' : (lang === 'ar' ? 'دولي / مغتربين' : 'ዓለምለኸ / ዲያስፖራ')}</option>
        </select>

        <textarea 
          placeholder="وصف الإعلان..." rows={4}
          className="w-full p-3 border rounded-lg outline-none"
          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
        />

        <button 
          type="submit" disabled={loading}
          className="w-full bg-[#1A5F7A] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'انشر الآن'}
        </button>
      </div>
    </form>
  );
}
