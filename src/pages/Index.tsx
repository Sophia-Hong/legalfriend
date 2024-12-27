import Hero from "../components/Hero";
import Features from "../components/Features";
import LeaseReviewSummary from "../components/LeaseReviewSummary";
import Stats from "../components/Stats";
import FAQ from "../components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <LeaseReviewSummary />
      <Stats />
      <FAQ />
    </div>
  );
};

export default Index;