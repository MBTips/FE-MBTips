import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json"
  }
});

// 인증 절차가 필요한 API는 authInstance로 HTTP요청
const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json"
  }
});

// authInstance 헤더에 accessToken 추가하는 로직
authInstance.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
export { authInstance };
