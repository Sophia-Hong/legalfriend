import { Database } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

// These values are public and safe to be in the client code
// They are restricted by Row Level Security (RLS) policies
const supabaseUrl = 'https://sdomutarzwghclxpffte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb211dGFyendnaGNseHBmZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MDAsImV4cCI6MjAyNTM5ODQwMH0.Ry-vK5RDzxhBBz0pXzdjPBhDhqRhRoqtE5UHe_qGPBo';

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Add debug logging to help track auth state
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
  console.log('Session:', session);
});