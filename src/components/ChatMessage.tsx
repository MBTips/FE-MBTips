interface MessageProps {
  message: string;
  myMessage: boolean;
}

const ChatMessage = ({ message, myMessage }: MessageProps) => {
  const textColor = myMessage ? "text-[#FFFFFF]" : "text-gray-900";
  const backgroundColor = myMessage ? "bg-gray-900" : "bg-[#FFFFFF]";
  const borderStyle = myMessage
    ? "rounded-tr-none"
    : "rounded-tl-none border border-gray-100";

  return (
    <div className="flex w-full justify-center items-center mb-2">
      <div
        className={`max-w-xs px-2.5 py-3 rounded-[12px] ${borderStyle} ${backgroundColor} ${textColor}`}
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
