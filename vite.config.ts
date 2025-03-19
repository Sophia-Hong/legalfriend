import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
      // Enable HTTPS for local development if needed
      // https: true,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Base URL configuration based on environment
    base: mode === 'production' ? 'https://legalfriend.ai/' : '/',
    // Define environment variables to be used in the app
    define: {
      'import.meta.env.VITE_APP_DOMAIN': JSON.stringify(
        mode === 'production' ? 'legalfriend.ai' : 'localhost'
      ),
      'import.meta.env.VITE_APP_API_DOMAIN': JSON.stringify(
        mode === 'production' ? 'api.legalfriend.ai' : env.VITE_SUPABASE_URL || 'localhost:8080'
      ),
    },
  };
});
