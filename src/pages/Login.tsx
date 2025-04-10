import { useState } from "react";
import KakaoLoginButton from "@/components/button/KakaoLoginButton";
import TermsAndPrivacy from "@/components/TermsAndPrivacy";
import TermsAndPrivacyModal from "@/components/modal/TermsAndPrivacyModal";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState<{isOpen : boolean, mode : "terms" | "privacy"}>({
    isOpen: false,
    mode: "terms",
  });

  const openModal =(mode : "terms" | "privacy")=> {
    setIsModalOpen({mode:mode, isOpen : true});
  }
  const closeModal = () => {
    setIsModalOpen((state) => ({mode:state.mode, isOpen : false}));
  }

  const isOpen = isModalOpen.isOpen
  const isTerms = isModalOpen.mode === "terms";

  return (
    <div className="flex flex-col items-center">
      <img
        src="/image/banner_login.png"
        alt="로그인 페이지 이미지"
        className="w-full h-[391px]"
      />
      <h1 className="mt-8 font-bold text-3xl text-center whitespace-pre-wrap">
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
      <div className="mt-[72px]">
        <TermsAndPrivacy openModal={openModal} />
      </div>
      {isOpen ? (
        isTerms ? (
          <TermsAndPrivacyModal mode="terms" closeModal={closeModal} />
        ) : (
          <TermsAndPrivacyModal mode="privacy" closeModal={closeModal} />
        )
      ) : null}
    </div>
  );
};

export default Login;
