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
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15.5c-3.03 0-5.5-2.47-5.5-5.5S8.97 6.5 12 6.5s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z"/>
          <path d="M12 7.5v9M7.5 12h9"/>
        </svg>
      </a>
    </div>
  );
};

export default SocialLinks;