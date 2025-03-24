import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

const KaKaoLogin = () => {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const getTokenAndLogin = async () => {
      if (typeof code === "string") {
        try {
          await login(code);
          navigate("/");
        } catch (err) {
          console.error("카카오 로그인에 실패했습니다.");
        }
      }
    };
    getTokenAndLogin();
  }, []);

  return <div>카카오 로그인 중...</div>;
};

export default KaKaoLogin;
