import trackClickEvent from "@/utils/trackClickEvent";

const LoginButton = () => {
  const handleClick = () => {
    trackClickEvent("홈", "로그인");
  };

  return (
    <a href="/login" onClick={handleClick}>
      <button className="h-[36px] w-[69px] rounded-lg border-[0.8px] border-gray-300 text-md font-bold text-gray-600">
        로그인
      </button>
    </a>
  );
};

export default LoginButton;
