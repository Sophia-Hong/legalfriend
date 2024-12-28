import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="text-muted-foreground text-sm mb-8">Last Updated: December 28, 2024</div>
        
        <ScrollArea className="h-[calc(100vh-300px)] pr-6">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">1.1. Welcome to LegalFriend ("Company," "we," "us," or "our"). We operate the website www.LegalFriend.ai (the "Site") and related online services, tools, and applications (collectively, the "Services").</p>
            <p className="mb-4">1.2. By accessing, browsing, or using the Services, you ("you" or "User") acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (the "Terms").</p>
            <p className="mb-4">1.3. If you do not agree to these Terms, you must not use our Services.</p>
            <p className="mb-8">1.4. We reserve the right to modify these Terms at any time. We will provide notice of any material changes through the Site or via email. Your continued use of the Site or Services after such modifications constitutes your acceptance of those modifications.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. No Attorney-Client Relationship & No Legal Advice</h2>
            <h3 className="text-xl font-medium mt-4 mb-2">2.1. Non-Law Firm</h3>
            <p className="mb-4">LegalFriend is not a law firm. We do not provide legal representation, legal advice, or legal opinions. Any information provided through our Site or Services is offered solely for general informational purposes. We do not represent or advise you about your specific legal rights, remedies, or obligations.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">2.2. AI-Assisted Contract Review</h3>
            <p className="mb-4">Our AI tool ("AI Tool") provides automated analysis and summaries of user-uploaded documents (e.g., lease contracts), identifying potential "red flags" and offering general explanations. While we strive for accuracy, the AI Tool may occasionally miss certain provisions or risks. The outputs are intended for informational purposes only and should not be relied upon as a substitute for professional legal advice. It is your responsibility to carefully review your documents and consult a licensed attorney to verify the provisions and assess all risks.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">2.3. Disclaimer of Legal Advice</h3>
            <p className="mb-4">The information, AI-generated outputs, and other materials on the Site are provided "as is" and should not be relied upon as legal advice. Laws and regulations can vary by jurisdiction and may change rapidly. If you need legal advice about your particular situation, you should consult a licensed attorney in your jurisdiction.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">2.4. No Attorney-Client Relationship</h3>
            <p className="mb-8">Your use of LegalFriend's Services does not create an attorney-client relationship between you and LegalFriend or any of its representatives. You are solely responsible for obtaining professional legal counsel as needed.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Eligibility & User Responsibilities</h2>
            <h3 className="text-xl font-medium mt-4 mb-2">3.1. Minimum Age</h3>
            <p className="mb-4">You must be at least 18 years old to use our Services. By using the Services, you represent and warrant that you are legally capable of entering into a binding contract.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">3.2. Lawful Use</h3>
            <p className="mb-4">You agree to use our Services only for lawful purposes and in accordance with these Terms. You will not use the Services in any manner that could impair, damage, disable, or overburden our servers or networks.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">3.3. Uploads & Content</h3>
            <p className="mb-4">You are solely responsible for any content or documents (collectively, "User Content") you upload. You represent and warrant that you have the right to upload such User Content and that it does not violate any intellectual property rights or other third-party rights.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">3.4. Accuracy</h3>
            <p className="mb-8">You agree to provide accurate and complete information when creating an account, uploading documents, or otherwise interacting with the Services.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Scope of Services</h2>
            <h3 className="text-xl font-medium mt-4 mb-2">4.1. Informational Summaries</h3>
            <p className="mb-4">Our AI Tool reviews the uploaded contract and provides a structured output (e.g., table format, identification of red flags, or common clauses). This output is for informational purposes only.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">4.2. Updates & Compliance</h3>
            <p className="mb-4">We strive to keep our references to laws, regulations, and common market practices current. However, updates to our AI Tool, databases, or knowledge bases may not immediately reflect newly enacted laws or rules. We do not guarantee complete or instantaneous accuracy of any compliance information.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">4.3. No Professional Services</h3>
            <p className="mb-4">We do not offer money-back guarantees or refunds on the basis of perceived inaccuracies or omissions. We also do not offer any professional legal representation or individualized legal review services under these Terms.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">4.4. Service Availability</h3>
            <p className="mb-8">While we strive to maintain continuous service availability, we do not guarantee uninterrupted access to the Services. Maintenance, updates, or technical issues may cause temporary service interruptions.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Fees & Payment</h2>
            <h3 className="text-xl font-medium mt-4 mb-2">5.1. Pricing</h3>
            <p className="mb-4">Certain Services, such as the AI-powered contract review, may require payment of a fee. Pricing details will be provided at the point of purchase. By submitting payment, you authorize us to charge the applicable fees to your chosen payment method.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">5.2. Digital Product & No Refunds</h3>
            <p className="mb-4">LegalFriend provides digital services that are delivered immediately upon processing. Once our AI Tool has analyzed your document and delivered results, the transaction is considered complete. Due to the immediate delivery and digital nature of our Services, all fees and charges are non-refundable upon delivery of results, except where prohibited by applicable law.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">5.3. Promotional Pricing</h3>
            <p className="mb-8">We may offer limited-time discounts or beta pricing. Such pricing is subject to change or discontinuation at our discretion.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <h3 className="text-xl font-medium mt-4 mb-2">6.1. Ownership</h3>
            <p className="mb-4">All content, materials, logos, trademarks, software, AI models, and other intellectual property (collectively, the "Company Materials") on the Site or used in the Services are owned by or licensed to LegalFriend.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">6.2. License</h3>
            <p className="mb-4">We grant you a limited, non-exclusive, revocable license to access and use our Site and Services for personal or internal business purposes.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">6.3. User Content Rights</h3>
            <p className="mb-4">You retain all rights to your User Content. By uploading or submitting User Content, you grant us a limited, non-exclusive, worldwide, royalty-free license to use, reproduce, and process such User Content solely as necessary to (i) provide the Services to you and (ii) improve our AI systems, subject to our Privacy Policy.</p>
            
            <h3 className="text-xl font-medium mt-4 mb-2">6.4. Restrictions</h3>
            <p className="mb-8">You may not copy, distribute, modify, or create derivative works of the Company Materials without our express written consent.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Force Majeure</h2>
            <p className="mb-8">Neither party shall be liable for any failure or delay in performance due to causes beyond its reasonable control.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Dispute Resolution & Arbitration</h2>
            <p className="mb-8">All disputes are subject to arbitration in San Francisco, California, under AAA rules.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p className="mb-8">These Terms are governed by the laws of the State of California.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p className="mb-8">For questions, contact us at: support@legalfriend.ai</p>

            <div className="text-muted-foreground text-sm mt-16">Last Modified: December 28, 2024</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TermsAndConditions;