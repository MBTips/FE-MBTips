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
    <div className="z-1 fixed inset-0 flex flex-col items-center bg-white px-[45px] py-[25px] w-screen h-screen">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="mt-[30px]">{description}</p>
      <button
        onClick={() =>
          closeModal({ isOpen: false, terms: false, privacy: false })
        }
        className="top-4 right-4 fixed"
      >
        <img src="/icon/close.svg" alt="닫기 버튼" width={28} height={28} />
      </button>
    </div>
  );
};

export default TermsAndPrivacyModal;
