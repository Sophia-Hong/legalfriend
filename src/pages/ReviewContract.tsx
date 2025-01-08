import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContractHeader from "@/components/contract/ContractHeader";
import UploadSection from "@/components/contract/UploadSection";
import PrivacyNotice from "@/components/contract/PrivacyNotice";
import { useContractUpload } from "@/hooks/useContractUpload";

const ReviewContract = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { file, setFile, isUploading, handleAnalyze } = useContractUpload();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to upload contracts.",
        });
        navigate("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError || !profile) {
        console.error("Profile error:", profileError);
        toast({
          variant: "destructive",
          title: "Profile error",
          description: "There was an error accessing your profile. Please try signing in again.",
        });
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ContractHeader />
        
        <UploadSection
          file={file}
          isUploading={isUploading}
          onFileChange={setFile}
          onAnalyze={handleAnalyze}
        />

        <PrivacyNotice />
      </div>
    </div>
  );
};

export default ReviewContract;