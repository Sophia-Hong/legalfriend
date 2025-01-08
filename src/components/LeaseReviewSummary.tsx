import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";

type Analysis = Database["public"]["Tables"]["analyses"]["Row"] & {
  contract: Database["public"]["Tables"]["contracts"]["Row"];
};

const fetchLatestAnalysis = async () => {
  try {
    console.log("Fetching latest analysis...");
    const { data, error } = await supabase
      .from("analyses")
      .select(`
        *,
        contract:contracts(*)
      `)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching analysis:", error);
      throw error;
    }

    console.log("Fetched analysis:", data);
    return data;
  } catch (error) {
    console.error("Error fetching analysis:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw error;
  }
};

const LeaseReviewSummary = () => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        const data = await fetchLatestAnalysis();
        setAnalysis(data);
      } catch (err) {
        setError("Failed to load lease review summary");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-32" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">No Reviews Yet</h3>
        <p className="text-sm text-muted-foreground">
          Start your first lease review to see a summary here.
        </p>
        <Button
          onClick={() => navigate("/review-contract")}
          variant="outline"
        >
          Start Review
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Latest Lease Review</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(analysis.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Contract: {analysis.contract.file_name}</p>
        <p className="text-sm">{analysis.summary}</p>
      </div>

      <Button
        onClick={() => navigate(`/analysis/${analysis.id}`)}
        variant="outline"
      >
        View Details
      </Button>
    </Card>
  );
};

export default LeaseReviewSummary;