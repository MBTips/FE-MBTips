import { useEffect } from "react";
import { trackPageView } from "@/libs/analytics";
import { TEST_QNA } from "@/constants/TEST_QNA";
import MbtiAnswerButtons from "@/components/button/MbtiAnswerButtons";
import useMbtiTestState from "@/store/useMbtiTestState";
import Header from "@/components/header/Header";
import Error from "@/pages/Error";

interface content {
  number: number;
  question: string;
  answers: {
    mbti: string;
    message: string;
  }[];
}

const MbtiTestQuestions = () => {
  const { currentPage } = useMbtiTestState();

  useEffect(() => {
    trackPageView(`바이럴 콘텐츠 (질문 ${currentPage})`, "");
  }, [currentPage]);

  if (currentPage) {
    const content: content = TEST_QNA[Number(currentPage) - 1];

    return (
      <div className="flex flex-col sm:w-[360px] md:w-[375px] lg:w-[500px]">
        <Header title="상대방 MBTI 유추 테스트" />
        <main className="flex h-full flex-col items-center justify-center bg-white whitespace-pre-wrap ">
          <span className="text-lg font-medium text-gray-500">
            {content.number}/12
          </span>
          <h1 className="mt-[20px] text-center text-3xl font-medium whitespace-pre-wrap">
            {content.question}
          </h1>
          <img
            src={`/icon/mbti_test_${currentPage}.svg`}
            alt="mbti 테스트 과정 이미지"
            className="mt-10"
          />
          <div className="mt-[93px]">
            <MbtiAnswerButtons content={content.answers} />
          </div>
        </main>
      </div>
    );
  } else return <Error statusCode="404" />;
};

export default MbtiTestQuestions;
