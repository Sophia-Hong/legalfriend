import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 px-6 py-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-medium text-primary">LegalFriend</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-primary hover:text-primary/80 transition-colors">Home</a>
          <a href="/review-contract" className="text-primary hover:text-primary/80 transition-colors">Review Your Contract</a>
          <a href="/useful-tips" className="text-primary hover:text-primary/80 transition-colors">Useful Tips</a>
          <a href="/about" className="text-primary hover:text-primary/80 transition-colors">About Us</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-primary font-medium hover:text-primary/80 transition-colors">
            Sign In
          </button>
          <a 
            href="/review-contract" 
            className="bg-highlight text-primary px-4 py-2 rounded-lg font-medium hover:bg-highlight/90 transition-colors"
          >
            Review Yours
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;