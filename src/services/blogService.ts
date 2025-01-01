import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("Fetching blog posts from Supabase");
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:profiles(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }

    console.log("Successfully fetched blog posts:", data);
    return data || [];
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
    throw error;
  }
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  console.log("Fetching single blog post with slug:", slug);
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:profiles(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }

    if (!data) {
      console.log("Blog post not found:", slug);
      return null;
    }

    console.log("Successfully fetched blog post:", data);

    // Increment view count
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', data.id);

    if (updateError) {
      console.error("Error updating view count:", updateError);
    }

    return data;
  } catch (error) {
    console.error("Error in getBlogPost:", error);
    throw error;
  }
};

export const getRelatedPosts = async (category: string, currentPostId: string): Promise<BlogPost[]> => {
  console.log("Fetching related posts for category:", category);
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:profiles(*)')
      .eq('status', 'published')
      .eq('category', category)
      .neq('id', currentPostId)
      .limit(2);

    if (error) {
      console.error("Error fetching related posts:", error);
      throw error;
    }

    console.log("Successfully fetched related posts:", data);
    return data || [];
  } catch (error) {
    console.error("Error in getRelatedPosts:", error);
    throw error;
  }
};