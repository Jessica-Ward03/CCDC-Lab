import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Header from "./Header/Header";
import Home from "./Pages/Home";
import Injects from "./Pages/Injects";
import Scoreboard from "./Pages/Scoreboard";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Injects" element={<Injects />} />
        <Route path="/Scoreboard" element={<Scoreboard />} />
      </Routes>
    </Router>
  );
}