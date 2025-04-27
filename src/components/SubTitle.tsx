import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionConfirmModal from "@/components/modal/ActionConfirmModal";
import useAuthStore from "@/store/useAuthStore";

const SubTitle = ({ mode }: { mode: "빠른대화" | "친구목록" }) => {
  const [needLoginModalIsOpen, setNeedLoginModalIsOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const titleList = {
    빠른대화: {
      title: "빠른 대화",
      description: "대화가 저장되지 않아요."
    },
    친구목록: {
      title: "친구 목록",
      description: "친구 정보와 대화 내용을 저장해요."
    }
  };

  const handleNavigate = () => {
    if (isLoggedIn) {
      const type = mode === "빠른대화" ? "fastFriend" : "virtualFriend";
      navigate("/select-info", { state: { type: type } });
    } else setNeedLoginModalIsOpen(true);
  };

  return (
    <div className="flex items-center">
      <h2 className="text-xl font-bold text-gray-900">
        {titleList[mode].title}
      </h2>
      <p className="ml-1.5 flex-1 text-sm font-light text-gray-800">
        {titleList[mode].description}
      </p>
      {mode === "친구목록" && (
        <button onClick={handleNavigate}>
          <img
            src="/icon/plus.svg"
            alt="친구 추가 버튼"
            width={20}
            height={20}
          />
        </button>
      )}
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

export default SubTitle;
