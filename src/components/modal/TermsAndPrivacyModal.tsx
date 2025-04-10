const TermsAndPrivacyModal = ({
  mode,
  closeModal
}: {
  mode: "terms" | "privacy";
  closeModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; terms: boolean; privacy: boolean }>
  >;
}) => {
  const title = mode === "terms" ? "이용약관" : "개인정보처리방침";
  const description =
    mode === "terms"
      ? "나 이용약관 블라블라블라...."
      : " 나 개인정보처리방침 블라블라블라";

  return (
    <div className="inset-0 fixed flex items-center justify-center  z-50 bg-black/50">
    <div className="relative rounded-lg flex flex-col items-center w-[331px] h-[476px] bg-white px-[45px] py-[25px] overflow-scroll">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="mt-[30px]">{description}</p>
      <button
        onClick={() =>
          closeModal({ isOpen: false, terms: false, privacy: false })
        }
        className="absolute top-4 right-4"
      >
        <img src="/icon/close.svg" alt="닫기 버튼" width={18} height={18} />
      </button>
    </div>
    </div>
  );
};

export default TermsAndPrivacyModal;
