import { WebSocketMessage, WebSocketRequestMessage } from "@/types/openChat";
import { Mbti } from "@/types/mbti";

export interface WebSocketConfig {
  nickname: string;
  mbti: Mbti;
  openChatId: number;
}

export class OpenChatWebSocket {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers = new Set<(message: WebSocketMessage) => void>();
  private connectionHandlers = new Set<(connected: boolean) => void>();

  constructor(private serverUrl: string) {}

  connect(config: WebSocketConfig): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // 기존 연결이 있으면 먼저 정리
      if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
        this.disconnect();
      }

      this.config = config;

      const wsUrl = `${this.serverUrl}/ws/chats?nickname=${encodeURIComponent(config.nickname)}&mbti=${config.mbti}&open_chat_id=${config.openChatId}`;

      try {
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.reconnectAttempts = 0;
          this.notifyConnectionHandlers(true);
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.notifyMessageHandlers(message);
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        this.ws.onclose = (event) => {
          this.notifyConnectionHandlers(false);

          if (!event.wasClean && this.shouldReconnect()) {
            this.scheduleReconnect();
          }
        };

        this.ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(new Error("Failed to connect to chat server"));
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, "User disconnected");
      this.ws = null;
    }

    // 모든 핸들러 정리
    this.messageHandlers.clear();
    this.connectionHandlers.clear();

    this.config = null;
    this.reconnectAttempts = 0;
  }

  sendMessage(content: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }

    if (!this.config) {
      throw new Error("WebSocket config is not set");
    }

    const message: WebSocketRequestMessage = {
      type: "MESSAGE",
      mbti: this.config.mbti,
      nickname: this.config.nickname,
      message: content,
      openChatId: this.config.openChatId
    };

    this.ws.send(JSON.stringify(message));
  }

  checkNickname(
    nickname: string,
    openChatId: number,
    mbti: Mbti = "ENFP"
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // config가 없어도 닉네임 체크는 가능하도록 기본값 사용
      const useMbti = this.config?.mbti || mbti;
      const wsUrl = `${this.serverUrl}/ws/chats?nickname=${encodeURIComponent(nickname)}&mbti=${useMbti}&open_chat_id=${openChatId}`;

      const tempWs = new WebSocket(wsUrl);

      tempWs.onopen = () => {
        // 서버에 닉네임 체크 요청 메시지 전송
        const payload: WebSocketRequestMessage = {
          type: "NICKNAME_CHECK",
          mbti: useMbti,
          nickname: nickname,
          message: "",
          openChatId: openChatId
        };

        tempWs.send(JSON.stringify(payload));
      };

      tempWs.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          // 닉네임 중복시 ERROR 타입으로 응답
          if (
            message.type === "ERROR" &&
            message.message.includes("닉네임이 중복됩니다")
          ) {
            resolve(false);
          } else if (message.type === "ERROR") {
            resolve(false);
          } else {
            resolve(true);
          }

          tempWs.close();
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);

          reject(error);
          tempWs.close();
        }
      };

      tempWs.onerror = (error) => {
        console.error("Failed to check nickname:", error);

        reject(new Error("Failed to check nickname"));
      };

      tempWs.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
      };
    });
  }

  onMessage(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.add(handler);

    return () => {
      this.messageHandlers.delete(handler);
    };
  }

  onConnectionChange(handler: (connected: boolean) => void) {
    this.connectionHandlers.add(handler);

    return () => {
      this.connectionHandlers.delete(handler);
    };
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  private shouldReconnect(): boolean {
    return (
      this.reconnectAttempts < this.maxReconnectAttempts && this.config !== null
    );
  }

  private scheduleReconnect() {
    setTimeout(
      () => {
        if (this.config && this.shouldReconnect()) {
          this.reconnectAttempts++;
          console.log(
            `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
          );
          this.connect(this.config);
        }
      },
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts)
    );
  }

  private notifyMessageHandlers(message: WebSocketMessage) {
    this.messageHandlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        console.error("Error in message handler:", error);
      }
    });
  }

  private notifyConnectionHandlers(connected: boolean) {
    this.connectionHandlers.forEach((handler) => {
      try {
        handler(connected);
      } catch (error) {
        console.error("Error in connection handler:", error);
      }
    });
  }
}

const websocketService = new OpenChatWebSocket(
  import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080"
);

export default websocketService;
