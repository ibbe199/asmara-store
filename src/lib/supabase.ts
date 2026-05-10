import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, userId?: string) => {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeUserId = userId || 'anonymous';
  const fileName = `${safeUserId}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('ad-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || `image/${fileExt}`,
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('ad-images')
    .getPublicUrl(fileName);

  return { fileName, publicUrl };
};
