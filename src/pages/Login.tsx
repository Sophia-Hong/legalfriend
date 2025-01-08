import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        navigate("/");
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: authError.message || "Failed to sign in. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Error",
        description: authError.message || "Failed to sign in with Google. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="container max-w-lg mx-auto px-6 py-8">
        <div className="space-y-4">
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