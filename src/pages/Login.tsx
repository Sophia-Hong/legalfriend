import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { LogIn } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement login logic with Supabase
      toast({
        title: "Coming soon",
        description: "Login functionality will be implemented soon",
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

  const handleGoogleLogin = () => {
    toast({
      title: "Coming soon",
      description: "Google sign-in will be implemented soon",
    });
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="rounded-full bg-surface p-3">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted">Sign in to your account</p>
        </div>

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        <div className="text-center space-x-1 text-sm">
          <span className="text-muted">Don't have an account?</span>
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </div>

        <SocialLogin onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default Login;