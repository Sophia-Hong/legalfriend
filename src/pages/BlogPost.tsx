import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPost, getRelatedPosts } from "@/services/blogService";
import BlogMeta from "@/components/blog/BlogMeta";
import SocialShare from "@/components/blog/SocialShare";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogAuthor from "@/components/blog/BlogAuthor";
import BlogContent from "@/components/blog/BlogContent";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams();
  console.log("Fetching blog post with slug:", slug);

  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug as string),
    enabled: !!slug,
  });

  const { data: relatedPosts = [], isLoading: relatedLoading } = useQuery({
    queryKey: ['related-posts', post?.category, post?.id],
    queryFn: () => getRelatedPosts(post?.category as string, post?.id as string),
    enabled: !!post,
  });

  if (postLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center text-red-500">
          <h1 className="text-2xl font-semibold mb-4">Error Loading Post</h1>
          <p>There was an error loading this blog post. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogMeta post={post} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <BlogHeader post={post} />
        <BlogAuthor post={post} />
        <SocialShare url={window.location.href} title={post.title} />
        <BlogContent post={post} />
        {!relatedLoading && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </article>
    </>
  );
};

export default BlogPost;