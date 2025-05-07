import { create } from "zustand";
import { persist } from "zustand/middleware";
import instance from "@/api/axios";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  loginTime: string | null;
  login: (code: string) => Promise<{ ok: boolean }>;
  logout: () => void;
}

interface LoginResponse {
  data: string;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      loginTime: null,
      login: async (code: string) => {
        try {
          const requestURI =
            import.meta.env.MODE === "production"
              ? `/api/kakao/login?code=${code}`
              : `/api/kakao/login?code=${code}&redirectUrl=https://localhost:5173/kakao-login`;

          const res = await instance.get<LoginResponse>(requestURI);
          const currentTime = new Date().toISOString();
          set({
            isLoggedIn: true,
            accessToken: res.data.data,
            loginTime: currentTime
          });
          return {
            ok: true
          };
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        set(null);
        window.location.href = "/";
        return { ok: true };
      }
    }),
    {
      name: "auth-storage"
    }
  )
);

export default useAuthStore;
