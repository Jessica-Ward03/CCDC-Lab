import { Routes, Route } from "react-router-dom";
import "./App.css"
import "./index.css";
import Header from "./Header/Header";
import Home from "./Pages/Home";
import Injects from "./Pages/Injects";
import Scoreboard from "./Pages/Scoreboard";
import { TimerProvider } from "./Time/TimerContext";

export default function App() {
  return (
    <TimerProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Injects" element={<Injects />} />
          <Route path="/Scoreboard" element={<Scoreboard />} />
        </Routes>
    </TimerProvider>
  );
}

