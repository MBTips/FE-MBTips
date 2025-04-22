import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mbti } from "@/types/mbti";
import Header from "@/components/header/Header";
import instance from "@/api/axios";
import pickMbtiImage from "@/utils/pickMbtiImage";

interface VirtualFriendResponse {
  mbti: string;
}

interface ChatTipsResponse {
  data: string;
}

const ChatTips = () => {
  const { virtualFriendId } = useParams();
  const [virtualFrinedInfo, setVirtualFrinedInfo] = useState({
    mbti: "",
    tips: ""
  });
  const mbti = virtualFrinedInfo.mbti;
  const tips = virtualFrinedInfo.tips;
  const mbtiImage = pickMbtiImage(mbti as Mbti);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendInfoRes, tipsRes] = await Promise.all([
          instance.get<VirtualFriendResponse>(
            `/api/virtual-friend/${virtualFriendId}`
          ),
          instance.get<ChatTipsResponse>(
            `/api/addition/tips/${virtualFriendId}`
          )
        ]);
        setVirtualFrinedInfo({
          mbti: friendInfoRes.data.mbti,
          tips: tipsRes.data.data
        });
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header title="대화 꿀팁" showPreviousIcon={true} showShareIcon={true} />
      <main className="mx-auto flex flex-col px-5 py-6">
        <img
          src={mbtiImage}
          alt="mbti 이미지"
          className="h-auto w-full rounded-2xl"
        />
        <h1 className="mt-9 text-xl font-bold">{mbti}와 나눌 대화 주제 추천</h1>
        <span className="mt-6 whitespace-pre-wrap">{tips}</span>
      </main>
    </div>
  );
};

export default ChatTips;
