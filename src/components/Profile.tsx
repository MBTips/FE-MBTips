import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { authInstance } from "@/api/axios";
import { VirtualFriend } from "@/types/virtualFreind";

interface ProfileProps {
  info: VirtualFriend;
  deleteIndex: number;
  setVirtualFriendList: React.Dispatch<SetStateAction<VirtualFriend[]>>;
}
const Profile = ({ info, deleteIndex, setVirtualFriendList }: ProfileProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
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
    navigate("/chat", {
      state: {
        mode: "virtualFriend",
        mbti: info.mbti,
        id: info.virtualFriendId
      }
    });
  };

  return (
    <div className="relative h-[192px] w-[157px] overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white lg:w-[200px]">
      <button onClick={handleDelete}>
        <img
          src="/public/icon/dustbin.svg"
          alt="Delete"
          className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
          width={16}
          height={16}
        />
      </button>
      <img
        src={`/public/image/${info.mbti}_profile.png`}
        alt="Profile"
        className="absolute top-[12px] left-[11px] h-12 w-12 rounded-full object-cover"
      />

      <div className="px-4 pt-[69px]">
        <h2 className="flex items-center space-x-1 text-base">
          <span className="font-bold">{info.virtualFriendName}</span>
          <span className="font-light text-gray-600">{info.mbti}</span>
        </h2>
        <p className="mt-2 text-xs font-light text-gray-600">
          {info.virtualFriendAge} · {info.virtualFriendSex} ·{" "}
          {info.virtualFriendRelationship}
        </p>
      </div>
      <button
        className="absolute bottom-0 h-[41px] w-full bg-primary-pale py-2 text-sm font-bold text-primary-normal"
        onClick={handleNavigate}
      >
        바로 대화하기
      </button>
    </div>
  );
};

export default Profile;
