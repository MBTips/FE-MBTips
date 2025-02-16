import { useNavigate } from "react-router-dom";
import Banner from "@/components/Banner";
import PrimaryButton from "@/components/button/PrimaryButton";
import NavBar from "@/components/NavBar";
import StrokeBanner from "@/components/StrokeBanner";
import SubTitle from "@/components/SubTitle";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/setting-info");
  };

  return (
    <div className="flex flex-col bg-white w-[375px]">
      <header>
        <NavBar />
      </header>

      <main>
        <section aria-label="콘텐츠 배너">
          <Banner />
        </section>

        <section className="mt-5 w-full" aria-label="빠른 대화">
          <div className="px-[20px] py-[17px]">
            <SubTitle mode="빠른대화" />
          </div>
          <div className="flex justify-center">
            <PrimaryButton size="md" onClick={handleNavigate}>
              대화 시작하기
            </PrimaryButton>
          </div>
        </section>

        <section aria-label="친구 목록">
          <div className="px-[20px] py-[21px]">
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
