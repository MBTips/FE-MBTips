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
    localStorage.setItem("name", name);
    navigate("/mbti-test/1");
  }

  return (
    <main className="md:w-[360px] md:h-[812px]">
      <NavBar />
      <div className="flex flex-col items-center bg-primary-light w-full h-full">
        <span className="mt-[38px] font-medium text-lg">그 사람의 mbti는 뭘까?</span>
        <h2 className="mt-[12px] font-extrabold text-[32px] text-center">
          <span className="text-[#2714FF]">상대방</span> MBTI
          <br />
          유추 테스트
        </h2>
        <img src="/image/Rectangle.png" alt=" mbti 유추 이미지" className="mt-[28px]" width={160} height={225}/>
        <form className="flex flex-col items-center mt-[70px]" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-medium text-lg">MBTI를 알고 싶은 상대의 이름</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            className="bg-white mt-[20px] rounded-lg w-[320px] h-[68px] text-center"
          />
          <button
            type="submit"
            className="bg-primary-normal hover:opacity-80 mt-[63px] rounded-lg w-[320px] h-[60px] font-bold text-white"
          >
            시작하기
          </button>
        </form>
      </div>
    </main>
  )
}

export default MbtiTestIntro;