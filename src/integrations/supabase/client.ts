import { Database } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdomutarzwghclxpffte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb211dGFyendnaGNseHBmZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MDAsImV4cCI6MjAyNTM5ODQwMH0.Ry-vK5RDzxhBBz0pXzdjPBhDhqRhRoqtE5UHe_qGPBo';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);