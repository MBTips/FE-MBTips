import { useParams } from "react-router-dom";
import { TEST_QNA } from "@/constants/TEST_QNA";
import MbtiAnswerButtons from "@/components/button/MbtiAnswerButtons";


interface info {
  number: number;
  question: string;
  answers: string[];
}

const MbtiTestQuestions = () => {

  const { n } = useParams<{ n: string }>();

  if (n) {
    const info: info = TEST_QNA[Number(n) - 1];

    return (
        <main className="flex flex-col justify-center items-center">
          <span className="font-medium text-gray-500 text-lg">{info.number}/12</span>
          <h1 className="mt-[20px] font-medium text-3xl text-center whitespace-pre-wrap">{info.question}</h1>
          {/* 디자인팀에서 이미지 주면 고칠 예정 -> 3.24 정준영 */}
          <img src="/image/mbti_test.png" alt="mbti 테스트 과정 이미지" width={110} height={129} className="mt-10" />
          <div className="mt-[93px]">
            <MbtiAnswerButtons content={info.answers} />
          </div>
        </main>
    )
  }

  else return <div>404 error</div>
}

export default MbtiTestQuestions;