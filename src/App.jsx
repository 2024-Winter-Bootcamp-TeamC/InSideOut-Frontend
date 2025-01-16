import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle"; 

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
        </Routes>
      </Router>
    </>
  );
}

export default App;
