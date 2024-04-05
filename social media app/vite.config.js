import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    cors: {
      origin: "http://192.168.1.7:3000",
      credentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://192.168.1.7:3000",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Cookie,set-cookie",
        "Access-Control-Allow-Credentials": "true"
      },
    },
  },
});