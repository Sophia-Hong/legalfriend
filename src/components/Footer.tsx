import { Link } from "react-router-dom";
import SocialLinks from "./footer/SocialLinks";
import FooterSection from "./footer/FooterSection";
import FooterBottom from "./footer/FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-24 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">LegalFriend</span>
            </div>
            <p className="text-accent text-sm mb-6">
              Don't sign what you don't understand. AI-powered lease contract review assistant.
            </p>
            <SocialLinks />
          </div>
          
          <FooterSection title="Product">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          </FooterSection>
          
          <FooterSection title="Resources">
            <li><Link to="/useful-tips" className="hover:text-white transition-colors">Useful Tips for Renters</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </FooterSection>
          
          <FooterSection title="Company">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
          </FooterSection>
        </div>
        
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;