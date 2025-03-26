const KakaoLoginButton = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

  const handleClick = () => {
    window.location.href = kakaoURL;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex justify-center items-center bg-[#F9E622] hover:opacity-80 rounded-lg w-[320px] h-[56px] font-bold text-black"
    >
      카카오로 시작하기
    </button>
  );
};

export default KakaoLoginButton;
