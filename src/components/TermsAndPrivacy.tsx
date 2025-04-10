const TermsAndPrivacy = ({
  openModal
}: {
  openModal: (mode: "terms" | "privacy") => void;
}) => {
  return (
    <div className="flex items-center w-screen text-gray-900 text-sm">
      <button
        onClick={() => openModal("terms")}
        className="flex justify-center border-r w-full hover:font-bold"
      >
        이용약관
      </button>
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