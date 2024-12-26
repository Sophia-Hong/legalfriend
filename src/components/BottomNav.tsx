import { Home, BookOpen, FileText, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-accent/20 px-6 py-2 z-50">
      <div className="flex justify-between items-center max-w-[500px] mx-auto">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 p-2 ${
            isActive("/") ? "text-primary" : "text-secondary"
          }`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link 
          to="/review-contract" 
          className={`flex flex-col items-center gap-1 p-2 ${
            isActive("/review-contract") ? "text-primary" : "text-secondary"
          }`}
        >
          <FileText size={24} />
          <span className="text-xs">Review</span>
        </Link>
        
        <Link 
          to="/useful-tips" 
          className={`flex flex-col items-center gap-1 p-2 ${
            isActive("/useful-tips") ? "text-primary" : "text-secondary"
          }`}
        >
          <BookOpen size={24} />
          <span className="text-xs">Resources</span>
        </Link>
        
        <button 
          className="flex flex-col items-center gap-1 p-2 text-secondary"
          onClick={() => console.log("User profile clicked")}
        >
          <User size={24} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;