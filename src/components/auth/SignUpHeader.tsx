import { UserPlus } from "lucide-react";

const SignUpHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="rounded-full bg-surface p-3">
        <UserPlus className="h-6 w-6 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
      <p className="text-sm text-muted">Enter your details to get started</p>
    </div>
  );
};

export default SignUpHeader;