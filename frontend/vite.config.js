<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
>>>>>>> dev

export default defineConfig({
<<<<<<< HEAD
  plugins: [react(),tailwindcss()],
})
=======
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
>>>>>>> dev
