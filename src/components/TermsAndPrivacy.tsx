const TermsAndPrivacy = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; terms: boolean; privacy: boolean }>
  >;
}) => {
  const togglePopup = (mode: "terms" | "privacy") => {
    // 이용약관 및 개인정보처리방침 메시지 팝업
    setIsOpen((prev) => ({ ...prev, isOpen: true, [mode]: true }));
  };

  return (
    <div className="relative w-full flex items-center text-gray-900 text-sm ">
      <button
        onClick={() => togglePopup("terms")}
        className="flex justify-center w-full hover:font-bold"
      >
        이용약관
      </button>
      <div className="absolute h-2.5 border-r left-[50%] bottom-1"></div>
      <button
        onClick={() => togglePopup("privacy")}
        className="w-full hover:font-bold"
      >
        개인정보처리방침
      </button>
    </div>
  );
};

export default TermsAndPrivacy;
