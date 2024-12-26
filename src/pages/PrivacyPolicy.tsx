import { User, Info, Lock, Shield, FileText } from "lucide-react";
import { Introduction } from "@/components/privacy/Introduction";
import { InformationCollection } from "@/components/privacy/InformationCollection";
import { DataUsage } from "@/components/privacy/DataUsage";
import { ContactInfo } from "@/components/privacy/ContactInfo";
import { PrivacySection } from "@/components/privacy/PrivacySection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Introduction />
        <div className="space-y-8">
          <InformationCollection />
          <DataUsage />
          
          <PrivacySection icon={User} title="Sharing Your Information" number="3">
            <p className="text-primary mb-4">We do not sell your personal information. However, we may share your information under the following circumstances:</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">a. Service Providers</h3>
            <p className="text-primary mb-4">We may share your data with trusted service providers who assist us in delivering services (e.g., hosting providers, payment processors). These providers are bound by confidentiality agreements and are only permitted to use your data for the purposes specified by us.</p>

            <h3 className="text-xl font-medium mt-4 mb-2">b. Legal Compliance</h3>
            <p className="text-primary mb-4">We may disclose your information if required by law or to protect our legal rights, comply with a judicial proceeding, court order, or other legal processes.</p>
          </PrivacySection>

          <PrivacySection icon={Lock} title="Anonymization of Data" number="4">
            <p className="text-primary mb-4">We may anonymize the data in your uploaded documents to remove identifiable information (e.g., names, addresses). Anonymized data may be used to:</p>
            <ol className="list-decimal pl-6 space-y-2 text-primary">
              <li>Improve the accuracy and functionality of our AI models</li>
              <li>Generate aggregate insights about lease agreement trends</li>
            </ol>
            <p className="text-primary mt-4">Your uploaded documents and data will not be shared or used for any purpose without being fully anonymized.</p>
          </PrivacySection>

          <PrivacySection icon={User} title="Your Rights and Choices" number="5">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">a. Access and Update</h3>
                <p className="text-primary">You can request access to your personal data or request corrections by contacting us at info@legalfriend.ai.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">b. Data Deletion</h3>
                <p className="text-primary">You can request the deletion of your data from our system, subject to legal and contractual obligations. Submit your request to info@legalfriend.ai.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">c. Opt-Out</h3>
                <p className="text-primary">If you no longer wish to receive promotional emails, you may opt out by clicking the "unsubscribe" link in our emails or contacting us directly.</p>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection icon={Lock} title="Data Security" number="6">
            <p className="text-primary mb-4">We implement industry-standard measures to protect your personal information, including:</p>
            <ol className="list-decimal pl-6 space-y-2 text-primary">
              <li>Data encryption during transmission (e.g., HTTPS)</li>
              <li>Access controls to restrict unauthorized access to our systems</li>
              <li>Regular audits and monitoring for vulnerabilities</li>
            </ol>
            <p className="text-primary mt-4">While we strive to protect your information, no system can guarantee complete security. We encourage you to safeguard your account credentials.</p>
          </PrivacySection>

          <PrivacySection icon={Shield} title="Data Breach Notification" number="7">
            <p className="text-primary">If we discover a security incident that compromises your personal information, we will notify you in accordance with applicable laws and provide information about steps you can take to protect yourself.</p>
          </PrivacySection>

          <PrivacySection icon={Info} title="Cookies and Tracking Technologies" number="8">
            <p className="text-primary">We use cookies to improve your experience on our website. Cookies help us understand how you interact with our services, track website performance, and personalize your experience. You can manage your cookie preferences through your browser settings.</p>
          </PrivacySection>

          <PrivacySection icon={FileText} title="Retention of Data" number="9">
            <p className="text-primary mb-4">We retain your data only for as long as it is necessary to:</p>
            <ol className="list-decimal pl-6 space-y-2 text-primary">
              <li>Provide our services</li>
              <li>Comply with legal requirements</li>
              <li>Improve our services (with anonymized data)</li>
            </ol>
            <p className="text-primary mt-4">Once data is no longer needed, it is securely deleted or anonymized.</p>
          </PrivacySection>

          <PrivacySection icon={Info} title="Third-Party Services" number="10">
            <p className="text-primary">We may use third-party services (e.g., OpenAI, Stripe) to enhance our services. By using our service, you acknowledge that third-party services may process your data according to their privacy policies.</p>
          </PrivacySection>

          <PrivacySection icon={User} title="Children's Privacy" number="11">
            <p className="text-primary">Our services are not directed to children under 13, and we do not knowingly collect personal information from children. If you believe we have collected information from a child under 13, please contact us immediately.</p>
          </PrivacySection>

          <PrivacySection icon={Info} title="Updates to This Privacy Policy" number="12">
            <p className="text-primary">We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Updates will be posted on this page, and the "Last Updated" date will be revised. Continued use of our services constitutes acceptance of the updated Privacy Policy.</p>
          </PrivacySection>

          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;