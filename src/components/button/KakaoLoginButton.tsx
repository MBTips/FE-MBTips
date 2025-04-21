const KakaoLoginButton = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=3e5cfa29037d1bd11eb5448f9b298bfe&redirect_uri=https://localhost:5173/kakao-login&response_type=code`;

  const handleClick = () => {
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
