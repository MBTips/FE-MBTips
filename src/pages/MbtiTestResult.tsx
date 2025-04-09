import { MouseEvent } from "react";
import { MBTI_RESULT_INFO } from "@/constants/MBTI_RESULT_INFO";
import ShareButton from "@/components/button/ShareButton";
import RestartButton from "@/components/button/RestartButton";
import Header from "@/components/Header";
import ChatStartButton from "@/components/button/ChatStartButton";
import useLayoutSize from "@/hooks/useLayoutSize";

const MbtiTestResult = () => {

    const mbti = localStorage.getItem("mbti-test-mbti");
    const result = MBTI_RESULT_INFO[mbti as keyof typeof MBTI_RESULT_INFO];
    const size = useLayoutSize();
    const imageURL = size === "sm" ? `/image/mbti-test/360px/image_${mbti?.toLocaleLowerCase()}_360.png` : (size === "md" ? `/image/mbti-test/375px/image_${mbti?.toLocaleLowerCase()}_375.png` : `/image/mbti-test/500px/image_${mbti?.toLocaleLowerCase()}_500.png`);
    console.log(imageURL);
    
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
    }

    if (!result) return <div>404 error occured</div>;

    return (
        <div className="flex flex-col sm:w-[360px] md:w-[375px] lg:w-[500px] h-[1008px]">
            <Header title="결과" showShareIcon={false}/>
            <main className="flex flex-col flex-grow items-center w-full px-5 bg-white h-screen py-5">
                <img src={imageURL} alt="mbti 테스트 결과 이미지" className="sm:w-[320px] md:w-[335px] lg:w-[460px] h-[292px]"/>
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
                <div className="mt-[22px] w-full">
                    <ChatStartButton mode={"go-virtual"}/>
                </div>
                <div className="flex gap-4 mt-5 w-full">
                    <RestartButton/>
                    <ShareButton />
                </div>
            </main>
        </div>
    );
}

export default MbtiTestResult;