import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { authInstance } from "@/api/axios";
import { VirtualFriend } from "@/types/virtualFreind";
import trackClickEvent from "@/utils/trackClickEvent";

interface ProfileProps {
  mode: "friend" | "topic";
  info?: VirtualFriend;
  deleteIndex?: number;
  setVirtualFriendList?: React.Dispatch<SetStateAction<VirtualFriend[]>>;
  topicData?: {
    chatTitle: string;
    description: string;
    image: string;
    openChatId?: number;
  };
}
const Profile = ({
  mode,
  info,
  deleteIndex,
  setVirtualFriendList,
  topicData
}: ProfileProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!info || !setVirtualFriendList || deleteIndex === undefined) return;

    trackClickEvent("홈", "친구 - 삭제");
    const res = await authInstance.delete(
      `/api/virtual-friend/${info.virtualFriendId}`
    );
    if (res.status === 200) {
      setVirtualFriendList((prevList) =>
        prevList.filter((_, index) => index !== deleteIndex)
      );
    }
  };

  const handleNavigate = () => {
    if (mode === "friend" && info) {
      trackClickEvent("홈", "친구 - 바로 대화하기");
      navigate("/chat", {
        state: {
          mode: "virtualFriend",
          mbti: info.mbti,
          id: info.virtualFriendId,
          name: info.virtualFriendName
        }
      });
    } else if (mode === "topic" && topicData) {
      trackClickEvent("홈", "오픈채팅 입장하기");
      navigate("/select-info", {
        state: {
          type: "topicChat",
          chatTitle: topicData.chatTitle,
          description: topicData.description,
          openChatId: topicData.openChatId || 1
        }
      });
    }
  };

  const getImageSrc = () => {
    if (mode === "friend" && info) {
      return `/public/image/${info.mbti}_profile.png`;
    } else if (mode === "topic" && topicData) {
      return topicData.image;
    }
    return "";
  };

  const getTitle = () => {
    if (mode === "friend" && info) {
      return info.virtualFriendName;
    } else if (mode === "topic" && topicData) {
      return topicData.chatTitle;
    }
    return "";
  };

  const getSubtitle = () => {
    if (mode === "friend" && info) {
      return info.mbti;
    } else if (mode === "topic" && topicData) {
      return "";
    }
    return "";
  };

  const getDescription = () => {
    if (mode === "friend" && info) {
      const parts = [];

      // 나이 처리 (0이면 추가하지 않음)
      if (info.virtualFriendAge && info.virtualFriendAge > 0) {
        parts.push(`${info.virtualFriendAge}대`);
      }

      // 성별 처리
      if (info.virtualFriendSex === "FEMALE") {
        parts.push("여성");
      } else if (info.virtualFriendSex === "MALE") {
        parts.push("남성");
      }

      // 관계 추가
      if (info.virtualFriendJob) {
        parts.push(info.virtualFriendJob);
      }

      // 모든 데이터가 없으면 기본 메시지 반환
      if (parts.length === 0) {
        return "이 친구 추가 정보를 선택하지 않았어요";
      }

      return parts.join(" · ");
    } else if (mode === "topic" && topicData) {
      return topicData.description;
    }
    return "";
  };

  const getButtonText = () => {
    return mode === "friend" ? "바로 대화하기" : "오픈채팅 입장하기";
  };

  return (
    <div className="relative h-[192px] w-[157px] overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white lg:w-[200px]">
      {mode === "friend" && (
        <button onClick={handleDelete}>
          <img
            src="/public/icon/dustbin.svg"
            alt="Delete"
            className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
            width={16}
            height={16}
          />
        </button>
      )}
      <img
        src={getImageSrc()}
        alt="Profile"
        className="absolute top-[12px] left-[11px] h-12 w-12 rounded-full object-cover"
      />

      <div className="px-4 pt-[60px]">
        <h2 className="flex items-center space-x-1 text-base">
          <span className="font-bold">{getTitle()}</span>
          {getSubtitle() && (
            <span className="font-light text-gray-600">{getSubtitle()}</span>
          )}
        </h2>
        <p className="mt-2 text-sm font-normal text-gray-600">
          {getDescription()}
        </p>
      </div>
      <button
        className="absolute bottom-0 h-[41px] w-full bg-primary-pale py-2 text-sm font-bold text-primary-normal"
        onClick={handleNavigate}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default Profile;
