type HeaderProps = {
  title: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
};

const Header = ({ title, showPreviousIcon = true, showShareIcon = true }: HeaderProps) => {
  return (
    <div className="flex flex-row bg-white border border-gray-100 items-center justify-center w-full h-[56px] relative">
      {showPreviousIcon && ( 
        <img
          src="/public/icon/arrow_left.svg"
          alt="Go To Previous"
          className="absolute left-[18.77px] cursor-pointer"
          width={9.87}
          height={16}
        />
      )}

      <h1 className="text-[18px] font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
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
