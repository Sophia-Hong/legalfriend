import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useContractUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Please upload a contract first",
        description: "Upload your rental agreement to proceed with the analysis.",
      });
      return;
    }

    // Check file type
    const fileType = file.type;
    const isValidType = fileType === "application/pdf" || 
                       fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    
    if (!isValidType) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
      });
      return;
    }

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Store file in localStorage before redirecting
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          localStorage.setItem('pendingContract', JSON.stringify({
            name: file.name,
            type: file.type,
            data: e.target.result
          }));
        }
      };
      reader.readAsDataURL(file);
      
      // Redirect to signup instead of login for new users
      navigate('/signup');
      return;
    }

    setIsUploading(true);
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError || !profile) {
        throw new Error("Profile not found");
      }

      const freshFile = new File([file], file.name, { type: file.type });
      const fileExt = freshFile.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("contracts")
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

      const { error: analysisError } = await supabase
        .from("analyses")
        .insert({
          contract_id: contract.id,
          status: 'pending'
        });

      if (analysisError) throw analysisError;

      const { error: functionError } = await supabase.functions.invoke('validate-contract', {
        body: { contractId: contract.id }
      });

      if (functionError) throw functionError;

      toast({
        title: "Contract uploaded successfully",
        description: "Your contract is being analyzed. We'll notify you when it's ready.",
        duration: 5000,
      });

      navigate('/lease-review-summary');
      
    } catch (error: any) {
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