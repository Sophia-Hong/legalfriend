import { useEffect, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { LeaseTable } from './lease/LeaseTable';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface AnalysisData {
  id: string;
  status: string;
  summary: string | null;
  contract: {
    id: string;
    file_name: string;
    file_type: string | null;
    file_url: string;
    status: string;
  };
  keyterms: Array<{
    id: string;
    provision: string;
    section: string;
    details: string[];
    assessment: {
      type: 'success' | 'warning' | 'error';
      text: string;
      info?: string;
    };
  }>;
  isPaid: boolean;
  message?: string;
}

const LeaseReviewSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  // Use useMemo to prevent urlParams from changing on every render
  const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const sessionId = urlParams.get('session_id');
  const success = urlParams.get('success');

  useEffect(() => {
    // If payment was successful, show a success message
    if (sessionId && success === 'true') {
      toast({
        title: "Payment successful!",
        description: "You now have access to the full lease analysis.",
        duration: 5000,
      });
      
      // Clear URL parameters
      navigate('/lease-review-summary', { replace: true });
    }
    
    // If payment was canceled, show a message
    if (urlParams.get('canceled') === 'true') {
      toast({
        variant: "destructive",
        title: "Payment canceled",
        description: "You can still view the partial analysis or try again.",
        duration: 5000,
      });
      
      // Clear URL parameters
      navigate('/lease-review-summary', { replace: true });
    }
  }, [sessionId, success, navigate, toast, urlParams]);

  useEffect(() => {
    // If we're on the home page, we'll show the mock data immediately
    if (isHomePage) {
      setIsLoading(false);
      return;
    }

    const fetchLatestAnalysis = async () => {
      try {
        console.log('Fetching latest analysis...');
        
        // Get the latest contract
        const { data: contracts, error: contractError } = await supabase
          .from('contracts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (contractError) throw contractError;
        if (!contracts || contracts.length === 0) {
          setIsLoading(false);
          return;
        }

        const latestContract = contracts[0];
        
        // Call the get-analysis function to get the analysis with key terms
        const { data, error } = await supabase.functions.invoke('get-analysis', {
          body: { contractId: latestContract.id }
        });

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
  }, [isHomePage, toast]);

  const handlePayment = async () => {
    if (!analysis) return;
    
    setIsProcessingPayment(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        // Redirect to login if not authenticated
        navigate('/login', { state: { returnTo: '/lease-review-summary' } });
        return;
      }

      // Call the create-payment function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          contractId: analysis.contract.id,
          userId: session.session.user.id,
          returnUrl: window.location.origin + '/lease-review-summary'
        }
      });

      if (error) throw error;
      
      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error creating payment:', error);
      toast({
        variant: "destructive",
        title: "Error processing payment",
        description: errorMessage,
      });
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-24 bg-[#F1F0FB]">
        <Card className="w-full bg-white shadow-xl border border-accent/20">
          <CardContent className="p-4 md:p-8 text-center">
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading analysis...</span>
            </div>
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
            
            {!analysis.isPaid && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4 text-center">
                <p className="text-yellow-800 mb-2">
                  You're viewing a preview of your analysis. Unlock the full report for $19.99.
                </p>
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Unlock Full Analysis'
                  )}
                </Button>
              </div>
            )}
          </div>
          
          {analysis.summary && (
            <div className="mb-6 bg-surface p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Summary</h3>
              <p className="text-secondary">{analysis.summary}</p>
            </div>
          )}
          
          <LeaseTable keyTerms={analysis.keyterms} />
          
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
