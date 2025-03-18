import KakaoLoginButton from "@/components/button/KakaoLoginButton";
import TermsAndPrivacy from "@/components/TermsAndPrivacy";

const Login = () => {
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
        <TermsAndPrivacy />
      </div>
    </div>
  );
};

export default Login;
