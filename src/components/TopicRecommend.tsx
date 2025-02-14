import { Mbti } from "types/mbti";
import pickMbtiImage from "@/utils/pickMbtiImage";

const TopicRecommend = ({ mbti = "ESTP" }: { mbti: Mbti }) => {
  const imageUrl = pickMbtiImage(mbti);

  return (
    <div className="flex flex-col rounded-xl rounded-tl-none w-[208px] h-[213px] overflow-hidden">
      <img
        className="block w-full h-auto"
        src={imageUrl}
        alt={mbti}
        width={208}
        height={88}
      />
      <div className="flex flex-col flex-auto justify-center items-center bg-white">
        <h2 className="font-bold text-2lg">대화주제추천</h2>
        <p className="mt-1 font-light text-lg">{mbti}와 나눌 주제 추천드려요</p>
        <button className="flex justify-center items-center bg-gray-900 mt-2 rounded-sm w-[176px] h-[40px] font-medium text-2lg text-white">
          자세히보기
        </button>
      </div>
    </div>
  );
};

export default TopicRecommend;
