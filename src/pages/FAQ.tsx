import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-accent text-lg">Find answers to common questions about our lease review service.</p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-6 py-12">
        <Accordion type="single" collapsible className="space-y-6">
          {/* Service Basics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Service Basics</h2>
            <AccordionItem value="how-it-works" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">How does your Lease Contract Review Service actually work?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                We use an AI-powered system to analyze your uploaded lease document, highlighting key terms such as rent, security deposit, and termination clauses, then comparing them to typical market standards. This system was developed in consultation with a legal professional to provide meaningful insights and help you understand your contract—without unnecessarily alarming you or jeopardizing a successful rental relationship.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="lease-types" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">What types of leases do you review?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                We currently focus on residential leases (e.g., apartments, single-family homes). We plan to expand our service to commercial and specialized leases in the future. If you have suggestions for other lease types, please let us know at support@legalfriend.ai.
              </AccordionContent>
            </AccordionItem>
          </div>

          {/* Security & Privacy */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Security & Privacy</h2>
            <AccordionItem value="document-safety" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Is it safe for me to upload my personal lease documents?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Yes. All documents are treated with strict confidentiality. We automatically redact personal information (e.g., names, contact details, addresses), keeping only the postcode for statistical and service-improvement purposes. For more details, see our <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.
              </AccordionContent>
            </AccordionItem>
          </div>

          {/* Review Results & Insights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Review Results & Insights</h2>
            <AccordionItem value="feedback-type" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">What kind of feedback will I receive after the AI analysis?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                You'll get a structured summary pinpointing each key clause—rent, fees, deposit, renewal terms—and noting if anything appears unusual, non-standard, or potentially unfavorable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legal-advice" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Will the service offer me legal advice or just general information?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                We provide general, AI-generated legal information—not specific legal advice. We are not a law firm, and using this service does not create an attorney-client relationship. For legal advice tailored to your situation, consult a qualified attorney in your jurisdiction. See our <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> for a full disclaimer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="review-time" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">How long does it take to get the results?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Most lease reviews finish in under a minute, but times can vary depending on the complexity and length of the document.
              </AccordionContent>
            </AccordionItem>
          </div>

          {/* Follow-Up & Additional Help */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Follow-Up & Additional Help</h2>
            <AccordionItem value="live-expert" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Can I speak to a live expert or lawyer if I have questions?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Currently, we do not offer direct consultations with a lawyer. However, we're planning a matching service in the future. Your feedback is always welcome—reach out via our <Link to="/contact-us" className="text-primary underline">Contact Us</Link> page.
              </AccordionContent>
            </AccordionItem>
          </div>

          {/* Pricing & Payments */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Pricing & Payments</h2>
            <AccordionItem value="pricing" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Is there a cost for each review, or do I need a subscription?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Please see the attached <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> for specific pricing and billing details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refunds" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Do you offer any refunds if I'm not satisfied with the review?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                We encourage you to review the <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> for our policy on refunds and other payment-related matters.
              </AccordionContent>
            </AccordionItem>
          </div>

          {/* Legal Scope & Limitations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Legal Scope & Limitations</h2>
            <AccordionItem value="service-validity" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Is your service valid in all states/countries?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Our platform currently serves users in the United States only.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai-accuracy" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Will the AI catch all possible issues?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Our system is highly accurate but should not be viewed as a complete substitute for professional legal counsel. For more details on our limitations and disclaimers, consult the <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link>.
              </AccordionContent>
            </AccordionItem>
          </div>

          {/* Miscellaneous */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Miscellaneous</h2>
            <AccordionItem value="complex-documents" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Can the AI handle long or complex lease documents with addendums?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Yes. Although the analysis might take slightly longer for very lengthy or complex files. If you have any special instructions or a large batch of addendums, let us know.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="non-english" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg">Do you handle non-English leases or bilingual contracts?</AccordionTrigger>
              <AccordionContent className="text-secondary">
                Currently, we only offer our review service for English-language leases.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;