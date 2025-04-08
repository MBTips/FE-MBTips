interface ChatMessageProps {
  message: string;
  myMessage: boolean;
}

const ChatMessage = ({ message, myMessage }: ChatMessageProps) => {
  const textColor = myMessage ? "text-[#FFFFFF]" : "text-gray-900";
  const backgroundColor = myMessage ? "bg-gray-900" : "bg-[#FFFFFF]";
  const borderStyle = myMessage
    ? "rounded-tr-none"
    : "rounded-tl-none border border-gray-100";

  return (
    <div className="mb-[6px]">
      <div
        className={`max-w-xs rounded-[12px] px-2.5 py-3 ${borderStyle} ${backgroundColor} ${textColor}`}
        style={{
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "24px"
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
