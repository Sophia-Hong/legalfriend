import { BlogPost } from "@/types/blog";
import TipCard from "@/components/tips/TipCard";
import { format } from "date-fns";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <TipCard
            key={post.id}
            category={post.category}
            title={post.title}
            description={post.description}
            readTime={post.read_time}
            date={format(
              new Date(post.published_at || post.created_at),
              'MMM d, yyyy'
            )}
            image={post.image_url}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;