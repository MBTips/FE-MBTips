import { ChangeEvent, KeyboardEvent } from "react";

interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const MessageInput = ({ value, onChange, onKeyUp }: MessageInputProps) => {
  return (
    <input
      type="text"
      className="ml-2.5 flex h-[44px] w-[242px] justify-center rounded-[40px] bg-gray-50 py-2.5 pl-4 text-lg leading-[24px] font-medium text-gray-900 placeholder:text-gray-600 md:w-[257px] lg:w-[382px]"
      placeholder="메시지를 입력해주세요"
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};

export default MessageInput;
