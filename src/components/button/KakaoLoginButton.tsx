import { MouseEvent } from "react";

const KakaoLoginButton = () => {
  const handleClick = (e: MouseEvent) => {};

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center bg-[#F9E622] hover:opacity-80 rounded-lg w-[320px] h-[56px] font-bold text-black"
    >
      카카오로 시작하기
    </button>
  );
};

export default KakaoLoginButton;
