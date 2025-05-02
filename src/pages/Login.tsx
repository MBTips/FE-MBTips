import { useState } from "react";
import { Helmet } from "react-helmet";
import KakaoLoginButton from "@/components/button/KakaoLoginButton";
import TermsAndPrivacy from "@/components/TermsAndPrivacy";
import TermsAndPrivacyModal from "@/components/modal/TermsAndPrivacyModal";
import useLayoutSize from "@/hooks/useLayoutSize";

const Login = () => {
  const layoutSize = useLayoutSize();
  const isPC = layoutSize === "lg";
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    mode: "terms" | "privacy";
  }>({
    isOpen: false,
    mode: "terms"
  });

  const openModal = (mode: "terms" | "privacy") => {
    setIsModalOpen({ mode: mode, isOpen: true });
  };
  const closeModal = () => {
    setIsModalOpen((state) => ({ mode: state.mode, isOpen: false }));
  };

  const isOpen = isModalOpen.isOpen;
  const isTerms = isModalOpen.mode === "terms";

  return (
    <>
      <Helmet>
        <meta name="description" content="로그인/회원가입" />
        <meta property="og:description" content="로그인/회원가입" />
      </Helmet>

      <main className="flex h-[812px] flex-col items-center bg-white">
        <img
          src={isPC ? "/image/login/banner_lg.png" : "/image/login/banner.png"}
          alt="로그인 페이지 이미지"
          className="h-[391px] w-full"
        />
        <h1 className="mt-12 text-center text-3xl font-bold whitespace-pre-wrap">
          MBTI 성향 기반
          <br />
          AI 채팅 시뮬레이션으로
          <br />
          대화 연습과 꿀팁 얻어가세요
        </h1>
        <div className="mt-[39px] text-xl text-gray-900">
          대화 연습부터, 피드백까지 드려요
        </div>
        <div className="mt-[47px]">
          <KakaoLoginButton />
        </div>
        <div className="mt-auto w-full pb-4">
          <TermsAndPrivacy openModal={openModal} />
        </div>
        {isOpen ? (
          isTerms ? (
            <TermsAndPrivacyModal mode="terms" closeModal={closeModal} />
          ) : (
            <TermsAndPrivacyModal mode="privacy" closeModal={closeModal} />
          )
        ) : null}
      </main>
    </>
  );
};

export default Login;
