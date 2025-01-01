import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-surface">
      <div className="container max-w-lg mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="rounded-full bg-surface p-3">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted">Sign in to your account</p>
          </div>

          <div className="px-4">
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            <div className="mt-2 text-sm flex justify-between items-center">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <SocialLogin onGoogleLogin={handleGoogleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;