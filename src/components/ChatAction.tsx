import { ChangeEvent, useState } from "react";
import ToggleChatTipsButton from "@/components/button/ToggleChatTipsButton";
import MessageInput from "@/components/input/MessageInput";

const ChatAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-around items-center bg-white px-5 py-3.5 border-[1px] border-gray-100 w-full h-[68px]">
      <ToggleChatTipsButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <MessageInput value={value} onChange={handleChange} />
      <img
        className="ml-4"
        src={value ? "/icon/submit_action.svg" : "/icon/submit_disabled.svg"}
        alt="메시지 제출"
        width={40}
        height={40}
      />
    </div>
  );
};

export default ChatAction;
