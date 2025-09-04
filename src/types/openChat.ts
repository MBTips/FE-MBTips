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
  id: number;
  openChatId: number;
  nickname: string;
  mbti: string;
  content: string;
  timestamp: string;
  messageType: "text" | "image" | "system";
}

export interface ChatParticipant {
  nickname: string;
  mbti: string;
  joinedAt: string;
}

export interface WebSocketMessage {
  type: "message" | "join" | "leave" | "nickname_check" | "error";
  data: {
    message?: OpenChatMessage;
    participant?: ChatParticipant;
    error?: string;
    nicknameAvailable?: boolean;
  };
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
