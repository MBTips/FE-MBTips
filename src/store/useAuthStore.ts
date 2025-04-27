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
          const requestURI =
            // 아래 코드는 백엔드팀에서 작업해주시면 동일한 uri로 바뀔 예정 -> 4.24 정준영
            import.meta.env.MODE === "production"
              ? `/api/kakao/login?code=${code}`
              : `/api/kakao/login?code=${code}&redirectUrl=https://localhost:5173/kakao-login`;

          const res = await instance.get(requestURI);
          set({
            isLoggedIn: true,
            accessToken: res.data.data as string
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
