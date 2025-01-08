import { useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useSignUp } from "@/hooks/useSignUp";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogin from "@/components/auth/SocialLogin";
import PendingContractHandler from "@/components/auth/PendingContractHandler";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const SignUp = () => {
  const { redirectToReviewContract } = useAuthRedirect();
  const { isLoading, handleSignUp } = useSignUp();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Active session found, processing pending contract");
        // Instead of returning JSX, render the component conditionally
      }
    };
    checkSession();
  }, [redirectToReviewContract]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }
    
    const user = await handleSignUp(email, password);
    if (user) {
      // Instead of returning JSX, we'll render the component conditionally
      console.log("User signed up successfully, processing pending contract");
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

  // Get current session to conditionally render PendingContractHandler
  const { data: { session } } = supabase.auth.getSession();

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 mb-20">
      {session && (
        <PendingContractHandler 
          userId={session.user.id} 
          onSuccess={redirectToReviewContract} 
        />
      )}
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="rounded-full bg-surface p-3">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted">Enter your details to get started</p>
        </div>

        <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} />
        
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