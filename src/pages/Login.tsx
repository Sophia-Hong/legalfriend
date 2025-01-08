import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { redirectToReviewContract } = useAuthRedirect();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      console.log("Attempting to sign in with:", { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        console.log("Login successful:", data.user);
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        redirectToReviewContract();
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError);
      toast({
        variant: "destructive",
        title: "Error",
        description: authError.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="rounded-full bg-surface p-3">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted">Sign in to your account to continue</p>
        </div>

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        <SocialLogin onGoogleLogin={handleGoogleLogin} />

        <div className="text-center space-x-1 text-sm">
          <span className="text-muted">Don't have an account?</span>
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;