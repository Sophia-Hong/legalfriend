import { Helmet } from "react-helmet";
import { BlogPost } from "@/types/blog";

interface BlogMetaProps {
  post: BlogPost;
}

const BlogMeta = ({ post }: BlogMetaProps) => {
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
        "url": "https://legalfriend.com/logo.png"
      }
    }
  };

  return (
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
  );
};

export default BlogMeta;