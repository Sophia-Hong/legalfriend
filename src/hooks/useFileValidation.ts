import { useToast } from "@/hooks/use-toast";

export const useFileValidation = () => {
  const { toast } = useToast();

  const validateFile = (file: File | null) => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Please upload a contract first",
        description: "Upload your rental agreement to proceed with the analysis.",
      });
      return false;
    }

    const fileType = file.type;
    const isValidType = fileType === "application/pdf" || 
                       fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    
    if (!isValidType) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
      });
      return false;
    }

    return true;
  };

  return { validateFile };
};