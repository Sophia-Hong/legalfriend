import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BlogPost } from "@/types/blog";

interface BlogAuthorProps {
  post: BlogPost;
}

const BlogAuthor = ({ post }: BlogAuthorProps) => {
  if (!post.author_id) return null;

  return (
    <div className="flex items-center gap-3 mb-6 p-4 bg-surface rounded-lg border border-primary/10">
      <Avatar className="h-12 w-12">
        <AvatarFallback>
          <UserRound className="h-6 w-6 text-muted" />
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-primary">Legal Friend AI</div>
        <div className="text-sm text-secondary">Expert in Tenant Rights</div>
      </div>
    </div>
  );
};

export default BlogAuthor;