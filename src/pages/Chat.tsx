import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import IntroGuide from "@/components/IntroGuide";
import Header from "@/components/header/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatActionBar from "@/components/ChatActionBar";
import pickMbtiImage from "@/utils/pickMbtiImage";
import instance from "@/api/axios";
import { useLocation } from "react-router-dom";
import TipsMenuContainer from "@/components/tips/TipsMenuContainer";
import { trackEvent } from "@/libs/analytics";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  data: string;
}

const Chat = () => {
  const { state } = useLocation();
  const { mbti, mode, id } = state;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const chatTitle = `${mbti}와 대화`;
  const assistantInfo = mbti;
  const assistantImgUrl = pickMbtiImage(assistantInfo);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleToggleTips = () => {
    const nextAction = !isOpen;

    trackEvent("Click", {
      page: "채팅방",
      element: nextAction ? "콘텐츠 열기" : "콘텐츠 닫기"
    });

    setIsOpen(nextAction);
  };

  const handleSend = async (messageToSend: string) => {
    if (!messageToSend.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: messageToSend }
    ];
    setMessages(newMessages);
    setInput("");

    try {
      let url = "";
      let payload = {};

      if (mode === "fastFriend") {
        url = "/api/fast-friend/message";
        payload = { fastFriendId: id, content: messageToSend };
      } else {
        url = "/api/message";
        payload = {
          conversationId: id,
          messageContent: messageToSend
        };
      }

      const response = await instance.post<ChatResponse>(url, payload);

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: response.data.data || "응답이 없어요"
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
                className="mr-[9px] h-[36px] w-[36px] shrink-0 rounded-full border border-gray-200 object-cover"
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
      <ChatActionBar
        isOpen={isOpen}
        setIsOpen={handleToggleTips}
        value={input}
        onChange={handleChange}
        onKeyUp={handleKeyup}
        onSend={() => handleSend(input)}
      />
      {isOpen && <TipsMenuContainer />}
    </div>
  );
};

export default Chat;
