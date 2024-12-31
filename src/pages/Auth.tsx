import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [authView, setAuthView] = useState<"sign_in" | "magic_link">("sign_in");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Welcome to LegalFriend
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setAuthView("sign_in")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              authView === "sign_in"
                ? "bg-primary text-white"
                : "text-primary hover:bg-gray-100"
            }`}
          >
            Email & Password
          </button>
          <button
            onClick={() => setAuthView("magic_link")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              authView === "magic_link"
                ? "bg-primary text-white"
                : "text-primary hover:bg-gray-100"
            }`}
          >
            Magic Link
          </button>
        </div>

        <div className="mt-8">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#141413',
                    brandAccent: '#141413',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '6px',
                },
              },
            }}
            providers={[]}
            view={authView}
            showLinks={true}
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;