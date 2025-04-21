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
          const res = await instance.get(`/api/kakao/login?code=${code}`);
          set({
            isLoggedIn: true,
            accessToken: res.data as string
          });
          return {
            ok: true
          };
        } catch (error) {
          console.error("Error during login:", error);
          return {
            ok: false
          };
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
