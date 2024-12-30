import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { LeaseTable } from './lease/LeaseTable';

const LeaseReviewSummary = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-24 bg-[#F1F0FB]">
      <Card className="w-full bg-white shadow-xl border border-accent/20 hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-2 md:mb-3">
              Your Lease Review Analysis
            </h2>
            <p className="text-center text-secondary mb-4 text-sm sm:text-base px-2">
              Our AI assistant identifies key terms and provides market context to assist your understanding
            </p>
          </div>
          
          <LeaseTable />
          
          <div className="mt-6 md:mt-8 text-center">
            <Link to="/review-contract">
              <button className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors">
                Review Your Lease Now
              </button>
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-secondary">
              Get your complete lease analysis in minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaseReviewSummary;