import UrlCopyBar from "@/components/button/UrlCopyBar";

const ShareModal = () => {
  return (
    <div className="inset-0 fixed flex justify-center items-center bg-black/50">
        <main className="bg-white relative rounded-[20px] h-[310px] flex flex-col justify-center">
            <h2 className="w-full text-center border-b-gray-100 text-xl font-bold ">게시글 공유</h2>
            <div className="mt-10 flex justify-center gap-10">
                <img src="/icon/kakaotalk.svg" alt="카카오통 공유하기 버튼" />
                <img src="/icon/Instagram.svg" alt="인스타그램 공유하기 버튼" />
            </div>
            <img src="/icon/close.svg" alt="닫기 버튼" width={24} height={24} className="absolute top-[14px] right-[14px]" />
            <div className="flex justify-center w-full mt-10">
                <UrlCopyBar/>
            </div>
        </main>
    </div>
  );
};

export default ShareModal;