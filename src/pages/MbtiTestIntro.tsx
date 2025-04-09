import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
const MbtiTestIntro = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

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
  }

  return (
    <main className="sm:h-[812px] h-[1080px] flex flex-col">
      <Header title="상대방 MBTI 유추 테스트"/>
      <div className="relative flex-1 flex flex-col items-center w-full h-[756px]">
        <img src="/image/mbti-test/500px/intro_500.png" alt="intro image" className="inset-0 w-full h-full"/>
        <span className="absolute top-[38px] font-medium text-lg">그 사람의 mbti는 뭘까?</span>
        <h2 className="absolute top-[74px] font-extrabold text-[32px] text-center">
          <span className="text-[#2714FF]">상대방</span> MBTI
          <br />
          유추 테스트
        </h2>
        <form className="absolute top-[472px] flex flex-col items-center" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-medium text-lg ">MBTI를 알고 싶은 상대의 이름</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            className="bg-white border-gray-50 w-full rounded-lg mt-[30px]  h-[68px] text-center"
          />
          <button
            type="submit"
            className="bg-primary-normal hover:opacity-80 mt-[60px] rounded-lg w-[320px] lg:w-[460px] h-[60px] font-bold text-white"
          >
            시작하기
          </button>
        </form> 
      </div>
    </main>
  )
}

export default MbtiTestIntro;