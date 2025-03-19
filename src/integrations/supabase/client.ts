import { Database } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

// Get values from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb211dGFyendnaGNseHBmZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMzU2NjAsImV4cCI6MjA1MDgxMTY2MH0.R1xJwcbiQTX8v0WPaAXb7yIybzwgGdKoJTWd8IWLGdc';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  }
});