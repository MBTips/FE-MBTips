import { defineConfig } from "eslint-define-config";

export default defineConfig({
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier" // Prettier와의 통합을 설정합니다.
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "prettier"], // Prettier 플러그인 추가
  rules: {
    "prettier/prettier": "error" // Prettier 규칙을 ESLint 오류로 간주하도록 설정
  },
  settings: {
    react: {
      version: "detect"
    }
  }
});
