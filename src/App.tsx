import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "@/pages/Home";
import SelectInfo from "@/pages/SelectInfo";
import Chat from "@/pages/Chat";
import ChatRecommend from "@/pages/ChatRecommend";
import ChatTips from "@/pages/ChatTips";
import ChatTemporature from "@/pages/ChatTemporature";
import Content from "@/pages/Content";
import Login from "@/pages/Login";
import MyInfo from "@/pages/MyInfo";
import KaKaoLogin from "@/pages/KaKaoLogin";
import MbtiTestIntro from "@/pages/MbtiTestIntro";
import MbtiTestQuestions from "@/pages/MbtiTestQuestions";
import MbtiTestResult from "@/pages/MbtiTestResult";
import CenteredLayout from "@/components/CenteredLayout";
import { initGA, trackPageView } from "@/libs/analytics";

const PageTracker = () => {
  const location = useLocation();
  const { pathname, state } = location;

  const trackedPaths = [
    { path: "/", page: "홈" },
    { path: "/login", page: "로그인/회원가입" },
    { path: "/contents", page: "일반콘텐츠" },
    { path: "/my-info", page: "내 정보" },
    { path: "/chat", page: "채팅방" },
    { path: "/select-info", page: "빠른 대화 설정" },
    { path: "/select-info", page: "친구 저장" }
  ];

  useEffect(() => {
    const trackedContentPaths = ["/contents/1", "/contents/2"];

    trackedPaths.forEach(({ path, page }) => {
      // 콘텐츠 상세 페이지 (일반 콘텐츠만 추적)
      if (trackedContentPaths.includes(pathname)) {
        if (path === "/contents") {
          trackPageView(path, page);
        }
      }
      // select-info 페이지에서 state로 분기
      else if (pathname === "/select-info" && path === pathname) {
        if (state === "fastFriend" && page === "빠른 대화 설정") {
          trackPageView(path, page);
        } else if (state === "virtualFriend" && page === "친구 저장") {
          trackPageView(path, page);
        }
      }
      // 나머지 일반 path
      else if (pathname === path && path !== "/select-info") {
        trackPageView(path, page);
      }
    });
  }, [location.pathname, location.state]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA();
    console.log("init");
  }, []);

  return (
    <Router>
      <PageTracker />
      <CenteredLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-info" element={<SelectInfo />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat-recommend" element={<ChatRecommend />} />
          <Route path="/chat-tips" element={<ChatTips />} />
          <Route path="/chat-temporature" element={<ChatTemporature />} />
          <Route path="/contents/:id" element={<Content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/kakao-login" element={<KaKaoLogin />} />
          <Route path="/mbti-test" element={<MbtiTestIntro />} />
          <Route path="/mbti-test-progress" element={<MbtiTestQuestions />} />
          <Route path="/mbti-test-result" element={<MbtiTestResult />} />
        </Routes>
      </CenteredLayout>
    </Router>
  );
};

export default App;
