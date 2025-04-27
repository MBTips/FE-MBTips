import Profile from "@/components/Profile";
import { VirtualFriend } from "@/types/virtualFreind";
import { SetStateAction } from "react";

interface ProfileContainerProps {
  list: VirtualFriend[];
  setVirtualFriendList: React.Dispatch<SetStateAction<VirtualFriend[]>>;
}
const ProfileContainer = ({
  list,
  setVirtualFriendList
}: ProfileContainerProps) => {
  return (
    <div className="grid grid-cols-2 gap-7">
      {list.map((el, index) => (
        <Profile
          key={index}
          info={el}
          deleteIndex={index}
          setVirtualFriendList={setVirtualFriendList}
        />
      ))}
    </div>
  );
};

export default ProfileContainer;
