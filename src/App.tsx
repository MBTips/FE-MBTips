import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import SelectInfo from "@/pages/SelectInfo";
import Chat from "@/pages/Chat";
import ChatRecommend from "@/pages/ChatRecommend";
import ChatTips from "@/pages/ChatTips";
import ChatTemporature from "@/pages/ChatTemporature";
import Content from "@/pages/Content";
import Login from "@/pages/Login";
import KaKaoLogin from "@/pages/KaKaoLogin";
import CenteredLayout from "./components/CenteredLayout";

const App = () => {
  return (
    <Router>
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
          <Route path="/kakao-login" element={<KaKaoLogin />} />{" "}
      </Routes>
      </CenteredLayout>
    </Router>
  );
};

export default App;
