import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.VITE_AUTH_PROVIDER_DOMAIN": JSON.stringify(
      process.env.AUTH_PROVIDER_DOMAIN
    ),
    "process.env.AUTH_PROVIDER_DOMAIN": JSON.stringify(
      process.env.AUTH_PROVIDER_DOMAIN
    ),
  },
});
