import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

export default function Auth({ onSessionActive }: { onSessionActive: () => void }) {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('يرجى إدخال البريد الإلكتروني أولاً');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) throw error;
      setResetSent(true);
      alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    } catch (error: any) {
      alert(error.message || 'حدث خطأ أثناء محاولة إرسال الرابط');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // إنشاء حساب جديد مع إضافة الاسم الكامل في البيانات الإضافية
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        alert('تفقد بريدك الإلكتروني لتأكيد الحساب!');
      } else {
        // تسجيل دخول لحساب موجود
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSessionActive(); // الانتقال للوحة التحكم أو المتجر
      }
    } catch (error: any) {
      alert(error.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100" dir="rtl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#1A5F7A]">استعادة كلمة المرور</h2>
          <p className="text-gray-500 mt-2">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور</p>
        </div>

        {resetSent ? (
          <div className="text-center py-6 bg-green-50 rounded-2xl border border-green-100 mb-6">
            <p className="text-[#2D8B49] font-bold">تم إرسال الرابط بنجاح!</p>
            <p className="text-xs text-gray-500 mt-2">سجل دخولك بعد إعادة تعيين كلمة المرور</p>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div className="relative">
              <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="email" placeholder="البريد الإلكتروني"
                className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-[#1A5F7A]"
                required value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-[#1A5F7A] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#144a5f] transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'إرسال الرابط'}
            </button>
          </form>
        )}

        <button
          onClick={() => { setIsForgotPassword(false); setResetSent(false); }}
          className="w-full mt-6 text-gray-500 font-bold text-sm hover:underline"
        >
          العودة لتسجيل الدخول
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#1A5F7A]">
          {isSignUp ? 'إنشاء حساب جديد' : 'مرحباً بك مجدداً'}
        </h2>
        <p className="text-gray-500 mt-2">
          {isSignUp ? 'انضم إلى أسرة "أسمرة ستور" وابدأ البيع' : 'سجل دخولك لإدارة إعلاناتك'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-5">
        {isSignUp && (
          <div className="relative">
            <User className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text" placeholder="الاسم الكامل"
              className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-[#1A5F7A]"
              required value={fullName} onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
          <input
            type="email" placeholder="البريد الإلكتروني"
            className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-[#1A5F7A]"
            required value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
          <input
            type="password" placeholder="كلمة المرور"
            className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-[#1A5F7A]"
            required value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isSignUp && (
          <div className="text-left">
            <button 
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="text-xs text-[#1A5F7A] font-bold hover:underline"
            >
              نسيت كلمة المرور؟
            </button>
          </div>
        )}

        <button
          type="submit" disabled={loading}
          className="w-full bg-[#1A5F7A] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#144a5f] transition-all active:scale-[0.98]"
        >
          {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'تسجيل جديد' : 'تسجيل الدخول')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-[#2D8B49] font-bold text-sm flex items-center justify-center gap-1 mx-auto hover:underline"
        >
          {isSignUp ? 'لديك حساب بالفعل؟ سجل دخولك' : 'ليس لديك حساب؟ اصنع واحداً الآن'}
          <ArrowRight size={16} className="rotate-180" />
        </button>
      </div>
    </div>
  );
}
