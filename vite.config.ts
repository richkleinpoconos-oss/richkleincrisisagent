import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // 1. Prioritize Netlify/System environment variables
  // 2. Fallback to .env files
  const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY || "";

  // Log status to Netlify Build Logs (Hidden from client, visible in Netlify Dashboard)
  if (apiKey) {
    console.log("✅ [Vite Config] API_KEY successfully detected. Injecting into build.");
  } else {
    console.warn("⚠️ [Vite Config] WARNING: API_KEY is missing/empty. The Voice Agent will show a 'System Notice' error.");
  }
  
  return {
    plugins: [react()],
    define: {
      // Define global constant for the app to use safely
      '__APP_API_KEY__': JSON.stringify(apiKey),
    },
    build: {
      target: 'esnext'
    }
  };
});
