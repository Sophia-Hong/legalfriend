import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useFileValidation } from "./useFileValidation";
import { useAuthState } from "./useAuthState";

export const useContractUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { validateFile } = useFileValidation();
  const { isAuthenticated, handleUnauthenticatedUpload } = useAuthState();

  const handleAnalyze = async () => {
    console.log("Starting contract analysis...");
    
    if (!validateFile(file)) {
      console.log("File validation failed");
      return;
    }
    
    if (!file) return;

    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to signup");
      handleUnauthenticatedUpload(file);
      return;
    }

    setIsUploading(true);
    try {
      console.log("Uploading contract to Supabase...");
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session!.user.id)
        .maybeSingle();

      if (profileError || !profile) {
        console.log("Profile not found, redirecting to signup");
        handleUnauthenticatedUpload(file);
        navigate('/signup');
        return;
      }

      const freshFile = new File([file], file.name, { type: file.type });
      const fileExt = freshFile.name.split(".").pop();
      const filePath = `${profile.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("lease_documents")
        .upload(filePath, freshFile);

      if (uploadError) throw uploadError;

      console.log("File uploaded successfully:", uploadData);

      const { data: contract, error: contractError } = await supabase
        .from("contracts")
        .insert({
          file_name: freshFile.name,
          file_type: freshFile.type,
          file_url: filePath,
          status: 'pending',
          user_id: profile.id
        })
        .select()
        .single();

      if (contractError) throw contractError;

      console.log("Contract record created:", contract);

      // Call the process-lease function to analyze the document
      const { error: functionError } = await supabase.functions.invoke('process-lease', {
        body: { contractId: contract.id }
      });

      if (functionError) throw functionError;

      toast({
        title: "Contract uploaded successfully",
        description: "Your contract is being analyzed. We'll notify you when it's ready.",
        duration: 5000,
      });

      navigate('/lease-review-summary');
      
    } catch (error: Error) {
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

  return {
    file,
    setFile,
    isUploading,
    handleAnalyze
  };
};