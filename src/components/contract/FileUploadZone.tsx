import { useState, useRef } from "react";
import { Upload, FileText, File, X } from "lucide-react";
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
        duration: 3000,
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

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering file upload dialog
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    toast({
      title: "File removed",
      description: "You can now upload a different document",
      duration: 3000,
    });
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="w-12 h-12 text-primary" />;
    
    return file.type === "application/pdf" ? (
      <File className="w-12 h-12 text-primary" />
    ) : (
      <FileText className="w-12 h-12 text-primary" />
    );
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
      {file && (
        <button
          onClick={handleRemoveFile}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-surface/50 transition-colors"
          title="Remove file"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="space-y-6">
        <div className="w-24 h-24 mx-auto bg-surface rounded-full flex items-center justify-center shadow-sm">
          {getFileIcon()}
        </div>

        <div>
          {file ? (
            <div className="space-y-2">
              <p 
                className="text-lg text-primary font-medium truncate max-w-[90%] mx-auto" 
                title={file.name}
              >
                {file.name}
              </p>
              <p className="text-sm text-muted">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <p className="text-xs text-muted mt-1">
                Click or drag to replace
              </p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
