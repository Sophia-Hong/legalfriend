import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SignUpFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted" />
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            required
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            required
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-muted hover:text-primary"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            required
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-muted hover:text-primary"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          className="rounded border-muted"
          required
        />
        <label htmlFor="terms" className="text-sm text-muted">
          I agree to the{" "}
          <a 
            href="/terms-and-conditions" 
            className="text-[#1A1F2C] underline hover:text-primary transition-colors"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a 
            href="/privacy-policy" 
            className="text-[#1A1F2C] underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className={cn(
          "w-full bg-accent text-primary hover:bg-accent/90",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default SignUpForm;