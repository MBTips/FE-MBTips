import { MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { MBTI_RESULT_INFO } from "@/constants/MBTI_RESULT_INFO";
import ChatStartButton from "@/components/button/ChatStartButton";
import ShareButton from "@/components/button/ShareButton";
import RestartButton from "@/components/button/RestartButton";

const MbtiTestResult = () => {
    const { mbti } = useParams<{ mbti: string }>();
    const result = MBTI_RESULT_INFO[mbti?.toUpperCase() as keyof typeof MBTI_RESULT_INFO];
    
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
    }

    if (!result) return <div>404 error occured</div>;

    return (
        <>
            <header className="flex justify-center py-[14px] border-gray-100 border-b font-bold text-xl">결과</header>
            <main className="flex flex-col items-center">
                {/* 디자인팀에서 이미지 작업 완료되면 수정할 예정 -> 3.25 정준영 */}
                <img src="/image/mbti_test_result_image.png" alt="mbti 테스트 결과 이미지" width={335} height={292} className="mt-6"/>
                <h2 className="mt-6 font-bold text-2xl">{mbti?.toUpperCase()}는 이런 성향이에요!</h2>
                <ul className="flex gap-3 mt-4">
                    <li style={{ backgroundColor: result.bgColor, color: result.textColor }} className="px-4 py-1 rounded-[40px] font-bold">{result.tag[0]}</li>
                    <li style={{ backgroundColor: result.bgColor, color: result.textColor }} className="px-4 py-1 rounded-[40px] font-bold">{result.tag[1]}</li>
                </ul>
                <div className="flex flex-col bg-white mt-4 p-[28px] border-[#EDEDED] border-1 rounded-[20px]">
                    <h3 className="font-bold text-lg">좋아하는 대화 주제</h3>
                    <ul className="ml-5 list-disc">
                        <li>{result.topic[0]}</li>
                        <li>{result.topic[1]}</li>
                    </ul>
                    <h3 className="mt-6 font-bold text-lg">좋아하는 대화 태도</h3>
                    <ul className="ml-5 list-disc">
                        <li>{result.attitude[0]}</li>
                        <li>{result.attitude[1]}</li>
                    </ul>
                </div>
                <div className="mt-[22px]">
                    <ChatStartButton onClick={handleClick} />
                </div>
                <div className="flex gap-4 mt-5 w-full">
                    <ShareButton />
                    <RestartButton/>
                </div>
            </main>
        </>
    );
}

export default MbtiTestResult;