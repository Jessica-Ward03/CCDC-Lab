import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Pages/Home";
import Injects from "./Pages/Injects";
import ScoreBoard from "./Pages/ScoreBoard";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Injects" element={<Injects />} />
        <Route path="/ScoreBoard" element={<ScoreBoard />} />
      </Routes>
    </Router>
  );
}