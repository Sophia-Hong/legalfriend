import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PendingContractHandler from "./PendingContractHandler";
import { Session } from "@supabase/supabase-js";

interface SessionHandlerProps {
  onSuccess: () => void;
}

const SessionHandler = ({ onSuccess }: SessionHandlerProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Active session found, processing pending contract");
        setSession(session);
      }
    };
    checkSession();
  }, []);

  if (!session) return null;

  return (
    <PendingContractHandler 
      userId={session.user.id} 
      onSuccess={onSuccess} 
    />
  );
};

export default SessionHandler;
