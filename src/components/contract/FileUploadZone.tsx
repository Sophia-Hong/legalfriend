import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import FilePreviewIcon from "./FilePreviewIcon";
import RemoveFileButton from "./RemoveFileButton";
import FileDetails from "./FileDetails";

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

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleClick = (e: React.MouseEvent) => {
    if (!file) {
      inputRef.current?.click();
    }
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
      onClick={handleClick}
    >
      {file && <RemoveFileButton onRemove={handleRemoveFile} />}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleChange}
        className="hidden"
        onClick={e => e.stopPropagation()}
      />

      <div className="space-y-6">
        <div className="w-24 h-24 mx-auto bg-surface rounded-full flex items-center justify-center shadow-sm">
          <FilePreviewIcon file={file} />
        </div>

        <div>
          <FileDetails file={file} />
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;