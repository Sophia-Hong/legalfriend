import { useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ReviewContract = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      toast({
        title: "File uploaded successfully",
        description: `${droppedFile.name} is ready for review`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type === "application/pdf") {
        setFile(uploadedFile);
        toast({
          title: "File uploaded successfully",
          description: `${uploadedFile.name} is ready for review`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">Review Your Contract</h1>
        <p className="text-secondary mb-8">
          Upload your rental agreement for a professional review. We'll analyze your contract
          and provide detailed insights to protect your rights.
        </p>

        <Card className="p-8 mb-8">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${dragActive ? "border-highlight bg-surface/50" : "border-muted"}
              ${file ? "bg-surface/30" : "hover:bg-surface/10"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center">
                {file ? (
                  <FileText className="w-8 h-8 text-primary" />
                ) : (
                  <Upload className="w-8 h-8 text-primary" />
                )}
              </div>
              
              {file ? (
                <div>
                  <p className="text-primary font-medium">{file.name}</p>
                  <p className="text-sm text-muted mt-1">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-primary font-medium">
                    Drag and drop your contract here
                  </p>
                  <p className="text-sm text-muted mt-1">
                    or click to browse (PDF files only)
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {file && (
          <div className="text-center">
            <Button
              size="lg"
              className="bg-highlight text-primary hover:bg-highlight/90"
              onClick={() => {
                toast({
                  title: "Starting review process",
                  description: "We'll analyze your contract and get back to you shortly.",
                });
              }}
            >
              Start Review
            </Button>
          </div>
        )}

        <div className="mt-8 p-4 bg-surface/50 rounded-lg flex gap-3">
          <AlertCircle className="text-primary shrink-0" />
          <p className="text-sm text-secondary">
            Your privacy is our priority. All uploaded documents are encrypted and handled with strict confidentiality. 
            We only use this information to provide you with accurate contract analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewContract;