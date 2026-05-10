import { 
  LayoutDashboard, Package, Settings, Edit3, Trash2, Eye, 
  MousePointer2, ArrowRight, LogOut, Star, X, Loader2, 
  Calendar, User, Phone, MapPin, Save, ChevronLeft, Bell,
  ShoppingCart, Zap, Search, Filter
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Ad, Profile } from '../types';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useAsmaraAgent } from '../context/AgentContext';
import PayPalPayment from './PayPalPayment';
import Logo from './Logo';

interface DashboardProps {
  user: SupabaseUser | null;
  onBack: () => void;
  onAddAd: () => void;
}

type Tab = 'overview' | 'ads' | 'profile' | 'settings';

export default function UserDashboard({ user, onBack, onAddAd }: DashboardProps) {
  const navigate = useNavigate();
  const { checkSubscriptionStatus } = useAsmaraAgent();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [myAds, setMyAds] = useState<Ad[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [promotingAd, setPromotingAd] = useState<Ad | null>(null);
  const [adToDelete, setAdToDelete] = useState<Ad | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [subStatus, setSubStatus] = useState<any>(null);
  const [adSearchTerm, setAdSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'views'>('newest');

  // Profile Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (!user) return;

    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Subscription Status
        const status = checkSubscriptionStatus(user);
        setSubStatus(status);

        // Profile Data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || '');
          setPhone(profileData.phone_number || '');
          setCity(profileData.city || '');
        } else {
          // Create profile if it doesn't exist
          const newProfile = {
            id: user.id,
            full_name: user.email?.split('@')[0] || 'User',
            updated_at: new Date().toISOString()
          };
          await supabase.from('profiles').insert(newProfile);
          setFullName(newProfile.full_name);
        }

        // Ads Data
        const { data: adsData, error: adsError } = await supabase
          .from('ads')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (adsError) throw adsError;
        setMyAds(adsData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone_number: phone,
          city: city,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => prev ? { ...prev, full_name: fullName, phone_number: phone, city: city } : null);
      alert('تم تحديث الملف الشخصي بنجاح!');
    } catch (err) {
      console.error(err);
      alert('فشل تحديث البيانات.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAd = async () => {
    if (!adToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase.from('ads').delete().eq('id', adToDelete.id);
      if (error) throw error;
      setMyAds(prev => prev.filter(ad => ad.id !== adToDelete.id));
      setAdToDelete(null);
    } catch (err) {
      console.error(err);
      alert('فشل حذف الإعلان.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onBack();
  };

  const handlePromoteSuccess = async (details: any) => {
    if (!promotingAd) return;
    
    setIsVerifying(true);
    try {
      // Directly update the DB for this feature demo/implementation
      const { error } = await supabase
        .from('ads')
        .update({ 
          is_featured: true,
          updated_at: new Date().toISOString() 
        })
        .eq('id', promotingAd.id);

      if (error) throw error;

      setMyAds(prev => prev.map(ad => 
        ad.id === promotingAd.id ? { ...ad, is_featured: true } : ad
      ));
      setPromotingAd(null);
      alert('تم تمييز إعلانك بنجاح! سيظهر الآن في مقدمة النتائج.');
    } catch (error) {
      console.error('Promotion error:', error);
      alert('تعذر تمييز الإعلان حالياً. تم استلام الدفع ولكن فشل تحديث الحالة تلقائياً، يرجى مراجعة الدعم برقم الطلب: ' + details.id);
    } finally {
      setIsVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Logo className="mb-8 scale-110" />
        <Loader2 className="animate-spin text-[#1A5F7A] mb-4" size={40} />
        <p className="font-bold text-gray-500">جاري تحميل لوحة التحكم الخاصة بك...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" dir="rtl">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-l border-gray-100 shadow-xl z-10">
        <div className="p-8">
          <Logo />
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<LayoutDashboard size={20} />}
            label="لوحة التحكم"
          />
          <SidebarLink 
            active={activeTab === 'ads'} 
            onClick={() => setActiveTab('ads')}
            icon={<Package size={20} />}
            label="إعلاناتي"
          />
          <SidebarLink 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
            icon={<User size={20} />}
            label="الملف الشخصي"
          />
          <SidebarLink 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            icon={<Settings size={20} />}
            label="الإعدادات"
          />
        </nav>

        <div className="p-6 border-t border-gray-50 space-y-2">
          <button 
            onClick={onBack}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-all font-bold text-sm"
          >
            <span>العودة للمتجر</span>
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-red-500 transition-all font-bold text-sm"
          >
            <span>تسجيل الخروج</span>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 p-4 px-6 flex justify-between items-center lg:sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <button className="lg:hidden p-2 bg-gray-100 rounded-xl" onClick={onBack}>
                <ArrowRight size={20} />
             </button>
             <div>
               <h1 className="text-xl font-black text-gray-800">
                 {activeTab === 'overview' && 'لوحة التحكم'}
                 {activeTab === 'ads' && 'إداراة الإعلانات'}
                 {activeTab === 'profile' && 'الملف الشخصي'}
                 {activeTab === 'settings' && 'إعدادات الحساب'}
               </h1>
               <p className="text-xs text-gray-400 font-bold">مرحباً بك مجدداً في أسمرة ستور</p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#1A5F7A] rounded-xl transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-gray-100">
                <div className="text-left flex flex-col items-end">
                   <span className="text-sm font-black text-gray-800 leading-none">{profile?.full_name || 'مستخدم جديد'}</span>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{subStatus?.status === 'FREE_MONTH' ? 'حساب تجريبي' : 'عضو نشط'}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A5F7A] to-[#12ADEB] flex items-center justify-center text-white font-black">
                   {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
             </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative pb-32 lg:pb-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="tab-overview"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Promo Banner */}
                {subStatus?.status === 'FREE_MONTH' && (
                  <div className="bg-gradient-to-r from-[#1A5F7A] to-[#12ADEB] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
                    <Star className="absolute top-[-10%] right-[-5%] text-white/10 w-40 h-40 rotate-[15deg]" />
                    <div className="relative z-10 max-w-lg">
                      <h2 className="text-2xl font-black mb-2">فترة تجريبية مجانية! 🇪🇷</h2>
                      <p className="text-white/80 font-bold text-sm leading-relaxed mb-6">
                        استمتع بنشر عدد غير محدود من الإعلانات لمدة شهر كامل مجاناً. متبقي لك {subStatus.daysLeft} يوم.
                      </p>
                      <button 
                        onClick={onAddAd}
                        className="bg-white text-[#1A5F7A] px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                      >
                         انشر إعلانك الأول مجاناً
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="إجمالي الإعلانات" value={myAds.length} icon={<Package size={20}/>} color="blue" />
                  <StatCard label="المشاهدات" value={myAds.reduce((acc, ad) => acc + (ad.id % 25), 0)} icon={<Eye size={20}/>} color="green" />
                  <StatCard label="التفاعل" value={myAds.reduce((acc, ad) => acc + (ad.id % 5), 0)} icon={<MousePointer2 size={20}/>} color="purple" />
                  <StatCard label="التقييم" value="4.8" icon={<Star size={20}/>} color="orange" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-gray-800">نشاطك الأخير</h3>
                      <button className="text-xs text-[#1A5F7A] font-black underline" onClick={() => setActiveTab('ads')}>عرض الكل</button>
                    </div>
                    {myAds.length > 0 ? (
                      <div className="space-y-4">
                        {myAds.slice(0, 3).map(ad => (
                          <div key={ad.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative border border-gray-100">
                              {ad.image_url ? (
                                <img src={ad.image_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 group-hover:text-[#1A5F7A] transition-colors">{ad.title}</h4>
                              <p className="text-[10px] text-gray-400 font-bold">{ad.location}</p>
                            </div>
                            <div className="text-left">
                               <div className="text-sm font-black text-[#1A5F7A]">{ad.price}</div>
                               <div className="text-[10px] text-gray-400 font-black uppercase">نشط</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                        <Package size={40} className="mb-4 text-gray-200" />
                        <p className="font-bold text-sm">لا يوجد نشاط مسجل حالياً</p>
                      </div>
                    )}
                  </div>

                  {/* Profile Summary Card */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-200">
                       {profile?.full_name?.[0]?.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-1">{profile?.full_name || 'مستخدم مجهول'}</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6">{user?.email}</p>
                    
                    <div className="w-full space-y-3">
                       <button 
                        onClick={() => setActiveTab('profile')}
                        className="w-full py-4 bg-gray-50 text-[#1A5F7A] rounded-2xl font-black text-sm hover:bg-gray-100 transition-colors"
                       >
                          تعديل الملف
                       </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ads' && (
              <motion.div 
                key="tab-ads"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-xl font-black text-gray-800">إدارة الإعلانات ({myAds.length})</h2>
                    <p className="text-xs text-gray-400 font-bold mt-1">تصفية وإدارة عقاراتك ومنشوراتك</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-56">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="بحث..." 
                        value={adSearchTerm}
                        onChange={(e) => setAdSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="appearance-none pl-4 pr-10 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-600 outline-none focus:ring-2 focus:ring-blue-100 shadow-sm cursor-pointer min-w-[120px]"
                      >
                        <option value="newest">الأحدث أولاً</option>
                        <option value="oldest">الأقدم أولاً</option>
                        <option value="price-low">السعر: من الأقل</option>
                        <option value="price-high">السعر: من الأعلى</option>
                        <option value="views">الأكثر مشاهدة</option>
                      </select>
                    </div>
                    <button onClick={onAddAd} className="bg-[#1A5F7A] text-white px-6 py-3 rounded-2xl text-sm font-black shadow-lg shadow-blue-900/10 hover:scale-105 active:scale-95 transition-all shrink-0">
                      + أضف إعلان
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
                  <div className="grid grid-cols-1 divide-y divide-gray-50">
                    {myAds
                      .filter(ad => 
                        ad.title.toLowerCase().includes(adSearchTerm.toLowerCase()) || 
                        ad.location.toLowerCase().includes(adSearchTerm.toLowerCase())
                      )
                      .sort((a, b) => {
                        if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                        if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                        if (sortBy === 'views') return (b.id % 25) - (a.id % 25);
                        
                        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
                        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
                        
                        if (sortBy === 'price-low') return priceA - priceB;
                        if (sortBy === 'price-high') return priceB - priceA;
                        return 0;
                      })
                      .map(ad => (
                      <div key={ad.id} className="p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-gray-50 transition-colors">
                        <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                           {ad.image_url ? (
                             <img src={ad.image_url} alt="" className="w-full h-full object-cover" />
                           ) : (
                             <Package size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                           )}
                        </div>
                        <div className="flex-1 text-center md:text-right">
                           <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                             <div className="flex items-center gap-2">
                               <h4 className="font-black text-gray-800 text-lg">{ad.title}</h4>
                               {ad.is_featured && <Star size={16} className="text-orange-500 fill-orange-500" />}
                               <button 
                                 onClick={() => navigate(`/edit-ad/${ad.id}`)}
                                 className="p-1.5 text-gray-400 hover:text-[#1A5F7A] hover:bg-gray-100 rounded-lg transition-all"
                                 title="تعديل الإعلان"
                               >
                                 <Edit3 size={16} />
                               </button>
                             </div>
                             <Link 
                               to={`/checkout?adId=${ad.id}`}
                               className="px-4 py-1.5 bg-[#E11C32] text-white rounded-full text-xs font-black shadow-md hover:bg-[#c41527] transition-all flex items-center gap-1 active:scale-95"
                             >
                                <ShoppingCart size={14} />
                                Buy Now
                             </Link>
                           </div>
                           <p className="text-sm text-gray-400 font-bold mb-3">{ad.location} • {ad.category}</p>
                           <div className="flex flex-wrap justify-center md:justify-start gap-2">
                              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider">نشط</span>
                              {ad.is_featured && <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider">مميز</span>}
                           </div>
                        </div>
                        <div className="flex items-center gap-6 pr-6 border-r border-gray-50">
                           <div className="text-center font-black">
                              <div className="text-[#1A5F7A] text-xl">{ad.price}</div>
                              <div className="text-[10px] text-gray-300 flex items-center justify-center gap-1 uppercase"><Eye size={12}/> {ad.id % 25}</div>
                           </div>
                           <div className="flex gap-2">
                             {!ad.is_featured && (
                               <button 
                                 onClick={() => setPromotingAd(ad)} 
                                 className="p-3 text-orange-500 hover:bg-orange-50 rounded-xl transition-colors" 
                                 title="تمييز الإعلان"
                               >
                                 <Zap size={20}/>
                               </button>
                             )}
                             <button 
                               onClick={() => navigate(`/edit-ad/${ad.id}`)}
                               className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors" 
                               title="تعديل"
                             >
                               <Edit3 size={20}/>
                             </button>
                             <button onClick={() => setAdToDelete(ad)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="حذف"><Trash2 size={20}/></button>
                           </div>
                        </div>
                      </div>
                    ))}
                    {myAds.length === 0 && (
                      <div className="p-20 text-center text-gray-400 font-bold">
                         لم تقم بنشر أي إعلانات بعد.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div 
                key="tab-profile"
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-2xl"
              >
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
                  <div className="p-8 border-b border-gray-50 bg-[#F8FAFC]">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-indigo-500 flex items-center justify-center text-white ring-8 ring-indigo-50 font-black text-2xl shadow-xl shadow-indigo-100">
                        {profile?.full_name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-800">إدارة الملف الشخصي</h2>
                        <p className="text-xs text-gray-400 font-bold">تحكم في الطريقة التي تظهر بها للجميع</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 flex items-center gap-2 pr-1">
                          <User size={14} /> الاسم بالكامل
                        </label>
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 flex items-center gap-2 pr-1">
                          <Phone size={14} /> رقم الجوال
                        </label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+291"
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-left"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 flex items-center gap-2 pr-1">
                        <MapPin size={14} /> المدينة / الموقع
                      </label>
                      <input 
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="مثلاً: أسمرة، حي ترافولو"
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={saving}
                      className="w-full py-4 bg-[#1A5F7A] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/10 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                       {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                       {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="tab-settings"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                <div className="max-w-2xl bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 space-y-8">
                  <div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">إعدادات الحساب</h2>
                    <p className="text-xs text-gray-400 font-bold italic">إعدادات الخصوصية والتحكم في حسابك</p>
                  </div>

                  <div className="space-y-4">
                    <SettingsOption label="تنبيهات البريد الإلكتروني" value="نشط" />
                    <SettingsOption label="ظهور الملف الشخصي" value="عام" />
                    <SettingsOption label="لغة لوحة التحكم" value="العربية" />
                  </div>

                  <div className="pt-8 border-t border-gray-50">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-black text-sm hover:underline">
                      <LogOut size={16} /> تأكيد تسجيل الخروج النهائي
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Mobile Nav */}
        <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60] bg-white/90 backdrop-blur-xl border border-white/20 px-4 py-3 rounded-[2.5rem] flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
          <MobileNavTab 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            icon={<LayoutDashboard size={20}/>} 
            label="الرئيسية"
          />
          <MobileNavTab 
            active={activeTab === 'ads'} 
            onClick={() => setActiveTab('ads')} 
            icon={<Package size={20}/>} 
            label="إعلاناتي"
          />
          <MobileNavTab 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            icon={<User size={20}/>} 
            label="حسابي"
          />
          <MobileNavTab 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            icon={<Settings size={20}/>} 
            label="الإعدادات"
          />
        </div>
      </div>

      {/* Promotion Modal (Re-used) */}
      <AnimatePresence>
        {promotingAd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden relative shadow-2xl"
            >
              <button onClick={() => setPromotingAd(null)} className="absolute top-6 left-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors z-10"><X size={20} /></button>
              <div className="p-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-100">
                    <Star size={40} className="fill-orange-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">تمييز إعلانك</h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed px-4">
                    اجعل <span className="font-black text-orange-600">"{promotingAd.title}"</span> يظهر أولاً لآلاف المشترين لمدة 30 يوماً.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-[2rem] mb-8 text-center border border-gray-100">
                  <div className="text-xs text-gray-400 font-black uppercase mb-1">قيمة الخدمة المميزة</div>
                  <div className="text-4xl font-black text-[#1A5F7A]">5.00 <span className="text-sm font-bold text-gray-400">USD</span></div>
                </div>
                {isVerifying ? (
                  <div className="py-10 text-center"><Loader2 className="animate-spin mx-auto text-[#1A5F7A]" size={32} /></div>
                ) : (
                  <PayPalPayment 
                    amount="5.00" 
                    onSuccess={handlePromoteSuccess} 
                    title="ترقية الإعلان للتميز"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {adToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden relative shadow-2xl border border-white/20"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-100/50">
                  <Trash2 size={36} />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2">هل أنت متأكد؟</h3>
                <p className="text-gray-400 text-sm font-bold leading-relaxed mb-8 px-2">
                  هل تريد حقاً حذف الإعلان <span className="text-red-500">"{adToDelete.title}"</span>؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleDeleteAd}
                    disabled={isDeleting}
                    className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    {isDeleting ? 'جاري الحذف...' : 'نعم، قم بالحذف'}
                  </button>
                  <button 
                    onClick={() => setAdToDelete(null)}
                    disabled={isDeleting}
                    className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarLink({ active, icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-start gap-4 p-4 rounded-2xl font-black transition-all relative group overflow-hidden ${
        active 
        ? 'bg-gradient-to-r from-[#1A5F7A] to-[#12ADEB] text-white shadow-lg shadow-blue-500/20' 
        : 'text-gray-400 hover:bg-gray-50/80 hover:text-gray-600'
      }`}
    >
      <div className={`transition-all duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="text-sm tracking-tight">{label}</span>
      
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/40 rounded-r-full"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      
      {/* Subtle glow effect for active */}
      {active && (
        <div className="absolute inset-0 bg-white/10 opacity-30 pointer-events-none" />
      )}
    </button>
  );
}

function MobileNavTab({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1 flex-1 py-1"
    >
      <div className={`p-2.5 rounded-xl transition-all relative ${
        active 
        ? 'bg-gradient-to-br from-[#1A5F7A] to-[#12ADEB] text-white shadow-lg shadow-blue-500/20 scale-110' 
        : 'text-gray-400'
      }`}>
        {icon}
        {active && (
          <motion.div 
            layoutId="mobile-indicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
          />
        )}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${active ? 'text-[#1A5F7A]' : 'text-gray-400'}`}>
        {label}
      </span>
    </button>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: any, icon: any, color: string }) {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100 shadow-blue-100',
    green: 'text-green-600 bg-green-50 border-green-100 shadow-green-100',
    purple: 'text-purple-600 bg-purple-50 border-purple-100 shadow-purple-100',
    orange: 'text-orange-600 bg-orange-50 border-orange-100 shadow-orange-100',
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center gap-3">
       <div className={`p-3 rounded-2xl ${colors[color]} border shadow-md shrink-0`}>
          {icon}
       </div>
       <div className="text-center">
          <div className="text-2xl font-black text-gray-800 leading-none mb-1">{value}</div>
          <div className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{label}</div>
       </div>
    </div>
  );
}

function SettingsOption({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
       <span className="font-black text-gray-700 text-sm">{label}</span>
       <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 group-hover:text-[#1A5F7A]">{value}</span>
          <ChevronLeft size={16} className="text-gray-300" />
       </div>
    </div>
  );
}
