import { useNavigate } from "react-router-dom";

const ChatStartButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex h-[56px] w-[320px] items-center justify-center rounded-lg bg-primary-normal font-bold text-white md:w-[335px] lg:w-[460px]"
      onClick={(()=> navigate("/select-info"))}
    >
      대화 시작하기
    </button>
  );
};

export default ChatStartButton;
