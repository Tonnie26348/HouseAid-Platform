import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  // Vercel handles the base path differently, so we check for VERCEL env
  const base = process.env.VERCEL ? '/' : (isProduction ? '/HouseAid-Platform/' : '/');

  return {
    base,
    build: {
      outDir: 'dist-gh',
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
