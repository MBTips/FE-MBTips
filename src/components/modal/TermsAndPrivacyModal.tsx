import { PRIVACY } from "@/constants/PRIVACY";
import { TERMS } from "@/constants/TERMS";
import { MouseEvent } from "react";

const TermsAndPrivacyModal = ({
  mode,
  closeModal
}: {
  mode: "terms" | "privacy";
  closeModal: () => void;
}) => {
  const title = mode === "terms" ? "이용약관" : "개인정보처리방침";
  const description = mode === "terms" ? TERMS : PRIVACY;

  const handleOuterClick = () => {
    closeModal();
  };

  const handleInnerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOuterClick}
    >
      <div
        className="relative flex h-[476px] w-[360px] flex-col items-center overflow-scroll rounded-lg bg-white px-[45px] py-[25px] "
        onClick={handleInnerClick}
      >
        <h1 className="text-2xl font-bold ">{title}</h1>
        <p className="mt-[30px] whitespace-pre-wrap">{description}</p>
        <button onClick={closeModal} className="absolute top-6 right-4">
          <img src="/icon/close.svg" alt="닫기 버튼" width={22} height={22} />
        </button>
      </div>
    </div>
  );
};

export default TermsAndPrivacyModal;
