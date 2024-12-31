import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FileUploadZone from "@/components/contract/FileUploadZone";
import EmailCollectionDialog from "@/components/contract/EmailCollectionDialog";
import { supabase } from "@/integrations/supabase/client";

const ReviewContract = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Please upload a contract first",
        description: "Upload your rental agreement to proceed with the analysis.",
      });
      return;
    }

    setShowEmailDialog(true);
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      // Upload file to Supabase Storage
      const fileExt = file!.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("contracts")
        .upload(filePath, file!);

      if (uploadError) throw uploadError;

      // Create contract submission record
      const { error: dbError } = await supabase
        .from("contract_submissions")
        .insert({
          user_email: email,
          contract_file_path: filePath,
        });

      if (dbError) throw dbError;

      toast({
        title: "Contract uploaded successfully",
        description: "We'll analyze your contract and send the results to your email.",
        duration: 3000,
      });

      setShowEmailDialog(false);
      setFile(null);
      
    } catch (error: any) {
      console.error("Error processing contract:", error);
      toast({
        variant: "destructive",
        title: "Error processing contract",
        description: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Upload Your Contract
        </h1>
        <p className="text-secondary mb-8">
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
            >
              <Sparkles className="w-5 h-5" />
              Analyze Contract
            </Button>
          </div>
        </div>

        <EmailCollectionDialog
          isOpen={showEmailDialog}
          onClose={() => setShowEmailDialog(false)}
          onSubmit={handleEmailSubmit}
        />
      </div>
    </div>
  );
};

export default ReviewContract;