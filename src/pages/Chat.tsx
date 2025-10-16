import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { authInstance } from "@/api/axios";
import { trackEvent } from "@/libs/analytics";
import IntroGuide from "@/components/IntroGuide";
import Header from "@/components/header/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatActionBar from "@/components/ChatActionBar";
import TipsMenuContainer from "@/components/tips/TipsMenuContainer";
import pickMbtiImage from "@/utils/pickMbtiImage";
import websocketService from "@/services/websocket";
import { getOpenChatMessages } from "@/api/openChat";
import { WebSocketMessage } from "@/types/openChat";
import { Mbti } from "@/types/mbti";

interface Message {
  role: "user" | "assistant";
  content: string;
  nickname?: string;
  mbti?: string;
  messageType?: "text" | "image" | "system";
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
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    mbti,
    mode,
    id = Date.now().toString(),
    name,
    chatTitle: openChatTitle,
    openChatId,
    nickname,
    description
  } = state;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const wsCleanupRef = useRef<{
    messageCleanup?: () => void;
    connectionCleanup?: () => void;
  }>({});

  const chatTitle =
    openChatTitle || (name ? `${name}과 대화` : `${mbti}와 대화`);
  const assistantImgUrl = pickMbtiImage(mbti);
  const storageKey = `chatMessages_${id}`;

  const isTopicChat = mode === "topicChat";

  const handleWebSocketMessage = useCallback(
    (wsMessage: WebSocketMessage) => {
      console.log("📨 WebSocket 메시지 수신 처리:", wsMessage);

      // 에러 메시지 처리
      if (wsMessage.type === "ERROR") {
        const errorMessage: Message = {
          role: "assistant",
          content: wsMessage.message,
          messageType: "system"
        };
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (
            last?.messageType === "system" &&
            last.content === wsMessage.message
          ) {
            return prev;
          }
          return [...prev, errorMessage];
        });
      }

      // 입장/퇴장 알림 (NOTICE)
      else if (wsMessage.type === "NOTICE" && wsMessage.message) {
        const noticeMessage: Message = {
          role: "assistant",
          content: wsMessage.message,
          messageType: "system"
        };
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (
            last?.messageType === "system" &&
            last.content === wsMessage.message
          ) {
            return prev;
          }
          return [...prev, noticeMessage];
        });
      }

      // 일반 채팅 메시지 (MESSAGE)
      else if (
        wsMessage.type === "MESSAGE" &&
        wsMessage.nickname &&
        wsMessage.message
      ) {
        // 자신이 보낸 메시지는 이미 화면에 추가했으므로 무시
        if (wsMessage.nickname === nickname) {
          return;
        }

        console.log(
          "💬 다른 사용자 메시지 추가:",
          wsMessage.nickname,
          wsMessage.message
        );

        const newMessage: Message = {
          role: "assistant",
          content: wsMessage.message,
          nickname: wsMessage.nickname,
          mbti: wsMessage.mbti || undefined,
          messageType: "text"
        };

        setMessages((prev) => [...prev, newMessage]);
      }

      // 예상치 못한 메시지 형식 로그
      else {
        console.warn("알 수 없는 WebSocket 메시지:", wsMessage);
      }
    },
    [nickname]
  );

  useEffect(() => {
    if (!isTopicChat) {
      return;
    }

    // topicChat 유효성 검증
    if (!openChatId || !nickname || !mbti) {
      navigate("/");
      return;
    }

    const initializeOpenChat = async () => {
      try {
        // 기존 메시지 로드
        try {
          const response = await getOpenChatMessages(openChatId);

          if (
            response &&
            response.messages &&
            Array.isArray(response.messages)
          ) {
            const convertedMessages: Message[] = response.messages.map(
              (msg) => {
                return {
                  role: msg.nickname === nickname ? "user" : "assistant",
                  content: msg.message,
                  nickname: msg.nickname,
                  mbti: msg.mbti || undefined,
                  messageType: msg.messageType || "text"
                };
              }
            );

            // 메시지 순서: API에서 최신순으로 오므로 reverse()로 시간순 정렬
            setMessages(convertedMessages.reverse());
          } else {
            setMessages([]);
          }
        } catch (apiError) {
          setMessages([]);
        }

        // WebSocket 연결 시도
        try {
          const connected = await websocketService.connect({
            nickname,
            mbti: mbti as Mbti,
            openChatId
          });

          if (connected) {
            // 핸들러 등록 시 cleanup 함수들을 저장
            const messageCleanup = websocketService.onMessage(
              handleWebSocketMessage
            );
            const connectionCleanup =
              websocketService.onConnectionChange(setIsConnected);

            // cleanup 함수들을 ref에 저장
            wsCleanupRef.current = {
              messageCleanup,
              connectionCleanup
            };

            setIsConnected(true);
          } else {
            setIsConnected(false);
          }
        } catch (wsError) {
          console.warn("WebSocket 연결 실패:", wsError);
          setIsConnected(false);
        }
      } catch (error) {
        console.error("오픈채팅 초기화 실패:", error);
      }
    };

    initializeOpenChat();

    return () => {
      // 웹소켓 핸들러 정리
      if (
        wsCleanupRef.current.messageCleanup ||
        wsCleanupRef.current.connectionCleanup
      ) {
        wsCleanupRef.current.messageCleanup?.();
        wsCleanupRef.current.connectionCleanup?.();
        wsCleanupRef.current = {};
      }

      // 웹소켓 연결 해제
      if (isTopicChat && websocketService.isConnected()) {
        websocketService.disconnect();
      }
    };
  }, [
    isTopicChat,
    openChatId,
    nickname,
    mbti,
    navigate,
    handleWebSocketMessage
  ]);

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
      } else if (!isTopicChat) {
        const storedMessage = sessionStorage.getItem(storageKey);
        if (storedMessage) {
          setMessages(JSON.parse(storedMessage));
        }
      }
    };

    fetchMessages();
  }, [mode, id, storageKey, isTopicChat]);

  useEffect(() => {
    if (mode !== "virtualFriend" && !isTopicChat) {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, mode, storageKey, isTopicChat]);

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

    setInput("");

    if (isTopicChat) {
      // 사용자 메시지를 즉시 화면에 표시
      const userMessage: Message = {
        role: "user",
        content: messageToSend,
        nickname,
        mbti: mbti as string
      };
      setMessages((prev) => [...prev, userMessage]);

      // 오픈채팅 WebSocket 전송
      try {
        if (websocketService.isConnected()) {
          // 실제 WebSocket으로 메시지 전송
          websocketService.sendMessage(messageToSend.trim());
        } else {
          // WebSocket이 연결되지 않은 경우 Mock 응답
          setTimeout(() => {
            const mockResponse: Message = {
              role: "assistant",
              content: `[Mock] ${nickname}님의 메시지를 받았습니다! "${messageToSend}"에 대한 응답입니다.`,
              nickname: "시스템",
              mbti: "ENFP"
            };
            setMessages((prev) => [...prev, mockResponse]);
          }, 1000);
        }
      } catch (error) {
        console.error("메시지 전송 실패:", error);
        // 오류 발생 시 Mock 응답
        setTimeout(() => {
          const errorResponse: Message = {
            role: "assistant",
            content: `메시지 전송에 실패했습니다. Mock 응답으로 대체합니다.`,
            nickname: "시스템",
            mbti: "ENFP"
          };
          setMessages((prev) => [...prev, errorResponse]);
        }, 1000);
      }
      return;
    }

    // 기존 AI 채팅 로직
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: messageToSend }
    ];
    setMessages(updatedMessages);

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
        <meta
          name="description"
          content={
            isTopicChat
              ? description || `${chatTitle} 오픈채팅`
              : `${mbti}와의 대화창`
          }
        />
        <meta
          property="og:description"
          content={
            isTopicChat
              ? description || `${chatTitle} 오픈채팅`
              : `${mbti}와의 대화창`
          }
        />
        <meta
          property="twitter:description"
          content={
            isTopicChat
              ? description || `${chatTitle} 오픈채팅`
              : `${mbti}와의 대화창`
          }
        />
      </Helmet>

      <Header title={chatTitle} showShareIcon={false} />

      {/* topicChat 연결 상태 표시 */}
      {isTopicChat && (
        <div
          className={`px-4 py-2 text-center text-sm ${isConnected ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {isConnected ? "실시간 연결됨" : "연결 중..."}
        </div>
      )}

      <main>
        <section className="h-[calc(100vh-124px)] flex-1 space-y-4 overflow-y-auto px-[20px] pt-6">
          <IntroGuide mode={mode} chatTitle={openChatTitle} />
          {/* 메시지 리스트 */}

          {messages.map((msg, idx) => {
            // 시스템 메시지 처리
            if (msg.messageType === "system") {
              return (
                <div key={idx} className="text-center">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start`}
              >
                {/* 캐릭터 아이콘 또는 사용자 정보 */}
                {msg.role === "assistant" && (
                  <div className="mr-[9px] shrink-0">
                    {isTopicChat && msg.nickname ? (
                      <div className="text-center">
                        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-pale text-xs font-bold text-primary-normal">
                          {msg.nickname.charAt(0)}
                        </div>
                        {msg.mbti && (
                          <span className="mt-1 text-xs text-gray-500">
                            {msg.mbti}
                          </span>
                        )}
                      </div>
                    ) : (
                      <img
                        src={assistantImgUrl}
                        alt="MBTI ICON"
                        className="h-[36px] w-[36px] rounded-full border border-gray-200 object-cover"
                      />
                    )}
                  </div>
                )}
                {/* 채팅 메시지 */}
                <div>
                  {isTopicChat && msg.role === "assistant" && msg.nickname && (
                    <div className="text-lg leading-[27px] font-bold tracking-[-0.01em] text-foreground">
                      {msg.nickname}
                    </div>
                  )}
                  <ChatMessage
                    message={msg.content}
                    myMessage={msg.role === "user"}
                  />
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </section>

        <ChatActionBar
          isOpen={isOpen}
          setIsOpen={handleToggleTips}
          value={input}
          onChange={handleChange}
          onKeyUp={handleKeyup}
          onSend={() => handleSend(input)}
          mode={mode}
        />

        {mode !== "topicChat" && isOpen && (
          <TipsMenuContainer conversationId={id} mbti={mbti} />
        )}
      </main>
    </>
  );
};

export default Chat;
