import { createClient as supabaseCreateClient } from '@supabase/supabase-js';


const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export const createClient = () => supabaseCreateClient(SUPABASE_URL, SUPABASE_ANON_KEY);
