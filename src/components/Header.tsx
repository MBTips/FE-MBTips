import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
};

const Header = ({
  title,
  showPreviousIcon = true,
  showShareIcon = true
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex h-[56px] w-full flex-row items-center justify-center border-b border-gray-100 bg-white">
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
    </div>
  );
};

export default Header;
