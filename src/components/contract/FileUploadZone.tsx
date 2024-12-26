import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploadZone = ({ file, onFileChange }: FileUploadZoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const validateFile = (uploadedFile: File) => {
    if (
      uploadedFile.type === "application/pdf" ||
      uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      onFileChange(uploadedFile);
      toast({
        title: "File uploaded successfully",
        description: `${uploadedFile.name} is ready for analysis`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  return (
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
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
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

        <div>
          <p className="text-primary font-medium mb-2">
            Drag & Drop your contract here
          </p>
          <button
            onClick={handleBrowseClick}
            className="text-lg text-blue-600 underline decoration-2 hover:text-blue-700 transition-colors font-medium"
          >
            or Click to Browse
          </button>
          <p className="text-sm text-muted mt-2">(PDF or DOCX files accepted)</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;