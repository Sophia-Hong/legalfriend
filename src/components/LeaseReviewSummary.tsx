import { useState } from "react";
import LeaseAnalysisTable from "./lease/LeaseAnalysisTable";
import LeaseCallToAction from "./lease/LeaseCallToAction";

const sections = [
  {
    title: "Rent & Payments",
    items: [
      { label: "Monthly Rent", value: "$2,000" },
      { label: "Security Deposit", value: "$3,000" },
      { label: "Late Fee", value: "$50" },
    ],
  },
  {
    title: "Key Terms",
    items: [
      { label: "Lease Duration", value: "12 months" },
      { label: "Notice Period", value: "60 days" },
      { label: "Pet Policy", value: "Allowed with deposit" },
    ],
  },
  {
    title: "Maintenance",
    items: [
      { label: "Repairs", value: "Landlord responsible" },
      { label: "Utilities", value: "Tenant pays all" },
      { label: "Alterations", value: "Written approval needed" },
    ],
  },
] as const;

const LeaseReviewSummary = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-2">
                Lease Review Summary
              </h3>
              <p className="text-secondary">
                Key points from your lease contract analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Analysis Complete
              </span>
            </div>
          </div>

          <LeaseAnalysisTable sections={sections} />

          {/* Enhanced torn paper effect */}
          <div className="relative h-24 mt-12 mb-12">
            <div 
              className="absolute inset-x-0 top-0 h-24"
              style={{
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
              <div className="w-full h-full shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)]"></div>
            </div>
          </div>

          <LeaseCallToAction />
        </div>
      </div>
    </div>
  );
};

export default LeaseReviewSummary;