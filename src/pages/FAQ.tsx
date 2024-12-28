import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction Section - Matching Privacy Policy style */}
        <div className="flex items-center gap-3 mb-12">
          <Shield className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-semibold">Frequently Asked Questions</h1>
        </div>
        
        <Card className="mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6">
            <p className="text-lg text-primary">
              Find answers to common questions about our lease review service. If you can't find what you're looking for, feel free to contact us.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {/* Service Basics */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Service Basics</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="how-it-works" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">How does your Lease Contract Review Service actually work?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      We use an AI-powered system to analyze your uploaded lease document, highlighting key terms such as rent, security deposit, and termination clauses, then comparing them to typical market standards. This system was developed in consultation with a legal professional to provide meaningful insights and help you understand your contract—without unnecessarily alarming you or jeopardizing a successful rental relationship.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="lease-types" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">What types of leases do you review?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      We currently focus on residential leases (e.g., apartments, single-family homes). We plan to expand our service to commercial and specialized leases in the future. If you have suggestions for other lease types, please let us know at support@legalfriend.ai.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Security & Privacy */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Security & Privacy</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="document-safety" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Is it safe for me to upload my personal lease documents?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Yes. All documents are treated with strict confidentiality. We automatically redact personal information (e.g., names, contact details, addresses), keeping only the postcode for statistical and service-improvement purposes. For more details, see our <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Review Results & Insights */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Review Results & Insights</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="feedback-type" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">What kind of feedback will I receive after the AI analysis?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      You'll get a structured summary pinpointing each key clause—rent, fees, deposit, renewal terms—and noting if anything appears unusual, non-standard, or potentially unfavorable.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="legal-advice" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Will the service offer me legal advice or just general information?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      We provide general, AI-generated legal information—not specific legal advice. We are not a law firm, and using this service does not create an attorney-client relationship. For legal advice tailored to your situation, consult a qualified attorney in your jurisdiction. See our <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> for a full disclaimer.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="review-time" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">How long does it take to get the results?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Most lease reviews finish in under a minute, but times can vary depending on the complexity and length of the document.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Follow-Up & Additional Help */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Follow-Up & Additional Help</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="live-expert" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Can I speak to a live expert or lawyer if I have questions?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Currently, we do not offer direct consultations with a lawyer. However, we're planning a matching service in the future. Your feedback is always welcome—reach out via our <Link to="/contact-us" className="text-primary underline">Contact Us</Link> page.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & Payments */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Pricing & Payments</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="pricing" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Is there a cost for each review, or do I need a subscription?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Please see the attached <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> for specific pricing and billing details.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="refunds" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Do you offer any refunds if I'm not satisfied with the review?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      We encourage you to review the <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> for our policy on refunds and other payment-related matters.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Legal Scope & Limitations */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Legal Scope & Limitations</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="service-validity" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Is your service valid in all states/countries?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Our platform currently serves users in the United States only.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ai-accuracy" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Will the AI catch all possible issues?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Our system is highly accurate but should not be viewed as a complete substitute for professional legal counsel. For more details on our limitations and disclaimers, consult the <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Miscellaneous */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Miscellaneous</h2>
            <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="complex-documents" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Can the AI handle long or complex lease documents with addendums?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Yes. Although the analysis might take slightly longer for very lengthy or complex files. If you have any special instructions or a large batch of addendums, let us know.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="non-english" className="border-b">
                    <AccordionTrigger className="text-lg font-medium">Do you handle non-English leases or bilingual contracts?</AccordionTrigger>
                    <AccordionContent className="text-primary">
                      Currently, we only offer our review service for English-language leases.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;