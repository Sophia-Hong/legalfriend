import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPost, getRelatedPosts } from "@/services/blogService";
import BlogMeta from "@/components/blog/BlogMeta";
import SocialShare from "@/components/blog/SocialShare";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogAuthor from "@/components/blog/BlogAuthor";
import BlogContent from "@/components/blog/BlogContent";

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
        <BlogHeader post={post} />
        <BlogAuthor post={post} />
        <SocialShare url={window.location.href} title={post.title} />
        <BlogContent post={post} />
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  );
};

export default BlogPost;