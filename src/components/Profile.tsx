const Profile = () => {
  return (
    <div className="w-[157px] h-[192px] bg-white rounded-[8px] overflow-hidden relative border border-[#EEEEEE]">
      <img
        src="/public/icon/dustbin.svg"
        alt="Delete"
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
        width={16}
        height={16}
      />

      <img
        src="/public/image/ENTP.png"
        alt="Profile"
        className="absolute top-[12px] left-[11px] w-12 h-12 object-cover rounded-full"
      />

      <div className="pt-[69px] px-4">
        <h2 className="text-base flex items-center space-x-1">
          <span className="font-bold">김엠비</span>
          <span className="font-light text-gray-600">ENTP</span>
        </h2>
        <p className="text-xs text-gray-600 mt-2 font-light">
          20대 · 여자 · 직장동료 · 여행 · 사회생활
        </p>
      </div>

      <button className="w-full h-[41px] bg-primary-pale text-primary-normal font-bold py-2 text-sm absolute bottom-0">
        바로 대화하기
      </button>
    </div>
  );
};

export default Profile;
