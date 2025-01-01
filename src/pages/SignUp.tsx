import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement signup logic with Supabase
      toast({
        title: "Coming soon",
        description: "Sign up functionality will be implemented soon",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast({
      title: "Coming soon",
      description: "Google sign-up will be implemented soon",
    });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="container max-w-lg mx-auto px-4 py-8">
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
        </div>
      </div>
    </>
  );
};

export default SignUp;