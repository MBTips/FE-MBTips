import { useLocation, useNavigate } from "react-router-dom"
import useMbtiTestState from "@/store/useMbtiTestState";


type SubHeaderProps = {
  title: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
};

const SubHeader = ({
  title = "",
  showPreviousIcon = true,
  showShareIcon = false,
}: SubHeaderProps) => {

  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { currentPage, setPreviousStep } = useMbtiTestState();
  const isProgressPage = pathname === "/mbti-test-progress";
  const isChatPage = pathname === "/chat";
  const isFirstQuestionPage = currentPage === 1;
  
  const handleGoBack = () => {
    if(isProgressPage && !isFirstQuestionPage) setPreviousStep();
    else if(isChatPage) {
      // 채팅 취소 모달 오픈 로직 추가 부탁드려요 헤헤 -> 4.9 정준영
    }
    else if(isFirstQuestionPage) navigate(-1);
  };
  
  return (
    <header className="relative flex h-[56px] w-full flex-row items-center justify-center border-b border-gray-100 bg-white">
    {showPreviousIcon && (
      <img
      src="/public/icon/arrow_left.svg"
      alt="Go To Back"
      className="absolute left-[18.77px] cursor-pointer"
      width={9.87}
      height={16}
      onClick={handleGoBack}
      />
    )}

    <h1 className="absolute left-1/2 -translate-x-1/2 transform text-[18px] font-bold text-gray-900">
      {title}
    </h1>

    {showShareIcon && (
      <img
      src="/public/icon/share.svg"
      alt="Share"
      className="absolute right-[20px] cursor-pointer"
      width={16}
      height={16}
      />
    )}
  </header>
    );
  }
  
  export default SubHeader;