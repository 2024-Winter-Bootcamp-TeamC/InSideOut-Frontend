import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import ReportDetail from "./pages/ReportDetail";
import Category from "./pages/Category";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/login";
import ReportList from "./pages/ReportList";
import Preparation from "./pages/Preparation";
import EmotionSelect from "./pages/EmotionSelect";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/chatroom" element={<ChatRoom />} />
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
