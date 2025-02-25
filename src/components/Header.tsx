const Header = () => {
  return (
    <div className="flex flex-row bg-white border border-gray-100 items-center justify-center w-[500px] h-[56px] relative">
      <h1 className="text-[18px] font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
        상대방 정보선택
      </h1>
      <img
        src="/public/icon/share.svg"
        alt="Share"
        className="absolute right-[20px] cursor-pointer"
        width={16}
        height={16}
      />
    </div>
  );
};

export default Header;
