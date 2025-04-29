import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { authInstance } from "@/api/axios";
import { VirtualFriend } from "@/types/virtualFreind";
import Banner from "@/components/Banner";
import StrokeBanner from "@/components/StrokeBanner";
import SubTitle from "@/components/SubTitle";
import ChatStartButton from "@/components/button/ChatStartButton";
import Header from "@/components/header/Header";
import useAuthStore from "@/store/useAuthStore";
import ProfileContainer from "@/components/ProfileContainer";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [virtualFreindList, setVirtualFriendList] = useState<VirtualFriend[]>(
    []
  );

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const res: AxiosResponse<{ data: VirtualFriend[] }> =
          await authInstance.get("/api/virtual-friend");
        setVirtualFriendList(res.data.data);
      } catch (err) {
        console.error("친구 목록을 불러오지 못했습니다.", err);
        navigate("/error");
      }
    };

    if (isLoggedIn) fetchFriendList();
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>Mbtips</title>
        <meta name="description" content="Mbtips 홈페이지입니다." />
        <meta property="og:title" content="Mbtips" />
        <meta property="og:image" content="/logo/logo.svg" />
      </Helmet>

      <div className="flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
        <Header />
        <main>
          <section aria-label="콘텐츠 배너">
            <Banner />
          </section>
          <section className="mt-5 w-full" aria-label="빠른 대화">
            <div className="w-full px-[20px] py-[13px]">
              <SubTitle mode="빠른대화" />
            </div>
            <div className="px-5 py-3">
              <ChatStartButton mode={"go-fast"} />
            </div>
          </section>
          <section aria-label="친구 목록">
            <div className="w-full px-[20px] py-[21px]">
              <SubTitle mode="친구목록" />
            </div>
            <div className="flex justify-center pb-[127px]">
              {isLoggedIn && virtualFreindList.length > 0 ? (
                <ProfileContainer
                  list={virtualFreindList}
                  setVirtualFriendList={setVirtualFriendList}
                />
              ) : (
                <StrokeBanner />
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
