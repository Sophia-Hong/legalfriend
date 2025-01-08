import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PendingContractHandler from "./PendingContractHandler";

interface SessionHandlerProps {
  onSuccess: () => void;
}

const SessionHandler = ({ onSuccess }: SessionHandlerProps) => {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Active session found, processing pending contract");
      }
    };
    checkSession();
  }, []);

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return null;

  return (
    <PendingContractHandler 
      userId={session.user.id} 
      onSuccess={onSuccess} 
    />
  );
};

export default SessionHandler;