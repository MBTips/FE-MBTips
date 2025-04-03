import * as path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import fs from "fs";

// vite에서 @/store/useAuthStore와 같은 절대 경로를 사용하려면,
// vite.config.ts 파일에서 alias 설정을 추가해야 합니다.

export default defineConfig(({ mode }: { mode: string }) => {
  console.log("mode", mode);

  const isProduction = mode === "production";
  const keyPath = "./certs/key.pem";
  const certPath = "./certs/cert.pem";

  return {
    server: {
      port: 3000,
      host: true, // 외부에서 접속 가능하도록 설정
      strictPort: true,
      allowedHosts: ["mbtips.kr"],
      hmr: isProduction
        ? {
            host: "mbtips.kr",
            protocol: "wss"
          }
        : {
            host: "localhost",
            protocol: "wss"
          },
      https: isProduction
        ? undefined // 배포 환경에서는 HTTPS를 비활성화 (Nginx가 처리)
        : fs.existsSync(keyPath) && fs.existsSync(certPath)
          ? { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }
          : undefined
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: "@/", replacement: path.resolve(__dirname, "src") },
        { find: "@/api", replacement: path.resolve(__dirname, "src/api") },
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
          find: "@/libs",
          replacement: path.resolve(__dirname, "src/libs")
        }
      ]
    }
  };
});
