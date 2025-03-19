import { Helmet } from "react-helmet";

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features - LegalFriend</title>
        <meta name="description" content="Explore the features of LegalFriend's AI-powered lease contract review assistant." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Features</h1>
        
        <div className="space-y-12">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">AI-Powered Contract Analysis</h2>
            <p className="text-lg text-primary/80 mb-4">
              Our advanced AI technology analyzes your lease agreement to identify key terms, potential issues, and unfavorable clauses.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80">
              <li>Automatic identification of important lease provisions</li>
              <li>Detection of unusual or potentially problematic clauses</li>
              <li>Comparison with standard market practices</li>
              <li>Plain language explanations of complex legal terms</li>
            </ul>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Comprehensive Lease Review</h2>
            <p className="text-lg text-primary/80 mb-4">
              Get a detailed analysis of all critical aspects of your lease agreement.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80">
              <li>Rent and security deposit terms</li>
              <li>Maintenance and repair responsibilities</li>
              <li>Early termination conditions</li>
              <li>Renewal options and rent increase provisions</li>
              <li>Pet policies and restrictions</li>
              <li>Privacy and entry rights</li>
              <li>Subletting and assignment clauses</li>
            </ul>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Market Context and Insights</h2>
            <p className="text-lg text-primary/80 mb-4">
              Understand how your lease compares to typical agreements in your area.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80">
              <li>Comparison with local market standards</li>
              <li>Identification of terms that deviate from typical practices</li>
              <li>Insights into negotiable clauses</li>
              <li>Regional legal requirements and tenant rights information</li>
            </ul>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Secure Document Handling</h2>
            <p className="text-lg text-primary/80 mb-4">
              Your privacy and security are our top priorities.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80">
              <li>End-to-end encryption for all uploaded documents</li>
              <li>Secure cloud storage with limited access</li>
              <li>Option to delete your documents after review</li>
              <li>No sharing of your personal information or document contents</li>
            </ul>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">User-Friendly Interface</h2>
            <p className="text-lg text-primary/80 mb-4">
              Our platform is designed to be intuitive and easy to use.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80">
              <li>Simple document upload process</li>
              <li>Clear, organized presentation of analysis results</li>
              <li>Mobile-friendly design for on-the-go access</li>
              <li>Easy navigation between different sections of your lease analysis</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default Features;
