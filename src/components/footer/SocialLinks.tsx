import { Youtube, Instagram, Twitter, Facebook } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-accent hover:text-white transition-colors"
        aria-label="Visit our Youtube channel"
      >
        <Youtube size={20} />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-accent hover:text-white transition-colors"
        aria-label="Visit our Instagram profile"
      >
        <Instagram size={20} />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-accent hover:text-white transition-colors"
        aria-label="Visit our X (Twitter) profile"
      >
        <Twitter size={20} />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-accent hover:text-white transition-colors"
        aria-label="Visit our Facebook page"
      >
        <Facebook size={20} />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-accent hover:text-white transition-colors"
        aria-label="Visit our Threads profile"
      >
        <img 
          src="/lovable-uploads/984f40c0-76f3-497b-8579-e9df525724e2.png"
          alt="Threads"
          className="w-5 h-5"
        />
      </a>
    </div>
  );
};

export default SocialLinks;