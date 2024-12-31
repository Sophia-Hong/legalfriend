import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import FAQ from "../components/FAQ";

const Index = () => {
  // Schema for the organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LegalFriend",
    "description": "AI-powered lease contract review assistant helping tenants understand their rental agreements",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.svg`,
    "sameAs": [
      "https://twitter.com/legalfriend",
      "https://linkedin.com/company/legalfriend"
    ]
  };

  // Schema for the service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Lease Contract Review Assistant",
    "description": "AI-powered contract review service that helps tenants understand their lease agreements",
    "provider": {
      "@type": "Organization",
      "name": "LegalFriend"
    },
    "serviceType": "Legal Document Review",
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${window.location.origin}/review-contract`
    }
  };

  return (
    <>
      <Helmet>
        <title>LegalFriend - AI-Powered Lease Contract Review Assistant</title>
        <meta name="description" content="Don't sign what you don't understand. Our real lawyer-designed, AI-powered assistant provides fast, affordable contract reviews for your lease agreements." />
        <meta name="keywords" content="lease review, contract review, rental agreement, tenant rights, legal assistant, AI legal help" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="LegalFriend - AI-Powered Lease Contract Review Assistant" />
        <meta property="og:description" content="Get your lease contract reviewed by our AI-powered assistant. Fast, affordable, and designed by real lawyers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={`${window.location.origin}/og-image.svg`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LegalFriend - AI-Powered Lease Contract Review" />
        <meta name="twitter:description" content="Get expert insights on your lease agreement with our AI-powered review assistant." />
        <meta name="twitter:image" content={`${window.location.origin}/og-image.svg`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={window.location.origin} />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <main role="main">
          <Hero />
          <Features />
          <Stats />
          <FAQ />
        </main>
      </div>
    </>
  );
};

export default Index;