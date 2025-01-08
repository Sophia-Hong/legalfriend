import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FileUploadZone from "@/components/contract/FileUploadZone";
import EmailCollectionDialog from "@/components/contract/EmailCollectionDialog";
import PrivacyNotice from "@/components/contract/PrivacyNotice";
import { supabase } from "@/integrations/supabase/client";

const ReviewContract = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Please upload a contract first",
        description: "Upload your rental agreement to proceed with the analysis.",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("contracts")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create contract record
      const { data: contract, error: contractError } = await supabase
        .from("contracts")
        .insert({
          file_name: file.name,
          file_type: file.type,
          file_url: filePath,
          status: 'pending'
        })
        .select()
        .single();

      if (contractError) throw contractError;

      // Trigger validation
      const response = await supabase.functions.invoke('validate-contract', {
        body: { contractId: contract.id }
      });

      if (response.error) throw response.error;

      toast({
        title: "Contract uploaded successfully",
        description: "Your contract is being analyzed. We'll notify you when it's ready.",
        duration: 5000,
      });

      // Redirect to analysis page
      window.location.href = '/lease-review-summary';
      
    } catch (error: any) {
      console.error("Error processing contract:", error);
      toast({
        variant: "destructive",
        title: "Error processing contract",
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">
          Upload Your Contract
        </h1>
        <p className="text-secondary mb-8 text-center">
          Upload your rental agreement for a professional review. We'll analyze
          your contract and provide detailed insights to protect your rights.
        </p>

        <div className="space-y-8">
          <FileUploadZone file={file} onFileChange={setFile} />

          <div className="text-center">
            <Button
              size="lg"
              className="bg-highlight text-primary hover:bg-highlight/90 gap-2"
              onClick={handleAnalyze}
              disabled={isUploading}
            >
              <Sparkles className="w-5 h-5" />
              {isUploading ? "Processing..." : "Analyze Contract"}
            </Button>
          </div>

          <PrivacyNotice />
        </div>

        <EmailCollectionDialog
          isOpen={showEmailDialog}
          onClose={() => setShowEmailDialog(false)}
          onSubmit={() => {}}
        />
      </div>
    </div>
  );
};

export default ReviewContract;