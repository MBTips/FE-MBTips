import { ChangeEvent } from "react";

interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MessageInput = ({ value, onChange }: MessageInputProps) => {
  return (
    <input
      className="bg-gray-50 ml-2.5 px-4 py-2.5 rounded-[40px] w-[257px] h-[44px] font-medium text-2lg text-gray-900 placeholder:text-gray-600"
      placeholder="메시지를 입력해주세요."
      value={value}
      onChange={onChange}
    />
  );
};

export default MessageInput;
