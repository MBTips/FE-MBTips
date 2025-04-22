import { create } from "zustand";
import { persist } from "zustand/middleware";
import instance from "@/api/axios";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (code: string) => Promise<void>;
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
            `/api/kakao/login?code=${code}&redirectUrl=https://localhost:5173/kakao-login`
          );
          if (res.data) {
            set({
              isLoggedIn: true,
              accessToken: res.data.data as string
            });
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null
        });
      }
    }),
    {
      name: "auth-storage"
    }
  )
);

export default useAuthStore;
