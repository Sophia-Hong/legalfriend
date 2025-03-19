import { Helmet } from "react-helmet";
import LeaseReviewSummaryComponent from "@/components/LeaseReviewSummary";

const LeaseReviewSummaryPage = () => {
  return (
    <>
      <Helmet>
        <title>Lease Review Summary - LegalFriend</title>
        <meta name="description" content="Review the analysis of your lease contract with key terms highlighted and expert insights." />
      </Helmet>
      
      <div className="min-h-screen bg-[#F1F0FB] py-12">
        <main role="main">
          <LeaseReviewSummaryComponent />
        </main>
      </div>
    </>
  );
};

export default LeaseReviewSummaryPage;
