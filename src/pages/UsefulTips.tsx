import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TipCard from "@/components/tips/TipCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/services/blogService";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

const UsefulTips = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
  });

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Enhanced schema markup for the blog listing
  const blogListingSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "LegalFriend Resources",
    "description": "Expert insights and practical guides to help you navigate the rental process with confidence.",
    "url": window.location.href,
    "publisher": {
      "@type": "Organization",
      "name": "LegalFriend",
      "logo": {
        "@type": "ImageObject",
        "url": "https://legalfriend.com/logo.png" // Update with actual logo URL
      }
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.published_at || post.created_at,
      "dateModified": post.updated_at,
      "image": post.image_url,
      "articleSection": post.category,
      "keywords": post.tags?.join(", "),
      "wordCount": post.read_time,
      "url": `${window.location.origin}/blog/${post.slug}`,
      "author": {
        "@type": "Organization",
        "name": "LegalFriend"
      }
    }))
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": window.location.origin
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Resources",
      "item": window.location.href
    }]
  };

  return (
    <>
      <Helmet>
        <title>Rental Resources & Tips | Expert Lease Advice | LegalFriend</title>
        <meta name="description" content="Access expert insights and practical guides on lease agreements, tenant rights, and rental processes. Get professional advice to navigate your rental journey confidently." />
        <meta name="keywords" content="rental tips, lease agreement guide, tenant rights, rental process, legal advice, property rental, lease review" />
        <meta property="og:title" content="Rental Resources & Tips | Expert Lease Advice | LegalFriend" />
        <meta property="og:description" content="Access expert insights and practical guides on lease agreements, tenant rights, and rental processes. Get professional advice to navigate your rental journey confidently." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rental Resources & Tips | Expert Lease Advice | LegalFriend" />
        <meta name="twitter:description" content="Access expert insights and practical guides on lease agreements, tenant rights, and rental processes." />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(blogListingSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-surface" role="main">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-medium tracking-tight text-primary mb-6">
              Resources & Guides
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Expert insights and practical guides<br />to help you navigate the rental process with confidence.
            </p>
          </header>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-secondary" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-12 h-12 bg-white border-gray-200 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>

          {/* Tips Grid */}
          <section aria-label="Blog posts">
            {isLoading ? (
              <div className="text-center py-8" role="status" aria-live="polite">
                <p>Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500" role="alert">
                <p>Error loading articles. Please try again later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
                {filteredPosts.map((post) => (
                  <article key={post.id}>
                    <TipCard
                      category={post.category}
                      title={post.title}
                      description={post.description}
                      readTime={post.read_time}
                      date={format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                      image={post.image_url}
                    />
                  </article>
                ))}
                {filteredPosts.length === 0 && (
                  <div className="col-span-2 text-center py-8 text-secondary" role="status" aria-live="polite">
                    <p>No articles found matching your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default UsefulTips;