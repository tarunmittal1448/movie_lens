import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

import dotenv from "dotenv"
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define:{
    "process.env.VITE_FIREBASE_API_KEY": JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
    "process.env.VITE_TMDB_API_KEY": JSON.stringify(process.env.VITE_TMDB_API_KEY),
    "process.env.VITE_YOUTUBE_API_KEY": JSON.stringify(process.env.VITE_YOUTUBE_API_KEY),
  }
})
