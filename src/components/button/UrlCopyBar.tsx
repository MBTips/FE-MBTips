import UrlCopyButton from "./UrlCopyButton";

const UrlCopyBar = () => {
  const currentUrl = window.location.href;

  return (
    <div className="rounded-lg border-gray-100 border flex justify-between items-center py-[15px] px-4 w-full max-w-[420px] h-[54px]">
      <span className="text-lg ">{currentUrl}</span>
      <UrlCopyButton currentUrl={currentUrl}/>
    </div>
  );
};

export default UrlCopyBar;