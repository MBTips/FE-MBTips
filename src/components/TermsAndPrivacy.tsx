const TermsAndPrivacy = ({
  openModal
}: {
  openModal: (mode: "terms" | "privacy") => void;
}) => {
  return (
    <div className="relative flex items-center w-full text-gray-900 text-sm">
      <button
        onClick={() => openModal("terms")}
        className="flex justify-center w-full hover:font-bold"
      >
        이용약관
      </button>
      <div className="absolute h-2.5 border-r left-[50%] bottom-1.5"></div>
      <button
        onClick={() => openModal("privacy")}
        className="w-full hover:font-bold"
      >
        개인정보처리방침
      </button>
    </div>
  );
};

export default TermsAndPrivacy;