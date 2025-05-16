import { useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/libs/analytics";

type ChatStartButtonProps = {
  mode: "go-fast" | "go-virtual" | "go-chat";
  mbti?: string;
};

const ChatStartButton = ({ mode, mbti }: ChatStartButtonProps) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleNavigate = () => {
    switch (mode) {
      case "go-fast":
        trackEvent("Click", {
          page: pathname === "/mbti-test-result" ? "바이럴 콘텐츠 결과" : "홈",
          element:
            pathname === "/mbti-test-result"
              ? "대화 시작하기"
              : "빠른 대화 시작"
        });
        navigate("/select-info", { state: { type: "fastFriend", mbti } });
        break;
      case "go-virtual":
        trackEvent("Click", {
          page: "홈",
          element: "친구 - 바로 대화하기"
        });
        navigate("/select-info", { state: { type: "virtualFriend", mbti } });
        break;
      case "go-chat":
        navigate("/chat");
        break;
      default:
        console.error("mode is invalid", mode);
        return;
    }
  };
  return (
    <button
      className="flex h-[56px] w-full items-center justify-center rounded-lg bg-primary-normal font-bold text-white lg:w-[460px]"
      onClick={handleNavigate}
    >
      대화 시작하기
    </button>
  );
};

export default ChatStartButton;
