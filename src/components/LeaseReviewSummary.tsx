import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LeaseReviewSummary = () => {
  // Demo data for landing page
  const demoAnalysis = {
    summary: "This lease agreement appears to be generally fair, but there are several important points to review.",
    insights: {
      rentIncrease: "3% annual increase is within market average",
      securityDeposit: "$2,000 security deposit is standard for this type of property",
      maintenanceTerms: "Tenant responsible for minor repairs under $100",
      noticePeriod: "60-day notice required for termination"
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-24 bg-[#F1F0FB]">
      <Card className="w-full bg-white shadow-xl border border-accent/20 hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-4 md:p-8">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sample Lease Analysis</h3>
              <p className="text-secondary">{demoAnalysis.summary}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(demoAnalysis.insights).map(([key, value]) => (
                <div key={key} className="bg-surface p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <p className="text-sm text-secondary">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link 
                to="/review-contract"
                className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors"
              >
                Review Your Contract
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaseReviewSummary;