// Supabase auth service — requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// in frontend/.env (or .env.local) to function.

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  isConfigured: Boolean(supabaseUrl && supabaseAnonKey),
};

// Stub auth helpers — replace with real @supabase/supabase-js calls
// once `npm install @supabase/supabase-js` has been run and env vars are set.
export const authService = {
  /** Returns true when Supabase env vars are present */
  isReady: () => supabaseConfig.isConfigured,
};
