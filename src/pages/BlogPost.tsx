import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPost, getRelatedPosts } from "@/services/blogService";
import { format } from "date-fns";
import BlogMeta from "@/components/blog/BlogMeta";
import SocialShare from "@/components/blog/SocialShare";
import RelatedPosts from "@/components/blog/RelatedPosts";

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
    return <div className="max-w-4xl mx-auto px-6 py-12">Loading...</div>;
  }

  if (!post) {
    return <div className="max-w-4xl mx-auto px-6 py-12">Post not found</div>;
  }

  return (
    <>
      <BlogMeta post={post} />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Category and Date */}
        <div className="mb-6 flex items-center">
          <span className="px-4 py-1.5 bg-primary text-surface text-sm font-medium rounded-full">
            {post.category}
          </span>
          <span className="ml-4 text-secondary">
            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-primary mb-6">{post.title}</h1>

        {/* Featured Image */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
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
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#1A1F2C] text-white text-sm font-medium rounded-full hover:bg-[#221F26] transition-colors"
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