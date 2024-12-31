import { Database } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

// These values are public and can be exposed in the client
const supabaseUrl = 'https://sdomutarzwghclxpffte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb211dGFyendnaGNseHBmZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNjc2NjAsImV4cCI6MjAxOTY0MzY2MH0.GG5UMtY8yG_hsAGHPYWAFjTHkJA0LHpBh_dYn6NNRWU';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  }
});