import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [authView, setAuthView] = useState<"sign_in" | "magic_link">("sign_in");

  // Get the current URL's origin for the redirect
  const redirectUrl = `${window.location.origin}/auth/callback`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd] px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-semibold tracking-tight text-primary">
            Welcome back
          </h2>
          <p className="text-base text-muted">
            Choose your preferred sign in method
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-3">
          <button
            onClick={() => setAuthView("sign_in")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
              authView === "sign_in"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-primary hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Email & Password
          </button>
          <button
            onClick={() => setAuthView("magic_link")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
              authView === "magic_link"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-primary hover:bg-gray-50 border border-gray-200"
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
                    inputBackground: 'white',
                    inputBorder: '#e5e7eb',
                    inputBorderHover: '#d1d5db',
                    inputBorderFocus: '#141413',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    buttonBorderRadius: '12px',
                    inputBorderRadius: '12px',
                  },
                  space: {
                    inputPadding: '12px',
                    buttonPadding: '12px',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '12px',
                  height: '44px',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                input: {
                  borderRadius: '12px',
                  height: '44px',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                },
                message: {
                  borderRadius: '8px',
                  fontSize: '14px',
                },
                anchor: {
                  fontSize: '14px',
                  textDecoration: 'none',
                  color: '#141413',
                  fontWeight: '500',
                },
                container: {
                  gap: '16px',
                },
                divider: {
                  backgroundColor: '#e5e7eb',
                },
                label: {
                  fontSize: '14px',
                  color: '#374151',
                },
              },
            }}
            providers={["google"]}
            view={authView}
            showLinks={false}
            redirectTo={redirectUrl}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;