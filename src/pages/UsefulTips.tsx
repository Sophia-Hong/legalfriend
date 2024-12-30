import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TipCard from "@/components/tips/TipCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/services/blogService";
import { format } from "date-fns";

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

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-medium tracking-tight text-primary mb-6">
            Resources
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Expert insights and practical guides<br />to help you navigate the rental process with confidence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-secondary" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-12 h-12 bg-white border-gray-200 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tips Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Error loading articles. Please try again later.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
            {filteredPosts.map((post) => (
              <TipCard
                key={post.id}
                category={post.category}
                title={post.title}
                description={post.description}
                readTime={post.read_time}
                date={format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                image={post.image_url}
              />
            ))}
            {filteredPosts.length === 0 && (
              <div className="col-span-2 text-center py-8 text-secondary">
                No articles found matching your search criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsefulTips;