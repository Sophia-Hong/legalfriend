import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const LeaseReviewSummary = () => {
  const sections = [
    {
      provision: "Parties & Property",
      section: "§1.2, §1.3",
      details: [
        "- Residents: Miguel Rodriguez, Ana Rodriguez",
        "- Property: 15621 Palm View Drive, Santa Ana, CA"
      ],
      assessment: { type: "success", text: "✓ All required information present and clearly stated" }
    },
    {
      provision: "Security Deposit",
      section: "§5.1-5.3",
      details: [
        "- Amount: $7,000",
        "- Return Timeline: 21 days after move-out"
      ],
      assessment: { 
        type: "error", 
        text: "⚠ ALERT: Exceeds CA legal limit (max 2 months' rent for unfurnished units)",
        info: "Common practice: Request adjustment to align with legal maximum of $5,486 (2 months' rent)"
      }
    },
    {
      provision: "Early Termination",
      section: "§11.2-11.4",
      details: [
        "- Fee: $1,000 + Rent until new tenant",
        "- Notice Required: 60 days"
      ],
      assessment: { 
        type: "error", 
        text: "⚠ ALERT: Combined penalties exceed typical market terms",
        info: "Standard market practice: Either termination fee OR rent continuation, typically not both"
      }
    },
    {
      provision: "Lease Term & Renewal",
      section: "§3.1-3.4",
      details: [
        "- Initial Term: July 2024 - July 2025",
        "- Renewal: 60-day notice for month-to-month"
      ],
      assessment: { 
        type: "warning", 
        text: "! Notice period longer than typical",
        info: "Market reference: Most properties require 30-45 days notice"
      }
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-24">
      <Card className="w-full bg-white shadow-xl">
        <CardContent className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-3">Your Lease Review Analysis</h2>
            <p className="text-center text-secondary mb-4">Our AI assistant identifies key terms and provides market context to assist your understanding</p>
          </div>
          
          <div className="overflow-hidden rounded-lg border border-accent/20">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface">
                    <th className="p-4 text-left text-primary font-medium border-b border-accent/20 w-1/4">Provision & Section</th>
                    <th className="p-4 text-left text-primary font-medium border-b border-accent/20 w-2/5">Key Terms</th>
                    <th className="p-4 text-left text-primary font-medium border-b border-accent/20">Analysis & Context</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section, index) => (
                    <tr key={index} className="border-b border-accent/20 hover:bg-surface/50 transition-colors">
                      <td className="p-4 align-top">
                        <div className="font-medium text-primary">{section.provision}</div>
                        <div className="text-sm text-secondary">{section.section}</div>
                      </td>
                      <td className="p-4 text-primary/80 align-top">
                        {section.details.map((detail, idx) => (
                          <div key={idx} className="mb-1">{detail}</div>
                        ))}
                      </td>
                      <td className="p-4 align-top">
                        <div className="space-y-2">
                          <div className={`flex items-start gap-2 ${
                            section.assessment.type === "error" ? "text-red-600" :
                            section.assessment.type === "warning" ? "text-amber-600" :
                            "text-green-600"
                          }`}>
                            {section.assessment.type === "success" ? (
                              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            ) : section.assessment.type === "warning" ? (
                              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertOctagon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            )}
                            <span className="font-medium">{section.assessment.text}</span>
                          </div>
                          {section.assessment.info && (
                            <div className="text-sm text-secondary ml-7 mt-1">
                              {section.assessment.info}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors">
              Review Your Lease Now
            </button>
            <p className="mt-3 text-sm text-secondary">
              Get your complete lease analysis in minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaseReviewSummary;