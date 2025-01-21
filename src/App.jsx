import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import ReportDetail from "./pages/ReportDetail";
import Category from "./pages/category";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/login";
import ReportList from "./pages/ReportList";
import Preparation from "./pages/preparation";
import EmotionSelect from "./pages/EmotionSelect";
import { useEffect, useRef } from "react";
import BGM from "./assets/BackGroundBGM1.mp3";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      // BGM 자동 재생 시도
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });

      // 이벤트 리스너 제거
      document.removeEventListener("click", handleInteraction);
    };

    if (audioRef.current) {
      audioRef.current.loop = true; // 반복 재생
      audioRef.current.volume = 1; // 초기 볼륨 설정
    }

    // 사용자 상호작용으로 자동 재생
    document.addEventListener("click", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <audio ref={audioRef} src={BGM} preload="auto" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/chatroom" element={<ChatRoom audioRef={audioRef} />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/emotionselect" element={<EmotionSelect />} />
          <Route path="/reportlist" element={<ReportList />} />
          <Route path="/reportdetail" element={<ReportDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
