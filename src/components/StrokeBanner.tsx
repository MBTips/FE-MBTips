import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionConfirmModal from "@/components/modal/ActionConfirmModal";
import useAuthStore from "@/store/useAuthStore";

const StrokeBanner = () => {
  const [needLoginModalIsOpen, setNeedLoginModalIsOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isLoggedIn) {
      const mode = "virtualFriend";
      navigate("/select-info", { state: { type: mode } });
    } else {
      setNeedLoginModalIsOpen(true);
    }
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
        로그인 시 기억하고 싶은 친구의 MBTI와 특징을
        <br />
        입력해서 빠르게 대화할 수 있어요
      </p>
      {needLoginModalIsOpen && (
        <ActionConfirmModal
          title="로그인이 필요합니다."
          message={[`로그인 페이지로\n이동할까요?`]}
          cancelText="취소"
          confirmText="확인"
          onCancel={() => setNeedLoginModalIsOpen(false)}
          onConfirm={() => navigate("/login")}
        />
      )}
    </div>
  );
};

export default StrokeBanner;
