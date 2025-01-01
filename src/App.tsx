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
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/review-contract" element={<ReviewContract />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/useful-tips" element={<UsefulTips />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;