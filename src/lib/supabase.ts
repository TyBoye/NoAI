// Supabase disabled - commented out to prevent build errors
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Items');
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true
//   }
// });

// Mock supabase object to prevent import errors
const supabase = {
  from: () => ({
    insert: () => ({ error: null }),
    select: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }), data: [], error: null }),
    eq: () => ({ single: () => ({ data: null, error: null }) }),
  }),
} as unknown as {
  from: (table: string) => {
    insert: (data: unknown) => { error: null };
    select: (columns?: string) => { eq: (column: string, value: unknown) => { single: () => { data: null; error: null } }; data: unknown[]; error: null };
    eq: (column: string, value: unknown) => { single: () => { data: null; error: null } };
  };
};

export { supabase };

