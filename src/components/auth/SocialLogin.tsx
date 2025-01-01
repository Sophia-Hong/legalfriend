import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SocialLoginProps {
  onGoogleLogin: () => void;
}

const SocialLogin = ({ onGoogleLogin }: SocialLoginProps) => {
  return (
    <div className="space-y-3 mt-6">
      <div className="relative">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-surface px-2 text-xs text-muted uppercase tracking-wider">OR</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full py-2 px-6 h-12 border-2"
        onClick={onGoogleLogin}
      >
        <img
          src="/google.svg"
          alt="Google"
          className="mr-2 h-4 w-4"
        />
        Log in with Google
      </Button>
    </div>
  );
};

export default SocialLogin;