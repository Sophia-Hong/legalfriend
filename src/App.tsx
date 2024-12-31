import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UsefulTips from "./pages/UsefulTips";
import BlogPost from "./pages/BlogPost";
import ReviewContract from "./pages/ReviewContract";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import User from "./pages/User";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="pb-24 md:pb-8 flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/useful-tips" element={<UsefulTips />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/review-contract" element={<ReviewContract />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </main>
          <ScrollToTop />
          <Footer />
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;