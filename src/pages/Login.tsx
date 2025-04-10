import { useState } from "react";
import KakaoLoginButton from "@/components/button/KakaoLoginButton";
import TermsAndPrivacy from "@/components/TermsAndPrivacy";
import TermsAndPrivacyModal from "@/components/modal/TermsAndPrivacyModal";
import useLayoutSize from "@/hooks/useLayoutSize";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState<{isOpen : boolean, mode: "terms" | "privacy"}>({
    isOpen: false,
    mode : "terms",
  });
  const layoutSize = useLayoutSize();
  const isPC = layoutSize === "lg";

  return (
    <main className="bg-white flex flex-col items-center h-[812px]">
      <img
        src={isPC ? "/image/login/banner_lg.png" : "/image/login/banner.png"}
        alt="로그인 페이지 이미지"
        className="w-full h-[391px]"
      />
      <h1 className="mt-12 font-bold text-3xl text-center whitespace-pre-wrap">
        MBTI 성향 기반
        <br />
        AI 채팅 시뮬레이션으로
        <br />
        대화 연습과 꿀팁 얻어가세요
      </h1>
      <div className="mt-[39px] text-gray-900 text-xl">
        대화 연습부터, 피드백까지 드려요
      </div>
      <div className="mt-[47px]">
        <KakaoLoginButton />
      </div>
      <div className="w-full mt-auto mb-2">
        <TermsAndPrivacy setIsOpen={setIsModalOpen} />
      </div>
      {isModalOpen.isOpen ? (
        isModalOpen.terms ? (
          <TermsAndPrivacyModal mode="terms" closeModal={setIsModalOpen} />
        ) : (
          <TermsAndPrivacyModal mode="privacy" closeModal={setIsModalOpen} />
        )
      ) : null}
    </main>
  );
};

export default Login;
