import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReviewContract from "./pages/ReviewContract";
import ContactUs from "./pages/ContactUs";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import UsefulTips from "./pages/UsefulTips";
import LeaseReviewSummary from "./pages/LeaseReviewSummary";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create React Query client
const queryClient = new QueryClient();

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
      <Footer />
      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
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
              <Route path="/lease-review-summary" element={<LeaseReviewSummary />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
