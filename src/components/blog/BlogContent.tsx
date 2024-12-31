import { BlogPost } from "@/types/blog";

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <>
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6 sm:mb-8">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div 
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 sm:mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

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
    </>
  );
};

export default BlogContent;