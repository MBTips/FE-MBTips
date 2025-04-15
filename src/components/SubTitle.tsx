import { useNavigate } from "react-router-dom";

const SubTitle = ({ mode }: { mode: "빠른대화" | "친구목록" }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
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

  const handleNavigate = () => {
    if (isLoggedIn) {
      const mode = "virtualFriend";
      navigate("/select-info", { state: mode });
    } else {
      alert("로그인 시 이용 가능합니다.");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center">
      <h2 className="text-xl font-bold text-gray-900">
        {titleList[mode].title}
      </h2>
      <p className="ml-1.5 flex-1 text-sm font-light text-gray-800">
        {titleList[mode].description}
      </p>
      {mode === "친구목록" && (
        <button onClick={handleNavigate}>
          <img
            src="/icon/plus.svg"
            alt="친구 추가 버튼"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};

export default SubTitle;
