import * as path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import fs from "fs";
// vite에서 @/store/useAuthStore와 같은 절대 경로를 사용하려면,
// vite.config.ts 파일에서 alias 설정을 추가해야 합니다.
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./certs/key.pem"),
      cert: fs.readFileSync("./certs/cert.pem")
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@/", replacement: path.resolve(__dirname, "src") },
      { find: "@/api", replacement: path.resolve(__dirname, "src/api") },
      {
        find: "@/api",
        replacement: path.resolve(__dirname, "src/api")
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "src/components")
      },
      { find: "@/hooks", replacement: path.resolve(__dirname, "src/hooks") },
      {
        find: "@/pages",
        replacement: path.resolve(__dirname, "src/pages")
      },
      { find: "@/store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@/types", replacement: path.resolve(__dirname, "src/types") },
      { find: "@/utils", replacement: path.resolve(__dirname, "src/utils") },
      {
        find: "@/constants",
        replacement: path.resolve(__dirname, "src/constants")
      },
      {
        find: "@/store",
        replacement: path.resolve(__dirname, "src/store")
      },
      {
        find: "@/api",
        replacement: path.resolve(__dirname, "src/api")
      }
    ]
  }
});
