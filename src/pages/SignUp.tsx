import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const SignUp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { redirectToReviewContract } = useAuthRedirect();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        handlePendingContract(session.user.id);
      }
    };
    checkSession();
  }, []);

  const handlePendingContract = async (userId: string) => {
    const pendingContractStr = localStorage.getItem('pendingContract');
    if (!pendingContractStr) return;

    try {
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
      redirectToReviewContract();
      
    } catch (error) {
      console.error("Error processing pending contract:", error);
      toast({
        variant: "destructive",
        title: "Error processing contract",
        description: "Failed to process your contract. Please try uploading it again.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
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
      setIsLoading(false);
      return;
    }
    
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
        await handlePendingContract(data.user.id);
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error("Signup error:", authError);
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