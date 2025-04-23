import { useEffect, useState } from "react";
import UrlCopyBar from "@/components/button/UrlCopyBar";
import KakaoShareButton from "../button/KakaoShareButton";
import TwitterShareButton from "@/components/button/TwitterShareButton";

interface ShareModalProps {
  closeModal: () => void;
}

const ShareModal = ({ closeModal }: ShareModalProps) => {
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    imageUrl: ""
  });

  useEffect(() => {
    // 메타 데이터를 가져오는 로직
    const title =
      document
        .querySelector("meta[property='og:title']")
        ?.getAttribute("content") || document.title;
    const description =
      document
        .querySelector("meta[property='og:description']")
        ?.getAttribute("content") || "";
    const imageUrl =
      document
        .querySelector("meta[property='og:image']")
        ?.getAttribute("content") || "";

    setMetaData({ title, description, imageUrl });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <main className="relative z-51 flex h-[310px] flex-col justify-center rounded-[20px] bg-white">
        <h2 className="w-full border-b-gray-100 text-center text-xl font-bold ">
          게시글 공유
        </h2>
        <div className="mt-10 flex justify-center gap-10">
          <KakaoShareButton
            title={metaData.title}
            description={metaData.description}
            imageUrl={metaData.imageUrl}
          />
          <TwitterShareButton title={metaData.title} />
        </div>
        <button
          onClick={closeModal}
          className="absolute top-[14px] right-[14px] h-6 w-6"
        >
          <img src="/icon/close.svg" alt="닫기 버튼" width={24} height={24} />
        </button>
        <div className="mt-10 flex w-full justify-center">
          <UrlCopyBar />
        </div>
      </main>
    </div>
  );
};

export default ShareModal;
