import { useEffect } from "react";

interface KakoShareButtonProps {
  title: string;
  description: string;
  imageUrl: string;
}

const KakaoShareButton = ({
  title,
  description,
  imageUrl
}: KakoShareButtonProps) => {
  const kakaoJavascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    // 카카오톡 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJavascriptKey);
    }
  }, []);

  const handleShare = () => {
    if (window.Kakao) {
      // 카카오톡 공유 기능 호출
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href
          }
        }
      });
    }
  };
  return (
    <div>
      <button onClick={handleShare}>
        <img
          src="/icon/kakaotalk.svg"
          alt="카카오통 공유하기 버튼"
          width={72}
          height={72}
        />
      </button>
    </div>
  );
};

export default KakaoShareButton;
