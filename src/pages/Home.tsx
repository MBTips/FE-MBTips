import { useNavigate } from "react-router-dom";
import Banner from "@/components/Banner";
import PrimaryButton from "@/components/button/PrimaryButton";
import NavBar from "@/components/NavBar";
import StrokeBanner from "@/components/StrokeBanner";
import SubTitle from "@/components/SubTitle";
import ChatStartButton from "@/components/button/ChatStartButton";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/setting-info");
  };

  return (
    <div className="flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
      <header>
        <NavBar />
      </header>

      <main>
        <section aria-label="콘텐츠 배너">
          <Banner />
        </section>

        <section className="mt-5 w-full" aria-label="빠른 대화">
          <div className="w-full px-[20px] py-[13px]">
            <SubTitle mode="빠른대화" />
          </div>
          <div className="px-5 py-3">
            <ChatStartButton onClick={handleNavigate} />
          </div>
        </section>

        <section aria-label="친구 목록">
          <div className="w-full px-[20px] py-[21px]">
            <SubTitle mode="친구목록" />
          </div>
          <div className="flex justify-center pb-[127px]">
            <StrokeBanner />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
