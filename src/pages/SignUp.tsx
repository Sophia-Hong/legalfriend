import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import SignUpForm from "@/components/auth/SignUpForm";
import SignUpHeader from "@/components/auth/SignUpHeader";
import SessionHandler from "@/components/auth/SessionHandler";
import SocialLogin from "@/components/auth/SocialLogin";

const SignUp = () => {
  const { toast } = useToast();
  const { redirectToReviewContract } = useAuthRedirect();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/review-contract`
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Error",
        description: authError.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/review-contract`
        }
      });

      if (error) throw error;
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Error",
        description: authError.message,
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 mb-20">
      <SessionHandler onSuccess={redirectToReviewContract} />
      <div className="space-y-6">
        <SignUpHeader />
        
        <SignUpForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
        />
        
        <SocialLogin onGoogleLogin={handleGoogleSignUp} />

        <div className="text-center space-x-1 text-sm">
          <span className="text-muted">Already have an account?</span>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;