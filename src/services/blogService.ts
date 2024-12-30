import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("Fetching blog posts from Supabase");
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }

  return data || [];
};