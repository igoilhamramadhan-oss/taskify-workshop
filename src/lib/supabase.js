import { createClient } from '@supabase/supabase-js';

// Kredensial default diambil dari Environment Variables (Vite)
// atau fallback dari LocalStorage untuk kemudahan demo workshop
const ENV_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const ENV_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const getStoredCredentials = () => {
  const url = localStorage.getItem('TASKMASTER_SUPABASE_URL') || ENV_SUPABASE_URL;
  const key = localStorage.getItem('TASKMASTER_SUPABASE_ANON_KEY') || ENV_SUPABASE_ANON_KEY;
  return { url, key };
};

export const saveCredentials = (url, key) => {
  localStorage.setItem('TASKMASTER_SUPABASE_URL', url.trim());
  localStorage.setItem('TASKMASTER_SUPABASE_ANON_KEY', key.trim());
};

// Inisialisasi instance Supabase
export const initSupabaseClient = () => {
  const { url, key } = getStoredCredentials();
  
  if (!url || !key || url.includes('your-project') || key.includes('...')) {
    return null;
  }

  try {
    return createClient(url, key);
  } catch (error) {
    console.error('Inisialisasi Supabase gagal:', error);
    return null;
  }
};

export const supabase = initSupabaseClient();
