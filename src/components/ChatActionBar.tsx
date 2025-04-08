import { ChangeEvent, KeyboardEvent } from "react";
import ToggleChatTipsButton from "@/components/button/ToggleChatTipsButton";
import MessageInput from "@/components/input/MessageInput";

interface ChatActionProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatActionBar = ({
  isOpen,
  setIsOpen,
  value,
  onChange,
  onKeyUp,
  onSend
}: ChatActionProps) => {
  return (
    <div className="flex h-[68px] w-full items-center justify-center border-t border-gray-100 bg-white">
      <ToggleChatTipsButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <MessageInput value={value} onChange={onChange} onKeyUp={onKeyUp} />
      <img
        className={`ml-4 ${value ? "cursor-pointer" : "cursor-not-allowed"}`}
        onClick={onSend}
        src={value ? "/icon/submit_action.svg" : "/icon/submit_disabled.svg"}
        alt="메시지 제출"
        width={40}
        height={40}
      />
    </div>
  );
};

export default ChatActionBar;
