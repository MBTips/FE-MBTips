import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import instance from "@/api/axios";
import Header from "@/components/header/Header";

interface TemperatureResponse {
  header: {
    code: number;
    message: string;
  };
  data: string;
}

const ChatTemperature = () => {
  const { conversationId } = useParams();
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    const getTemperature = async () => {
      try {
        const res = await instance.get<TemperatureResponse>(
          `/api/addition/temperature/${conversationId}`
        );
        setTemperature(res.data.data);
      } catch (error) {
        console.error("온도 데이터를 가져오는 중 문제가 발생했습니다:", error);
      }
    };

    getTemperature();
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="대화의 온도" />
        <meta property="og:description" content="대화의 온도" />
        <meta property="twitter:description" content="대화의 온도" />
      </Helmet>

      <div>
        <Header
          title="대화 온도"
          showPreviousIcon={true}
          showShareIcon={true}
        />
        <main className="mx-auto flex h-screen flex-col px-5 py-6">
          <img
            src={"/image/image_온도.png"}
            alt="mbti 온도 이미지"
            className="h-auto w-full rounded-2xl"
          />
          <h1 className="mt-9 text-xl font-bold">
            방금까지 나눈 대화로 온도를 측정했어요!
          </h1>
          {temperature ? (
            <span className="mt-6 whitespace-pre-wrap">
              현재까지 나눈 대화의 온도는 {temperature}도에요
            </span>
          ) : (
            <span className="mt-6 whitespace-pre-wrap">
              ...대화의 온도를 불러오는 중
            </span>
          )}
        </main>
      </div>
    </>
  );
};

export default ChatTemperature;
