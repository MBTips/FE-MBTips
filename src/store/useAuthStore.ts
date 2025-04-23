import { create } from "zustand";
import { persist } from "zustand/middleware";
import instance from "@/api/axios";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (code: string) => Promise<{ ok: boolean }>;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      login: async (code: string) => {
        try {
          const res = await instance.get(
            `/api/kakao/login?code=${code}` +
              "&redirectUrl=https://localhost:5173/kakao-login"
          );
          set({
            isLoggedIn: true,
            accessToken: res.data as string
          });
          return {
            ok: true
          };
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null
        });
        return { ok: true };
      }
    }),
    {
      name: "auth-storage"
    }
  )
);

export default useAuthStore;
