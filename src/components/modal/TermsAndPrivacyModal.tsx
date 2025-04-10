import { PRIVACY } from "@/constants/PRIVACY";
import { TERMS } from "@/constants/TERMRS";
import { MouseEvent } from "react";

const TermsAndPrivacyModal = ({
  mode,
  closeModal
}: {
  mode: "terms" | "privacy";
  closeModal: ()=>void;
}) => {
  const title = mode === "terms" ? "이용약관" : "개인정보처리방침";
  const description =
    mode === "terms"
      ? TERMS
      : PRIVACY;

      const handleOuterClick = () => {
        closeModal()
      }

      const handleInnerClick = (e:MouseEvent) => {
        e.stopPropagation();
      }

  return (
    <div className="inset-0 fixed flex items-center justify-center z-50 bg-black/50" onClick={handleOuterClick}>
    <div className="relative rounded-lg flex flex-col items-center w-[360px] h-[476px] bg-white px-[45px] py-[25px] overflow-scroll " onClick={handleInnerClick}>
      <h1 className="font-bold text-2xl ">{title}</h1>
      <p className="mt-[30px] whitespace-pre-wrap">{description}</p>
      <button
        onClick={closeModal}
        className="absolute top-6 right-4"
      >
        <img src="/icon/close.svg" alt="닫기 버튼" width={22} height={22} />
      </button>
    </div>
    </div>
  );
};

export default TermsAndPrivacyModal;
