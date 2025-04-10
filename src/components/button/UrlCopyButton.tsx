const UrlCopyButton = ({currentUrl} : {currentUrl : string}) => {
    const handleCopy = () => {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert("URL이 복사되었습니다!"); // toast로 바꾸어야 함 -> 4.10 정준영
        })
        .catch((err) => {
          console.error("URL 복사 실패:", err); 
        });
    };
  
    return (
      <button
        onClick={handleCopy}
        className="bg-primary-normal h-8 text-white flex items-center justify-center rounded-[20px] px-4 py-2"
      >
        복사
      </button>
    );
  };
  
  export default UrlCopyButton;