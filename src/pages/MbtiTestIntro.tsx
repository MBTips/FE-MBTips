import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import useLayoutSize from "@/hooks/useLayoutSize";
import trackClickEvent from "@/utils/trackClickEvent";

const MbtiTestIntro = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const viewport = useLayoutSize();
  const bannerSize =
    viewport === "sm" ? "360" : viewport === "md" ? "375" : "500";
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (name.length < 1 || name.length > 10) {
      // toast PR 반영되면 바꿀 예정입니다. -> 04.01 정준영
      alert("이름은 최소 1글자, 최대 10글자여야 합니다.");
      return;
    }

    localStorage.setItem("mbti-test-name", name);
    navigate("/mbti-test-progress");
  };

  return (
    <main className="flex h-[1080px] flex-col sm:h-[812px]">
      <Header title="상대방 MBTI 유추 테스트" />
      <div className="relative flex h-[756px] w-full flex-1 flex-col items-center">
        <img
          src={`/image/mbti-test/${bannerSize}px/intro_${bannerSize}.png`}
          alt="intro image"
          className="inset-0 h-full w-full"
        />
        <span className="absolute top-[38px] text-lg font-medium">
          그 사람의 mbti는 뭘까?
        </span>
        <h2 className="absolute top-[74px] text-center text-[32px] leading-10 font-extrabold">
          <span className="text-[#2714FF]">상대방</span> MBTI
          <br />
          유추 테스트
        </h2>
        <form
          className="absolute top-[472px] flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="text-lg font-medium ">
            MBTI를 알고 싶은 상대의 이름
          </label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            className="mt-[30px] h-[68px] w-full rounded-lg border-gray-50  bg-white text-center"
          />
          <button
            type="submit"
            className="mt-[60px] h-[60px] w-[320px] rounded-lg bg-primary-normal font-bold text-white hover:opacity-80 lg:w-[460px]"
            onClick={() =>
              trackClickEvent("바이럴 콘텐츠 소개", "시작하기 버튼")
            }
          >
            시작하기
          </button>
        </form>
      </div>
    </main>
  );
};

export default MbtiTestIntro;
