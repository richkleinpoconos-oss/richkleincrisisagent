import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // FORCE load all environment variables, including those without VITE_ prefix
  // Cast process to any to avoid TS error if @types/node is missing or incomplete
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Safely inject the API key from either the loaded env or the system process
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ""),
    },
    build: {
      target: 'esnext'
    }
  };
});