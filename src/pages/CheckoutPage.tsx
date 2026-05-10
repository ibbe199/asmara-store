import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Ad } from '../types';
import PayPalPayment from '../components/PayPalPayment';
import Logo from '../components/Logo';

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const adId = searchParams.get('adId');
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adId) {
      setLoading(false);
      return;
    }

    async function fetchAd() {
      try {
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('id', adId)
          .single();

        if (error) throw error;
        setAd(data);
      } catch (err) {
        console.error('Error fetching ad for checkout:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAd();
  }, [adId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1A5F7A]" size={40} />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <ShoppingBag size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-black text-gray-800 mb-2">عذراً، لم يتم العثور على المنتج</h2>
        <p className="text-gray-500 mb-8">ربما تم حذف الإعلان أو أن الرابط غير صحيح.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#1A5F7A] text-white px-8 py-3 rounded-2xl font-bold"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Logo />
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 font-bold hover:text-[#1A5F7A] transition-colors"
          >
            <ArrowLeft size={20} className="rotate-180" />
            <span>العودة</span>
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <ShoppingBag className="text-[#1A5F7A]" /> ملخص الطلب
              </h2>
              
              <div className="flex gap-6 p-4 bg-gray-50 rounded-3xl border border-gray-100 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-white overflow-hidden shadow-sm border border-gray-100 shrink-0">
                  <img src={ad.image_url} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-lg mb-1">{ad.title}</h3>
                  <p className="text-sm text-gray-400 font-bold mb-2">{ad.location}</p>
                  <div className="text-xl font-black text-[#1A5F7A]">{ad.price}</div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>سعر المنتج</span>
                  <span>{ad.price}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold">
                  <span>رسوم الخدمة</span>
                  <span className="text-green-600">مجاناً</span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-800 pt-4">
                  <span>الإجمالي</span>
                  <span>{ad.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
               <ShieldCheck className="text-blue-500 shrink-0" size={24} />
               <div>
                  <h4 className="font-black text-blue-900 text-sm">حماية المشتري</h4>
                  <p className="text-blue-700/70 text-xs font-bold leading-relaxed mt-1">
                    أموالك في أمان. لا يتم تحويل المبلغ للبائع إلا بعد استلامك للمنتج وتأكيد الجودة.
                  </p>
               </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-12">
               <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                 <CreditCard className="text-[#E11C32]" /> الدفع الآمن
               </h2>

               <p className="text-sm text-gray-400 font-bold mb-8">اختر وسيلة الدفع المناسبة لك لإتمام عملية الشراء</p>

               <div className="space-y-4">
                  <PayPalPayment 
                    amount={ad.price.replace(/[^0-9.]/g, '') || "10.00"} 
                    onSuccess={(details) => {
                      alert('تمت عملية الشراء بنجاح! سيتم توجيهك للمتابعة مع البائع.');
                      navigate('/dashboard');
                    }} 
                    title="إتمام الشراء والدفع"
                  />
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-300 font-black uppercase tracking-widest mt-8">
                     <ShieldCheck size={12} /> تكنولوجيا تشفير مؤمنة 256-bit
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
