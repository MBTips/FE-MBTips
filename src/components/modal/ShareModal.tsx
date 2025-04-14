import UrlCopyBar from "@/components/button/UrlCopyBar";
import KakaoShareButton from "../button/KakaoShareButton";

interface ShareModalProps {
  title: string;
  description: string;
  imageUrl: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal = ({
  title,
  description,
  imageUrl,
  closeModal
}: ShareModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <main className="relative flex h-[310px] flex-col justify-center rounded-[20px] bg-white">
        <h2 className="w-full border-b-gray-100 text-center text-xl font-bold ">
          게시글 공유
        </h2>
        <div className="mt-10 flex justify-center gap-10">
          <KakaoShareButton
            title={title}
            description={description}
            imageUrl={imageUrl}
          />
          <button>
            <img src="/icon/Instagram.svg" alt="인스타그램 공유하기 버튼" />
          </button>
        </div>
        <button onClick={() => closeModal(false)}>
          <img
            src="/icon/close.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
            className="absolute top-[14px] right-[14px]"
          />
        </button>
        <div className="mt-10 flex w-full justify-center">
          <UrlCopyBar />
        </div>
      </main>
    </div>
  );
};

export default ShareModal;
