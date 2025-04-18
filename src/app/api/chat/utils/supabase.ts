import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

// Define your Supabase URL and public anon key from your Supabase project settings
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

// Create and export a Supabase client
export const createClient = () => supabaseCreateClient(SUPABASE_URL, SUPABASE_ANON_KEY);
