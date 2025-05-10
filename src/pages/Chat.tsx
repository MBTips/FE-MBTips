import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { authInstance } from "@/api/axios";
import { trackEvent } from "@/libs/analytics";
import IntroGuide from "@/components/IntroGuide";
import Header from "@/components/header/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatActionBar from "@/components/ChatActionBar";
import TipsMenuContainer from "@/components/tips/TipsMenuContainer";
import pickMbtiImage from "@/utils/pickMbtiImage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  data: string;
}

interface GetChatHistoryAPIResponse {
  data: ChatHistoryResponse[];
}

interface ChatHistoryResponse {
  messageContent: string;
  virtualFriendId: number | null;
}

const Chat = () => {
  const { state } = useLocation();
  const { mbti, mode, id = Date.now().toString(), name } = state;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatTitle = name ? `${name}과 대화` : `${mbti}와 대화`;
  const assistantImgUrl = pickMbtiImage(mbti);
  const storageKey = `chatMessages_${id}`;

  useEffect(() => {
    const fetchMessages = async () => {
      if (mode === "virtualFriend") {
        try {
          const virtualFriendChatHistory =
            await authInstance.get<GetChatHistoryAPIResponse>(
              `/api/message/${id}`
            );
          const chatHistory = virtualFriendChatHistory.data.data;

          const fetchedMessages: Message[] = chatHistory.map((msg) => ({
            role: msg.virtualFriendId ? "assistant" : "user",
            content: msg.messageContent
          }));

          setMessages(fetchedMessages);
        } catch (error) {
          console.error("채팅 불러오기 실패", error);
        }
      } else {
        const storedMessage = sessionStorage.getItem(storageKey);
        if (storedMessage) {
          setMessages(JSON.parse(storedMessage));
        }
      }
    };

    fetchMessages();
  }, [mode, id, storageKey]);

  useEffect(() => {
    if (mode !== "virtualFriend") {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, mode, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleToggleTips = () => {
    const nextState = !isOpen;
    trackEvent("Click", {
      page: "채팅방",
      element: nextState ? "콘텐츠 열기" : "콘텐츠 닫기"
    });
    setIsOpen(nextState);
  };

  const handleSend = async (messageToSend: string) => {
    if (!messageToSend.trim()) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: messageToSend }
    ];
    setMessages(updatedMessages);
    setInput("");

    try {
      const url =
        mode === "fastFriend" ? "/api/fast-friend/message" : "/api/message";
      const payload =
        mode === "fastFriend"
          ? { fastFriendId: id, content: messageToSend }
          : { conversationId: id, messageContent: messageToSend };

      const { data } = await authInstance.post<ChatResponse>(url, payload);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.data || "응답이 없어요"
        }
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "오류가 발생했어요. 다시 시도해 주세요." }
      ]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(input);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="description" content={`${mbti}와의 대화창`} />
        <meta property="og:description" content={`${mbti}와의 대화창`} />
        <meta property="twitter:description" content={`${mbti}와의 대화창`} />
      </Helmet>

      <div className="flex h-screen w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
        <Header title={chatTitle} showShareIcon={false}/>

        <div className="flex-1 space-y-4 overflow-y-auto px-[20px] pt-6">
          <IntroGuide />
          {/* 메시지 리스트 */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start`}
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

        {isOpen && <TipsMenuContainer conversationId={id} mbti={mbti} />}
      </div>
    </>
  );
};

export default Chat;
