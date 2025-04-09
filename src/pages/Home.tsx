import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import StrokeBanner from "@/components/StrokeBanner";
import SubTitle from "@/components/SubTitle";
import ChatStartButton from "@/components/button/ChatStartButton";

const Home = () => {

  return (
    <div className="flex flex-col bg-white w-[360px] md:w-[375px] lg:w-[500px]">
      <header>
        <Header/>
      </header>

      <main>
        <section aria-label="콘텐츠 배너">
          <Banner />
        </section>

        <section className="mt-5 w-full" aria-label="빠른 대화">
          <div className="px-[20px] py-[13px] w-full">
            <SubTitle mode="빠른대화" />
          </div>
          <div className="px-5 py-3">
            <ChatStartButton mode={"go-fast"}/>
          </div>
        </section>

        <section aria-label="친구 목록">
          <div className="px-[20px] py-[21px] w-full">
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
