import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
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
        
        <div className="text-center space-x-1 text-sm">
          <span className="text-muted">Already have an account?</span>
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;