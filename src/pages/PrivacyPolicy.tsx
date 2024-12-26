import { Shield, Mail, MapPin, Phone, FileText, Lock, User, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-12">
          <Shield className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        </div>
        
        <Card className="mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6">
            <p className="text-lg text-muted">
              Welcome to LegalFriend! Your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our services, which include AI-powered lease agreement analysis.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">a. Information You Provide Directly</h3>
                  <ul className="list-disc pl-6 space-y-2 text-primary">
                    <li>
                      <strong>Uploaded Documents</strong>: If you upload lease agreements or other documents, we collect the information contained within these documents to provide our services. This may include:
                      <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Personal identifiers (e.g., names, addresses)</li>
                        <li>Contract terms (e.g., rent amount, lease duration, obligations, and conditions)</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-3">b. Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-primary">
                    <li>
                      <strong>Usage Data</strong>: When you interact with our website, we may collect technical information such as:
                      <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>IP addresses</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on our website</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary mb-4">We use the information collected to:</p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>Provide our services, including analyzing lease agreements and offering insights</li>
                <li>Improve our services through anonymized data analysis and insights</li>
                <li>Communicate with you regarding your use of our services, updates, and support requests</li>
                <li>Ensure compliance with applicable laws and prevent fraudulent activities</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-6 h-6" />
                3. Sharing Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary mb-4">We do not sell your personal information. However, we may share your information under the following circumstances:</p>
              
              <h3 className="text-xl font-medium mt-4 mb-2">a. Service Providers</h3>
              <p className="text-primary mb-4">We may share your data with trusted service providers who assist us in delivering services (e.g., hosting providers, payment processors). These providers are bound by confidentiality agreements and are only permitted to use your data for the purposes specified by us.</p>

              <h3 className="text-xl font-medium mt-4 mb-2">b. Legal Compliance</h3>
              <p className="text-primary mb-4">We may disclose your information if required by law or to protect our legal rights, comply with a judicial proceeding, court order, or other legal processes.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6" />
                4. Anonymization of Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary mb-4">We may anonymize the data in your uploaded documents to remove identifiable information (e.g., names, addresses). Anonymized data may be used to:</p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>Improve the accuracy and functionality of our AI models</li>
                <li>Generate aggregate insights about lease agreement trends</li>
              </ol>
              <p className="text-primary mt-4">Your uploaded documents and data will not be shared or used for any purpose without being fully anonymized.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-6 h-6" />
                5. Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6" />
                6. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary mb-4">We implement industry-standard measures to protect your personal information, including:</p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>Data encryption during transmission (e.g., HTTPS)</li>
                <li>Access controls to restrict unauthorized access to our systems</li>
                <li>Regular audits and monitoring for vulnerabilities</li>
              </ol>
              <p className="text-primary mt-4">While we strive to protect your information, no system can guarantee complete security. We encourage you to safeguard your account credentials.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                7. Data Breach Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary">If we discover a security incident that compromises your personal information, we will notify you in accordance with applicable laws and provide information about steps you can take to protect yourself.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6" />
                8. Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary">We use cookies to improve your experience on our website. Cookies help us understand how you interact with our services, track website performance, and personalize your experience. You can manage your cookie preferences through your browser settings.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                9. Retention of Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary mb-4">We retain your data only for as long as it is necessary to:</p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>Provide our services</li>
                <li>Comply with legal requirements</li>
                <li>Improve our services (with anonymized data)</li>
              </ol>
              <p className="text-primary mt-4">Once data is no longer needed, it is securely deleted or anonymized.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6" />
                10. Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary">We may use third-party services (e.g., OpenAI, Stripe) to enhance our services. By using our service, you acknowledge that third-party services may process your data according to their privacy policies.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-6 h-6" />
                11. Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary">Our services are not directed to children under 13, and we do not knowingly collect personal information from children. If you believe we have collected information from a child under 13, please contact us immediately.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6" />
                12. Updates to This Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary">We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Updates will be posted on this page, and the "Last Updated" date will be revised. Continued use of our services constitutes acceptance of the updated Privacy Policy.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-6 h-6" />
                13. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary mb-6">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-primary">info@legalfriend.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Mailing Address</p>
                    <p className="text-primary">41593 Winchester Rd. Suite 200, Temecula, CA 92590</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone Number</p>
                    <p className="text-primary">+1 571 382 8738</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-primary mt-8">Effective Date: December 8, 2024</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;