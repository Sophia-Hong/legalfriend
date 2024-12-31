import { Facebook, Twitter, Linkedin, Mail, Link, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this article: ${title}`)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might be interested in this article: ${url}`)}`
    };

    if (platform === 'link') {
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        });
      }).catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy the URL manually.",
          variant: "destructive",
        });
      });
      return;
    }

    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="text-secondary flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share
      </span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('facebook')}
          className="hover:bg-accent/20"
        >
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('twitter')}
          className="hover:bg-accent/20"
        >
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('whatsapp')}
          className="hover:bg-accent/20"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="sr-only">Share on WhatsApp</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('email')}
          className="hover:bg-accent/20"
        >
          <Mail className="h-4 w-4" />
          <span className="sr-only">Share via Email</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('link')}
          className="hover:bg-accent/20"
        >
          <Link className="h-4 w-4" />
          <span className="sr-only">Copy Link</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;