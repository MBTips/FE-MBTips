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
  mode?: string;
}

const ChatActionBar = ({
  isOpen,
  setIsOpen,
  value,
  onChange,
  onKeyUp,
  onSend,
  mode
}: ChatActionProps) => {
  const isTopicChat = mode === "topicChat";

  return (
    <section className="flex h-[68px] w-full items-center justify-center border-t border-gray-100 bg-white">
      {!isTopicChat && (
        <ToggleChatTipsButton isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <MessageInput
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        mode={mode}
      />

      <img
        className={`ml-4 ${value ? "cursor-pointer" : "cursor-not-allowed"}`}
        onClick={onSend}
        src={value ? "/icon/submit_action.svg" : "/icon/submit_disabled.svg"}
        alt="메시지 제출"
        width={40}
        height={40}
      />
    </section>
  );
};

export default ChatActionBar;
