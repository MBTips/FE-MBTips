import ToastMessage from "@/components/ToastMessage";
import { useState } from "react";

const UrlCopyButton = ({ currentUrl }: { currentUrl: string }) => {
  const [toastMessage, setToastMessage] = useState<string>("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setToastMessage("URL을 복사했습니다.");
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
      });
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="flex h-8 items-center justify-center rounded-[20px] bg-primary-normal px-4 py-2 text-white"
      >
        복사
      </button>
      {toastMessage && (
        <ToastMessage
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};

export default UrlCopyButton;
