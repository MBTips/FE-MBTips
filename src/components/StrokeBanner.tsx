import { useNavigate } from "react-router-dom";

const StrokeBanner = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const mode = "virtualFriend";
    navigate("/select-info", { state: mode });
  };

  return (
    <div className="flex h-[178px] w-[320px] flex-col justify-center rounded-lg border border-dashed border-gray-200 px-[38px] py-6 text-center md:w-[335px] lg:w-[460px]">
      <button onClick={handleNavigate}>
        <img
          src="/icon/plus_button.svg"
          alt="친구 등록 버튼"
          className="mx-auto hover:scale-110"
          width={40}
          height={40}
        />
      </button>
      <strong className="text-4 mt-4 font-bold text-gray-900">
        친구 정보를 저장하고 대화할 수 있어요
      </strong>
      <p className="mt-2 text-sm font-light text-gray-900">
        로그인 시 기억하고 싶은 친구의 MBTI와 특징을 입력해서 빠르게 대화할 수
        있어요
      </p>
    </div>
  );
};

export default StrokeBanner;
