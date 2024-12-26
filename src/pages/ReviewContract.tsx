import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import FileUploadZone from "@/components/contract/FileUploadZone";
import FilePreview from "@/components/contract/FilePreview";
import PrivacyNotice from "@/components/contract/PrivacyNotice";

const ReviewContract = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDelete = () => {
    setFile(null);
    toast({
      title: "File removed",
      description: "Your contract has been removed",
    });
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

        <Card className="p-8 mb-8">
          <FileUploadZone file={file} onFileChange={setFile} />
        </Card>

        {file && (
          <div className="text-center">
            <Button
              size="lg"
              className="bg-highlight text-primary hover:bg-highlight/90 gap-2"
              onClick={() => {
                toast({
                  title: "Starting analysis",
                  description:
                    "We'll analyze your contract and get back to you shortly.",
                });
              }}
            >
              <Sparkles className="w-5 h-5" />
              Analyze Contract
            </Button>
          </div>
        )}

        <PrivacyNotice />
      </div>
    </div>
  );
};

export default ReviewContract;