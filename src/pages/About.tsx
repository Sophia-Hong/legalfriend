import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - LegalFriend</title>
        <meta name="description" content="Learn more about LegalFriend, our mission, and how we help tenants understand their lease agreements." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12">
          <section>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About LegalFriend</h1>
            <p className="text-lg text-primary/80 mb-4">
              LegalFriend was founded with a simple mission: to make legal documents accessible and understandable for everyone.
            </p>
            <p className="text-lg text-primary/80">
              Our AI-powered lease contract review assistant helps tenants understand their rental agreements, identify potentially problematic clauses, and make informed decisions before signing.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-lg text-primary/80 mb-4">
              We believe that everyone deserves to fully understand the legal documents they sign. Unfortunately, lease agreements are often filled with complex legal jargon that can be difficult to decipher.
            </p>
            <p className="text-lg text-primary/80">
              By combining advanced AI technology with legal expertise, we've created a tool that breaks down lease agreements into clear, understandable terms, helping renters protect their rights and make confident decisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Team</h2>
            <p className="text-lg text-primary/80 mb-4">
              LegalFriend was created by a team of legal professionals, technologists, and housing advocates who recognized the need for more transparency in rental agreements.
            </p>
            <p className="text-lg text-primary/80">
              Our team includes experienced real estate attorneys who ensure that our AI provides accurate, helpful insights that reflect current laws and regulations across different jurisdictions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">How It Works</h2>
            <p className="text-lg text-primary/80 mb-4">
              Our platform uses advanced natural language processing to analyze lease agreements, identifying key terms, potential issues, and comparing them to standard market practices.
            </p>
            <p className="text-lg text-primary/80">
              We provide clear explanations of complex clauses, highlight terms that may be unfavorable, and offer context about what's typical in your area, all in plain, easy-to-understand language.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Commitment</h2>
            <p className="text-lg text-primary/80 mb-4">
              We're committed to privacy and security. Your documents are encrypted and processed securely, and we never share your personal information or document contents with third parties.
            </p>
            <p className="text-lg text-primary/80">
              While our service provides valuable insights, we always recommend consulting with a qualified attorney for complex legal matters or specific legal advice tailored to your situation.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
