import { useState } from "react";
import ShareModal from "@/components/modal/ShareModal";

const ShareButton = () => {
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const handleClick = () => {
    setShareModalIsOpen(true);
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
