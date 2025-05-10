import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MBTI_RESULT_INFO } from "@/constants/MBTI_RESULT_INFO";
import ShareButton from "@/components/button/ShareButton";
import RestartButton from "@/components/button/RestartButton";
import ChatStartButton from "@/components/button/ChatStartButton";
import useLayoutSize from "@/hooks/useLayoutSize";
import Header from "@/components/header/Header";
import { useParams } from "react-router-dom";

const MbtiTestResult = () => {
  const { mbti } = useParams();
  const result = MBTI_RESULT_INFO[mbti as keyof typeof MBTI_RESULT_INFO];
  const size = useLayoutSize();
  const imageURL =
    size === "sm"
      ? `/image/mbti-test/360px/image_${mbti?.toLocaleLowerCase()}_360.png`
      : size === "md"
        ? `/image/mbti-test/375px/image_${mbti?.toLocaleLowerCase()}_375.png`
        : `/image/mbti-test/500px/image_${mbti?.toLocaleLowerCase()}_500.png`;

  if (!result) return <div>404 error occured</div>;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`상대방 MBTI 알아보기 결과 - ${mbti}`}
        />
        <meta
          property="og:title"
          content="MBTips_MBTI AI 대화 시뮬레이션 - 상대방 MBTI 결과"
        />
        <meta
          property="og:description"
          content={`상대방 MBTI 알아보기 결과 - ${mbti}`}
        />
        <meta
          property="twitter:title"
          content="MBTips_MBTI AI 대화 시뮬레이션 - 상대방 MBTI 결과"
        />
        <meta
          property="twitter:description"
          content={`상대방 MBTI 알아보기 결과 - ${mbti}`}
        />
      </Helmet>

      <div className="flex h-[1008px] flex-col sm:w-[360px] md:w-[375px] lg:w-[500px]">
        <Header title="결과" showShareIcon={false} />
        <main className="flex h-screen w-full flex-grow flex-col items-center bg-white px-5 py-5">
          <img
            src={imageURL}
            alt="mbti 테스트 결과 이미지"
            className="h-[292px] sm:w-[320px] md:w-[335px] lg:w-[460px]"
          />
          <h2 className="mt-6 text-2xl font-bold">
            {mbti?.toUpperCase()}는 이런 성향이에요!
          </h2>
          <ul className="mt-4 flex gap-3">
            <li
              style={{
                backgroundColor: result.bgColor,
                color: result.textColor
              }}
              className="rounded-[40px] px-4 py-1 font-bold"
            >
              {result.tag[0]}
            </li>
            <li
              style={{
                backgroundColor: result.bgColor,
                color: result.textColor
              }}
              className="rounded-[40px] px-4 py-1 font-bold"
            >
              {result.tag[1]}
            </li>
          </ul>
          <div className="mt-4 flex flex-col rounded-[20px] border-1 border-[#EDEDED] bg-white p-[28px]">
            <h3 className="text-lg font-bold">좋아하는 대화 주제</h3>
            <ul className="ml-5 list-disc">
              <li>{result.topic[0]}</li>
              <li>{result.topic[1]}</li>
            </ul>
            <h3 className="mt-6 text-lg font-bold">좋아하는 대화 태도</h3>
            <ul className="ml-5 list-disc">
              <li>{result.attitude[0]}</li>
              <li>{result.attitude[1]}</li>
            </ul>
          </div>
          <div className="mt-[22px] w-full">
            <ChatStartButton mode={"go-fast"} mbti={mbti} />
          </div>
          <div className="mt-5 flex w-full gap-4">
            <RestartButton />
            <ShareButton />
          </div>
        </main>
      </div>
    </>
  );
};

export default MbtiTestResult;
