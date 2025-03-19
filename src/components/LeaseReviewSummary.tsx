import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { LeaseTable } from './lease/LeaseTable';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Analysis } from '@/types/database/contract';

interface AnalysisWithContract extends Analysis {
  contract: {
    id: string;
    file_name: string;
    file_type: string | null;
    file_url: string;
    status: string;
    [key: string]: unknown;
  };
}

const LeaseReviewSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisWithContract | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // If we're on the home page, we'll show the mock data immediately
    if (isHomePage) {
      setIsLoading(false);
      return;
    }

    const fetchLatestAnalysis = async () => {
      try {
        console.log('Fetching latest analysis...');
        const { data, error } = await supabase
          .from('analyses')
          .select(`
            *,
            contract:contracts(*)
          `)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        console.log('Analysis data:', data);
        setAnalysis(data);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error fetching analysis:', error);
        toast({
          variant: "destructive",
          title: "Error fetching analysis",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, [isHomePage]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-24 bg-[#F1F0FB]">
        <Card className="w-full bg-white shadow-xl border border-accent/20">
          <CardContent className="p-4 md:p-8 text-center">
            Loading analysis...
          </CardContent>
        </Card>
      </div>
    );
  }

  // On the home page, always show the demo table
  if (isHomePage) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-24 bg-[#F1F0FB]">
        <Card className="w-full bg-white shadow-xl border border-accent/20 hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-4 md:p-8">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-3">
                Sample Lease Review Analysis
              </h2>
              <p className="text-center text-secondary mb-4 text-sm sm:text-base">
                Our AI assistant identifies key terms and provides market context to assist your understanding
              </p>
            </div>
            
            <LeaseTable />
            
            <div className="mt-8 text-center">
              <Link to="/review-contract">
                <button className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors">
                  Review Your Contract
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
  }

  // For other pages, show the "No Analysis Found" message if there's no data
  if (!analysis) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-24 bg-[#F1F0FB]">
        <Card className="w-full bg-white shadow-xl border border-accent/20">
          <CardContent className="p-4 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3">
              No Analysis Found
            </h2>
            <p className="text-secondary mb-6">
              Upload a contract to get started with your lease analysis.
            </p>
            <Link to="/review-contract">
              <button className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors">
                Upload Contract
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-24 bg-[#F1F0FB]">
      <Card className="w-full bg-white shadow-xl border border-accent/20 hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-4 md:p-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-3">
              Your Lease Review Analysis
            </h2>
            <p className="text-center text-secondary mb-4 text-sm sm:text-base">
              Our AI assistant identifies key terms and provides market context to assist your understanding
            </p>
          </div>
          
          <LeaseTable />
          
          <div className="mt-8 text-center">
            <Link to="/review-contract">
              <button className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors">
                Review Another Contract
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
