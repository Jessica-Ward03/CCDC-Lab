import React, { createContext, useContext, useState, useEffect, useRef } from "react";

//Thanks to Geeks for Geeks https://www.geeksforgeeks.org/reactjs/creating-a-timer-component-with-useeffect-hook-in-react/ for the timer
const API = "http://localhost:3001";


const TimerContext = createContext(null);

export function TimerProvider({ children }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = (durationSeconds) => {
    if (intervalRef.current) return;

    const endTime = Date.now() + durationSeconds * 1000;
    fetch(`${API}/api/timer/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({endTime})
    }).catch(err=>console.error("failed to save timer :(", err));

    setSecondsLeft(durationSeconds);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(Math.ceil((endTime - Date.now()) / 1000), 0);
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        fetch(`${API}/api/timer/reset` , {method: "POST"})
            .catch(err=>console.error("failed to reset timer :(", err));
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);

      fetch(`${API}/api/timer/pause` , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({endTime: Date.now()})
      }).catch(err=>console.error("failed to pause timer :(", err));
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setSecondsLeft(600);
    fetch(`${API}/api/injects/reset` , {method: "POST"})
        .catch(err=>console.error("failed to reset timer :(", err));
  };

  useEffect(() => {
    fetch(`${API}/api/timer/state`)
        .then(res => res.json())
        .then(data => {
          if (data.running && data.endTime) {
            const remaining = Math.max(Math.ceil((data.endTime - Date.now()) / 1000), 0);
            if (remaining > 0) startTimer(remaining);
          } else {
            setSecondsLeft(data.remainingOnPause ?? 600);
            setIsRunning(false);
          }
        })
        .catch(() => setSecondsLeft(600));
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
