import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Robustly find the API Key. Netlify might provide it in process.env or loaded env.
  // We check for both API_KEY and VITE_API_KEY to be safe.
  const apiKey = env.API_KEY || process.env.API_KEY || env.VITE_API_KEY || process.env.VITE_API_KEY || "";

  // Log during build (visible in Netlify Deploy Logs)
  if (apiKey) {
    console.log("✅ [Vite Config] API_KEY found and injected successfully.");
  } else {
    console.warn("⚠️ [Vite Config] WARNING: API_KEY not found in environment variables. Voice agent will not function.");
  }
  
  return {
    plugins: [react()],
    define: {
      // Safely inject the API key. 
      // If empty, it injects an empty string, which VoiceAgent.tsx handles gracefully.
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
    build: {
      target: 'esnext'
    }
  };
});
