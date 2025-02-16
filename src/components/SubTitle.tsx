import { useNavigate } from "react-router-dom";

const SubTitle = ({ mode }: { mode: "빠른대화" | "친구목록" }) => {
  const navigate = useNavigate();

  const titleList = {
    빠른대화: {
      title: "빠른 대화",
      description: "대화가 저장되지 않아요."
    },
    친구목록: {
      title: "친구 목록",
      description: "친구 정보와 대화 내용을 저장해요."
    }
  };

  return (
    <div className="flex items-center">
      <h2 className="font-bold text-gray-900 text-xl">
        {titleList[mode].title}
      </h2>
      <p className="ml-1.5 font-light text-md">{titleList[mode].description}</p>
      {mode === "친구목록" && (
        <button onClick={() => navigate("/setting-friends")}>
          <img
            className="ml-[78px]"
            src="/icon/plus.svg"
            alt="친구 추가 버튼"
            width={14}
            height={14}
          />
        </button>
      )}
    </div>
  );
};

export default SubTitle;
