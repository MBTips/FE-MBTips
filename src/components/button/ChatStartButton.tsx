import { useNavigate } from "react-router-dom";

const ChatStartButton = ({mode} : {mode: "go-fast" | "go-virtual" | "go-chat"}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch(mode) {
      case "go-fast" : navigate("/select-info", {state:"fastFriend"});
      break;
      case "go-virtual" : navigate("/select-info", {state:"virtualFriend"});
      break;
      case "go-chat" : navigate("/chat");
      break;  
      default : console.error("mode is invalid", mode);
      return;
    }
  }
  return (
    <button
      className="flex h-[56px] w-[320px] items-center justify-center rounded-lg bg-primary-normal font-bold text-white md:w-[335px] lg:w-[460px]"
      onClick={handleNavigate}
    >
      대화 시작하기
    </button>
  );
};

export default ChatStartButton;
