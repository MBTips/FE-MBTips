import { MouseEvent } from "react";

const ChatStartButton = ({ onClick }: { onClick: (e: MouseEvent) => void }) => {
  return (
    <button
      className="flex h-[56px] w-[320px] items-center justify-center rounded-lg bg-primary-normal text-white md:w-[335px] lg:w-[460px]"
      onClick={onClick}
    >
      대화 시작하기
    </button>
  );
};

export default ChatStartButton;
