import { WebSocketMessage } from "@/types/openChat";
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
      this.config = config;
      console.log("this.serverUrl", this.serverUrl);
      const wsUrl = `${this.serverUrl}/ws/chats?nickname=${encodeURIComponent(config.nickname)}&mbti=${config.mbti}&open_chat_id=${config.openChatId}`;

      try {
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log("WebSocket connected");
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
          console.log("WebSocket closed:", event.code, event.reason);
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
    this.config = null;
    this.reconnectAttempts = 0;
  }

  sendMessage(content: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }

    const message = {
      type: "message",
      data: {
        content,
        timestamp: new Date().toISOString()
      }
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

      const tempWs = new WebSocket(
        `${this.serverUrl}/ws/chats?nickname=${encodeURIComponent(nickname)}&mbti=${useMbti}&open_chat_id=${openChatId}&check_only=true`
      );

      const timeout = setTimeout(() => {
        tempWs.close();
        reject(new Error("Nickname check timeout"));
      }, 5000);

      tempWs.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          clearTimeout(timeout);

          if (message.type === "nickname_check") {
            resolve(message.data.nicknameAvailable ?? false);
          } else if (message.type === "error") {
            resolve(false);
          }

          tempWs.close();
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
          tempWs.close();
        }
      };

      tempWs.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("Failed to check nickname"));
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
