import { useState } from "react";
import ShareModal from "@/components/modal/ShareModal";
import trackClickEvent from "@/utils/trackClickEvent";

const ShareButton = () => {
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const handleClick = () => {
    setShareModalIsOpen(true);
    trackClickEvent("MBTI 테스트 결과", "공유하기 버튼");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex h-[60px] w-full items-center justify-center rounded-lg border border-primary-light bg-primary-pale font-bold text-primary-normal"
      >
        공유하기
      </button>
      {shareModalIsOpen && (
        <ShareModal closeModal={() => setShareModalIsOpen(false)} />
      )}
    </>
  );
};

export default ShareButton;
