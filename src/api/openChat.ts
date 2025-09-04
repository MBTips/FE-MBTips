import { authInstance } from "./axios";
import {
  OpenChatRoom,
  OpenChatMessage,
  CreateOpenChatRequest,
  OpenChatRoomsResponse,
  OpenChatMessagesResponse,
  CreateOpenChatResponse
} from "@/types/openChat";

/**
 * 오픈 채팅방 목록 조회
 */
export const getOpenChatRooms = async (): Promise<OpenChatRoom[]> => {
  try {
    const response =
      await authInstance.get<OpenChatRoomsResponse>("/api/open-chat");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch open chat rooms:", error);
    throw new Error("오픈 채팅방 목록을 불러올 수 없습니다.");
  }
};

/**
 * 오픈 채팅방 메시지 조회
 * @param openChatId - 오픈 채팅방 ID
 * @param openChatMessageId - 마지막 메시지 번호 (선택사항)
 */
export const getOpenChatMessages = async (
  openChatId: number,
  openChatMessageId?: number
): Promise<{ messages: OpenChatMessage[]; hasMore: boolean }> => {
  try {
    const params = openChatMessageId
      ? `?openChatMessageId=${openChatMessageId}`
      : "";
    const response = await authInstance.get<OpenChatMessagesResponse>(
      `/api/open-chat/${openChatId}${params}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch open chat messages:", error);
    throw new Error("채팅 메시지를 불러올 수 없습니다.");
  }
};

/**
 * 오픈 채팅방 생성
 * @param chatData - 채팅방 생성 데이터
 */
export const createOpenChatRoom = async (
  chatData: CreateOpenChatRequest
): Promise<{ openChatId: number }> => {
  try {
    const response = await authInstance.post<CreateOpenChatResponse>(
      "/api/open-chat",
      chatData
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to create open chat room:", error);
    throw new Error("오픈 채팅방을 생성할 수 없습니다.");
  }
};

/**
 * 오픈 채팅방 상세 정보 조회
 * @param openChatId - 오픈 채팅방 ID
 */
export const getOpenChatRoomDetail = async (
  openChatId: number
): Promise<OpenChatRoom> => {
  try {
    const rooms = await getOpenChatRooms();
    const room = rooms.find((room) => room.id === openChatId);

    if (!room) {
      throw new Error("채팅방을 찾을 수 없습니다.");
    }

    return room;
  } catch (error) {
    console.error("Failed to fetch open chat room detail:", error);
    throw new Error("채팅방 정보를 불러올 수 없습니다.");
  }
};
