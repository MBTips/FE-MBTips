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
      alert("이름은 최소 1글자, 최대 10글자여야 합니다.");
      return;
    }

    localStorage.setItem("name", name);
    navigate("/mbti-test/1");
  }

  return (
    <main className="md:w-[360px] md:h-[812px]">
      <NavBar />
      <div className="relative flex flex-col items-center w-full h-[756px] bg-[url('/image/mbti_test_intro.png')] bg-cover bg-no-repeat">
        <span className="absolute top-[38px] font-medium text-lg">그 사람의 mbti는 뭘까?</span>
        <h2 className="absolute top-[74px] font-extrabold text-[32px] text-center">
          <span className="text-[#2714FF]">상대방</span> MBTI
          <br />
          유추 테스트
        </h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-medium text-lg absolute bottom-[257px]">MBTI를 알고 싶은 상대의 이름</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            className="bg-white rounded-lg w-[320px] h-[68px] text-center absolute bottom-[172px]"
          />
          <button
            type="submit"
            className="bg-primary-normal hover:opacity-80 absolute bottom-[49px] rounded-lg w-[320px] h-[60px] font-bold text-white"
          >
            시작하기
          </button>
        </form> 
      </div>
    </main>
  )
}

export default MbtiTestIntro;