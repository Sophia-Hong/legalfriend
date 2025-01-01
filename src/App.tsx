import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReviewContract from "./pages/ReviewContract";
import ContactUs from "./pages/ContactUs";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import UsefulTips from "./pages/UsefulTips";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// Create a layout component to wrap all pages
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname !== "/" && location.pathname !== "/useful-tips";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {showBackButton && (
        <div className="flex items-center p-4 border-b">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
      )}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/review-contract" element={<ReviewContract />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/useful-tips" element={<UsefulTips />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;