import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PendingContractHandlerProps {
  userId: string;
  onSuccess: () => void;
}

const PendingContractHandler = ({ userId, onSuccess }: PendingContractHandlerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const processPendingContract = async () => {
      const pendingContractStr = localStorage.getItem('pendingContract');
      if (!pendingContractStr) return;

      try {
        console.log("Processing pending contract for user:", userId);
        const pendingContract = JSON.parse(pendingContractStr);
        const response = await fetch(pendingContract.data);
        const blob = await response.blob();
        const file = new File([blob], pendingContract.name, { type: pendingContract.type });

        const fileExt = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("contracts")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: contractError } = await supabase
          .from("contracts")
          .insert({
            file_name: file.name,
            file_type: file.type,
            file_url: filePath,
            status: 'pending',
            user_id: userId
          });

        if (contractError) throw contractError;

        localStorage.removeItem('pendingContract');
        onSuccess();
        
      } catch (error) {
        console.error("Error processing pending contract:", error);
        toast({
          variant: "destructive",
          title: "Error processing contract",
          description: "Failed to process your contract. Please try uploading it again.",
        });
      }
    };

    processPendingContract();
  }, [userId, onSuccess, toast]);

  return null;
};

export default PendingContractHandler;