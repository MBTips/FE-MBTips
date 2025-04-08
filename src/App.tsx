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

  const trackedPaths = [
    { path: "/", label: "home" },
    { path: "/login", label: "login" },
    { path: "/contents" }
  ];

  useEffect(() => {
    const { pathname } = location;

    trackedPaths.forEach(({ path, label }) => {
      if (path === "/contents" && pathname.startsWith(path)) {
        trackPageView(label || pathname);
      } else if (pathname === path) {
        trackPageView(label || pathname);
      }
    });
  }, [location.pathname]);

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
