import { Scale, Shield, User, FileText, AlertCircle, CreditCard, Globe, MessageSquare } from "lucide-react";
import { Introduction } from "@/components/terms/Introduction";
import { TermsSection } from "@/components/terms/TermsSection";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Introduction />
        
        <div className="space-y-8">
          <TermsSection icon={Shield} title="Acceptance of Terms" number="1">
            <p className="text-primary mb-4">By accessing or using LegalFriend's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use our services.</p>
            <p className="text-primary">We reserve the right to modify these terms at any time. We will notify you of any material changes through our platform or via email. Your continued use of our services after such modifications constitutes acceptance of the updated terms.</p>
          </TermsSection>

          <TermsSection icon={User} title="No Attorney-Client Relationship" number="2">
            <p className="text-primary mb-4">LegalFriend is not a law firm and does not provide legal representation or advice. Using our services does not create an attorney-client relationship.</p>
            <p className="text-primary">Our AI-powered analysis and summaries are for informational purposes only and should not be relied upon as a substitute for professional legal counsel.</p>
          </TermsSection>

          <TermsSection icon={FileText} title="Service Description" number="3">
            <p className="text-primary mb-4">Our AI tool provides automated analysis of lease agreements, identifying potential issues and offering general explanations. While we strive for accuracy, the tool:</p>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              <li>May occasionally miss certain provisions or risks</li>
              <li>Should not be considered a complete legal review</li>
              <li>Is designed to supplement, not replace, professional legal review</li>
            </ul>
          </TermsSection>

          <TermsSection icon={AlertCircle} title="Limitations and Disclaimers" number="4">
            <p className="text-primary mb-4">Our services are provided "as is" without any warranties, express or implied. We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              <li>Complete accuracy of analysis</li>
              <li>Identification of all potential legal issues</li>
              <li>Suitability for your specific legal needs</li>
            </ul>
          </TermsSection>

          <TermsSection icon={CreditCard} title="Pricing and Payments" number="5">
            <p className="text-primary mb-4">Payment terms and conditions:</p>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              <li>All fees are non-refundable once results are delivered</li>
              <li>Prices are subject to change with notice</li>
              <li>Payment is required before service delivery</li>
            </ul>
          </TermsSection>

          <TermsSection icon={Globe} title="Geographic Limitations" number="6">
            <p className="text-primary">Our services are currently available only in the United States. Users from other jurisdictions should not rely on our analysis, as lease laws and regulations vary significantly by country.</p>
          </TermsSection>

          <TermsSection icon={MessageSquare} title="Contact and Support" number="7">
            <p className="text-primary mb-4">For questions or concerns about these terms:</p>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              <li>Email: support@legalfriend.ai</li>
              <li>Response time: Within 24-48 business hours</li>
            </ul>
          </TermsSection>
        </div>

        <div className="mt-16 text-sm text-muted">
          Last updated: December 28, 2024
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;