import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this article: ${title}`)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
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
  );
};

export default SocialShare;