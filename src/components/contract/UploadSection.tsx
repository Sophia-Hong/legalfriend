import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUploadZone from "./FileUploadZone";

interface UploadSectionProps {
  file: File | null;
  isUploading: boolean;
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
}

const UploadSection = ({ file, isUploading, onFileChange, onAnalyze }: UploadSectionProps) => {
  return (
    <div className="space-y-8">
      <FileUploadZone file={file} onFileChange={onFileChange} />

      <div className="text-center">
        <Button
          size="lg"
          className="bg-highlight text-primary hover:bg-highlight/90 gap-2"
          onClick={onAnalyze}
          disabled={isUploading}
        >
          <Sparkles className="w-5 h-5" />
          {isUploading ? "Processing..." : "Analyze Contract"}
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;