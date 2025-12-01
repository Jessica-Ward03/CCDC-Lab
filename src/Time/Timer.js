import React from "react";
import { useTimer } from "./TimerContext";

export default function Timer() {
  const { secondsLeft } = useTimer();

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {String(hours).padStart(2, "0")}:
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}
