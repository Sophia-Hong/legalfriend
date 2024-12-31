import { Link } from "react-router-dom";
import { Menu, UserRound, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="w-full z-50 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
                  Home
                </Link>
                <Link to="/review-contract" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
                  Review Your Contract
                </Link>
                <Link to="/useful-tips" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
                  Useful Tips
                </Link>
                <Link to="/about" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
                  About Us
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - centered on mobile */}
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-90 transition-opacity absolute left-1/2 -translate-x-1/2 md:static md:transform-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-medium text-primary text-base sm:text-lg">LegalFriend</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
            Home
          </Link>
          <Link to="/review-contract" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
            Review Your Contract
          </Link>
          <Link to="/useful-tips" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
            Useful Tips
          </Link>
          <Link to="/about" className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
            About Us
          </Link>
        </div>

        {/* User Menu and Review Button */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <UserRound className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <UserRound className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
          )}
          
          <Link 
            to="/review-contract" 
            className="bg-highlight text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-highlight/90 transition-colors hidden md:block"
          >
            Review Yours
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;