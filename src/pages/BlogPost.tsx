import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPost, getRelatedPosts } from "@/services/blogService";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import TipCard from "@/components/tips/TipCard";

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

  // Schema markup for the blog post
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image_url,
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "articleBody": post.content,
    "author": {
      "@type": "Organization",
      "name": "LegalFriend"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LegalFriend",
      "logo": {
        "@type": "ImageObject",
        "url": "https://legalfriend.com/logo.png" // Update with actual logo URL
      }
    }
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | LegalFriend Resources</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image_url} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Category and Date */}
        <div className="mb-6">
          <span className="px-3 py-1 bg-highlight text-primary text-sm font-medium rounded-full">
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
        <div className="flex gap-2 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-4 w-4 mr-2" />
            Tweet
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

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
                  className="px-3 py-1 bg-muted text-secondary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <TipCard
                  key={relatedPost.id}
                  category={relatedPost.category}
                  title={relatedPost.title}
                  description={relatedPost.description}
                  readTime={relatedPost.read_time}
                  date={format(
                    new Date(relatedPost.published_at || relatedPost.created_at),
                    'MMM d, yyyy'
                  )}
                  image={relatedPost.image_url}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default BlogPost;