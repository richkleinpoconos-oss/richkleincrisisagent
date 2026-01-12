import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Aggressively search for the key in all possible locations
  const apiKey = env.API_KEY || process.env.API_KEY || env.VITE_API_KEY || process.env.VITE_API_KEY || "";

  // Log status to Netlify Build Logs
  if (apiKey) {
    console.log("✅ [Vite Config] API_KEY found. Injecting into app bundle.");
  } else {
    console.warn("⚠️ [Vite Config] WARNING: API_KEY not found in environment variables. App will show System Notice.");
  }
  
  return {
    plugins: [react()],
    define: {
      // We inject a global constant string. This is safer than patching process.env
      '__APP_API_KEY__': JSON.stringify(apiKey),
    },
    build: {
      target: 'esnext'
    }
  };
});
