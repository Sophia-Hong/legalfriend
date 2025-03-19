import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink, 
  highlighted = false 
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}) => {
  return (
    <div className={`rounded-xl p-6 sm:p-8 ${highlighted ? 'bg-highlight border-2 border-primary/10' : 'bg-white border border-accent/20'}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-secondary ml-1">/month</span>}
      </div>
      <p className="text-secondary mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span className="text-primary/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        to={buttonLink} 
        className={`w-full block text-center py-2.5 rounded-lg font-medium ${
          highlighted 
            ? 'bg-primary text-white hover:bg-primary/90' 
            : 'bg-highlight text-primary hover:bg-highlight/90'
        } transition-colors`}
      >
        {buttonText}
      </Link>
    </div>
  );
};

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - LegalFriend</title>
        <meta name="description" content="Affordable pricing plans for LegalFriend's AI-powered lease contract review assistant." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Simple, Transparent Pricing</h1>
          <p className="text-lg text-primary/80">
            Choose the plan that works best for you. All plans include our core AI-powered lease analysis.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier 
            title="Basic"
            price="Free"
            description="Perfect for a single lease review"
            features={[
              "1 lease contract review per month",
              "Basic lease analysis",
              "Key terms identification",
              "Standard market comparison",
              "Email support"
            ]}
            buttonText="Get Started"
            buttonLink="/signup"
          />
          
          <PricingTier 
            title="Premium"
            price="$9.99"
            description="Ideal for active apartment hunters"
            features={[
              "5 lease contract reviews per month",
              "Advanced lease analysis",
              "Detailed clause explanations",
              "Negotiation suggestions",
              "Priority email support",
              "Document storage for 1 year"
            ]}
            buttonText="Subscribe Now"
            buttonLink="/signup"
            highlighted={true}
          />
          
          <PricingTier 
            title="Professional"
            price="$19.99"
            description="For real estate professionals"
            features={[
              "Unlimited lease contract reviews",
              "Premium lease analysis",
              "Custom clause library",
              "Bulk upload capability",
              "Priority phone support",
              "Permanent document storage",
              "Team sharing capabilities"
            ]}
            buttonText="Contact Sales"
            buttonLink="/contact-us"
          />
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-xl border border-accent/20">
          <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Can I cancel my subscription at any time?</h3>
              <p className="text-primary/80">Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your billing period.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Do you offer refunds?</h3>
              <p className="text-primary/80">We offer a 7-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-primary/80">We accept all major credit cards, PayPal, and Apple Pay.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Do you offer discounts for students or non-profits?</h3>
              <p className="text-primary/80">Yes, we offer special pricing for students, non-profits, and educational institutions. Please contact our support team for more information.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
