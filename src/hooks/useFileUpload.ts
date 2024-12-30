import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useFileUpload = (onFileChange: (file: File | null) => void) => {
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

  return {
    dragActive,
    inputRef,
    handleDrag,
    handleDrop,
    handleChange,
    handleRemoveFile,
  };
};