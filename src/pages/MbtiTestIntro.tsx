import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

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
    <main className="h-[1080px] flex flex-col">
      <NavBar />
      <div className="relative flex-1 flex flex-col items-center w-full h-[756px] bg-[url('/image/mbti_test_intro.png')] bg-cover bg-no-repeat">
        <span className="absolute top-[38px] font-medium text-lg">그 사람의 mbti는 뭘까?</span>
        <h2 className="absolute top-[74px] font-extrabold text-[32px] text-center">
          <span className="text-[#2714FF]">상대방</span> MBTI
          <br />
          유추 테스트
        </h2>
        <form className="absolute bottom-[110px] flex flex-col items-center" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-medium text-lg ">MBTI를 알고 싶은 상대의 이름</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            className="mt-[30px] w-[320px] h-[68px] text-center"
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