import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SocialLoginProps {
  onGoogleLogin: () => void;
}

const SocialLogin = ({ onGoogleLogin }: SocialLoginProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-surface px-2 text-xs text-muted">OR</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={onGoogleLogin}
      >
        <img
          src="/google.svg"
          alt="Google"
          className="mr-2 h-4 w-4"
        />
        Continue with Google
      </Button>

      <div className="text-center space-x-1 text-sm">
        <span className="text-muted">Don't have an account?</span>
        <a href="#" className="text-primary hover:underline">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;