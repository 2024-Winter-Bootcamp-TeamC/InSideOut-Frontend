import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preparation from "./pages/reportlist";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Preparation />} />
      </Routes>
    </Router>
  );
}

export default App;
