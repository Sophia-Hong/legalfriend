import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Welcome to LegalFriend! Your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our services, which include AI-powered lease agreement analysis.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">1. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mt-8 mb-4">a. Information You Provide Directly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Uploaded Documents</strong>: If you upload lease agreements or other documents, we collect the information contained within these documents to provide our services. This may include:
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Personal identifiers (e.g., names, addresses)</li>
                <li>Contract terms (e.g., rent amount, lease duration, obligations, and conditions)</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-8 mb-4">b. Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data</strong>: When you interact with our website, we may collect technical information such as:
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>IP addresses</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our website</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-8 mb-4">c. Communication Information</h3>
          <p>If you contact us via email or other forms, we may collect your name, email address, and the contents of your communication.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">2. How We Use Your Information</h2>
          <p>We use the information collected to:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Provide our services, including analyzing lease agreements and offering insights</li>
            <li>Improve our services through anonymized data analysis and insights</li>
            <li>Communicate with you regarding your use of our services, updates, and support requests</li>
            <li>Ensure compliance with applicable laws and prevent fraudulent activities</li>
          </ol>

          <h2 className="text-2xl font-semibold mt-12 mb-6">3. Sharing Your Information</h2>
          <p>We do not sell your personal information. However, we may share your information under the following circumstances:</p>

          <h3 className="text-xl font-medium mt-8 mb-4">a. Service Providers</h3>
          <p>We may share your data with trusted service providers who assist us in delivering services (e.g., hosting providers, payment processors). These providers are bound by confidentiality agreements and are only permitted to use your data for the purposes specified by us.</p>

          <h3 className="text-xl font-medium mt-8 mb-4">b. Legal Compliance</h3>
          <p>We may disclose your information if required by law or to protect our legal rights, comply with a judicial proceeding, court order, or other legal processes.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">4. Anonymization of Data</h2>
          <p>We may anonymize the data in your uploaded documents to remove identifiable information (e.g., names, addresses). Anonymized data may be used to:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Improve the accuracy and functionality of our AI models</li>
            <li>Generate aggregate insights about lease agreement trends</li>
          </ol>
          <p>Your uploaded documents and data will not be shared or used for any purpose without being fully anonymized.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">5. Your Rights and Choices</h2>
          <h3 className="text-xl font-medium mt-8 mb-4">a. Access and Update</h3>
          <p>You can request access to your personal data or request corrections by contacting us at info@legalfriend.ai.</p>

          <h3 className="text-xl font-medium mt-8 mb-4">b. Data Deletion</h3>
          <p>You can request the deletion of your data from our system, subject to legal and contractual obligations. Submit your request to info@legalfriend.ai.</p>

          <h3 className="text-xl font-medium mt-8 mb-4">c. Opt-Out</h3>
          <p>If you no longer wish to receive promotional emails, you may opt out by clicking the "unsubscribe" link in our emails or contacting us directly.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">6. Data Security</h2>
          <p>We implement industry-standard measures to protect your personal information, including:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Data encryption during transmission (e.g., HTTPS)</li>
            <li>Access controls to restrict unauthorized access to our systems</li>
            <li>Regular audits and monitoring for vulnerabilities</li>
          </ol>
          <p>While we strive to protect your information, no system can guarantee complete security. We encourage you to safeguard your account credentials.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">7. Data Breach Notification</h2>
          <p>If we discover a security incident that compromises your personal information, we will notify you in accordance with applicable laws and provide information about steps you can take to protect yourself.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">8. Cookies and Tracking Technologies</h2>
          <p>We use cookies to improve your experience on our website. Cookies help us understand how you interact with our services, track website performance, and personalize your experience. You can manage your cookie preferences through your browser settings.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">9. Retention of Data</h2>
          <p>We retain your data only for as long as it is necessary to:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Provide our services</li>
            <li>Comply with legal requirements</li>
            <li>Improve our services (with anonymized data)</li>
          </ol>
          <p>Once data is no longer needed, it is securely deleted or anonymized.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">10. Third-Party Services</h2>
          <p>We may use third-party services (e.g., OpenAI, Stripe) to enhance our services. By using our service, you acknowledge that third-party services may process your data according to their privacy policies.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">11. Children's Privacy</h2>
          <p>Our services are not directed to children under 13, and we do not knowingly collect personal information from children. If you believe we have collected information from a child under 13, please contact us immediately.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-6">12. Updates to This Privacy Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Updates will be posted on this page, and the "Last Updated" date will be revised. Continued use of our services constitutes acceptance of the updated Privacy Policy.</p>

          <h3 className="text-xl font-medium mt-12 mb-4">13. Contact Us</h3>
          <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <ul className="mt-4 space-y-2">
            <li><strong>Email</strong>: info@legalfriend.ai</li>
            <li><strong>Mailing Address</strong>: 41593 Winchester Rd. Suite 200, Temecula, CA 92590</li>
            <li><strong>Phone Number</strong>: +1 571 382 8738</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-8">Effective Date: December 8, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
