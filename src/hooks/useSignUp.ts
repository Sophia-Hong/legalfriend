import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting to sign up with:", { email });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/review-contract`,
        },
      });

      if (error) throw error;

      if (data.user) {
        console.log("Signup successful:", data.user);
        toast({
          title: "Success",
          description: "Please check your email to verify your account",
        });
        return data.user;
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error("Signup error:", authError);
      toast({
        variant: "destructive",
        title: "Error",
        description: authError.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignUp
  };
};