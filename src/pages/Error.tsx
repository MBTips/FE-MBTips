import PrimaryButton from "@/components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

const Error = ({ statusCode }: { statusCode: "401" | "404" | "500" }) => {
  const navigate = useNavigate();

  const content = {
    401: {
      title: "세션이 만료되었습니다.",
      description: `활동이 없어 자동으로 로그아웃되었어요.\n채팅을 이어가려면 다시 로그인해 주세요.`,
      buttonTitle: "홈으로 가기",
      onClick: () => {
        navigate("/");
      }
    },
    404: {
      title: "페이지를 찾을 수 없습니다.",
      description: `입력하신 주소가 올바르지 않거나,\n요청하신 페이지가 삭제되었을 수 있습니다.`,
      buttonTitle: "홈으로 가기",
      onClick: () => {
        navigate("/");
      }
    },
    500: {
      title: "앗! 잠시 오류가 일어났어요",
      description: `일시적인 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.`,
      buttonTitle: "새로고침 버튼",
      onClick: () => {
        window.location.reload();
      }
    }
  };
  return (
    <main className="relative flex flex-col items-center  bg-white">
      <div className="absolute bottom-[372px] flex h-[196px] flex-col items-center justify-between">
        <img src="/icon/error.svg" alt="에러 아이콘" width={63} height={63} />
        <h1 className="text-2xl font-bold ">{content[statusCode].title}</h1>
        <p className="text-center whitespace-pre-wrap text-gray-600">
          {content[statusCode].description}
        </p>
      </div>
      <div className="absolute bottom-[60px]">
        <PrimaryButton size="md" onClick={content[statusCode].onClick}>
          {content[statusCode].buttonTitle}
        </PrimaryButton>
      </div>
    </main>
  );
};

export default Error;
