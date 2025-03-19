import { Database } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallback to local instance
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sdomutarzwghclxpffte.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb211dGFyendnaGNseHBmZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExNDU2NTQsImV4cCI6MjAyNjcyMTY1NH0.MQHu9Ue9xtcNdCXCPpqwGQgTQvfQVXQTXcQbGpGHCTM';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});