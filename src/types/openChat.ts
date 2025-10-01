export interface OpenChatRoom {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  participantCount: number;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OpenChatMessage {
  openChatMessageId: number;
  openChatId: number;
  nickname: string;
  mbti: string | null;
  message: string;
  timestamp?: string;
  messageType?: "text" | "image" | "system";
}

export interface ChatParticipant {
  nickname: string;
  mbti: string;
  joinedAt: string;
}

// 웹소켓 요청 메시지 형태
export interface WebSocketRequestMessage {
  type: string;
  mbti: string;
  nickname: string;
  message: string;
  openChatId: number;
}

// 웹소켓 응답 메시지 형태
export interface WebSocketMessage {
  type: "ERROR" | "NOTICE" | null;
  mbti: string | null;
  nickname: string | null;
  message: string;
  openChatId: number;
}

export interface CreateOpenChatRequest {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface OpenChatRoomsResponse {
  header: {
    code: number;
    message: string;
  };
  data: OpenChatRoom[];
}

export interface OpenChatMessagesResponse {
  header: {
    code: number;
    message: string;
  };
  data: {
    messages: OpenChatMessage[];
    hasMore: boolean;
  };
}

export interface CreateOpenChatResponse {
  header: {
    code: number;
    message: string;
  };
  data: {
    openChatId: number;
  };
}
