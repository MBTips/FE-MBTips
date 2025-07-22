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
      trackClickEvent("홈", "주제별 대화방"); //FIXME: 기획 내용 정해지면 수정
      navigate("/select-info", {
        state: {
          type: "topicChat",
          chatTitle: topicData.chatTitle,
          description: topicData.description
        }
      });
    }
  };

  const getImageSrc = () => {
    if (mode === "friend" && info) {
      return `/public/image/${info.mbti}_profile.png`;
    } else if (mode === "topic" && topicData) {
      //FIXME: 디자인 정해지면 수정
      return "/icon/starbubble.svg";
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
      return `${info.virtualFriendAge} · ${info.virtualFriendSex} · ${info.virtualFriendRelationship}`;
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

      <div className="px-4 pt-[69px]">
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
