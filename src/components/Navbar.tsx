import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-medium text-xl text-primary">LegalFriend</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
            <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">Upload Contract</Link>
            <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-600 font-medium hover:text-primary transition-colors">
              Sign in
            </button>
            <button className="bg-accent text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors">
              Upload Contract
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;