import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import IntroGuide from "@/components/IntroGuide";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatAction from "@/components/ChatAction";
import pickMbtiImage from "@/utils/pickMbtiImage";
import instance from "@/api/axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const chatTitle = "ENFP와 대화"; //TODO: API 연동 후 수정 필요
  const assistantInfo = "ENFP"; //TODO: API 연동 후 수정 필요
  const assistantImgUrl = pickMbtiImage(assistantInfo);

  const handleSend = async (messageToSend: string) => {
    if (!messageToSend.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: messageToSend }
    ];
    setMessages(newMessages);
    setInput("");

    try {
      //TODO: API 분기처리 필요
      const response = await instance.post(
        "/api/fast-friend/message",
        JSON.stringify({ content: messageToSend })
      );

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: JSON.stringify(response.data) || "응답이 없어요"
        }
      ]);
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "오류가 발생했어요. 다시 시도해 주세요." }
      ]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(e.currentTarget.value);
    }
  };

  return (
    <div className="flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
      <Header title={chatTitle} />

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto px-[20px]">
        <div>
          <IntroGuide />
        </div>

        {/* 메시지 리스트 */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } items-start`}
          >
            {/* 캐릭터 아이콘 */}
            {msg.role === "assistant" && (
              <img
                src={assistantImgUrl}
                alt="MBTI ICON"
                className="mr-[9px] h-[36px] w-[36px] shrink-0 rounded-full border border-gray-200"
              />
            )}

            {/* 채팅 메시지 */}
            <div className="mt-3.5">
              <ChatMessage
                message={msg.content}
                myMessage={msg.role === "user"}
              />
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <ChatAction
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={input}
        onChange={handleChange}
        onKeyUp={handleKeyup}
        onSend={() => handleSend(input)}
      />
    </div>
  );
};

export default Chat;
