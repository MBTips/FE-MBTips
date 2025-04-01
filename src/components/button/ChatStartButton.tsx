import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const ChatStartButton = ({ onClick }: { onClick: (e: MouseEvent) => void }) => {

  const navigate = useNavigate();

  const goChatStart = (e:MouseEvent) => {
    navigate("/select-info")
  }

  return (
    <button
      className="flex h-[56px] w-full items-center justify-center rounded-lg bg-primary-normal font-bold text-white "
      onClick={goChatStart}
    >
      대화 시작하기
    </button>
  );
};

export default ChatStartButton;
