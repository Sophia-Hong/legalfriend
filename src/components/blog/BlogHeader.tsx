import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface BlogHeaderProps {
  post: BlogPost;
}

const BlogHeader = ({ post }: BlogHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Desktop back button */}
      <Button
        variant="ghost"
        className="mb-6 hidden items-center gap-2 text-secondary hover:bg-surface hover:text-primary transition-colors md:flex"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Button>

      {/* Mobile back button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-8 right-4 z-50 rounded-full bg-surface shadow-md hover:bg-accent md:hidden"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-3">
        <span className="px-3 py-1 bg-surface text-primary text-sm font-medium rounded-full border border-primary/20 hover:border-primary/40 transition-colors">
          {post.category}
        </span>
        <span className="text-secondary text-sm">
          {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
        {post.title}
      </h1>

      <ScrollToTop />
    </div>
  );
};

export default BlogHeader;