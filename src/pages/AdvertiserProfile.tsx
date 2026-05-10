import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ArrowLeft, User, Loader2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Ad } from '../types';
import { Language, translations } from '../translations';

interface AdvertiserProfileProps {
  lang: Language;
}

export default function AdvertiserProfile({ lang }: AdvertiserProfileProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const t = translations[lang];
  
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [advertiser, setAdvertiser] = useState<{ email: string; id: string } | null>(null);

  useEffect(() => {
    async function fetchAdvertiserData() {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // In a real app, we might have a 'profiles' table. 
        // For now, we'll just fetch ads by this user_id.
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setAds(data);
        
        // Mock advertiser info since we don't have a profiles table yet
        setAdvertiser({
          id: id,
          email: 'advertiser@asmara.store'
        });

      } catch (error) {
        console.error('Error fetching advertiser ads:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvertiserData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#1A5F7A]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir={translations[lang].dir}>
      {/* Header / Cover */}
      <div className="h-48 bg-[#1A5F7A] relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all"
        >
          <ArrowLeft size={24} className={translations[lang].dir === 'rtl' ? 'rotate-180' : ''} />
        </button>
      </div>

      {/* Profile Info Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gray-100 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              <User size={64} className="text-gray-300" />
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-start">
              <h1 className="text-3xl font-black text-[#1A5F7A] mb-2">
                {advertiser?.email.split('@')[0] || 'Advertiser'}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm font-bold mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[#E11C32]" />
                  <span>Asmara, Eritrea</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-[#2D8B49]" />
                  <span>Member since 2026</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="bg-[#1A5F7A] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#144a5f] transition-all">
                  <Phone size={18} /> {lang === 'ar' ? 'اتصال' : 'Call'}
                </button>
                <button className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all">
                  <MessageCircle size={18} /> WhatsApp
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 p-6 rounded-3xl text-center min-w-[120px]">
              <div className="text-3xl font-black text-[#1A5F7A]">{ads.length}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                {lang === 'ar' ? 'إعلان' : 'Ads'}
              </div>
            </div>
          </div>
        </div>

        {/* Advertiser's Ads */}
        <div className="mt-12">
          <h2 className="text-2xl font-black text-[#1A5F7A] mb-8 px-2">
            {lang === 'ar' ? 'إعلانات هذا المعلن' : lang === 'ti' ? 'ምልክታታት ናይዚ መላለዪ' : "Advertiser's Ads"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group cursor-pointer"
                onClick={() => navigate(`/ad/${ad.id}`)}
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={ad.image_url} 
                    alt={ad.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[#1A5F7A] text-xl font-black mb-1">{ad.price}</div>
                  <h3 className="text-gray-800 font-bold text-lg mb-2 line-clamp-1">{ad.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1 rtl:ml-1" />
                    {ad.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {ads.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">No ads found for this advertiser.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
