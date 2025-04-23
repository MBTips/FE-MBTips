import UrlCopyButton from "@/components/button/UrlCopyButton";

const UrlCopyBar = () => {
  const currentUrl = window.location.href;

  return (
    <div className="flex h-[54px] w-full max-w-[420px] items-center justify-between rounded-lg border border-gray-100 px-4 py-[15px]">
      <span className="text-lg ">{currentUrl}</span>
      <UrlCopyButton currentUrl={currentUrl} />
    </div>
  );
};

export default UrlCopyBar;
