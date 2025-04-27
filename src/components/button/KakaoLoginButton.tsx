import trackClickEvent from "@/utils/trackClickEvent";

const KakaoLoginButton = () => {
  const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const kakaoRedirectUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_KAKAO_PRODUCTION_REDIRECT_URI
      : import.meta.env.VITE_KAKAO_DEVELOPE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUrl}&response_type=code`;

  const handleClick = () => {
    trackClickEvent("로그인/회원가입", "로그인");
    window.location.href = kakaoURL;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-[56px] w-[320px] items-center justify-center rounded-lg bg-[#F9E622] font-bold text-black hover:opacity-80"
    >
      카카오로 시작하기
    </button>
  );
};

export default KakaoLoginButton;
