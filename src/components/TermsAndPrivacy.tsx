const TermsAndPrivacy = () => {
  const togglePopup = (mode: "terms" | "privacy") => {
    // 이용약관 및 개인정보처리방침 메시지 팝업
  };

  return (
    <div className="flex items-center w-screen text-gray-900 text-sm lex">
      <button
        onClick={() => togglePopup("terms")}
        className="flex justify-center border-r w-full hover:font-bold"
      >
        이용약관
      </button>
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
