import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "@/api/axios";
import Header from "@/components/header/Header";

interface mbtiResProps {
  mbti: string;
}

interface tempResProps {
  data: string;
}

const ChatTemporature = () => {
  const { conversationId } = useParams();
  const [virtualFrinedInfo, setVirtualFrinedInfo] = useState({
    mbti: "",
    temporature: ""
  });
  const temporature = virtualFrinedInfo.temporature;
  const mbti = virtualFrinedInfo.mbti;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mbtiRes, tempRes] = await Promise.all([
          instance.get<mbtiResProps>(`/api/virtual-friend/${conversationId}`),
          instance.get<tempResProps>(
            `/api/addition/temporature/${conversationId}`
          )
        ]);

        setVirtualFrinedInfo({
          mbti: mbtiRes.data.mbti,
          temporature: tempRes.data.data
        });
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header title="대화 온도" showPreviousIcon={true} showShareIcon={true} />
      <main className="mx-auto flex flex-col px-5 py-6">
        <img
          src={"/image/image_온도.png"}
          alt="mbti 온도 이미지"
          className="h-auto w-full rounded-2xl"
        />
        <h1 className="mt-9 text-xl font-bold">
          방금까지 나눈 대화로 온도를 측정했어요!
        </h1>
        <span className="mt-6 whitespace-pre-wrap">
          현재 {mbti}와 나눈 대화의 온도는 {temporature}도에요
        </span>
      </main>
    </div>
  );
};

export default ChatTemporature;
