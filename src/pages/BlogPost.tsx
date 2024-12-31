import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPost, getRelatedPosts } from "@/services/blogService";
import { format } from "date-fns";
import BlogMeta from "@/components/blog/BlogMeta";
import SocialShare from "@/components/blog/SocialShare";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BlogPost = () => {
  const { slug } = useParams();
  console.log("Fetching blog post with slug:", slug);

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug as string),
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['related-posts', post?.category, post?.id],
    queryFn: () => getRelatedPosts(post?.category as string, post?.id as string),
    enabled: !!post,
  });

  if (postLoading) {
    return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">Loading...</div>;
  }

  if (!post) {
    return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">Post not found</div>;
  }

  return (
    <>
      <BlogMeta post={post} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Category and Date */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-surface text-primary text-sm font-medium rounded-full border border-primary/20 hover:border-primary/40 transition-colors">
            {post.category}
          </span>
          <span className="text-secondary text-sm">
            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author Profile */}
        {post.author_id && (
          <div className="flex items-center gap-3 mb-6 p-4 bg-surface rounded-lg border border-primary/10">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                <UserRound className="h-6 w-6 text-muted" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-primary">Legal Friend AI</div>
              <div className="text-sm text-secondary">Expert in Tenant Rights</div>
            </div>
          </div>
        )}

        {/* Featured Image */}
        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6 sm:mb-8">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Social Share Buttons */}
        <SocialShare url={window.location.href} title={post.title} />

        {/* Content */}
        <div 
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 sm:mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface text-primary text-sm font-medium rounded-full border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  );
};

export default BlogPost;