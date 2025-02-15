import Banner from "@/components/Banner";
import PrimaryButton from "@/components/button/PrimaryButton";
import NavBar from "@/components/NavBar";
import StrokeBanner from "@/components/StrokeBanner";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Banner />
      <SubTitle mode="빠른대화" />
      <PrimaryButton size="md">대화 시작하기</PrimaryButton>
      <SubTitle mode="친구목록" />
      <StrokeBanner />
    </div>
  );
};

export default Home;
