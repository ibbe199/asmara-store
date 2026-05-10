import { useState, useMemo, useEffect } from 'react';
import { MessageCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Ad, Category } from './types';
import UserDashboard from './components/UserDashboard';
import AddAdForm from './components/AddAdForm';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import ServiceDetail from './components/ServiceDetail';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdvertiserProfile from './pages/AdvertiserProfile';
import ServicePage from './pages/ServicePage';
import AddAdPage from './pages/AddAdPage';
import PostAdPage from './pages/PostAdPage';
import CheckoutPage from './pages/CheckoutPage';
import AdDetailPage from './pages/AdDetailPage';
import AsmaraChat from './components/AsmaraChat';
import CookieConsent from './components/CookieConsent';
import { supabase } from './lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { translations, Language } from './translations';

const CATEGORIES: Category[] = [
  { id: 'all', label: 'الكل', icon: '✨' },
  { id: 'property', label: 'عقارات', icon: '🏠' },
  { id: 'cars', label: 'سيارات', icon: '🚗' },
  { id: 'electronics', label: 'إلكترونيات', icon: '📱' },
  { id: 'jobs', label: 'وظائف', icon: '💼' },
  { id: 'hotels', label: 'فنادق', icon: '🏨' },
  { id: 'diaspora', label: 'مغتربين', icon: '🌍' },
];

export default function App() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [lang, setLang] = useState<Language>('ar');

  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang];

  useEffect(() => {
    // التحقق من الجلسة الحالية
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // الاستماع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchAds() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
        // Fallback to mock data if table doesn't exist or error occurs
        setAds([
          {
            id: 1,
            user_id: 'mock-user',
            title: 'تويوتا كورولا 2015 - نظيفة جداً',
            price: '450,000 ERN',
            location: 'أسمرة، حي ترافولو',
            category: 'cars',
            image_url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
            is_featured: false,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            user_id: 'mock-user',
            title: 'شقة 3 غرف للإيجار - موقع ممتاز',
            price: '12,000 ERN / شهر',
            location: 'أسمرة، قزا بندا',
            category: 'property',
            image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
            is_featured: false,
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            user_id: 'mock-user',
            title: 'آيفون 15 برو ماكس - جديد',
            price: '35,000 ERN',
            location: 'أسمرة، وسط المدينة',
            category: 'electronics',
            image_url: 'https://images.unsplash.com/photo-1639485470437-1075263168ee?auto=format&fit=crop&q=80&w=800',
            is_featured: false,
            created_at: new Date().toISOString(),
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, [location.pathname]);

  const handleViewChange = (newView: 'store' | 'dashboard' | 'add-ad' | 'auth') => {
    if (newView === 'add-ad') {
      navigate('/post-ad');
    } else if (newView === 'dashboard') {
      navigate('/dashboard');
    } else if (newView === 'auth') {
      navigate('/auth');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir={translations[lang].dir}>
      {location.pathname !== '/' && location.pathname !== '/dashboard' && (
        <Navbar 
          lang={lang} 
          user={user} 
          onViewChange={handleViewChange} 
          setLang={setLang}
          setUser={setUser}
        />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={
            <Home 
              ads={ads}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              lang={lang}
              setLang={setLang}
              categories={CATEGORIES}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          } />
          
          <Route path="/dashboard" element={
            user ? (
               <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-screen"
              >
                <UserDashboard 
                  user={user}
                  onBack={() => handleViewChange('store')} 
                  onAddAd={() => handleViewChange('add-ad')} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="auth-redirect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-screen bg-gray-50 py-10 px-4"
                dir="rtl"
              >
                <div className="max-w-md mx-auto mb-6">
                  <button 
                    onClick={() => handleViewChange('store')}
                    className="flex items-center gap-2 text-[#1A5F7A] font-bold"
                  >
                    <ArrowRight size={20} className="rotate-180" />
                    <span>{t.backToStore}</span>
                  </button>
                </div>
                <Auth onSessionActive={() => navigate('/dashboard')} />
              </motion.div>
            )
          } />

          <Route path="/auth" element={
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-screen bg-gray-50 py-10 px-4"
              dir="rtl"
            >
              <div className="max-w-md mx-auto mb-6">
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-[#1A5F7A] font-bold"
                >
                  <ArrowRight size={20} className="rotate-180" />
                  <span>{t.backToStore}</span>
                </button>
              </div>
              <Auth onSessionActive={() => navigate('/dashboard')} />
            </motion.div>
          } />
          
          <Route path="/advertiser/:id" element={<AdvertiserProfile lang={lang} />} />
          
          <Route path="/services/:type" element={<ServicePage lang={lang} />} />
          
          <Route path="/test-agent" element={<AddAdPage />} />
          
          <Route path="/post-ad" element={
            user ? <PostAdPage lang={lang} user={user} /> : <Auth onSessionActive={() => navigate('/post-ad')} />
          } />
          
          <Route path="/edit-ad/:id" element={
            user ? <PostAdPage lang={lang} user={user} isEdit={true} /> : <Auth onSessionActive={() => navigate('/dashboard')} />
          } />
          
          <Route path="/checkout" element={<CheckoutPage />} />
          
          <Route path="/ad/:id" element={<AdDetailPage lang={lang} user={user} setLang={setLang} setUser={setUser} />} />
          
          <Route path="/service/:id" element={
            <ServiceDetail 
              lang={lang} 
              user={user} 
              onViewChange={handleViewChange} 
              setLang={setLang} 
              setUser={setUser}
            />
          } />
        </Routes>
      </AnimatePresence>

      <Footer lang={lang} />

      <AsmaraChat lang={lang} />

      <CookieConsent lang={lang} />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/291123456" 
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group overflow-hidden"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold whitespace-nowrap overflow-hidden">
           {lang === 'ar' ? 'تحدث معنا' : lang === 'ti' ? 'ተወከሱና' : 'Chat with us'}
        </span>
      </motion.a>
    </div>
  );
}
