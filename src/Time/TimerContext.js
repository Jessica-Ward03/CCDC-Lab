import React, { createContext, useContext, useState, useEffect, useRef } from "react";


//Thanks to Geeks for Geeks https://www.geeksforgeeks.org/reactjs/creating-a-timer-component-with-useeffect-hook-in-react/ for the timer



const TimerContext = createContext(null);

export function TimerProvider({ children }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = (durationSeconds) => {
    if (intervalRef.current) return;

    const endTime = Date.now() + durationSeconds * 1000;
    localStorage.setItem("labTimer", JSON.stringify({ endTime, running: true }));

    setSecondsLeft(durationSeconds);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const saved = JSON.parse(localStorage.getItem("labTimer"));
      if (!saved) return;

      const remaining = Math.max(Math.ceil((saved.endTime - Date.now()) / 1000), 0);
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        localStorage.setItem("labTimer", JSON.stringify({ endTime: 0, running: false }));
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);

      const saved = JSON.parse(localStorage.getItem("labTimer")) || {};
      localStorage.setItem("labTimer", JSON.stringify({ ...saved, running: false }));
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setSecondsLeft(600);
    localStorage.setItem("labTimer", JSON.stringify({ endTime: 0, running: false }));
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("labTimer"));
    if (saved?.running && saved?.endTime) {
      const remaining = Math.max(Math.ceil((saved.endTime - Date.now()) / 1000), 0);
      if (remaining > 0) startTimer(remaining);
    } else {
      setSecondsLeft(600);
      setIsRunning(false);
    }
  }, []);

  return (
    <TimerContext.Provider value={{ secondsLeft, isRunning, startTimer, pauseTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
