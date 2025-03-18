import * as path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@/", replacement: path.resolve(__dirname, "src") },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "src/components")
      },
      {
        find: "@/pages",
        replacement: path.resolve(__dirname, "src/pages")
      },
      { find: "@/hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@/utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@/types", replacement: path.resolve(__dirname, "src/types") },
      {
        find: "@/constants",
        replacement: path.resolve(__dirname, "src/constants")
      },
      {
        find: "@/api",
        replacement: path.resolve(__dirname, "src/api")
      }
    ]
  },
  server: {
    port: 3000,
    host: true,   // 외부에서 접속 가능하도록 설정
    strictPort: true
  }
});
