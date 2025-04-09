import { useLocation, useNavigate } from "react-router-dom"


type SubHeaderProps = {
  title: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
};

const SubHeader = ({
  title = "",
  showPreviousIcon = true,
  showShareIcon = false
}: SubHeaderProps) => {

  const navigate = useNavigate();
  const isProgressPage = useLocation().pathname === "/mbti-test-progress";
  const { currentPage, setPreviousStep } = useMbtiTestState();
  const firstQuestionPage = currentPage === 1;
  
  const handleGoBack = () => {
    if(isProgressPage && !firstQuestionPage) setPreviousStep();
    else navigate(-1);
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