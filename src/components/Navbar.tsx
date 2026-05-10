import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { translations, Language } from '../translations';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  lang: Language;
  user: SupabaseUser | null;
  onViewChange: (view: 'store' | 'dashboard' | 'add-ad' | 'auth') => void;
  setLang: (lang: Language) => void;
  setUser: (user: SupabaseUser | null) => void;
}

const Navbar = ({ lang, user, onViewChange, setLang, setUser }: NavbarProps) => {
  const t = translations[lang];
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onViewChange('store');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      onViewChange('store');
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#131921] text-white border-b border-white/5 px-6 py-2 flex justify-between items-center shadow-lg" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* الشعار */}
      <div className="flex items-center gap-8">
        <div className="cursor-pointer hover:opacity-90 transition-opacity" onClick={handleLogoClick}>
          <Logo className="scale-75 md:scale-90" />
        </div>
        <div className="hidden md:flex gap-6 font-bold text-sm text-gray-300">
          <button onClick={() => scrollToSection('hero')} className="hover:text-[#F3CE82] transition-colors">{t.nav.home}</button>
          <button onClick={() => scrollToSection('diaspora')} className="hover:text-[#F3CE82] transition-colors">{t.nav.diaspora}</button>
          <button onClick={() => scrollToSection('search')} className="hover:text-[#F3CE82] transition-colors">{t.nav.search}</button>
        </div>
      </div>

      {/* أزرار العمليات */}
      <div className="flex items-center gap-4">
        {/* مبدل اللغات */}
        <select 
          onChange={(e) => setLang(e.target.value as Language)} 
          value={lang}
          className="bg-gray-100 border-none rounded-lg p-1 text-xs font-bold outline-none cursor-pointer"
        >
          <option value="ar">العربية</option>
          <option value="ti">ትግርኛ</option>
          <option value="en">English</option>
        </select>

        <div className="flex items-center gap-2">
          {user && (
            <button 
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-white font-bold px-2 py-1 transition-colors"
            >
              {lang === 'ar' ? 'خروج' : 'Logout'}
            </button>
          )}
          <button 
            onClick={() => onViewChange(user ? 'dashboard' : 'auth')}
            className="text-[#1A5F7A] font-bold text-sm px-4 hover:bg-gray-50 py-2 rounded-full transition-colors hidden sm:block"
          >
            {user ? t.dashboard : t.dashboard}
          </button>
          <button 
            onClick={() => onViewChange(user ? 'add-ad' : 'auth')}
            className="bg-[#2D8B49] text-white px-5 py-2 rounded-full font-bold text-sm hover:shadow-lg transition-all active:scale-95"
          >
            {t.nav.sell}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
