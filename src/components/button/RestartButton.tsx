import { useNavigate } from "react-router-dom";
import trackClickEvent from "@/utils/trackClickEvent";

const RestartButton = () => {
  const navigate = useNavigate();

  const goFirstStep = () => {
    trackClickEvent("/MBTI 테스트 결과", "돌아가기 버튼");
    navigate("/mbti-test");
  };

  return (
    <button
      className="flex h-[60px] w-[72px] items-center justify-center rounded-lg bg-gray-100"
      onClick={goFirstStep}
    >
      <img src="/icon/restart.svg" alt="다시하기 버튼" width={24} height={24} />
    </button>
  );
};

export default RestartButton;
