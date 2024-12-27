import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import LeaseAnalysisTable from './lease/LeaseAnalysisTable';
import LeaseCallToAction from './lease/LeaseCallToAction';

const LeaseReviewSummary = () => {
  const sections = [
    {
      provision: "Parties & Property",
      section: "§1.2, §1.3",
      details: [
        "- Residents: Miguel Rodriguez, Ana Rodriguez",
        "- Property: 15621 Palm View Drive, Santa Ana, CA"
      ],
      assessment: { type: "success" as const, text: "✓ All required information present and clearly stated" }
    },
    {
      provision: "Security Deposit",
      section: "§5.1-5.3",
      details: [
        "- Amount: $7,000",
        "- Return Timeline: 21 days after move-out"
      ],
      assessment: { 
        type: "error" as const, 
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
        type: "error" as const, 
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
        type: "warning" as const, 
        text: "! Notice period longer than typical",
        info: "Market reference: Most properties require 30-45 days notice"
      }
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-24 bg-[#F1F0FB]">
      <Card className="w-full bg-white shadow-xl border border-accent/20 hover:shadow-2xl transition-shadow duration-300 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px'
          }}>
        </div>
        
        <CardContent className="p-6 md:p-8 relative">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-3">Your Lease Review Analysis</h2>
            <p className="text-center text-secondary mb-4">Our AI assistant identifies key terms and provides market context to assist your understanding</p>
          </div>
          
          <LeaseAnalysisTable sections={sections} />

          {/* Enhanced torn paper effect */}
          <div className="relative h-24 mt-12 mb-12">
            <div 
              className="absolute inset-x-0 top-0 h-24"
              style={{
                background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0))',
                maskImage: "linear-gradient(to bottom, white 50%, transparent 100%), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 C 20 10, 30 20, 40 15, 50 25, 60 15, 70 20, 80 10, 90 15, 100 0 Z' fill='white'/%3E%3C/svg%3E\")",
                WebkitMaskImage: "linear-gradient(to bottom, white 50%, transparent 100%), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 C 20 10, 30 20, 40 15, 50 25, 60 15, 70 20, 80 10, 90 15, 100 0 Z' fill='white'/%3E%3C/svg%3E\")",
                maskSize: "100% 100%, 33.33% 100%",
                WebkitMaskSize: "100% 100%, 33.33% 100%",
                maskRepeat: "no-repeat, repeat-x",
                WebkitMaskRepeat: "no-repeat, repeat-x",
                maskPosition: "center bottom, bottom",
                WebkitMaskPosition: "center bottom, bottom",
              }}
            >
              <div className="w-full h-full bg-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)]"></div>
            </div>
          </div>

          <LeaseCallToAction />
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaseReviewSummary;